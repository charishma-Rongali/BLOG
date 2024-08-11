// RegisterForm.jsx

import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import '../style/RegisterForm.css'; // Import your custom CSS file for additional styling
import {useNavigate} from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle registration logic here, such as sending registration data to a server
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`)
    // Reset form fields after submission (optional)
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password
      });
      if(response.status===200){
        alert("Registered Successfully");
        navigate('/');
      }
      if(response.status===409){
        alert("This email is already exixted");
        navigate('./Login');
      }
    }

    catch (error) {  
      if (error.response && error.response.status === 409) {
        alert("Username already exist");
        navigate('/Login');
      } else {
        alert("Registration failed");} }
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container className="register-form-container">
      <Form className="register-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Register</h2>

        <Form.Group controlId="formBasicUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;

