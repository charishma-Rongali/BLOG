import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBlogForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // For displaying the existing image
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing blog data for editing
      axios.get(`http://localhost:5000/get-blog/${id}`)
        .then(response => {
          const { image, title, shortDescription, longDescription } = response.data;
          setTitle(title);
          setShortDescription(shortDescription);
          setLongDescription(longDescription);
          
          // Construct the full image URL for display
          const imageUrl = `http://localhost:5000/${image}`; // Adjust this URL based on your server configuration
          setImageUrl(imageUrl);
        })
        .catch(err => console.error('Error fetching blog:', err));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
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

    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('longDescription', longDescription);

    try {
      let response;
      if (id) {
        // If ID exists, update existing blog
        response = await axios.put(`http://localhost:5000/update-blog/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-token': token
          }
        });
        alert('Blog updated successfully');
      } else {
        // If no ID, create a new blog
        response = await axios.post('http://localhost:5000/create-blog', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-token': token
          }
        });
        alert('Blog created successfully');
      }
      
      console.log('Blog response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error saving blog:', error.message);
      alert('Failed to save blog. Please try again later.');
    }
  };

  return (
    <Container className="blog-form">
      <h2 className="my-4">{id ? 'Edit Blog' : 'Create a New Blog'}</h2>
      <Form onSubmit={handleSubmit}>
        {imageUrl && !imageFile && (
          <Form.Group className="mb-3" controlId="existingImage">
            <Form.Label>Existing Image:</Form.Label>
            <img src={imageUrl} alt="Existing blog" style={{ maxWidth: '100%' }} />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>{id ? 'Change Image:' : 'Upload Image:'}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="shortDescription">
          <Form.Label>Short Description:</Form.Label>
          <Form.Control
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
            as="textarea"
            rows={5}
            value={longDescription}
            onChange={handleLongDescriptionChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update Blog' : 'Create Blog'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlogForm;
