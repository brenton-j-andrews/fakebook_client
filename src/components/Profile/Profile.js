import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import NotificationsBar from "../NotificationsBar/NotificationsBar";
import FriendDisplay from "../Friends/FriendDisplay";
import PostForm from "../Posts/PostForm";
import PostDisplay from "../Posts/PostDisplay";

const PROFILE_URL_ENDPOINT = 'http://localhost:3000/user/profile';

const Profile = () => {

    // const [ user, setUser ] = useContext(UserContext);
    let currentUser = localStorage.getItem('user_id');

    let [ auth, setAuth ] = useState(null);
    let [ userData, setUserData ] = useState();

    // Set to true whenever profile data is modified to trigger a re-render.
    let [ reRenderProfile, setReRenderProfile ] = useState(false);
    
    // Fetch profile data, re-render on any profile changes (post CRUD, information update).
    useEffect(() => {
        axios.get(PROFILE_URL_ENDPOINT, {
            headers : {
                'UserID' : currentUser,
                'Authorization' : localStorage.getItem('jwt'),
                'Content-Type': 'text/plain'
            }
        })
        .then(response => {
            setUserData(response.data);
            setReRenderProfile(false);
            setAuth(true);
        })
    }, [ reRenderProfile, currentUser ]);
    
    return (
        <section className="profile-page">
            {
                auth ?

                <div className="d-flex-column"> 
                    <NotificationsBar />
                    <div className="profile-header d-flex justify-content-center border border-dark">
                        <h2> {userData.fullName} </h2>
                    </div>

                    <Container className="profile-main" fluid>
                        <Row className="m-0 p-0">

                            <Col sm={12} md={4} className="d-flex flex-column align-items-center align-items-center">
                                <div> User Data </div>
                                <FriendDisplay friends = {userData.friends}/>
                            </Col>

                            <Col sm={12} md={8} className="d-flex flex-column justify-content-center align-items-center"> 
                            
                                <PostForm 
                                    setReRenderProfile = {setReRenderProfile}
                                />

                                { userData.userPosts.map((post, index) => {
                                    return (
                                        <PostDisplay 
                                            key={index}
                                            info={userData}
                                            username={userData.fullName} 
                                            post={post}
                                            setReRenderProfile={setReRenderProfile}
                                        />
                                    )
                                })}
                            </Col>
                        </Row>
                    </Container>
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