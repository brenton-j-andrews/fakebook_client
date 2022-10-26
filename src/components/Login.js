import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

// Bootstrap Components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LOGIN_URL_ENDPOINT = 'http://localhost:3000/login';

const Login = () => {

    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errorRef = useRef();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');


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
            navigate('/user/profile');
        }

        catch (error) {
            console.log(error.response.data);
            if (!error?.response) {
                setErrorMessage("There is an issue on our part, try again later.");
            }

            setErrorMessage("Error: " + error.message);
            errorRef.current.focus();
        }
    }
 
    return (
        <section className="d-flex flex-column align-items-center border border-dark rounded p-2">

            <p ref={errorRef} className={ errorMessage ? 'errmsg' : 'offscreen' } aria-live="assertive">
                {errorMessage}
            </p>

            <h1> Fakebook </h1>

            <Form className="d-flex flex-column credential-form mt-3" 
            onSubmit={handleSubmit}
            >
                <Form.Group>
                    <Form.Label> Email: </Form.Label>
                    <Form.Control 
                        className="border-top mb-2"
                        type="text"
                        id="email"
                        ref={userRef}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        value={email}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Password: </Form.Label>
                    <Form.Control 
                        className="mb-2"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </Form.Group>

                <Button 
                    className="align-self-center container-fluid mt-3 mb-3" 
                    ariant="primary" 
                    type="submit"
                > 
                    Log In    
                </Button>
            </Form>

            <div className="d-flex flex-column align-items-center mt-5">
                <p className="m-0"> Not Registered? </p>
                 <br />
                <a href="/sign-up"><strong>Sign Up Here</strong></a>
            </div>

        </section>
    )
}

export default Login;