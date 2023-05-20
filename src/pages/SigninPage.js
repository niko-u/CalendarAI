import React, { useState, useContext } from 'react';
import { services } from '../services/services';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSigninClick = () => {
    services
      .handleSignin(email, password)
      .then((user) => {
        // Handle successful login
        console.log('User Logged in:', user);
        setUser(user);
        navigate('/');
      })
      .catch((error) => {
        // Handle login error
        console.log('Login error:', error);
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSigninClick}>Login</button>
    </div>
  );
}

export default SigninPage;
