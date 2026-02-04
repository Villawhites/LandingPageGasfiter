import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const authStatus = sessionStorage.getItem('gasfiter_auth')
        if (authStatus === 'true') {
            setIsLoggedIn(true)
        }
        setIsLoading(false)
    }, [])

    const login = (username, password) => {
        // Simple authentication
        if (username === 'admin' && password === 'admin1234') {
            sessionStorage.setItem('gasfiter_auth', 'true')
            setIsLoggedIn(true)
            return { success: true }
        }
        return { success: false, error: 'Usuario o contraseña incorrectos' }
    }

    const logout = () => {
        sessionStorage.removeItem('gasfiter_auth')
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
