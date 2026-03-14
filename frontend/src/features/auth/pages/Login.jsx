import { useState } from 'react';
import '../styles/auth.scss';
import FormGroup from '../components/FormGroup.jsx';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { toast } from 'react-hot-toast';

function Login() {
    const { loading, handelLogin } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handelSubmit(e) {
        e.preventDefault();

        if (!identifier.trim()) {
            toast.error('Please enter your email or username.');
            return;
        }
        if (!password) {
            toast.error('Please enter your password.');
            return;
        }

        const toastId = toast.loading('Signing you in…');
        try {
            await handelLogin({ 
                email: identifier.trim(), 
                username: identifier.trim(), 
                password 
            });
            toast.success('Welcome back! 🎵', { id: toastId });
            setIdentifier('');
            setPassword('');
            navigate('/');
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(msg, { id: toastId });
        }
    }

    return (
        <main className='auth-page'>
            <div className='auth-card'>
                <div className='auth-card__brand'>
                    <img src='/logo.svg' alt='MoodSync Logo' width='36' height='36' />
                    <span className='auth-card__logo-text'>
                        Mood<span>Sync</span>
                    </span>
                </div>

                <h1 className='auth-card__heading'>Welcome back</h1>
                <p className='auth-card__sub'>Sign in to continue to your mood-based music</p>

                <div className='auth-card__divider' />

                <form onSubmit={handelSubmit} noValidate>
                    <FormGroup
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                        label='Email or Username'
                        type='text'
                        placeholder='Enter your email or username'
                        autoComplete='off'
                        id='login-identifier'
                    />
                    <FormGroup
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        autoComplete='current-password'
                        id='login-password'
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
