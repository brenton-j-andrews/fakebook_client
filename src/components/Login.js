import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

const LOGIN_URL_ENDPOINT = 'http://localhost:3000/login';

const Login = () => {

    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errorRef = useRef();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');

    // Replace this with redirect to user profile page in a bit!
    const [ success, setSuccess ] = useState(false);

    // Focus on user input on form.
    useEffect(() => { 
        userRef.current.focus();
    }, []);

    // Clear error messages on any form changes.
    useEffect(() => {
        setErrorMessage('');
    }, [ email, password ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL_ENDPOINT,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type' : 'application/json', mode:'cors' },
                    withCredentials: false
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data.roles;
            setAuth({ user: email, password, roles, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);
            navigate('/user/profile');
        }

        catch (error) {
            setErrorMessage("Short message for now: " + error.response);
            errorRef.current.focus();
        }
    }
 
    return (
        <>
            {success ? (
                <section> Logged in dude. </section>
            ) : (

            <section>
                <p ref={errorRef} className={ errorMessage ? 'errmsg' : 'offscreen' } aria-live="assertive">
                    {errorMessage}
                </p>

                <h1> Sign In </h1>

                <form onSubmit={handleSubmit}>

                    <label htmlFor='username'> Username: </label>

                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor='password'> Password: </label>

                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button> Sign In </button>

                    <p>
                        Need an Account? <br />
                        <a href="/sign-up"> Sign Up </a>
                    </p>

                </form>

            </section>
            )}
        </>
    )
}

export default Login;