import React, { useState, useEffect } from 'react';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      document.title = 'Signup';
    }, []);
  
    return (
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Signup</button>
      </form>
    );
  }
  export default Signup;
