import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../style/Newcard.css';
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('userId');
  console.log(id)

  useEffect(() => {
    fetchBlogs();
  }, []); // Empty dependency array to run once on component mount

  const fetchBlogs = () => {
    const url = id 
      ? `http://localhost:5000/get-blog/${id}` 
      : 'http://localhost:5000/get-all-blogs';

    axios.get(url)
      .then(response => {
        console.log("Blogs fetched:", response.data);
        setAllBlogs(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  };

  const toggleDescription = (blogId) => {
    setAllBlogs(prevBlogs => (
      prevBlogs.map(blog => (
        blog._id === blogId ? { ...blog, showFullDescription: !blog.showFullDescription } : blog
      ))
    ));
  };

  const handleUpdate = (blogId) => {
    navigate(`/create-blog/${blogId}`);
  };

  const handleDelete = (blogId) => {
    alert("Deleting the blog");
    axios.delete(`http://localhost:5000/delete-blog/${blogId}`)
      .then(response => {
        console.log("Blog deleted:", response.data);
        fetchBlogs(); // Fetch blogs again after deletion
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
      });
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {allBlogs.map(blog => (
        <div className="col mb-4" key={blog._id}>
          <Card className="h-100">
            <Card.Img 
              variant="top" 
              src={`http://localhost:5000/${blog.image.replace(/\\/g, '/')}`} 
              className="blog-image"
            />
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.shortDescription}</Card.Text>
              {blog.showFullDescription && (
                <Card.Text className="full-description">{blog.longDescription}</Card.Text>
              )}
              <Button variant="link" onClick={() => toggleDescription(blog._id)}>
                {blog.showFullDescription ? "Read Less" : "Read More..."}
              </Button>
              {id && blog.user === id && (
                <>
                  <Button variant="link" onClick={() => handleUpdate(blog._id)}>Update</Button>
                  <Button variant="link" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AllBlogs;
