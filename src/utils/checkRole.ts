import {Role} from "../Modal/user";

export const onlyAdmins = (role: Role | undefined) => role === 'admin'
export const onlyAdminsManagers = (role: Role | undefined) => onlyAdmins(role) || role === 'manager'
export const onlyAuthUser = (role: Role | undefined) => role === 'user' || onlyAdminsManagers(role)
