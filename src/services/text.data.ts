export const homeTest = `Мы создали для вас уникальные сервис, который поможет вам в выборе профессии, программы обучения, вуза и подскажет куда поступить. В результате прохождения теста вы сможете увидеть подходящие вам профессии, программы обучения, вузы, "примерить" на себя разные специальности, понять, куда пойти учиться, чтобы стать успешным и востребованным профессионалом.`
export const results = [
    {
        "name": "Realistic",
        "value": 7,
        "power": "Middle"
    },
    {
        "name": "Investigative",
        "value": 8,
        "power": "High"
    },
    {
        "name": "Artistic",
        "value": 2,
        "power": "Low"
    },
    {
        "name": "Social",
        "value": 3,
        "power": "Low"
    },
    {
        "name": "Enterprising",
        "value": 3,
        "power": "Low"
    },
    {
        "name": "Conventional",
        "value": 7,
        "power": "Middle"
    }
]

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
