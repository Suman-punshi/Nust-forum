import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Layout from "./Layout"; // Import the layout component

const CreatePostDialog = () => {
    const { group, userId } = useParams();
    const [post_title, setPost_title] = useState('');
    const [post_text, setPost_text] = useState('');
    const [image, setImage] = useState(null); // Change to single image state, initialized as null
    const [tag, setTag] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const onChangeTitle = (e) => {
        setPost_title(e.target.value);
    };

    const onChangeText = (e) => {
        setPost_text(e.target.value);
    };

    const onChangeImage = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setImage(file); // Set the file in the state
    };

    const onChangeTag = (e) => {
        setTag(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post_tile', post_title);
        formData.append('post_text', post_text);
        formData.append('image', image); // Append the selected file to the form data
        formData.append('tag', tag);

        console.log(formData);

        axios.post(`http://localhost:4000/create/${userId}/${group}`, formData)
            .then(res => {
                console.log('Response from server:', res.data);
                setAlertMessage('Post created successfully!');
            })
            .catch(err => {
                console.error('Error sending request:', err);
                setAlertMessage('Error creating post. Please try again later.');
            });

        // Reset form fields
        setPost_title('');
        setPost_text('');
        setImage(null);
        setTag('');
    };

    return (
        <Layout>
            <div className="dialog-container">
            <h2 style={{ marginTop: '70px', textAlign: 'center' }}>Add Post</h2>

                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <input className="form-control" type="text" placeholder="Title" value={post_title} onChange={onChangeTitle} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <textarea className="form-control" placeholder="Text" value={post_text} onChange={onChangeText} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <input className="form-control" type="file" onChange={onChangeImage} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <select className="form-control" value={tag} onChange={onChangeTag}>
                            <option value="tag1">Tag 1</option>
                            <option value="nodejs">Node.js</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <button  style={{ marginTop: '20px' }} className="btn btn-primary" type="submit">Create</button>
                </form>
                {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
            </div>
        </Layout>
    );
};

export default CreatePostDialog;
