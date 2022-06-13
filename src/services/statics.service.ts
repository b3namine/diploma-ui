import {makeAutoObservable} from "mobx";
import axios, {AxiosError} from "axios";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {ErrorCourse} from "../Modal/courses";

class StaticsService {
    constructor() {
        makeAutoObservable(this)
    }

    public async getAllResult() {
        try {
            const response = await $api.post(DEFAULT_URL + '/api/UserResult/statistic')
            const {success, data} = response.data
            if (!success) return console.log('error getAllResult')
            console.log(data)
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                const error = errors.response?.data as ErrorCourse
                console.log(error.errorMessage)
            }
        }
    }
}

export const staticsService = new StaticsService()
