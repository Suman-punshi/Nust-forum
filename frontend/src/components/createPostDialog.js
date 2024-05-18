import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CreatePostDialog = () => {
  const { group } = useParams();
  const { userId } = useParams();
  const [Title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeTag = (e) => {
    setTags(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Title', Title);
    formData.append('text', text);
    formData.append('image', image);
    formData.append('tags', tags); // Ensure tags is a single string

    try {
      const res = await axios.post(`http://localhost:4000/create/${userId}/${group}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAlertMessage('Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      setAlertMessage('Error creating post. Please try again later.');
    }

    setTitle('');
    setText('');
    setImage(null);
    setTags('');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-dark" style={{ backgroundColor: "#CDE8E5" }}>
          <h5 className="card-title mb-0">Create Post</h5>
        </div>
        <div className="card-body">
          {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Title" value={Title} onChange={onChangeTitle} required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="10" cols="50" placeholder="Text" value={text} onChange={onChangeText} required />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" onChange={onChangeImage} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Tag" value={tags} onChange={onChangeTag} required />
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: "#CDE8E5" }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialog;

