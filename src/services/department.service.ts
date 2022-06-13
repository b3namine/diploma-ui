import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {Department, ErrorCourse} from "../Modal/courses";
import {DEFAULT_URL} from "../http/interceptors";

const getDepartmentsUrl = DEFAULT_URL + '/api/Department/getall'
const getDepartmentByIdUrl = DEFAULT_URL + '/api/Department/get'

class DepartmentService {
    public loading = false
    public departments: Department[] = []
    public department: Department | null = null

    constructor() {
        makeAutoObservable(this)
    }

    public async getDepartments(universityIdFilter: number, nameFilter?: string) {
        try {
            this.loading = true
            const params = {
                universityIdFilter,
                nameFilter
            }
            const response = await axios.get(getDepartmentsUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Departments')
            runInAction(() => (this.departments = data))
            console.log(data)
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

    public async getDepartmentById(id: number) {
        try {
            this.loading = true
            const params = {id}
            runInAction(() => (this.department = null))
            const response = await axios.get(getDepartmentByIdUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Department by id')
            runInAction(() => (this.department = data))
            console.log(data)
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

export const departmentService = new DepartmentService()
