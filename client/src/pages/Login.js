
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_FIRST_SIGN_IN, MUTATION_ADDITIONAL_SIGN_IN } from "../utils/mutations"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

function Login() {
  const [firstSignInForm, setFirstSignIn] = useState({ userName: "", userPwd: "" })
  const [firstLogin, { error: firstLoginError, data: firstLoginData }] = useMutation(MUTATION_FIRST_SIGN_IN)
  const [secondSignInForm, setSecondSignIn] = useState({ userName: "", answer: "" })
  const [secondLogin, { error: secondLoginError, data: secondLoginData }] = useMutation(MUTATION_ADDITIONAL_SIGN_IN)

  const [firstSignInStatus, setFirstStatus] = useState("")
  const [question, setQuestion] = useState("")

  const inputFirstSignIn = (event) => {
    setFirstSignIn({
      ...firstSignInForm,
      [event.target.name]: event.target.value
    })
    if (event.target.name === "userName") {
      setSecondSignIn({
        ...secondSignInForm,
        userName: event.target.value
      })
    }
  }


  const inputSecondSignIn = (event) => {
    setSecondSignIn({
      ...secondSignInForm,
      [event.target.name]: event.target.value
    })
  }

  const firstSignInSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await firstLogin({
        variables: { ...firstSignInForm }
      })
      if (!data) {
        return
      }

      setFirstStatus(true)
      setQuestion(data.signIn.question)

    } catch (error) {
      throw error
    }
    setFirstSignIn({
      userName: "",
      userPwd: "",
    })

  }

  const secondSignInSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await secondLogin({
        variables: { ...secondSignInForm }
      })
      
      localStorage.setItem("tokenId", data.additionalSignIn.userToken)
      window.location.assign("/home")

    } catch (error) {
      throw error
    }
    setSecondSignIn({
      userName: "",
      answer: "",
    })
  }



  return (
    <div>
      <h2 style={{paddingLeft:"200px", paddingRight:"200px", paddingTop:"100px"}}>
        <span>Welcome to Code Taker <br></br> <br></br>
            Login to start your Note Repository!
        </span>
      </h2>
      <br></br>
      <div style={{paddingLeft:"200px", paddingRight:"200px", paddingTop:"50px"}}>
      <h4>Login Form</h4>
    <Form onSubmit={firstSignInSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>username</Form.Label>
        <Form.Control type="text" name="userName" value={firstSignInForm.userName} onChange={inputFirstSignIn} placeholder="Your username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="userPwd" value={firstSignInForm.userPwd} onChange={inputFirstSignIn} placeholder="*****" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {firstLoginError && (
      <p>{firstLoginError.message}</p>
    )}


      {firstSignInStatus === true && (
         
    <Form className="pt-5" onSubmit={secondSignInSubmit}>
      <h4>{question}</h4>
     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Answer</Form.Label>
        <Form.Control type="password" name="answer" value={secondSignInForm.answer} onChange={inputSecondSignIn} placeholder="*****" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      )}
      </div>

    </div>
  );
}

export default Login;