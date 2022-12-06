import styled from 'styled-components';

import { Container, Card } from "react-bootstrap";

import profileImage from "../../assets/defaultProfileImage.png";

const FriendDisplay = ({ userFriends }) => {

    const DisplayGrid = styled.div`
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: .25rem;
        margin-top: .25rem;
    `

    // Load bearing code. Not used but 'rendered fewer hooks than expected' error pops up if removed...
    const DisplayTile = styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;

        &:hover {
            transform: scale(1.025);
            transition-duration: 500ms;
        }
    `
    

    return (

        <Container fluid>
            <strong> Friends ({userFriends.length}): </strong>

            <DisplayGrid>

                {userFriends.map((friend, index) => {
                    return (
                        <Card className="d-flex flex-column align-items-center" key={index} onClick={() => {console.log('hello from there!');}}>
                            <Card.Img variant='top' src={profileImage} />
                            <Card.Body className='m-0 p-0'>
                                <Card.Text> {friend} </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}

            </DisplayGrid>
        </Container>
    )
}

export default FriendDisplay;