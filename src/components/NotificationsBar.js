import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import axios from "axios";


import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

import message_icon from "../assets/Icons/comment.png";

const SEARCHBAR_URL_ENDPOINT = 'http://localhost:3000/user/profile/search';

// For testing!!!
const fake_accounts = [
    {
        label: 'Brenton',
        value: 'Brenton'
    },
    {
        label: 'Moose',
        value: 'Moose'
    },
    {
        label: 'Ginger',
        value: 'Ginger'
    },
    {
        label: 'Bruce',
        value: 'Bruce'
    }
]


function NotificationsBar() {

    const [ user, setUser ] = useContext(UserContext);

    let [ searchString, setSearchString ] = useState('');
    let [ searchResult, setSearchResult ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(searchResult);
    }, [searchResult]);

    const handleSearchBar = () => {
        axios.get(SEARCHBAR_URL_ENDPOINT , {
            headers: {
                'Authorization' : localStorage.getItem('jwt'),
                'Content-Type': 'text/plain'
            }
        })
        .then((response) => {
            setSearchResult(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

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

                <Container className="d-flex justify-content-end align-items-center mx-2">

                    
                   <div className='position-relative'>
                       <input 
                       type="text"
                       onClick={(e) => {handleSearchBar()}}
                       onBlur={() => {setSearchResult([])}}
                       placeholder='Search Fakebook here!'
                       />

                       <div className='search-result container-fluid position-absolute overflow-visible'>
                           {searchResult.map((item) => {
                               return (
                                   <div className='container-fluid bg-white' key={item.email}> 
                                        <h3> {item.email} </h3> 
                                   </div>
                               )
                           })}
                       </div>
                   </div>

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