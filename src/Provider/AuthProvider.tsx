import {createContext, FC, useContext, useEffect, useState} from "react";
import {userService} from "../services/user.service";

interface AuthContextType {
    user: any;
    login: (user: string, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<any> = ({children}) => {
    const {user: defaultUser} = userService
    let [user, setUser] = useState<any>(null);
    useEffect(() => setUser(defaultUser), [defaultUser])
    let login = (newUser: string, callback: VoidFunction) => {
        console.log(newUser)
    };

    let logout = (callback: VoidFunction) => {
        console.log(callback)
    };

    let value = {user, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
