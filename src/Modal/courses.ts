export type Course = {
    id: number
    departmentId: number
    name: string
    code: string
    info: string
    budgetPlaces: number
    contractPlaces: number
    years: number
    exams: string
    university: University
    department: Department
}

export type University = {
    id: number
    name: string
    contacts: string
    info: string
    departments: Department | null
}

export type Department = {
    id: number
    universityId: number
    name: string
    contacts: string
    info: string
    courses: string[] | null,
    university: string | null
}

export type ErrorCourse = {
    data: null
    errorMessage: string
    status: number
    success: boolean
}
