// This component renders the friends display grid found on the user profile page.

import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";

import profileImage from "../../assets/defaultProfileImage.png";

const FriendDisplay = ({ friends }) => {

    const navigate = useNavigate();

    const navigateToFriendProfile = (id) => {
        if (id === localStorage.getItem('user_id')) {
            navigate(`/${localStorage.getItem('user_id')}/profile`);
        } 
        else {
            navigate(`/${localStorage.getItem('user_id')}/friend/${id}`);
        }
    }

    return (
        
        <Container fluid>
            <strong> Friends ({friends.length}): </strong>

            <div className="friends-display-grid">
                {friends.map((friend, index) => {
                    
                        return (
                            <div 
                                className="friend-display-unit"
                                key={index}
                                onClick={() => {navigateToFriendProfile(friend._id)}}
                            > 
                                <img className="friend-display-unit-image" src={profileImage} alt=""/>
                                <p> {friend.fullName} </p>
                            </div>
                        )
                    
                })}

            </div>
        </Container>
    )
}

export default FriendDisplay;