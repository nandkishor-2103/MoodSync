import React, { useState } from 'react';
import '../styles/auth.scss';
import FormGroup from '../components/FormGroup.jsx';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { toast } from 'react-hot-toast';

function Login() {
    const { loading, handelLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handelSubmit(e) {
        e.preventDefault();
        try {
            await handelLogin({ email, password });
            toast.success('Login successfully!');
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <main className='auth-page'>
            <div className='auth-card'>
                {/* Brand */}
                <div className='auth-card__brand'>
                    <img src='/logo.svg' alt='MoodSync Logo' width='36' height='36' />
                    <span className='auth-card__logo-text'>
                        Mood<span>Sync</span>
                    </span>
                </div>

                {/* Heading */}
                <h1 className='auth-card__heading'>Welcome back</h1>
                <p className='auth-card__sub'>Sign in to continue to your mood-based music</p>

                <div className='auth-card__divider' />

                {/* Form */}
                <form onSubmit={handelSubmit}>
                    <FormGroup
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label='Email'
                        type='email'
                        placeholder='you@example.com'
                        autoComplete='email'
                        required
                    />
                    <FormGroup
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        type='password'
                        placeholder='••••••••'
                        autoComplete='current-password'
                        required
                    />
                    <button type='submit' className='auth-btn' disabled={loading}>
                        {loading && <span className='auth-btn__spinner' />}
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p className='auth-card__footer'>
                    Don't have an account?<Link to='/register'>Create one</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;
