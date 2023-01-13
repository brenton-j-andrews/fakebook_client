/* 
    The PostDisplay component displays posts that are retrieved from the database.
    If a user is the author of the displayed post, edit and deletion options will be added to the display.
    The CommentForm and CommentDisplay componenets will both be rendered below each PostDisplay render.
*/

import axios from "axios";
import styled from "styled-components";

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

    const PostContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        background-color: #FFFFFF;
        border: 1px solid gray;
        margin-top: 25px;
    `

    const PostContentContainer = styled.div`
        display: flex;
        justify-content: space-between;
        width: 90%;
    `

    const PostUserData = styled(PostContentContainer)`
        display: flex;
        align-items: center;
    `

    const PostActivityDisplay = styled(PostContentContainer)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid grey;
        margin-bottom: .5rem;
    `
    
    return (

        <PostContainer>
            <PostUserData>
                <div className="d-flex flex-column justify-content-center p-1">
                    <p className="font-post-user m-0"> { username } </p>
                    <p className="font-post-small m-0"> 3 hours ago </p>
                </div>
            </PostUserData>

            <PostContentContainer>
                <p className="font-post-content mt-1"> { post.postContent } </p>
            </PostContentContainer>

            <PostActivityDisplay>
                { 
                    post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length === 1 &&
                    <p className="font-post-small mb-2"> You like this. </p> 
                }

                { 
                    post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length > 1 &&
                    <p className="font-post-small mb-2"> You and { post.postLikes.length - 1 } others like this. </p> 
                }

                { 
                    post.postLikes.length === 0 &&
                    <p className="font-post-small mb-2"> No Likes. </p> 
                }

                { 
                    !post.postLikes.includes(localStorage.getItem('user_id')) && post.postLikes.length > 0 &&
                    <p className="font-post-small mb-2"> { post.postLikes.length } likes. </p> 
                }

                <p className="font-post-small mb-2"> { post.postComment.length } Comments </p>
            </PostActivityDisplay>

            <PostContentContainer>
                { post.postLikes.includes(localStorage.getItem('user_id')) ? 

                    <button className="btn-like-comment mx-2" onClick={() => {unlikePost()}}>
                        Unlike
                    </button>

                    :

                    <button className="btn-like-comment mx-2" onClick={() => {likePost()}}>
                        Like
                    </button>
                }
                

                <button className="btn-like-comment mx-2">
                    Comment
                </button>
            </PostContentContainer>

            <CommentForm 
                postid = {post._id}
                username = { username }
                setReRenderProfile = {setReRenderProfile}
            />

            {post.postComment.map((comment) => {
                return (
                    <CommentDisplay 
                        comment = {comment}
                    />
                )
            })}

        </PostContainer>
    )
}

export default PostDisplay;