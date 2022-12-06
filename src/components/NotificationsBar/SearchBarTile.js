/* 
This component displays individual search results (for users) underneath the search bar.
Functionality: sending / confirming friend requests and visiting user profile.
*/

import axios from "axios";

const FRIEND_REQUEST_ENDPOINT = 'http://localhost:3000/user/friend_request';

const SearchBarTile = ({ userItem }) => {


    // Issue: how to send headers as well? I've tried various configurations and each results in an empty body on the request object in the API.
    // Removed authentication for now. Another option might be to set a recipient header for transmission. Will look later.
    const sendFriendRequest = () => {
        axios.post(FRIEND_REQUEST_ENDPOINT, {
            'user_id' : localStorage.getItem('user_id'),
            'recipient_id' : userItem._id
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    }

    return (
        <div> 
            { userItem.fullName } 
            <button onClick={() => {sendFriendRequest(userItem)}}> Send Friend Request </button>
        </div>
    )
}

export default SearchBarTile;