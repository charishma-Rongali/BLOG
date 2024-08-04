import {React,useState} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "../style/HomePage.css";
// import Newcard from "./Newcard";
import AllBlogs from "./AllBlogs"
import SearchBlog from './SearchBlog';
import SearchResultsList  from './SearchResultsList';

function Homepage() {
  const [results,setResults]=useState([])
  return(
    <div>
        <Container fluid className="bg bg-primary text_wrapper text-light">
            <h1>Discover Your Next Favorite Blog</h1>
            <p>Explore a variety of interesting and informative blogs on different topics. Discover content that you’ll enjoy and learn from.</p>
            <SearchBlog setResults={setResults}/>
        </Container>
        <Container className="mt-3">
        {results.length > 0 ? (
          <SearchResultsList results={results} />
        ) : (
          <AllBlogs />
        )}
      </Container>
    </div>
  );
}

export default Homepage;