/* 
    The CommentDisplay component displays a single comment with author, timestamp (TODO) and comment likes. 
    It also contains api function to add and remove a like from a comment.
*/

import axios from 'axios';

import { formatDate } from '../../utilities/formatDate';

const LIKE_COMMENT_ENDPOINT = 'http://localhost:3000/post/like_comment';
const UNLIKE_COMMENT_ENDPOINT = 'http://localhost:3000/post/unlike_comment';
const DELETE_COMMENT_ENDPOINT = 'http://localhost:3000/post/delete_comment';

const CommentDisplay = ({ postid, comment, setReRenderProfile }) => {

    const likeComment = () => {
        setReRenderProfile(true);
        axios.put(LIKE_COMMENT_ENDPOINT, 
            {
                'userid' : localStorage.getItem('user_id'),
                'postid' : postid,
                'commentid' : comment._id
            })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const unlikeComment = () => {
        setReRenderProfile(true);
        axios.put(UNLIKE_COMMENT_ENDPOINT, 
            {
                'userid' : localStorage.getItem('user_id'),
                'postid' : postid,
                'commentid' : comment._id
            })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const deleteComment = () => {
        setReRenderProfile(true);
        axios.put(DELETE_COMMENT_ENDPOINT, 
            {
                'userid' : localStorage.getItem('user_id'),
                'postid' : postid,
                'commentid' : comment._id
            })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        
        <div className="post-comment-unit mt-2 mb-1">
                     
            <p>
                <strong className="comment-user-text mt-2 mx-1 p-0"> { comment.commentAuthorName } </strong> <small> { formatDate(comment.createdAt, false) } </small>
            </p>
 


            <p className="mx-1 mb-2 p-0"> { comment.comment } </p>

            <div className="post-comment-likes mt-0 mb-3">

                { comment.commentLikes.length > 1 && 
                    <p className="m-0"> { comment.commentLikes.length } likes </p>
                }

                { comment.commentLikes.length === 1 && 
                    <p className="m-0"> 1 like </p>
                }

                { comment.commentLikes.includes(localStorage.getItem('user_id')) ?

                    <button className="btn-like-comment mt-0 mx-1" onClick={() => {unlikeComment()}}>
                        Unlike
                    </button>

                    :

                    <button className="btn-like-comment mx-1" onClick={() => {likeComment()}}>
                        Like 
                    </button>
                    
                }

                { comment.commentAuthorID === localStorage.getItem('user_id') &&
                    <button className="btn-like-comment mt-0 mx-1" onClick={() => {deleteComment()}}>
                        Delete
                    </button>
                }
            </div>

            

        </div>
    )
}

export default CommentDisplay;
