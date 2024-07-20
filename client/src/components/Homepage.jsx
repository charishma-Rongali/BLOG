import {React,useState} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "../style/HomePage.css";
import Newcard from "./Newcard";
import SearchBlog from './SearchBlog';
import SearchResultsList  from './SearchResultsList';

function Homepage() {
  const [results,setResults]=useState([])
  return(
    <div>
        <Container fluid className="bg bg-primary text_wrapper text-light">
            <h1>Welcome to my  Blogs</h1>
            <p>Explore the blogs from various fileds</p>
            <SearchBlog setResults={setResults}/>
        </Container>
        <Container className="mt-3">
        {results.length > 0 ? (
          <SearchResultsList results={results} />
        ) : (
          <Newcard />
        )}
      </Container>
    </div>
  );
}

export default Homepage;