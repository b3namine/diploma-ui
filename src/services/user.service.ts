import {makeAutoObservable, runInAction} from "mobx";
import {AuthData, LoginData, RegistrationData, UserFilter, UserRole, Users, UserUpdate} from "../Modal/user";
import axios, {AxiosError} from "axios";
import {ErrorCourse} from "../Modal/courses";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {ErrorStatus} from "../Modal";
import {toast} from "react-toastify";
import {errorToast} from "./text.data";

const loginUrl = DEFAULT_URL + '/api/Authentication/autorisation'
const registrationUrl = DEFAULT_URL + '/api/Authentication/registration'

const updateUserUrl = DEFAULT_URL + '/api/User/update'

// admin role URL
const getUserUrl = DEFAULT_URL + '/api/User/get'
const getAllUsersUrl = DEFAULT_URL + '/api/User/getall'
const creteUserUrl = DEFAULT_URL + '/api/User/create'
const updateRoleUserUrl = DEFAULT_URL + '/api/User/updateRole'
const deleteUserUrl = DEFAULT_URL + '/api/User/delete'


class UserService {
    public isAuth = false
    public user: AuthData | null = null
    public loading = false
    public currentUser: UserUpdate | null = null
    public users: Users[] = []
    public error: ErrorStatus = {status: false, message: ''}
    public errorReg: ErrorStatus = {status: false, message: ''}
    public userForEdit: UserUpdate | null = null

    constructor() {
        makeAutoObservable(this)
    }

    public async registration(values: RegistrationData) {
        try {
            if (this.isAuth) return
            this.loading = true
            const params = {
                ...values,
                isMan: values.isMan === 'male',
            }
            const response = await axios.post(registrationUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error registration')
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            runInAction(() => {
                this.isAuth = true
                this.errorReg = {} as ErrorStatus
                this.user = data
            })
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('register User error', errorToast)
                this.errorReg = {
                    status: true,
                    message: error.errorMessage
                }
            }
        } finally {
            this.loading = false
        }
    }

    public async login(params: LoginData) {
        try {
            if (this.isAuth) return
            this.loading = true
            const response = await axios.post(loginUrl, params)
            const {success, data, errors} = response.data
            if (!success || errors) return console.log('error login')
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            runInAction(() => {
                this.isAuth = true
                this.error = {} as ErrorStatus
                this.user = {...data, birthdate: this.getBirth(data.birthdate), isMan: this.getGrander(data.isMan)}
            })
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('login User error', errorToast)
                this.error = {
                    status: true,
                    message: error.errorMessage
                }
            }
        } finally {
            this.loading = false
        }
    }

    public async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        runInAction(() => {
            this.isAuth = false
            this.user = null
        })
    }

    public async checkAuth() {
        try {
            this.loading = true
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (!token || !user) return false
            runInAction(() => {
                this.isAuth = true
                const USER = JSON.parse(user)
                this.user = {...USER, birthdate: this.getBirth(USER.birthdate), isMan: this.getGrander(USER.isMan)}
            })
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                console.log(error.errorMessage)
            }
        } finally {
            this.loading = false
        }
    }

    public async updateUserInfo(userInfo: UserUpdate) {
        try {
            if (!this.isAuth) return
            this.loading = true
            const params = {
                ...userInfo,
                isMan: userInfo.isMan === 'male',
            }
            const response = await $api.post(updateUserUrl, params)
            const {success} = response.data
            if (!success) return console.log('error login')
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Update User error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async getUser(id?: number) {
        try {
            // check role
            const params = {id}
            const response = await $api.get(getUserUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error login')
            this.userForEdit = data
            return data
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get User error', errorToast)
            }
        }
    }

    public async getAllUsers(filter?: UserFilter) {
        try {
            const params = {...filter}
            const response = await $api.post(getAllUsersUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error login')
            runInAction(() => (this.users = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get all users error', errorToast)
            }
        }
    }

    public async creteUser(userInfo: UserUpdate) {
        try {
            if (!this.isAuth) return
            this.loading = true
            const params = {...userInfo, isMan: userInfo.isMan === 'male',}
            const response = await $api.post(creteUserUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error login')
            runInAction(() => (this.users = [...data, ...this.users]))
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Create User error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async updateRoleUser(userRole: UserRole) {
        try {
            if (!this.isAuth) return
            const params = {...userRole}
            const response = await $api.get(updateRoleUserUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error updateRoleUser')
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Update User role error', errorToast)
            }
        }
    }

    public async deleteUser(id: number) {
        try {
            if (!this.isAuth) return
            const params = {id}
            const response = await $api.get(deleteUserUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error login')
            runInAction(() => (this.users = this.users.filter((user) => user.id !== id)))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Delete User error', errorToast)
            }
        }
    }

    private getGrander(value: boolean) {
        return value ? 'муж.' : 'жен.'
    }

    private getBirth(value: string) {
        const date = new Date(value)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    }

}

export const userService = new UserService()
