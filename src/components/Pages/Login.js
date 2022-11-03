import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Bootstrap Components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

const LOGIN_URL_ENDPOINT = 'http://localhost:3000/auth/login';

const Login = () => {

    const navigate = useNavigate();


    const userRef = useRef();
    const errorRef = useRef();

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

    // Clear error messages on any form changes. LOOK INTO LATER! THIS IS CAUSING ERROR MESSAGE TO DISAPPEAR IMMEDIATELY.
    // useEffect(() => {
    //     setErrorMessage('');
    // }, [ email, password ]);

    const toggleToast = () => setShowErrorToast(false);

    const handleSubmit = async (e) => {
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

            if (response.data.errorMessage) {
                setErrorMessage(response.data.errorMessage);
                setShowErrorToast(true);
                setEmail('');
                setPassword('');
            }

            else {
                // Upon successful authentication, set JWT in localstorage -> Not very secure, look into other options down the road.
                console.log(response.data.token.token);
                localStorage.setItem('jwt', response.data.token.token);
                navigate('/user/profile');
            }
            
        }

        catch (error) {
            if (!error?.response) {
                setErrorMessage("There is an issue on our part, try again later.");
            }

            setErrorMessage("Error: " + error.message);
            errorRef.current.focus();
        }
    }
 
    return (
        <section className="d-flex flex-column align-items-center border border-dark rounded pt-3 p-2">

            <Toast 
                className="d-flex flex-column align-items-center text-light bg-danger mb-4 p-2"
                show={showErrorToast} 
                onClose={toggleToast}
            > 
                <Toast.Header className="container-fluid rounded">
                    <strong className="me-auto">Error: </strong>
                </Toast.Header>
                <Toast.Body> {errorMessage} </Toast.Body>
            </Toast>

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