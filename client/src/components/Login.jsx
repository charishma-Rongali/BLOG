// LoginForm.jsx
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../style/LoginForm.css'; // Import your custom CSS file for additional styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, such as sending credentials to a server
    //console.log(`Username: ${username}, Password: ${password}`);
    axios.post('')
    alert("login successfull");
    // Reset form fields after submission (optional)
    setUsername('');
    setPassword('');
  };

  return (
    <Container className="login-form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
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

export default Login;

