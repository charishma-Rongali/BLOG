import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/Newcard.css'; // Ensure this CSS file is imported

const SearchResultsList = ({ results }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {results.map(blog => (
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
              <Button variant="link" onClick={() => alert("Read More clicked")}>
                Read More...
              </Button>
              <div className="text-center mt-3">
                <Button variant="primary" className="mx-2">EDIT</Button>
                <Button variant="danger" className="mx-2">DELETE</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
