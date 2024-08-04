import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/LoginForm.css'; // Import your custom CSS file for additional styling

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      console.log("Server Response:", response.data); // Check if userId is present in the response
      const token = response.data.token;
      const userId = response.data.userId; // Make sure userId is being received
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      // console.log("Stored userId:", userId); // Verify that userId is set correctly
      // console.log("Stored token:", token);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("You are not registered");
        navigate('/Register');
      } else {
        alert("Login failed");
      }
    }
    // Reset form fields after submission
    setEmail('');
    setPassword('');
  };
  
  

  return (
    <Container className="login-form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
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
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
