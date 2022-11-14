import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Bootstrap Components.
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

const SIGNUP_URL_ENDPOINT = 'http://localhost:3000/auth/register';

const SignUp = () => {

    const navigate = useNavigate();

    const userRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const errorRef = useRef();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ dateOfBirth, setDateOfBirth] = useState({
        'day': null,
        'month': null,
        'year': null
    });

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
                JSON.stringify({ firstName, email, password, dateOfBirth }),
                {
                    headers: { 'Content-Type' : 'application/json', mode:'cors' },
                    withCredentials: false
                }
            );

            setFirstName('');
            setEmail('');
            setPassword('');
            // setDayOfBirth('');
            // setMonthOfBirth('');
            // setYearOfBirth('');
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
                <Row className="mb-2">
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                placeholder="First Name"
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
                    </Col>
     
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                className="border-top mb-2"
                                placeholder="Last Name"
                                type="text"
                                id="lastName"
                                ref={lastNameRef}
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="off"
                                value={lastName}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-2">
                    <Form.Control 
                        className="border-top mb-2"
                        placeholder="Email"
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
                        className="mb-2"
                        placeholder="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </Form.Group>

                <p className="font-italic mt-3 mb-1">Birthday</p>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control
                            placeholder="DD"
                            type="number"
                            id="dayOfBirth"
                            // onChange={(e) => setDayOfBirth(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                            placeholder="MM"
                            type="number"
                            id="monthOfBirth"
                            // onChange={(e) => setMonthOfBirth(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                            placeholder="YYYY"
                            type="number"
                            id="yearOfBirth"
                            // onChange={(e) => setYearOfBirth(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>

                </Row>

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