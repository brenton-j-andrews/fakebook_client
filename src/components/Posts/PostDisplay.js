/* 
    The PostDisplay component displays posts that are retrieved from the database.
    If a user is the author of the displayed post, edit and deletion options will be added to the display.
    The CommentForm and CommentDisplay componenets will both be rendered below each PostDisplay render.
*/

import axios from "axios";
import styled from "styled-components";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


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

    const PostContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        background-color: grey;
        margin-top: 25px;
    `
    const PostUserData = styled.div`
        display: flex;
        width: 90%;
    `

    const PostContentsDisplay = styled.div`
        width: 90%;
    `

    const PostActivityDisplay = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `
    
    return (

        <PostContainer>
            <PostUserData>
                <div className="d-flex flex-column">
                    <strong className=""> { username } </strong>
                    <i className="fs-6"> 3 hours ago </i>
                </div>
            </PostUserData>

            <PostContentsDisplay>
                <p className="fs-6 mt-4"> { post.postContent } </p>
            </PostContentsDisplay>

            <PostActivityDisplay>
                <p className="m-0"> You and 19 others. </p> 
                <p className="m-0"> 12 Comments </p>
            </PostActivityDisplay>

        </PostContainer>
    
        // <Card className='w-50 mt-5'>
        //     <Card.Header className='d-flex justify-content-between'>

        //         <div className="post-user"> 
        //             <p className="m-0"> { username } </p>
        //             <p className="m-0"> 3 hours ago </p>
        //         </div>

        //     </Card.Header>
            
        //     <Card.Text className='px-3'>
        //         <p className="fs-6 mt-4"> { post.postContent } </p>
        //     </Card.Text>

        //     <div clasName='d-flex flex-column justify-content-end'>
        //         <p className="w-50 inline-block"> 12 Likes </p>
        //         <p className="w-50 inline-block"> 3 Comments </p> 
        //     </div>

        //     <div className='post-action-buttons  m-0'>
        //         <Button className="bg-light border border-none dark"> Like </Button> 
        //         <Button className=""> Comment </Button>
        //     </div>
        // </Card>
    )
}

export default PostDisplay;