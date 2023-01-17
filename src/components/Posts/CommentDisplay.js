/* 
    The CommentDisplay component displays a single comment with author, timestamp (TODO) and comment likes. 
    It also contains api function to add and remove a like from a comment.
*/

const CommentDisplay = ({ comment }) => {

    return (
        <div className="post-comment-unit">
            <strong className="comment-user-text mt-2 mx-1 p-0"> { comment.commentAuthorName } </strong>

            <p className="mx-1 mb-2 p-0"> { comment.comment } </p>

            <div className="post-comment-likes mt-0">

                { comment.commentLikes.length > 0 && 
                    <p className="mx-1"> { comment.commentLikes.length } likes </p>
                }

                { comment.commentLikes.includes(localStorage.getItem('user_id')) ?

                    <button className="btn-like-comment mt-0 mx-1">
                        Unlike
                    </button>

                    :

                    <button className="btn-like-comment mx-1">
                        Like 
                    </button>
                    
                }
            </div>

            

        </div>
    )
}

export default CommentDisplay;

