import { useState } from "react";
import axios from "axios";

const PROFILE_URL_ENDPOINT = 'http://localhost:3000/auth/protected';


const Profile = () => {

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
        <section>
            {
                auth ?
                <div>
                    <p> You are logged in! Welcome to your profile! </p>
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