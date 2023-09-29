import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import '../styles/register.css';
import registerImage from '../images/singup.png';

function Register() {
    let name, value;
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        vendor_name: '',
        location_lat: '',
        location_long: '',
        password: '',
        password2: '',
    });
    const handelOnChange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setUser({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            vendor_name: '',
            location_lat: '',
            location_long: '',
            password: '',
            password2: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await register(
            user.first_name,
            user.last_name,
            user.username,
            user.email,
            user.vendor_name,
            user.location_lat,
            user.location_long,
            user.password,
            user.password2
        );
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
            resetForm();
        }
    };
    

    return (
        // <section>
        //     <form onSubmit={handleSubmit}>
        //         <h1>Register</h1>
        //         <hr />
        //         <div>
        //             <label htmlFor="username">Username</label>
        //             <input
        //                 type="text"
        //                 id="username"
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 placeholder="Username"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 placeholder="Password"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="confirm-password">Confirm Password</label>
        //             <input
        //                 type="password"
        //                 id="confirm-password"
        //                 onChange={(e) => setPassword2(e.target.value)}
        //                 placeholder="Confirm Password"
        //                 required
        //             />
        // <p>
        //     {password2 !== password ? 'Passwords do not match' : ''}
        // </p>
        //         </div>
        //         <button type="submit">Register</button>
        //     </form>
        // </section>

        <>
            <div
                className="container-fluid d-flex justify-content-center align-items-center"
                id="register-container"
            >
                <div className="row" id="register-sub-container">
                    <div className="form-container col-md-6 d-flex align-items-center justify-content-center">
                        <form
                            className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
                            noValidate
                            id="register-form"
                        >
                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="form-control"
                                    id="validationCustom01"
                                    value={user.first_name}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control"
                                    id="validationCustom02"
                                    value={user.last_name}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="validationCustom03"
                                    value={user.username}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustomUsername"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <div className="input-group has-validation">
                                    <span
                                        className="input-group-text"
                                        id="inputGroupPrepend"
                                    >
                                        @
                                    </span>
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={handelOnChange}
                                        required
                                        autoComplete="off"
                                    />
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Vender Name:
                                </label>
                                <input
                                    type="text"
                                    name="vendor_name"
                                    className="form-control"
                                    id="validationCustom04"
                                    value={user.vendor_name}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Location-location_lat:
                                </label>
                                <input
                                    type="number"
                                    name="location_lat"
                                    className="form-control"
                                    id="validationCustom05"
                                    value={user.location_lat}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Location-longutitude:
                                </label>
                                <input
                                    type="number"
                                    name="location_long"
                                    className="form-control"
                                    id="validationCustom06"
                                    value={user.location_long}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-10 mt-4">
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
                                    id="validationCustom07"
                                    value={user.password}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-10 mt-4">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label"
                                >
                                    Re-password
                                </label>
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    id="validationCustom08"
                                    value={user.password2}
                                    autoComplete="off"
                                    onChange={handelOnChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <p>
                                {user.password2 !== user.password
                                    ? 'Passwords do not match'
                                    : ''}
                            </p>

                            <div className="col-10">
                                <button
                                    className="btn btn-primary mt-3 mb-4"
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-md-6 d-flex align-items-center justify-content-center"
                        id="register-image-container"
                    >
                        <img
                            src={registerImage}
                            alt="register image"
                            id="register-image"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
