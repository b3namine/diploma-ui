export type RegistrationData = {
    login: string
    firstName: string
    secondName: string
    email: string
    birthdate: string
    isMan: string
    password: string
}

export type LoginData = {
    login: string
    password: string
}
export type User = {
    login: string
    firstName: string
    secondName: string
    email: string
    birthdate: string
    isMan: string
    id: number
    token: string
}
export type AuthResponse = {
    data: User
    errorMessage: string | null
    status: number
    success: boolean

}
