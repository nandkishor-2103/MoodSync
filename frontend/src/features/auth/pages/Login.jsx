import React, {useState} from 'react';
import "../styles/login.scss"
import FormGroup from "../components/FormGroup.jsx";
import {Link} from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import {useNavigate} from "react-router";


function Login() {

    const {loading, handelLogin} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handelSubmit(e) {
        e.preventDefault();
        await handelLogin({email, password});

        setEmail("");
        setPassword("");
        navigate("/");
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handelSubmit}>
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    );
}

export default Login;