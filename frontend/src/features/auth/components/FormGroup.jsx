import React from 'react';
import emailIcon from '../../../assets/email.svg';
import passwordIcon from '../../../assets/password.svg';
import userIcon from '../../../assets/user.svg';

// Icon map
const ICONS = {
    email: emailIcon,
    password: passwordIcon,
    text: userIcon,
};

function FormGroup({ label, type = 'text', ...rest }) {
    const icon = ICONS[type] ?? ICONS.text;

    return (
        <div className='auth-form-group'>
            <label>{label}</label>
            <div className='auth-input-wrap'>
                <span className='auth-input-icon'>
                    <img src={icon} alt='icon' width='16' height='16' />
                </span>
                <input type={type} {...rest} />
            </div>
        </div>
    );
}

export default FormGroup;
