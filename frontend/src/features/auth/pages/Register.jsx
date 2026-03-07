import React, { useState } from 'react';
import '../styles/auth.scss';
import FormGroup from '../components/FormGroup.jsx';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { toast } from 'react-hot-toast';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loading, handelRegister } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await handelRegister({ username, email, password });
            toast.success('Registered successfully! Please login.');
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
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
                <h1 className='auth-card__heading'>Create account</h1>
                <p className='auth-card__sub'>Join MoodSync and let your mood pick your music</p>

                <div className='auth-card__divider' />

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label='Full Name'
                        type='text'
                        placeholder='Your name'
                        required
                    />
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
                        placeholder='Min. 8 characters'
                        autoComplete='new-password'
                        required
                    />
                    <button type='submit' className='auth-btn' disabled={loading}>
                        {loading && <span className='auth-btn__spinner' />}
                        {loading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <p className='auth-card__footer'>
                    Already have an account?<Link to='/login'>Sign in</Link>
                </p>
            </div>
        </main>
    );
}

export default Register;
