export const useAuth = () => {


    const login = (userId) => {
        localStorage.setItem('userId', userId)
    }

    const logout = () => {
        localStorage.removeItem('userId')
    }
    return {login, logout}
}