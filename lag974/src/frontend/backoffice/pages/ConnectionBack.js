import React, { useState } from 'react';
import axios from 'axios';
import '../styles/loginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:7000/auth/login', { username, password });

            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la connexion. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form className='connectForm' onSubmit={handleSubmit}>
                <h2>Connexion</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <label>username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Mot de passe</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Masquer' : 'Afficher'}
                    </button>
                </div>

                <button className='normalBtn' type="submit" disabled={loading}>
                    {loading ? 'Chargement...' : 'Se connecter'}
                </button>

                <div className="forgot-password">
                    <a href="/forgot-password">Mot de passe oublié?</a>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
