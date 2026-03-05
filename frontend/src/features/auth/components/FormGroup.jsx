import React from 'react';

function FormGroup({label, ...rest}) {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <input {...rest}/>
        </div>
    );
}

export default FormGroup;