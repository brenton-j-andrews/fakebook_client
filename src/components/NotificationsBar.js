import React, { useContext } from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext.js";

import message_icon from "../assets/Icons/comment.png";

function NotificationsBar() {

    const [ user, setUser ] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.setItem('jwt', null);
        setUser('');
        navigate('/');
    }

    return (
        <Navbar className="notifications border-top border-white bg-primary m-0 p-0">

            <Nav className="d-flex justify-content-between container-fluid m-0 p-0">

                <Container className="d-flex justify-content-start text-light mx-3"> 
                    <img className="notifications-icon" src={message_icon} alt="messages-icon"></img>
                </Container> 

                <Container className="d-flex justify-content-end mx-2">
                    <Nav.Link className="text-light" href="/user/profile"><strong> Wall </strong></Nav.Link>
                    <Nav.Link className="text-light" href="/user/profile"><strong> Profile </strong></Nav.Link>
                    <NavDropdown align="end" id="notificationsBarDropdown" title= { <span className="text-light"><strong> Account </strong></span> }>
                        <NavDropdown.Item onClick={() => {handleLogOut()}}> Log Out </NavDropdown.Item>
                        <NavDropdown.Item href="action2"> Change Password </NavDropdown.Item>
                        <NavDropdown.Item href="action3"> Delete Account </NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Nav>
        </Navbar>
    )
}

export default NotificationsBar;