import {useState} from "react";
import {User} from "../Modal/user";

export const useLocalStorage = (keyName: string, defaultValue: User | null) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: User) => {
        try {
            localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};
