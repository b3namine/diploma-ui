import axios from "axios";
import {makeAutoObservable, runInAction} from "mobx";
import {Question, ResultTest, SelectedResponse} from "../Modal/test";
import {DEFAULT_URL} from "../http/interceptors";

const getQuestionUrl = DEFAULT_URL + '/api/Question/getAll'
const generateResultUrl = DEFAULT_URL + '/api/UserResult/generate'

class TestService {
    public loading = false
    public ResultLoading = false
    public questions: Question[] = []
    public selectedResponse: SelectedResponse = {}
    public resultTest: ResultTest | null = {
        "id": null,
        "user": null,
        "date": "2022-06-11T13:55:47.5052956Z",
        "results": [
            {
                "name": "Realistic",
                "value": 5,
                "power": "Middle"
            },
            {
                "name": "Investigative",
                "value": 5,
                "power": "Middle"
            },
            {
                "name": "Artistic",
                "value": 6,
                "power": "Middle"
            },
            {
                "name": "Social",
                "value": 5,
                "power": "Middle"
            },
            {
                "name": "Enterprising",
                "value": 5,
                "power": "Middle"
            },
            {
                "name": "Conventional",
                "value": 8,
                "power": "Low"
            }
        ],
        "professionalType": {
            "name": "Артистический",
            "description": "Люди этого типа оригинальны, независимы в принятии решений, редко ориентируются на социальные нормы и одобрение, обладают необычным взглядом на жизнь, гибкостью мышления, эмоциональной чувствительностью. Отношения с людьми строят, опираясь на свои ощущения, эмоции, воображение, интуицию. Они не выносят жесткой регламентации, предпочитая свободный график работы. Часто выбирают профессии, связанные с литературой, театром, кино, музыкой, изобразительным искусством. \n"
        },
        "professions": [
            {
                "id": 33,
                "name": "Кинооператор",
                "profType": 7,
                "coursesAmount": 12
            },
            {
                "id": 36,
                "name": "Дизайнер компьютерных программ",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 39,
                "name": "Дрессировщик",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 42,
                "name": "Ландшафтный дизайнер",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 45,
                "name": "Режиссер театра и кино",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 48,
                "name": "Хореограф",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 51,
                "name": "Музыкант",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 54,
                "name": "Актер театра и кино",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 57,
                "name": "Художественный редактор",
                "profType": 3,
                "coursesAmount": 0
            },
            {
                "id": 60,
                "name": "Литературный переводчик",
                "profType": 3,
                "coursesAmount": 0
            }
        ]
    }


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
