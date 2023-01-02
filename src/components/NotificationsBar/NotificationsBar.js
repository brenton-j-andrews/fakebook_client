/* 
The NotificationsBar component contains user notifications (friend requests, notifications, messages), the LiveSearch component,
an account actions dropdown,and links to view user profile and wall. Appears on every page if user is signed in.
*/

import React from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";

import { LiveSearch } from './LiveSearch';

import message_icon from "../../assets/Icons/comment.png";

function NotificationsBar() {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.setItem('jwt', null);
        localStorage.setItem('user_id', null);
        navigate('/');
    }

    return (
        <Navbar className="primary-blue notifications">
            
            <Nav className="d-flex justify-content-between container-fluid m-0 p-0">

                <Container className="d-flex justify-content-start text-light mx-3"> 
                    <img className="notifications-icon" src={message_icon} alt="messages-icon"></img>
                </Container> 

                <Container className="d-flex justify-content-end align-items-center mx-2">

                    <LiveSearch />

                    <Nav.Link className="text-light ms-4" href="/user/profile"><strong> Wall </strong></Nav.Link>
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
