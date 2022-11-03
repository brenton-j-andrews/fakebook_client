import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Bootstrap Components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SIGNUP_URL_ENDPOINT = 'http://localhost:3000/auth/register';

const SignUp = () => {

    const navigate = useNavigate();

    const userRef = useRef();
    const firstNameRef = useRef();
    const errorRef = useRef();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');


    // Focus on user input on form.
    useEffect(() => { 
        userRef.current.focus();
    }, []);

    // Clear error messages on any form changes.
    useEffect(() => {
        setErrorMessage('');
    }, [ email, password, firstName ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                SIGNUP_URL_ENDPOINT,
                JSON.stringify({ firstName, email, password }),
                {
                    headers: { 'Content-Type' : 'application/json', mode:'cors' },
                    withCredentials: false
                }
            );

            setFirstName('');
            setEmail('');
            setPassword('');
            navigate('/');
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

                <Form.Group>
                    <Form.Label> First Name: </Form.Label>
                    <Form.Control 
                        className="border-top mb-2"
                        type="text"
                        id="firstName"
                        ref={firstNameRef}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="off"
                        value={firstName}
                        required
                    />
                </Form.Group>

                <Button 
                    className="align-self-center container-fluid mt-3 mb-3" 
                    ariant="primary" 
                    type="submit"
                > 
                    Sign Up  
                </Button>
            </Form>

            <div className="d-flex flex-column align-items-center mt-5">
                <p className="m-0"> Already have an account? </p>
                 <br />
                <a href="/"><strong> Log In Here</strong></a>
            </div>

        </section>
    )
}

export default SignUp;