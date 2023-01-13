/*
    The commentForm component is rendered below every post and allows users to submit comments to posts. Pretty simple! 
*/

import axios from "axios";
import { useState } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const ADD_COMMENT_ENDPOINT = 'http://localhost:3000/post/add_comment';

const CommentForm = ({ postid, username, setReRenderProfile }) => {

    let [ commentContent, setCommentContent ] = useState('');

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
        <div>
            <Form className="bg-light" onSubmit={handleCommentSubmit}> 
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder="Leave a comment." 
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        required
                    />

                    <Button variant='primary' type='submit'> Leave Comment </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CommentForm;