import {makeAutoObservable, runInAction} from "mobx";
import {Question, ResultTest, SelectedResponse, Statics} from "../Modal/test";
import $api, {DEFAULT_URL} from "../http/interceptors";
import {ResultFilter} from "../Modal/user";

const getQuestionUrl = DEFAULT_URL + '/api/Question/getAll'


const getResultUrl = DEFAULT_URL + '/api/UserResult/get'
const getAllResultUrl = DEFAULT_URL + '/api/UserResult/getall'
const getStaticsUrl = DEFAULT_URL + '/api/UserResult/statistic'
const generateResultUrl = DEFAULT_URL + '/api/UserResult/generate'
const deleteResultUrl = DEFAULT_URL + '/api/UserResult/delete'


class TestService {
    public loading = false
    public ResultLoading = false
    public questions: Question[] = []
    public selectedResponse: SelectedResponse = {}
    public resultTest: ResultTest | null = null
    public allResult: ResultTest[] = []

    public statics: Statics | null = null
    public loadingStatics = false
    constructor() {
        makeAutoObservable(this)
    }

    public async getQuestions() {
        try {
            if (this.questions.length) return
            this.loading = true
            const response = await $api.get(getQuestionUrl)
            const {data, success} = response.data
            if (!success) return console.log('error get questions')
            runInAction(() => (this.questions = data))
        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false
        }
    }

    public async generateResult() {
        try {
            if (Object.keys(this.selectedResponse).length < 30) return
            this.ResultLoading = true
            const params = Object.values(this.selectedResponse)
            const response = await $api.post(generateResultUrl, params)
            const {data, success} = response.data
            if (!success) return console.log('error get questions')
            runInAction(() => (this.resultTest = data))
            return true
        } catch (error) {
            console.log(error)
        } finally {
            this.ResultLoading = false
        }
    }

    public async getResult(id?: number) {
        try {
            const params = {id}
            const response = await $api.get(getResultUrl, {params})
            const {data, success} = response.data
            if (!success) return console.log('error get questions')
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    public async getAllResult(filter?: ResultFilter) {
        try {
            const params = {...filter}
            const response = await $api.post(getAllResultUrl, params)
            const {data, success} = response.data
            if (!success) return console.log('error getAllResultUrl')
            runInAction(() => (this.allResult = data))
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    public async getStatics(filter?: ResultFilter) {
        try {
            this.loading = true
            const params = {...filter}
            const response = await $api.post(getStaticsUrl, params)
            const {data, success} = response.data
            if (!success) return console.log('error getStatics')
            runInAction(()=>(this.statics = data))
        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false
        }
    }

    public async deleteResult(id?: number) {
        try {
            const params = {id}
            const response = await $api.get(deleteResultUrl, {params})
            const {data, success} = response.data
            if (!success) return console.log('error deleteResult')
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    public setResponse(newResponse: SelectedResponse) {
        runInAction(() => (this.selectedResponse = {...this.selectedResponse, ...newResponse}))
    }

}

export const testService = new TestService()
