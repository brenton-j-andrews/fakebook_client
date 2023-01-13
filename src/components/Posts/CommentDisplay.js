/* 
    The CommentDisplay component displays a single comment with author, timestamp (TODO) and comment likes. 
    It also contains api function to add and remove a like from a comment.
*/

import axios from "axios";

const CommentDisplay = ({ comment }) => {

    console.log(comment.comment);
    // const likeComment = () => {

    // }

    // const unlikeComment = () => {

    // }

    return (
        <div>
            { comment.commentAuthorName }
            <br></br>
            { comment.comment }
        </div>
    )
}

export default CommentDisplay;

