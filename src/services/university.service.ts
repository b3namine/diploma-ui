import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {ErrorCourse, UniversityWithDepartment} from "../Modal/courses";
import {DEFAULT_URL} from "../http/interceptors";

const getUniversitiesUrl = DEFAULT_URL + '/api/University/getall'
const getUniversityUrl = DEFAULT_URL + '/api/University/get'

class UniversityService {
    public loading = false
    public universities: UniversityWithDepartment[] = []
    public university: UniversityWithDepartment | null = null

    constructor() {
        makeAutoObservable(this)
    }

    public async getUniversities(nameFilter?: string) {
        try {
            this.loading = true
            const params = {nameFilter}
            runInAction(() => (this.universities = []))
            const response = await axios.get(getUniversitiesUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Universities')
            runInAction(() => (this.universities = data))
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

    public async getUniversityById(id: number) {
        try {
            this.loading = true
            const params = {id}
            runInAction(() => (this.university = null))
            const response = await axios.get(getUniversityUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get University By Id')
            runInAction(() => (this.university = data))
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
}

export const universityService = new UniversityService()
