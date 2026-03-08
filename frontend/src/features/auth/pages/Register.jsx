import { useState } from 'react';
import '../styles/auth.scss';
import FormGroup from '../components/FormGroup.jsx';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { toast } from 'react-hot-toast';
import { validateUsername, validateEmail, validatePassword } from '../utils/validators.js';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loading, handelRegister } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        if (!validateUsername(trimmedUsername)) return;
        if (!validateEmail(trimmedEmail)) return;
        if (!validatePassword(password)) return;

        const toastId = toast.loading('Creating your account…');
        try {
            await handelRegister({ username: trimmedUsername, email: trimmedEmail, password });
            toast.success('Account created! Please sign in. 🎉', { id: toastId });
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (error) {
            const msg = error.response?.data?.message || 'Registration failed. Please try again.';
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

                <h1 className='auth-card__heading'>Create account</h1>
                <p className='auth-card__sub'>Join MoodSync and let your mood pick your music</p>

                <div className='auth-card__divider' />

                <form onSubmit={handleSubmit} noValidate>
                    <FormGroup
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label='Username'
                        type='text'
                        placeholder='Choose a username'
                        autoComplete='off'
                        id='register-username'
                    />
                    <FormGroup
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label='Email'
                        type='email'
                        placeholder='you@example.com'
                        autoComplete='off'
                        id='register-email'
                    />
                    <FormGroup
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        type='password'
                        placeholder='Min. 8 characters'
                        autoComplete='new-password'
                        id='register-password'
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
