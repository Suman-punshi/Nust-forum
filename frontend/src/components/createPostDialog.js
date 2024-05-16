import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Layout from "./Layout"; // Import the layout component

const CreatePostDialog = () => {
    const { group, userId } = useParams();
    const [Title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null); // Change to single image state, initialized as null
    const [tags, setTags] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeText = (e) => {
        setText(e.target.value);
    };

    const onChangeImage = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setImage(file); // Set the file in the state
    };

    const onChangeTag = (e) => {
        setTags(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Title', Title);
        formData.append('text', text);
        formData.append('image', image); // Append the selected file to the form data
        formData.append('tags', tags);

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
        setTitle('');
        setText('');
        setImage(null);
        setTags('');
    };

    return (
        <Layout>
            <div className="dialog-container">
            <h2 style={{ marginTop: '70px', textAlign: 'center' }}>Add Post</h2>

                <form onSubmit={onSubmit}>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <input className="form-control" type="text" placeholder="Title" value={Title} onChange={onChangeTitle} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <textarea className="form-control" placeholder="Text" value={text} onChange={onChangeText} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <input className="form-control" type="file" onChange={onChangeImage} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <select className="form-control" value={tags} onChange={onChangeTag}>
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
