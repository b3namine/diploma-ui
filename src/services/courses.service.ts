import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {Course, CourseData, ErrorCourse} from "../Modal/courses";
import {emptyCourse, errorToast} from "./text.data";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {toast} from 'react-toastify'

const getCoursesByProfessionUrl = DEFAULT_URL + '/api/Course/get-by-profession'
const getCourseUrl = DEFAULT_URL + '/api/Course/get'
const getCoursesUrl = DEFAULT_URL + '/api/Course/getall'

const createCourseUrl = DEFAULT_URL + '/api/Course/create'
const updateCourseUrl = DEFAULT_URL + '/api/Course/update'
const deleteCourseUrl = DEFAULT_URL + '/api/Course/delete'


class CoursesService {
    public loading = false
    public loadingCourse = false
    public courses: Course[] = []
    public course: Course = emptyCourse

    constructor() {
        makeAutoObservable(this)
    }

    public async getCoursesByProfession(professionId: number) {
        try {
            this.loading = true
            runInAction(() => (this.courses = []))
            const response = await $api.post(`${getCoursesByProfessionUrl}?professionId=${professionId}`)
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.courses = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get course error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async getCourse(courseId: number) {
        try {
            this.loadingCourse = true
            runInAction(() => (this.course = emptyCourse))
            const params = {id: courseId}
            const response = await $api.get(getCourseUrl, {params})
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.course = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get course error', errorToast)
            }
        } finally {
            this.loadingCourse = false
        }
    }

    public async getCourses(departmentIdFilter: number, nameFilter?: string, codeFilter?: string) {
        try {
            this.loading = true
            const params = {departmentIdFilter, nameFilter, codeFilter}
            const response = await $api.get(getCoursesUrl, {params})
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.courses = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('Get courses error', errorToast)
            }
        } finally {
            this.loading = false
        }
    }

    public async createCourse(course: CourseData) {
        try {
            const params = {...course}
            const response = await $api.post(createCourseUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error create Course ')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('Create course error', errorToast)
            }
        }
    }

    public async updateCourse(course: CourseData) {
        try {
            const params = {...course}
            const response = await $api.post(updateCourseUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error get Courses By Profession ')
            return data.id
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('Update course error', errorToast)
            }
        }
    }

    public async deleteCourse(id: number) {
        try {
            const params = {id}
            const response = await $api.get(deleteCourseUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error deleteCourse')
            runInAction(() => (this.courses = this.courses.filter((course) => course.id !== id)))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                toast.error('Delete course error', errorToast)
            }
        }
    }

    public clearCourses() {
        runInAction(() => {
            this.courses = []
        })
    }

}

export const coursesService = new CoursesService()
