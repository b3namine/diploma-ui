export type Question = {
    id: number,
    number: number,
    professions: Profession[]
}
export type Profession = {
    coursesAmount: number
    id: number
    name: string
    profType: number
}

export type SelectedResponse = { [key: number]: number }

export type ResultTest = {
    date: string
    id: number | null
    professionalType: ProfessionalType
    professions: Profession[]
    results: Result[]
    user: null
}
export type Result = {
    name: string
    value: number
    power: string
}
export type ProfessionalType = {
    description: string
    name: string
}
