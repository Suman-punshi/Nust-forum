import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

// Dialog component for creating a post
const CreatePostDialog = () => {
  const { group } = useParams();
  const { userId } = useParams();
  const [Title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [alertMessage, setAlertMessage] = useState('');



  const onChangeTitle = (e) => {
    setTitle(e.target.value);
};

const onChangeText = (e) => {
    setText(e.target.value);
};

const onChangeImage = (e) => {
    setImage(e.target.value);
};

const onChangeTag = (e) => {
    setTags(e.target.value);
};


const onSubmit = (e) => {
    e.preventDefault();
    alert("inside onsubmit");

    const post = {
        Title: Title,
        text: text,
        images: image,
        tags: tags
    };

    console.log('Sending the post data:', post);
    

    axios.post(`http://localhost:4000/create/${userId}/${group}`, post)
        .then(res => {
          alert("sending axios ");
            console.log('Response from server:', res.data);
            setAlertMessage('post created successfully!');
            // You can also redirect the user or perform any other action here
        })
        .catch(err => {
            alert("inside error block" + err);
            console.error('Error sending request:', err);
            setAlertMessage('Error creating post. Please try again later.');
        });

    setTitle('');
    setText('');
    setImage('');
    setTags('');

};


  return (
    <div className="dialog-container">
      <h2>Create Post</h2>
      <form onSubmit={onSubmit}>
    
      <input type="text" placeholder="Title" value={Title} onChange={onChangeTitle} />
      
      <textarea placeholder="Text" value={text} onChange={onChangeText} />
      <input type="text" placeholder="Image URL" value={image} onChange={onChangeImage} />
      <select value={tags} onChange={onChangeTag}>
        <option value="tag1">Tag 1</option>
        <option value="nodejs">nodejs</option>
        {/* Add more options as needed */}
      </select>
      {/* <div style={{ paddingTop: '20px' }} className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
        </div> */}
      <button type = "button" onClick={onSubmit}>Create</button>
      </form>
    </div>
  );
};


export default CreatePostDialog;