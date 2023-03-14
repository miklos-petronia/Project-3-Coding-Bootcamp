// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="col-12 col-lg-10">
//         <div className="card">
//           <h4 className="card-header bg-dark text-light p-2">Login</h4>
//           <div className="card-body">
//             {data ? (
//               <p>
//                 Success! You may now head{' '}
//                 <Link to="/">back to the homepage.</Link>
//               </p>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 <input
//                   className="form-input"
//                   placeholder="Your email"
//                   name="email"
//                   type="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="form-input"
//                   placeholder="******"
//                   name="password"
//                   type="password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   className="btn btn-block btn-primary"
//                   style={{ cursor: 'pointer' }}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {error && (
//               <div className="my-3 p-3 bg-danger text-white">
//                 {error.message}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_FIRST_SIGN_IN, MUTATION_ADDITIONAL_SIGN_IN } from "../utils/mutations"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
// import Header from '../components/Header';

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
         
    <Form onSubmit={secondSignInSubmit}>
      <h2>{question}</h2>
     
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
  );
}

export default Login;