// Contains functions used for friend CRUD API calls which are utilized by multiple components.

import axios from "axios";

const SEND_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/friend_request';
const ACCEPT_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/accept_request';
const DECLINE_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/decline_request';
const CANCEL_FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/decline_request';
const UNFRIEND_USER_ENDPOINT = 'http://localhost:3000/user/unfriend_user';

const sendFriendRequest = (userItem) => {
    axios.post(SEND_FRIEND_REQUEST_ENDPOINT, {
        'user_id' : localStorage.getItem('user_id'),
        'recipient_id' : userItem._id
    }, {
        headers : {
            'Authorization' : localStorage.getItem('jwt'),
        }
    })
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.log('error: ', error.response.data.message);
    });
}

const acceptFriendRequest = (userItem) => {
    axios.put(ACCEPT_FRIEND_REQUEST_ENDPOINT, {
        'recipient_id' : localStorage.getItem('user_id'),
        'sender_id' : userItem._id
    }, {
        headers : {
            'Authorization' : localStorage.getItem('jwt'),
        }
    })
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.log('error: ', error.response.data.message);
    })
}

const declineFriendRequest = (userItem) => {
    axios.put(DECLINE_FRIEND_REQUEST_ENDPOINT, {
        'recipientID' : localStorage.getItem('user_id'),
        'senderID': userItem._id
    }, 
    {
        headers : {
            'Authorization' : localStorage.getItem('jwt')
        }
    })
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.log('error: ', error.response.data.message);
    })
}

const cancelFriendRequest = (userItem) => {
    axios.put(CANCEL_FRIEND_REQUEST_ENDPOINT, {
        recipientID : userItem._id,
        senderID : localStorage.getItem('user_id')
    },  
    {
        headers : {
            'Authorization' : localStorage.getItem('jwt')
        }
    })
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.log('error: ', error.response.data.message);
    })
}

const unfriendUser = (userItem) => {
    axios.put(UNFRIEND_USER_ENDPOINT, {
        'signedInID' : localStorage.getItem('user_id'),
        'unfriendID' : userItem._id
    }, {
        headers : {
            'Authorization' : localStorage.getItem('jwt'),
        }
    })
    .then((response) => {
        console.log(response.data.message);
    })
    .catch((error) => {
        console.log('error: ', error.response.data.message);
    })
}

export { sendFriendRequest, acceptFriendRequest, declineFriendRequest, cancelFriendRequest, unfriendUser };