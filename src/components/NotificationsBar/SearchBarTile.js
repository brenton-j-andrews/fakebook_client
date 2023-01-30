/* 
This component displays individual search results (for users) underneath the search bar.
Functionality: sending / confirming friend requests and visiting user profile.
TODO: Probably a much better way to implement this, rather than a bunch of if statements -> Try to optimize later???
*/

import styled from 'styled-components';

import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    declineFriendRequest, 
    cancelFriendRequest, 
} from '../../utilities/axiosFriendCRUD';

import profileImage from "../../assets/defaultProfileImage.png";

const SearchBarTile = ({ userItem: userObject }) => {

    const Tile = styled.div`
        display: flex;
        align-items: center;
        height: 75px;
    `
    const TileImage = styled.img`
        height: 60px;
    `

    if (userObject._id === localStorage.getItem('user_id')) {
        return;
    }
    
    else if (userObject.friends.includes(localStorage.getItem('user_id'))) {
        return (
            <Tile> 
                <div>
                    <TileImage src={profileImage} alt=""></TileImage>
                </div>

                <div className='d-flex flex-column justify-content-center'> 
                    <a href={`/${localStorage.getItem('user_id')}/friend/${userObject._id}`}> { userObject.fullName } </a>
                    <p className='fs-5'> Friends </p>
                </div>
            </Tile>
        )
    } 

    else if (userObject.friendsRequestsRecieved.includes(localStorage.getItem('user_id'))) {
        return (
            <div> 
                { userObject.fullName } 
                <p> Friend Request Sent </p>
                <button onClick={() => {cancelFriendRequest(userObject)}} >  Cancel Friend Request </button>
            </div>
        )
    } 

    else if (userObject.friendRequestsSent.includes(localStorage.getItem('user_id'))) {
        return (
            <div> 
                { userObject.fullName } 
                <button onClick={() => {acceptFriendRequest(userObject)}} > Accept Friend Request </button>
                <button onClick={() => {declineFriendRequest(userObject)}} >  Reject Friend Request </button>
            </div>
        )
    }

    else {
        return (
            <div> 
                { userObject.fullName } 
                <button onClick={() => {sendFriendRequest(userObject)}}> Send Friend Request </button>
            </div>
        )
    }
}

export default SearchBarTile;