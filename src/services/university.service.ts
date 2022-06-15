import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {ErrorCourse, UniversityWithDepartment} from "../Modal/courses";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {University} from "../Modal/University";
import {userService} from "./user.service";
import {toast} from "react-toastify";
import {errorToast} from "./text.data";

const getUniversitiesUrl = DEFAULT_URL + '/api/University/getall'
const getUniversityUrl = DEFAULT_URL + '/api/University/get'


const getUniversityByUserUrl = DEFAULT_URL + '/api/University/get-by-user'
const createUniversityUrl = DEFAULT_URL + '/api/University/create'
const updateUniversityUrl = DEFAULT_URL + '/api/University/update'
const deleteUniversityUrl = DEFAULT_URL + '/api/University/delete'

class UniversityService {
    public loading = false
    public universities: UniversityWithDepartment[] = []
    public university: UniversityWithDepartment | null = null
    public managerUniversity: UniversityWithDepartment | null = null

    constructor() {
        makeAutoObservable(this)
    }

    public async getUniversities(nameFilter?: string) {
        try {
            this.loading = true
            const params = {nameFilter}
            runInAction(() => (this.universities = []))
            const response = await $api.get(getUniversitiesUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Universities')
            runInAction(() => (this.universities = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get Universities error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async getUniversityById(id: number) {
        try {
            this.loading = true
            const params = {id}
            runInAction(() => (this.university = null))
            const response = await $api.get(getUniversityUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get University By Id')
            runInAction(() => (this.university = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get Universities error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async getUniversityByUserId(userId: number) {
        try {
            const params = {userId}
            const response = await $api.get(getUniversityByUserUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error getUniversityByUserId')
            runInAction(() => (this.managerUniversity = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get University error', errorToast)
            }
        }
    }

    public async createUniversity(university: University) {
        try {
            const params = {...university, userId: userService.user?.id}
            const response = await $api.post(createUniversityUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error createUniversity')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Create University error', errorToast)
            }
        }
    }

    public async updateUniversity(university: University) {
        try {
            const params = {...university}
            const response = await $api.post(updateUniversityUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error createUniversity')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Update University error', errorToast)
            }
        }
    }

    public async deleteUniversity(id: number) {
        try {
            const params = {id}
            const response = await $api.get(deleteUniversityUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error get University By Id')
            runInAction(() => (this.universities = this.universities.filter((university) => university.id !== id)))
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Delete University error', errorToast)
            }
        }
    }

}

export const universityService = new UniversityService()
