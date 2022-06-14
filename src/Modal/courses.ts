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
    courses: Course[] | null,
    university: University | null
}

export type ErrorCourse = {
    data: null
    errorMessage: string
    status: number
    success: boolean
}

export type UniversityWithDepartment = {
    id: number
    name: string
    contacts: string
    info: string
    departments: Department[]
}

export type CourseData = {
    departmentId: number
    name: string
    code: string
    info: string
    budgetPlaces: number
    contractPlaces: number
    years: number
    exams: string
    professionIds: number[]
}
