import { useState } from 'react';
import emailIcon from '../../../assets/email.svg';
import passwordIcon from '../../../assets/password.svg';
import userIcon from '../../../assets/user.svg';
import eyeIcon from '../../../assets/eye.svg';
import eyeOffIcon from '../../../assets/eye-off.svg';

// Icon map
const ICONS = {
    email: emailIcon,
    password: passwordIcon,
    text: userIcon,
};

function FormGroup({ label, type = 'text', hint, id, ...rest }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const icon = ICONS[type] ?? ICONS.text;
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className='auth-form-group'>
            <label htmlFor={id}>{label}</label>
            <div className='auth-input-wrap'>
                <span className='auth-input-icon'>
                    <img src={icon} alt='icon' width='16' height='16' />
                </span>
                <input id={id} type={inputType} {...rest} />
                {isPassword && (
                    <button
                        type='button'
                        className='auth-eye-btn'
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}>
                        <img
                            src={showPassword ? eyeOffIcon : eyeIcon}
                            alt={showPassword ? 'Hide' : 'Show'}
                            width='16'
                            height='16'
                        />
                    </button>
                )}
            </div>
            {hint && <span className='auth-form-hint'>{hint}</span>}
        </div>
    );
}

export default FormGroup;
