import React from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import "../style/HomePage.css";
import Newcard from "./Newcard";

function Homepage() {
  return(
    <div>
        <Container fluid className="bg bg-primary text_wrapper text-light">
            <h1>Welcome to my  Blogs</h1>
            <p>Explore the blogs from various fileds</p>
            <InputGroup className="mb-3  w-50">
                 <InputGroup.Text id="basic-addon1" className="icon_wrapper"><IoIosSearch /></InputGroup.Text>
                 <Form.Control type="search" placeholder="search your blogs here" />
            </InputGroup>
        </Container>
        <Container className="mt-5 ">
          <Newcard/>
        </Container>
    </div>
  );
}

export default Homepage;