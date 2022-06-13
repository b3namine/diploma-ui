import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {ErrorCourse} from "../Modal/courses";
import {DEFAULT_URL} from "../http/interceptors";

const getAllProfessionUrl = DEFAULT_URL + '/api/Profession/getall'

class ProfessionService {
    public profession = []

    constructor() {
        makeAutoObservable(this)
    }

    public async getAllProfession() {
        try {
            const response = await axios.get(getAllProfessionUrl)
            const {success, data} = response.data
            if (!success) return console.log('error get all profession')
            runInAction(() => (this.profession = data))
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

export const professionService = new ProfessionService()
