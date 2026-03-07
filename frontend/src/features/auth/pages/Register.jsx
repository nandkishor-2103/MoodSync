import React, { useState } from 'react';
import '../styles/register.scss';
import FormGroup from '../components/FormGroup.jsx';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { loading, handelRegister } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        await handelRegister({ username, email, password });

        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/');
    }

    return (
        <main className='register-page'>
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label='Name'
                        type='text'
                        placeholder='Enter your name'
                        required
                    />
                    <FormGroup
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label='Email'
                        type='email'
                        placeholder='Enter your email'
                        autoComplete='email'
                        required
                    />
                    <FormGroup
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label='Password'
                        type='password'
                        placeholder='Enter your password'
                        autoComplete='new-password'
                        required
                    />
                    <button type='submit' className='btn btn-register'>
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? <Link to='/login'>Login here</Link>{' '}
                </p>
            </div>
        </main>
    );
}

export default Register;
