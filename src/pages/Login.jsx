import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login, isLoggedIn } = useAuth()
    const navigate = useNavigate()

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/admin')
        }
    }, [isLoggedIn, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 500))

        const result = login(username, password)

        if (result.success) {
            navigate('/admin')
        } else {
            setError(result.error)
        }

        setIsLoading(false)
    }

    return (
        <div className="login-page">
            <div className="glass-card login-card">
                <div className="login-header">
                    <h1>🔧 Panel de Administración</h1>
                    <p>Ingresa tus credenciales para continuar</p>
                </div>

                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="text-center text-muted mt-3" style={{ fontSize: '0.875rem' }}>
                    <a href="/" style={{ color: 'var(--color-primary)' }}>
                        ← Volver al sitio
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
