/* 
    The PostDisplay component displays posts that are retrieved from the database.
    If a user is the author of the displayed post, edit and deletion options will be added to the display.
    The CommentForm and CommentDisplay componenets will both be rendered below each PostDisplay render.
*/

import axios from "axios";

import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";

const DELETE_POST_ENDPOINT = 'http://localhost:3000/post/delete_post';
const LIKE_POST_ENDPOINT = 'http://localhost:3000/post/like_post';
const UNLIKE_POST_ENDPOINT = 'http://localhost:3000/post/unlike_post';

const PostDisplay = ({ username, post, setReRenderProfile }) => {

    const headers = {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Credentials' : true,
    }

    const deletePost = () => {
        setReRenderProfile(true);
        axios.delete(DELETE_POST_ENDPOINT, { headers : headers })
        .then(response => { console.log(response)});    
    }

    const likePost = () => {
        setReRenderProfile(true);
        axios.post(LIKE_POST_ENDPOINT,
            { 
                'userid' : localStorage.getItem('user_id'), 
                'postid' : post._id
            },
            { 
                headers : headers 
            })
        .then(response => { console.log(response) });
    }
    
    const unlikePost = () => {
        setReRenderProfile(true);
        axios.post(UNLIKE_POST_ENDPOINT, 
            {
                'userid' : localStorage.getItem('user_id'), 
                'postid' : post._id
            }, {
                headers : headers
            })
        .then(response => { console.log(response) });
    }

    return (

        <div className="post-display-unit">
            
            <div className="post-upper-data d-flex flex-column justify-content-center mt-1 p-1">
                <p className="font-post-user m-0"> { username } </p>
                <p className="font-post-small m-0"> 3 hours ago </p>
            </div>
            

            <div className="post-content-display">
                <p className="font-post-content mt-1"> { post.postContent } </p>
            </div>

            
            <div className='post-stats-display'>

                { 
                    post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length === 1 &&
                    <p className="font-post-small mb-2"> You like this. </p> 
                }

                { 
                    !post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length === 1 &&
                    <p className="font-post-small mb-2"> 1 Like. </p> 
                }

                {
                    !post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length > 1 &&
                    <p className="font-post-small mb-2"> { post.postLikes.length - 1} Likes. </p> 
                }

                { 
                    post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length === 2 &&
                    <p className="font-post-small mb-2"> You and 1 other like this. </p> 
                }

                { 
                    post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length > 2 &&
                    <p className="font-post-small mb-2"> You and { post.postLikes.length - 1 } others like this. </p> 
                }


                { 
                    post.postLikes.length === 0 &&
                    <p className="font-post-small mb-2"> No Likes. </p> 
                }

                <p className="font-post-small mb-2"> { post.postComment.length } Comments </p>
            </div>


            <div className="post-interaction-display">

                { post.postLikes.includes(localStorage.getItem('user_id')) ? 

                    <button className="btn-like-post mx-2" onClick={() => {unlikePost()}}>
                        Unlike
                    </button>

                    :

                    <button className="btn-like-post mx-2" onClick={() => {likePost()}}>
                        Like
                    </button>
                }
                

                <button className="btn-like-post mx-2">
                    Comment
                </button>
            </div>


            <CommentForm 
                postid = {post._id}
                username = { username }
                setReRenderProfile = {setReRenderProfile}
            />

            <div className="post-comments-wrapper">
                {post.postComment.map((comment, index) => {
                    return (
                        <CommentDisplay 
                            key = {index}
                            postid = {post._id}
                            comment = {comment}
                            setReRenderProfile = {setReRenderProfile}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default PostDisplay;