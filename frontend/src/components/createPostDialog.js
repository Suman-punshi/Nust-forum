import "../hover.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";





// Dialog component for creating a post
const CreatePostDialog = () => {
  const navigate = useNavigate();
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

    const post = {
      Title: Title,
      text: text,
      images: image,
      tags: tags
    };

    axios.post(`http://localhost:4000/create/${userId}/${group}`, post)
      .then(res => {
        setAlertMessage('Post created successfully!');
        navigate(`/cards/${userId}`);
      })
      .catch(err => {
        console.error('Error creating post:', err);
        setAlertMessage('Error creating post. Please try again later.');
      });

    setTitle('');
    setText('');
    setImage('');
    setTags('');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-dark" style={{ backgroundColor: "#CDE8E5"}}>
          <h5 className="card-title mb-0">Create Post</h5>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Title" value={Title} onChange={onChangeTitle} required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="10" cols="50" placeholder="Text" value={text} onChange={onChangeText} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Image URL" value={image} onChange={onChangeImage} />
            </div>
            <div className="mb-3">
              <select className="form-select" value={tags} onChange={onChangeTag}>
                <option value="tag1">Tag 1</option>
                <option value="nodejs">Node.js</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: "#CDE8E5"}}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialog;
