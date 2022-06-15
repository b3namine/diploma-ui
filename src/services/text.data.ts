import {ToastOptions} from "react-toastify/dist/types";

export const homeTest = `Мы создали для вас уникальные сервис, который поможет вам в выборе профессии, программы обучения, вуза и подскажет куда поступить. В результате прохождения теста вы сможете увидеть подходящие вам профессии, программы обучения, вузы, "примерить" на себя разные специальности, понять, куда пойти учиться, чтобы стать успешным и востребованным профессионалом.`

export const emptyUniversity = {
    id: 0,
    name: '',
    contacts: '',
    info: '',
    departments: null
}

export const emptyDepartment = {
    id: 0,
    universityId: 0,
    name: '',
    contacts: '',
    info: '',
    courses: null,
    university: null
}
export const emptyCourse = {
    id: 0,
    departmentId: 0,
    name: '',
    code: '',
    info: '',
    budgetPlaces: 0,
    contractPlaces: 0,
    years: 0,
    exams: '',
    university: emptyUniversity,
    department: emptyDepartment
}

export const ResultText: any = {
    Realistic: 'Реалистичный',
    Investigative: 'Интеллектуальный',
    Artistic: 'Артистический',
    Social: 'Социальный',
    Enterprising: 'Офисный',
    Conventional: 'Предпринимательский'
}

export const emptyUser = {
    id: 0,
    login: '',
    firstName: '',
    secondName: '',
    email: '',
    birthdate: '',
    isMan: '',
    password: ''
}
export const genders = [{id: 1, name: 'Male'}, {id: 2, name: 'Female'}]
export const roles = [{id: 2, name: 'user'}, {id: 1, name: 'admin'}, {id: 3, name: 'manager'}]
export const errorToast: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}
