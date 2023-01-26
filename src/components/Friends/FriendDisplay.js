// This component renders the friends display grid found on the user profile page.

import { useNavigate } from "react-router-dom";

import styled from 'styled-components';
import { Container, Card } from "react-bootstrap";

import profileImage from "../../assets/defaultProfileImage.png";

const FriendDisplay = ({ friends }) => {

    const navigate = useNavigate();

    const DisplayGrid = styled.div`
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: .25rem;
        margin-top: .25rem;
    `

    const navigateToFriendProfile = (id) => {
        console.log(id);
        navigate(`/${localStorage.getItem('user_id')}/friend/${id}`);
    }

    return (
        
        <Container fluid>
            <strong> Friends ({friends.length}): </strong>

            <DisplayGrid>
                {friends.map((friend, index) => {

                    return (
                        <Card 
                        className="d-flex flex-column align-items-center" 
                        onClick={() => {navigateToFriendProfile(friend._id) }}
                        key={index}>
                            <Card.Img variant='top' src={profileImage} />
                            <Card.Body className='m-0 p-0'>
                                <Card.Text> {friend.fullName} </Card.Text>
                            </Card.Body>
                        </Card>
                    )

                })}

            </DisplayGrid>
        </Container>
    )
}

export default FriendDisplay;