export interface RegistrationData extends User {
    password: string
}

export type Role = 'admin' | 'user' | 'manager'
export type LoginData = {
    login: string
    password: string
}

export interface AuthData extends User {
    id: number
    token: string
    roleId: number
    roleName: Role
}

export type AuthResponse = {
    data: AuthData
    errorMessage: string | null
    status: number
    success: boolean
}

export interface User {
    login: string
    firstName: string
    secondName: string
    email: string
    birthdate: string
    isMan: string
}


export interface UserUpdate extends User {
    password: string
    id: number
    role?: string
}


export interface UserRole {
    id: number
    role: Role
}

export interface ResultFilter {
    gender: number
    loginFilter: string
    ageMin: number
    ageMax: number
    dataMin: string
    dataMax: string
    actual: boolean
}

export interface Users extends User, UserRole {
}

export type UserFilter = {
    firstNameFilter: string
    secondNameFilter: string
    gender: number | null
    loginFilter: string
    emailFilter: string
    ageMin: number | null
    ageMax: number | null
    role: string
}
