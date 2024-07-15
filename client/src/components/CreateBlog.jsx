import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Homepage from './Homepage';
import '../style/CreateBlog.css'; // Import external CSS file

const CreateBlog = () => {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  const handleLongDescriptionChange = (e) => {
    setLongDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
  
    if (!token) {
      return alert('No token found, please login first');
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('title', title);
      formData.append('shortDescription', shortDescription);
      formData.append('longDescription', longDescription);

      const response = await axios.post('http://localhost:5000/create-blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-token': token
        }
      });
      if (response.status === 200) {
        const blogData = response.data;
        console.log('Blog data received:', blogData);
        alert('Blog saved successfully');
      }
    } catch (err) {
      console.error('Error creating blog:', err.message);
      alert('Failed to create blog. Please try again later.');
    }
    setImageFile(null);
    setTitle('');
    setShortDescription('');
    setLongDescription('');
  };

  return (
    <Container className="blog-form">
      <h2 className="my-4">Create a New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            className="border-dark"
            type="file"
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            className="border-dark"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="shortDescription">
          <Form.Label>Short Description:</Form.Label>
          <Form.Control
            className="border-dark"
            as="textarea"
            rows={3}
            value={shortDescription}
            onChange={handleShortDescriptionChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="longDescription">
          <Form.Label>Long Description:</Form.Label>
          <Form.Control
            className="border-dark"
            as="textarea"
            rows={5}
            value={longDescription}
            onChange={handleLongDescriptionChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;

// const getResponse = await axios.get(`http://localhost:5000/get-blog?image=${imagePath}`);
// // Handle the retrieved blog data (just an example)
// console.log('Data from server:', getResponse.data);