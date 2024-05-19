/*import "../hover.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ss from '../components/modules/indiv_posts.module.css'; // Import custom styles

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

    const post = {
      Title: Title,
      text: text,
      images: image,
      tags: tags
    };

    axios.post(`http://localhost:4000/create/${userId}/${group}`, post)
      .then(res => {
        setAlertMessage('Post created successfully!');
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
    <div className={`container mt-5 ${ss.cardContainer}`}>
      <div className={`card ${ss.card}`}>
        <div className={`card-header text-dark ${ss.cardHeader}`}>
          <h5 className="card-title mb-0">Create Post</h5>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input type="text" className={`form-control ${ss.formControl}`} placeholder="Title" value={Title} onChange={onChangeTitle} required />
            </div>
            <div className="mb-3">
              <textarea className={`form-control ${ss.formControl}`} rows="10" cols="50" placeholder="Text" value={text} onChange={onChangeText} required />
            </div>
            <div className="mb-3">
              <input type="text" className={`form-control ${ss.formControl}`} placeholder="Image URL" value={image} onChange={onChangeImage} />
            </div>
            <div className="mb-3">
              <select className={`form-select ${ss.formControl}`} value={tags} onChange={onChangeTag}>
                <option value="tag1">Tag 1</option>
                <option value="nodejs">Node.js</option>
                {/* Add more options as needed }
              </select>
            </div>
            <button type="submit" className={`btn ${ss.btnPrimary}`}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialog;*/
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ss from "../components/modules/indiv_posts.module.css"; // Import custom styles

const CreatePostDialog = () => {
  const { group } = useParams();
  const { userId } = useParams();
  const [Title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
      tags: tags,
    };

    axios
      .post(`http://localhost:4000/create/${userId}/${group}`, post)
      .then((res) => {
        setAlertMessage("Post created successfully!");
      })
      .catch((err) => {
        console.error("Error creating post:", err);
        setAlertMessage("Error creating post. Please try again later.");
      });

    setTitle("");
    setText("");
    setImage("");
    setTags("");
  };

  return (
    <div
      className={`container mt-5 ${ss.cardContainer}`}
      style={{ backgroundColor: "#c3c6c9" }}
    >
      <div className={`card ${ss.card}`} style={{ backgroundColor: "#082f5e" }}>
        <div
          className={`card-header text-dark ${ss.cardHeader}`}
          style={{ backgroundColor: "#cde8e5" }}
        >
          <h5
            className="card-title mb-0"
            style={{ backgroundColor: "#4d6f99" }}
          >
            Create Post
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${ss.formControl}`}
                placeholder="Title"
                value={Title}
                onChange={onChangeTitle}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className={`form-control ${ss.formControl}`}
                rows="10"
                cols="50"
                placeholder="Text"
                value={text}
                onChange={onChangeText}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${ss.formControl}`}
                placeholder="Image URL"
                value={image}
                onChange={onChangeImage}
              />
            </div>
            <div className="mb-3">
              <select
                className={`form-select ${ss.formControl}`}
                value={tags}
                onChange={onChangeTag}
              >
                <option value="tag1">Tag 1</option>
                <option value="nodejs">Node.js</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <button
              type="submit"
              className={`btn ${ss.btnPrimary}`}
              style={{ backgroundColor: "#1e90ff" }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostDialog;
