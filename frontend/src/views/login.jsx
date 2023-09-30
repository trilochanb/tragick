import { useEffect, useState } from 'react';
import { login } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/login.css';
import loginImage from '../images/singup.png';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({ username: '', password: '' });
    let name, value;

    const handelOnChange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUser({ username: '', password: '' });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(user.username, user.password);
        const { error } = await login(user.username, user.password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
    };

    return (
        <>
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                id="login-container"
            >
                <div className="row" id="login-sub-container">
                    <div className="form-container col-md-6 d-flex align-items-center justify-content-center">
                        <form
                            className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
                            noValidate
                            id="login-form"
                        >
                            <div className="col-md-10 mt-5">
                                <label
                                    htmlFor="validationCustomUsername"
                                    className="form-label"
                                >
                                    Username
                                </label>
                                <div className="input-group has-validation">
                                    <span
                                        className="input-group-text"
                                        id="inputGroupPrepend"
                                    >
                                        @
                                    </span>
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        id="validationCustomUsername"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        autoComplete="off"
                                        onChange={handelOnChange}
                                        value={user.username}
                                    />
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-10 mt-5">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="validationCustom01"
                                    value={user.password}
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-10">
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-md-6 d-flex align-items-center justify-content-center flex-column"
                        id="login-image-container"
                    >
                        <img
                            src={loginImage}
                            alt="login image"
                            id="login-image"
                        />
                        <Link to={'/register'}>Don't have account</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
