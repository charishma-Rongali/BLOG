import React, { useState } from 'react';

const BlogForm = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to server, etc.
    const formData = {
      image,
      title,
      shortDescription,
      longDescription
    };
    console.log(formData);
    // Reset form after submission if needed
    setImage('');
    setTitle('');
    setShortDescription('');
    setLongDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={handleImageChange}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="shortDescription">Short Description:</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={shortDescription}
          onChange={handleShortDescriptionChange}
          required
        />
      </div>
      <div>
        <label htmlFor="longDescription">Long Description:</label>
        <textarea
          id="longDescription"
          name="longDescription"
          value={longDescription}
          onChange={handleLongDescriptionChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
