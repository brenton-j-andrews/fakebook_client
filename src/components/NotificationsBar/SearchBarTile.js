/* 
This component displays individual search results (for users) underneath the search bar.
Functionality: sending / confirming friend requests and visiting user profile.
*/

import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    declineFriendRequest, 
    cancelFriendRequest,
    unfriendUser 
} from '../../utilities/axiosFriendCRUD';

const SearchBarTile = ({ userItem }) => {

    if (userItem._id === localStorage.getItem('user_id')) {
        return;
    }
    
    else if (userItem.friends.includes(localStorage.getItem('user_id'))) {
        return (
            <div> 
            { userItem.fullName } 
            <p> Friends </p>
            <button onClick={() => {unfriendUser(userItem)}}>Unfriend</button> 
        </div>
        )
    } 

    else if (userItem.friendsRequestsRecieved.includes(localStorage.getItem('user_id'))) {
        return (
            <div> 
                { userItem.fullName } 
                <p> Friend Request Sent </p>
                <button onClick={() => {cancelFriendRequest(userItem)}} >  Cancel Friend Request </button>
            </div>
        )
    } 

    else if (userItem.friendRequestsSent.includes(localStorage.getItem('user_id'))) {
        return (
            <div> 
                { userItem.fullName } 
                <button onClick={() => {acceptFriendRequest(userItem)}} > Accept Friend Request </button>
                <button onClick={() => {declineFriendRequest(userItem)}} >  Reject Friend Request </button>
            </div>
        )
    }

    else {
        return (
            <div> 
                { userItem.fullName } 
                <button onClick={() => {sendFriendRequest(userItem)}}> Send Friend Request </button>
            </div>
        )
    }
}

export default SearchBarTile;