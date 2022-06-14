export type Profession = {
    name: string
    profType: number
}

export interface ProfessionItem extends Profession{
    id: number
    coursesAmount: number
}
