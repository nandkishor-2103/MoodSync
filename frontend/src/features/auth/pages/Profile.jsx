import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../auth.context';
import { updateMe } from '../services/auth.api';
import { validateUsername, validateEmail, validatePassword, validatePasswordMatch } from '../utils/validators.js';
import FormGroup from '../components/FormGroup.jsx';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import '../styles/profile.scss';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        if (!validateUsername(trimmedUsername)) return;
        if (!validateEmail(trimmedEmail)) return;
        if (!validatePassword(password, false)) return; // optional on profile
        if (!validatePasswordMatch(password, confirmPassword)) return;

        const payload = { username: trimmedUsername, email: trimmedEmail };
        if (password) payload.password = password;

        const toastId = toast.loading('Saving your changes…');
        try {
            setLoading(true);
            const data = await updateMe(payload);

            // Sync auth context + localStorage
            const updatedUser = { ...user, ...data.user };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            localStorage.setItem('lastAuthCheck', Date.now().toString());

            setPassword('');
            setConfirmPassword('');

            toast.success('Profile updated successfully! ✅', { id: toastId });
        } catch (err) {
            const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(msg, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const getInitials = name => (name ? name.charAt(0).toUpperCase() : '?');

    return (
        <div className='profile-page'>
            <div className='profile-card'>
                {/* Back Button */}
                <button className='profile-card__back' onClick={() => navigate('/')}>
                    <img src={arrowLeftIcon} alt='' aria-hidden='true' />
                    Back to Home
                </button>

                {/* Avatar */}
                <div className='profile-card__avatar'>
                    <span className='profile-card__avatar-initial'>{getInitials(user?.username)}</span>
                </div>

                <h1 className='profile-card__heading'>My Profile</h1>
                <p className='profile-card__sub'>Update your account information below</p>

                <form onSubmit={handleSubmit} noValidate>
                    {/* ── Account Info ── */}
                    <p className='profile-card__section-label'>Account Info</p>

                    {/* Reuses the shared FormGroup — same icon, same focus styles, same eye toggle for passwords */}
                    <FormGroup
                        id='profile-username'
                        label='Username'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Enter username'
                        autoComplete='off'
                    />

                    <FormGroup
                        id='profile-email'
                        label='Email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Enter email'
                        autoComplete='off'
                    />

                    {/* ── Change Password ── */}
                    <div className='profile-card__divider' />
                    <p className='profile-card__section-label'>Change Password</p>

                    <FormGroup
                        id='profile-password'
                        label='New Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Leave blank to keep current'
                        autoComplete='new-password'
                        hint='Minimum 8 characters'
                    />

                    <FormGroup
                        id='profile-confirm'
                        label='Confirm Password'
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder='Repeat new password'
                        autoComplete='new-password'
                    />

                    <button type='submit' className='profile-save-btn' disabled={loading}>
                        {loading && <span className='profile-save-btn__spinner' aria-hidden='true' />}
                        {loading ? 'Saving…' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
