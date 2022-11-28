import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/UserContext.js";


import NotificationsBar from "../NotificationsBar";

const PROFILE_URL_ENDPOINT = 'http://localhost:3000/user/profile';


const Profile = () => {

    const [ user, setUser ] = useContext(UserContext);
    let [ auth, setAuth ] = useState(null);

    const getProfileData = () => {
        axios.get(PROFILE_URL_ENDPOINT, {
            headers: {
                'Authorization' : localStorage.getItem('jwt'),
                'Content-Type': 'text/plain'
            }
        })
        .then((response) => {
            if(response.status === 200) {
                setAuth(true);
            }
        })
        .catch((error) => {
            setAuth(false);
            console.log(error.response);
        })
    }
       
    getProfileData();

    return (
        <section className="profile-page">
            {
                auth ?
                <div>
                    <NotificationsBar />
                    <p> You are logged in user {user}! </p>
                </div>

                : 

                <div>
                    <p> You are not authorized to see this page, log in to access. </p> 
                    <a href="/"> Log In Here </a>
                </div>
            }
        </section>    
    )
}

export default Profile;