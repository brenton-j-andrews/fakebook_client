/*
    The commentForm component is rendered below every post and allows users to submit comments to posts. Pretty simple! 
*/

import axios from "axios";
import { useState } from 'react';

import Form from 'react-bootstrap/Form'

const ADD_COMMENT_ENDPOINT = 'http://localhost:3000/post/add_comment';

const CommentForm = ({ postid, username, setReRenderProfile }) => {

    let [ commentContent, setCommentContent ] = useState('');
    let [ showCommentButton, setShowCommentButton ] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        let  userID = localStorage.getItem('user_id')

        try {
            await axios.post(
                ADD_COMMENT_ENDPOINT,
                JSON.stringify({ postid, commentContent, username, userID }),
                {
                    headers: { 
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Credentials' : true
                    },
                    withCredentials: false
                }
            );
            setReRenderProfile(true);
            setCommentContent('');
        }

        // Not sure what possible errors could occur. Cannot submit a post with an empty postContent body. Look into later...
        catch (error) {
            console.log('error: ', error);
        }
    }

    return (

        <div className="post-comment-form mb-2">
            <Form className="post-comment-form container-fluid" onSubmit={handleCommentSubmit}> 
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder="Leave a comment." 
                        onFocus={() => {setShowCommentButton(true)}}
                        // onBlur={() => {setShowCommentButton(false)}}
                        value={commentContent}
                        onChange={((e) => setCommentContent(e.target.value))}
                        required
                    />

                    {showCommentButton && 
                        <button className="btn-primary-blue btn-add-comment" type="submit"> Leave Comment </button>
                    }
                    

                </Form.Group>
            </Form>
        </div>

    )
}

export default CommentForm;