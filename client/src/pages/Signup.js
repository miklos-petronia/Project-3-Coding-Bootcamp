import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import { useMutation } from '@apollo/client';
import { MUTATION_CREATE_USER } from '../utils/mutations';

const SignUp = () => {
  const [signUpForm, setSignUp] = useState({
    firstName: '',
    userName: '',
    userEmail: '',
    userPwd: '',
    question: '',
    answer: ''
  });
  
  const [createUser, { error, data }] = 
  useMutation(MUTATION_CREATE_USER);

  const inputSignUp = (event) => {
    setSignUp({
      ...signUpForm,
      [event.target.name]: event.target.value
    });
  };

  const signUpSubmit = async (event) => {
    event.preventDefault();   

    try {
      const { data } = await createUser({
        variables: { ...signUpForm },
      });

      localStorage.setItem("tokenId", data.createUser.userToken)
      window.location.assign("/home")
    } catch (error) {
      throw error
    }
  };

  return (
    <div>
      <h4>SignUp Form</h4>
    <Form onSubmit={signUpSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" value={signUpForm.firstName} onChange={inputSignUp} placeholder="Your First Name" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="userName" value={signUpForm.userName} onChange={inputSignUp} placeholder="Your Username" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="userEmail" value={signUpForm.userEmail} onChange={inputSignUp} placeholder="Your Email" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="userPwd" value={signUpForm.userPwd} onChange={inputSignUp} placeholder="****" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Security Question</Form.Label>
        <Form.Control type="text" name="question" value={signUpForm.question} onChange={inputSignUp} placeholder="question" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Security Answer</Form.Label>
        <Form.Control type="password" name="answer" value={signUpForm.answer} onChange={inputSignUp} placeholder="****" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {error && (
      <p>{error.message}</p>
    )}
   </div>
  );
};

export default SignUp;

