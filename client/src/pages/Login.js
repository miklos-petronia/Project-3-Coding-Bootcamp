import React from 'react';


function Login() {
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" style={{ marginBottom: '10px' }} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" style={{ marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;
