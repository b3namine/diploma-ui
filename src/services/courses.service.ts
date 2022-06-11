import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {Course, ErrorCourse} from "../Modal/courses";
import {emptyCourse} from "./text.data";

const host = 'http://localhost:5000'
const getCoursesByProfessionUrl = host + '/api/Course/get-by-profession'
const getCourseUrl = host + '/api/Course/get'

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

}

export const coursesService = new CoursesService()
