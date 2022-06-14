export type CourseFormProps = {
    onSave: (values: any) => void
    data?: any
    departmentId?: number
    title: string
}

export type Data = {
    id?: number
    departmentId?: number
    name: string
    code: string
    info: string
    budgetPlaces: number
    contractPlaces: number
    years: number
    exams: string
    professionIds: number[]
}
