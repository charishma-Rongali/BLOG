// LoginForm.jsx
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/LoginForm.css'; // Import your custom CSS file for additional styling


function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleUsernameChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      if(response.status==200){
        navigate('/');
      }
    }catch(err){
      if(err.response && err.response.status===401){
        alert("you are not registered");
        navigate('/register');
      }else{
        alert("Login failed");
      }
    }
    // Handle login logic here, such as sending credentials to a server
    //console.log(`Username: ${username}, Password: ${password}`);
    // Reset form fields after submission (optional)
    setemail('');
    setPassword('');
  };

  return (
    <Container className="login-form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter eamil"
            value={email}
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

