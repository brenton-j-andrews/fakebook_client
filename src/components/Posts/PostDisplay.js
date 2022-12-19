/* 
    The PostDisplay component displays posts that are retrieved from the database.
    If a user is the author of the displayed post, edit and deletion options will be added to the display.
    The CommentForm and CommentDisplay componenets will both be rendered below each PostDisplay render.
*/

import axios from "axios";

const DELETE_POST_ENDPOINT = 'http://localhost:3000/post/delete_post';

const PostDisplay = ({ username, post, setReRenderProfile }) => {

    const headers = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Credentials' : true,
        'postid' : post._id
    }

    const deletePost = () => {
        setReRenderProfile(true);
        axios.delete(DELETE_POST_ENDPOINT, { headers : headers })
        .then(response => { console.log(response)});    
    }
    
    return (
        <div className="d-flex flex-column bg-light m-1 border border-dark w-50">
            <p> { username } </p>
            <p> { post.postContent } </p>
            <button onClick={() => {deletePost()}}> Delete Post </button>
        </div>
    )
}

export default PostDisplay;