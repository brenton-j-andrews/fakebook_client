import React, { useState } from "react";
import axios from "axios";

import NotificationsBar from "../NotificationsBar/NotificationsBar";

const PROFILE_URL_ENDPOINT = 'http://localhost:3000/user/profile';


const Profile = () => {

    // const [ user, setUser ] = useContext(UserContext);
    let [ auth, setAuth ] = useState(null);

    const getProfileData = () => {
        axios.get(PROFILE_URL_ENDPOINT, {
            headers: {
                'UserID' : localStorage.getItem('user_id'),
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
    
    let name = localStorage.getItem('user_id');
    getProfileData();

    return (
        <section className="profile-page">
            {
                auth ?
                <div>
                    <NotificationsBar />
                    <p> You are logged in user {name}! </p>
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