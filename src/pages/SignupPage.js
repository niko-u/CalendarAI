import React, { useState } from 'react';
import { services } from '../services/services';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupClick = () => {
    services.handleSignup(email, password)
      .then((user) => {
        // Handle successful signup
        console.log('User:', user);
      })
      .catch((error) => {
        // Handle signup error
        console.log('Signup error:', error);
      });
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignupClick}>Signup</button>
    </div>
  );
}

export default SignupPage;
