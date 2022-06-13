import {makeAutoObservable, runInAction} from "mobx";
import {LoginData, RegistrationData, User} from "../Modal/user";
import axios, {AxiosError} from "axios";
import {ErrorCourse} from "../Modal/courses";
import {DEFAULT_URL} from "../http/interceptors";

const loginUrl = DEFAULT_URL + '/api/Authentication/autorisation'
const registrationUrl = DEFAULT_URL + '/api/Authentication/registration'

class UserService {
    public isAuth = false
    public user: User | null = null
    public loading = false

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
                this.user = data
            })
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

    public async login(params: LoginData) {
        try {
            if (this.isAuth) return
            this.loading = true
            const response = await axios.post(loginUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error login')
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            runInAction(() => {
                this.isAuth = true
                this.user = {...data, birthdate: this.getBirth(data.birthdate), isMan: this.getGrander(data.isMan)}
            })
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
            if (!token || !user) return
            runInAction(() => {
                this.isAuth = true
                const USER = JSON.parse(user)
                this.user = {...USER, birthdate: this.getBirth(USER.birthdate), isMan: this.getGrander(USER.isMan)}
            })
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

    private getGrander(value: boolean) {
        return value ? 'муж.' : 'жен.'
    }

    private getBirth(value: string) {
        const date = new Date(value)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    }

}

export const userService = new UserService()
