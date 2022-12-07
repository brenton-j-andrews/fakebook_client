/* 
This component displays individual search results (for users) underneath the search bar.
Functionality: sending / confirming friend requests and visiting user profile.
*/

import axios from "axios";

const SEND_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/friend_request';
const ACCEPT_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/accept_request';
const DECLINE_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/decline_request';
const UNFRIEND_USER_ENDPOINT = 'http://localhost:3000/user/unfriend_user';

const SearchBarTile = ({ userItem }) => {


    // Issue: how to send headers as well? I've tried various configurations and each results in an empty body on the request object in the API.
    // Removed authentication for now. Another option might be to set a recipient header for transmission. Will look later.
    const sendFriendRequest = () => {
        axios.post(SEND_FRIEND_REQUEST_ENDPOINT, {
            'user_id' : localStorage.getItem('user_id'),
            'recipient_id' : userItem._id
        })
        .then((response) => {
            console.log(response.data.message);
        })
        .catch((error) => {
            console.log('error: ', error.response.data.message);
        });
    }

    const acceptFriendRequest = () => {
        axios.put(ACCEPT_FRIEND_REQUEST_ENDPOINT, {
            'recipient_id' : localStorage.getItem('user_id'),
            'sender_id' : userItem._id
        })
        .then((response) => {
            console.log(response.data.message);
        })
        .catch((error) => {
            console.log('error: ', error.response.data.message);
        })
    }

    const declineFriendRequest = () => {
        axios.put(DECLINE_FRIEND_REQUEST_ENDPOINT, {
            'recipientID' : localStorage.getItem('user_id'),
            'senderID': userItem._id
        })
        .then((response) => {
            console.log(response.data.message);
        })
        .catch((error) => {
            console.log('error: ', error.response.data.message);
        })
    }

    const unfriendUser = () => {
        axios.put(UNFRIEND_USER_ENDPOINT, {
            'signedInID' : localStorage.getItem('user_id'),
            'unfriendID' : userItem._id
        })
        .then((response) => {
            console.log(response.data.message);
        })
        .catch((error) => {
            console.log('error: ', error.response.data.message);
        })
    }

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