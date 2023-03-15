import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import './Signup.css'

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
      <body className='body'>
      <h4 className='form-header'>SignUp Form</h4>
    <Form onSubmit={signUpSubmit}>
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold '>First Name</Form.Label>
        <Form.Control type="text"  class="form-control" name="firstName" value={signUpForm.firstName} onChange={inputSignUp} placeholder="Your First Name " />
      </Form.Group>
    <div class="form-group">
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold'>Username</Form.Label>
        <Form.Control type="text" name="userName" value={signUpForm.userName} onChange={inputSignUp} placeholder="Your Username" />
      </Form.Group>
      </div>
      <div class="form-group">
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="email" class="form-control" name="userEmail" value={signUpForm.userEmail} onChange={inputSignUp} placeholder="Your Email" />
      </Form.Group>
      </div>

      <div class="form-group">
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold'>Password</Form.Label>
        <Form.Control type="password" class="form-control" name="userPwd" value={signUpForm.userPwd} onChange={inputSignUp} />
      </Form.Group>
      </div>

      <div class="form-group">
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold' >Security Question</Form.Label>
        <Form.Control type="text" class="form-control" name="question" value={signUpForm.question} onChange={inputSignUp} placeholder="question" />
      </Form.Group>
      </div>

      <div class="form-group">
      <Form.Group className="hidden md:inline bg-slate-900 text-black px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800" >
        <Form.Label className='fw-bold'>Security Answer</Form.Label>
        <Form.Control type="password" class="form-control" name="answer" value={signUpForm.answer} onChange={inputSignUp}  />
      </Form.Group>
      </div>
      
      <Button variant="primary rounded-pill hover" type="submit" class="btn-submit" >
        Submit
      </Button>
    </Form>
    {error && (
      <p class="error">{error.message}</p>
    )}
    </body>
   </div>
   
  );
};

export default SignUp;

