import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import styled from 'styled-components'

const Input = styled.input`
  margin-bottom:20px;
  margin-top:10px;
  padding: 8px 0 8px 8px;
  border:solid 0.5px lightgrey;
  box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
  justify-self: center;
  background-color:#FCFAF0;
  color:grey;
  outline:none;
`;

const SignUpButton = styled.button`
  width:75px;
  margin-bottom:4px;
  margin-top:4px;
  background-color:#FCFAF0;
  border:solid 0.5px lightgrey;
  color:grey;
  box-shadow: 0 1px 2px 0px rgba(0,0,0,0.6);
  outline:none;
  &:hover{
    border:solid 0.5px lightgrey;
    box-shadow: 0 3px 4px 0px rgba(0,0,0,0.6);
    font-weight:600;
  }
`;



function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className='formContainer'>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
          <h1 className="signup-label" >Sign Up</h1>
          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />


          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

        <SignUpButton type="submit">Sign Up</SignUpButton>
        </div>
      </form>
  );
}

export default SignupFormPage;
