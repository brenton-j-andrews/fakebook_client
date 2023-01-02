/* 
    The PostForm component renders at the top of a users profile and wall page and allows a user to create a new post via the API.
    Edit and deletion functionality are attached to the PostDisplay component.
*/

import React, { useState } from 'react';
import axios from "axios";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CREATE_POST_ENDPOINT = 'http://localhost:3000/post/create_post';

const PostForm = ({ setReRenderProfile }) => {

    let [ postContent, setPostContent ] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        let  userID = localStorage.getItem('user_id')

        try {
            await axios.post(
                CREATE_POST_ENDPOINT,
                JSON.stringify({ postContent, userID }),
                {
                    headers: { 
                        'Content-Type' : 'application/json',
                        'Access-Control-Allow-Credentials' : true
                    },
                    withCredentials: false
                }
            );
            setReRenderProfile(true);
            setPostContent('');
        }

        // Not sure what possible errors could occur. Cannot submit a post with an empty postContent body. Look into later...
        catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <div>
            <Form className="bg-light" onSubmit={handlePostSubmit}> 
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder="What is on your mind?" 
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        required
                    />

                    <Button variant='primary' type='submit'> Post </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default PostForm;