/* 
    User login component.
    TODO: Add verification and do a dive into react useAuthContext because I don't really understand it.
*/

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Bootstrap Components.
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import { Row, Col } from "react-bootstrap";

const LOGIN_URL_ENDPOINT = 'http://localhost:3000/auth/login';

const Login = () => {

    const navigate = useNavigate();

    const userRef = useRef();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ showErrorToast, setShowErrorToast ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    // Focus on user input on form.
    useEffect(() => { 
        userRef.current.focus();
    }, []);

    // Re-render on change of errorMessage.
    useEffect(() => {
    }, [errorMessage]);

    const toggleToast = () => setShowErrorToast(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL_ENDPOINT,
                JSON.stringify({ email, password }),
                {
                    headers: { 
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Credentials' : true
                    },
                    withCredentials: false
                }
            );

            // Check for failed validation in response.
            if (!response.data.success) {
                setErrorMessage(response.data.errorMessage);
                setShowErrorToast(true);
                setEmail('');
                setPassword('');
            }

            else {
                // Upon successful authentication, set JWT, and User._id in localstorage, set user data in application state 
                // NOT SECURE! Will be learning more about authentication and security in the future and then refactor.
                localStorage.setItem('jwt', response.data.token.token);
                localStorage.setItem('user_id', response.data.user._id);
                navigate(`${response.data.user._id}/profile`);
            }
            
        }

        catch (error) {
            if (!error?.response) {
                setErrorMessage("There is an issue on our part, try again later.");
            }

            console.log(error);
            setErrorMessage("Error: " + error.message);
        }
    }
 
    return (
        <section className="login container d-flex justify-content-center mt-5 pt-5 pb-2">
            <Row>
                <Col className="d-flex flex-column justify-content-center mt-5" md={6}>
                    <h1 className="logo-font"> Fakebook </h1>
                    <p className="fs-5 pe-5"> Connect with absolutely nobody online since this is a portfolio project. </p>
                </Col>

                <Col className="test d-flex flex-column shadow-lg rounded bg-light mt-5 py-3" md={6}>
                    <Toast 
                        className="d-flex flex-column align-items-center text-light bg-danger mb-4 p-2"
                        show={showErrorToast} 
                        onClose={toggleToast}
                    > 
                        <Toast.Header className="container-fluid rounded">
                            <strong className="me-auto">Error: {errorMessage} </strong>
                        </Toast.Header>
                    </Toast>

                    <Form className="d-flex flex-column mt-3 p-2" 
                    onSubmit={handleLoginSubmit}
                    >
                        <Form.Group>
                            <Form.Control 
                                placeholder="Email"
                                className="border-top mb-3 p-3"
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
                            <Form.Control 
                                placeholder="Password"
                                className="mb-2 p-3"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </Form.Group>

                        <button className="btn-primary-blue btn-login" type="submit"> 
                            Log In   
                        </button>
                    </Form>

                    <div className="d-flex flex-column align-items-center">
                        <p className="m-0"><strong>Not Registered?</strong></p>
                        <br />
                        <a href="/sign-up"><strong>Sign Up Here</strong></a>
                    </div>
                </Col>
            </Row>
        
        </section>
    )
}

export default Login;