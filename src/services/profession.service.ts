import {makeAutoObservable, runInAction} from "mobx";
import axios, {AxiosError} from "axios";
import {ErrorCourse} from "../Modal/courses";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {Profession, ProfessionItem} from "../Modal/Profession";
import {toast} from "react-toastify";
import {errorToast} from "./text.data";

const getAllProfessionUrl = DEFAULT_URL + '/api/Profession/getall'
const createProfessionUrl = DEFAULT_URL + '/api/Profession/create'
const deleteProfessionUrl = DEFAULT_URL + '/api/Profession/delete'


class ProfessionService {
    public professions: ProfessionItem[] = []

    constructor() {
        makeAutoObservable(this)
    }

    public async getAllProfession() {
        try {
            const response = await $api.get(getAllProfessionUrl)
            const {success, data} = response.data
            if (!success) return console.log('error get all profession')
            runInAction(() => (this.professions = data))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Get profession error', errorToast)
            }
        }
    }

    public async createProfession(profession: Profession) {
        try {
            const params = {...profession, profType: Number(profession.profType)}
            const response = await $api.post(createProfessionUrl, params)
            const {success, data} = response.data
            if (!success) return console.log('error createProfession')
            runInAction(() => (this.professions = [data, ...this.professions]))
            return true
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Create profession error', errorToast)
            }
        }
    }

    public async deleteProfession(id: number) {
        try {
            const params = {id}
            const response = await $api.get(deleteProfessionUrl, {params})
            const {success} = response.data
            if (!success) return console.log('error get all profession')
            runInAction(() => (this.professions = this.professions.filter((profession) => profession.id !== id)))
        } catch (err) {
            const errors = err as Error | AxiosError;
            if (axios.isAxiosError(errors)) {
                toast.error('Delete profession error', errorToast)
            }
        }
    }
}

export const professionService = new ProfessionService()
