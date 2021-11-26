import {useState} from "react";

export const useAuth = () => {
    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('userId')))

    const login = (userId) => {
        localStorage.setItem('userId', userId)
        setIsLogin(true)
    }

    const logout = () => {
        localStorage.removeItem('userId')
        setIsLogin(false)
    }
    return {login, logout, isLogin}
}