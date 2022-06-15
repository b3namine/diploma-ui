import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {Department, ErrorCourse} from "../Modal/courses";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {Departments} from "../Modal/departments";
import {toast} from "react-toastify";
import {errorToast} from "./text.data";

const getDepartmentsUrl = DEFAULT_URL + '/api/Department/getall'
const getDepartmentByIdUrl = DEFAULT_URL + '/api/Department/get'

const createDepartmentByIdUrl = DEFAULT_URL + '/api/Department/create'
const updateDepartmentByIdUrl = DEFAULT_URL + '/api/Department/update'
const deleteDepartmentByIdUrl = DEFAULT_URL + '/api/Department/delete'


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
            const response = await $api.get(getDepartmentsUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Departments')
            runInAction(() => (this.departments = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get department error', errorToast)
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
            const response = await $api.get(getDepartmentByIdUrl, {params})
            const {success, data} = response.data
            if (!success) return console.log('error get Department by id')
            runInAction(() => (this.department = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get department error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async createDepartments(departments: Departments) {
        try {
            const params = {...departments}
            const response = await $api.post(createDepartmentByIdUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error createDepartments')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Create department error', errorToast)
            }
        }
    }

    public async updateDepartments(departments: Departments) {
        try {
            const params = {...departments}
            const response = await $api.post(updateDepartmentByIdUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error updateDepartments')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Update department error', errorToast)
            }
        }
    }

    public async deleteDepartments(id: number) {
        try {
            const params = {id}
            const response = await $api.get(deleteDepartmentByIdUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error deleteDepartments')
            runInAction(() => (this.departments = this.departments.filter((department) => department.id !== id)))
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Delete department error', errorToast)
            }
        }
    }

    public clearDepartments() {
        runInAction(() => {
            this.departments = []
        })
    }
}

export const departmentService = new DepartmentService()
