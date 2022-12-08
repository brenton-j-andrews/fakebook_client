import React, { useState, useEffect, useRef, forwardRef} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";

import message_icon from "../../assets/Icons/comment.png";
import SearchBarTile from './SearchBarTile.js';

const SEARCHBAR_URL_ENDPOINT = 'http://localhost:3000/user/profile/search';

function NotificationsBar() {

    // let [ searchString, setSearchString ] = useState('');
    let [ searchResult, setSearchResult ] = useState([]);
    let [ openSearch, setOpenSearch ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
    }, [searchResult]);

    
    // Handle search bar input, add event to close results panel on clicking outside of it.
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
        localStorage.setItem('user_id', null);
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
                    //    onBlur={() => {setSearchResult([])}}
                       placeholder='Search Fakebook here!'
                       />

                       <div className='search-result container-fluid position-absolute overflow-visible bg-white py-3' >
                           {searchResult.map((item) => {
                               return (
                                 <SearchBarTile key={item._id}
                                    userItem = {item}
                                 />
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
