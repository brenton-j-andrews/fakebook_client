/* 
    The PostDisplay component displays posts that are retrieved from the database.
    If a user is the author of the displayed post, edit and deletion options will be added to the display.
    The CommentForm and CommentDisplay componenets will both be rendered below each PostDisplay render.
*/

const PostDisplay = ({ username, post }) => {
    return (
        <div className="d-flex flex-column bg-light m-1 border border-dark w-50">
            <p> { username } </p>
            <p> { post.postContent } </p>

        </div>
    )
}

export default PostDisplay;