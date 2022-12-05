import styled from 'styled-components';

import { Container } from "react-bootstrap";

import profileImage from "../../assets/defaultProfileImage.png";

const FriendDisplay = ({ userFriends }) => {
    
    const toDisplay = ['Joe', 'Bruce', 'Ginger', 'Halo', 'Cocount', 'Nigel', 'Charlie', 'Moose', 'Brent'];

    const DisplayGrid = styled.div`
        display: grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: .25rem;
        margin-top: .25rem;
    `

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
    const TileImage = styled.img`
        width: 100px;
        height: 100px;
    `

    const TileName = styled.p`
        position: absolute;
        bottom: -4px;
    `
    return (
        <Container fluid>
            <strong> Friends ({userFriends.length}): </strong>

            <DisplayGrid>
                {toDisplay.map((friend) => {
                    return (
                        <DisplayTile key={friend}> 
                            <TileImage src={profileImage} className="m-0 p-0"></TileImage>
                            <TileName> {friend } </TileName>
                        </DisplayTile>
                    )
                })}
            </DisplayGrid>
        </Container>
    )
}

export default FriendDisplay;