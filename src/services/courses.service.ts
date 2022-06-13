import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {Course, ErrorCourse} from "../Modal/courses";
import {emptyCourse} from "./text.data";
import {DEFAULT_URL} from "../http/interceptors";

const getCoursesByProfessionUrl = DEFAULT_URL + '/api/Course/get-by-profession'
const getCourseUrl = DEFAULT_URL + '/api/Course/get'
const getCoursesUrl = DEFAULT_URL + '/api/Course/getall'

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
            const response = await axios.post(`${getCoursesByProfessionUrl}?professionId=${professionId}`)
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.courses = data))
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

    public async getCourse(courseId: number) {
        try {
            this.loadingCourse = true
            runInAction(() => (this.course = emptyCourse))
            const params = {id: courseId}
            const response = await axios.get(getCourseUrl, {params})
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.course = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                console.log(error.errorMessage)
            }
        } finally {
            this.loadingCourse = false
        }
    }

    public async getCourses(departmentIdFilter: number, nameFilter?: string, codeFilter?: string) {
        try {
            this.loading = true
            const params = {departmentIdFilter, nameFilter, codeFilter}
            const response = await axios.get(getCoursesUrl, {params})
            const {success, data} = response.data
            if (!success) {
                return console.log('error get Courses By Profession ')
            }
            runInAction(() => (this.courses = data))
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

export const coursesService = new CoursesService()
