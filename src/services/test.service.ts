import axios from "axios";
import {makeAutoObservable, runInAction} from "mobx";
import {Question, ResultTest, SelectedResponse} from "../Modal/test";

const host = 'http://localhost:5000'
const getQuestionUrl = host + '/api/Question/getAll'
const generateResultUrl = host + '/api/UserResult/generate'

class TestService {
    public loading = false
    public ResultLoading = false
    public questions: Question[] = []
    public selectedResponse: SelectedResponse = {}
    public resultTest: ResultTest | null = null


    constructor() {
        makeAutoObservable(this)
    }

    public async getQuestions() {
        try {
            if (this.questions.length) return
            this.loading = true
            const response = await axios.get(getQuestionUrl)
            const {data, success} = response.data
            if (!success) return console.log('error get questions')
            runInAction(() => (this.questions = data))
        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false
        }
    }

    public setResponse(newResponse: SelectedResponse) {
        runInAction(() => (this.selectedResponse = {...this.selectedResponse, ...newResponse}))
    }

    public async generateResult() {
        try {
            if (Object.keys(this.selectedResponse).length < 30) return
            this.ResultLoading = true
            const params = Object.values(this.selectedResponse)
            const response = await axios.post(generateResultUrl, params)
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
}

export const testService = new TestService()
