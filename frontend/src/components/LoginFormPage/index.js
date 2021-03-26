import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
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

const LoginButton = styled.button`
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

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className='LoginFormContainer'>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <h1 className="login-label" >Login</h1>
          <Input
            type="text"
            value={credential}
            placeholder="Email Or Username"
            onChange={(e) => setCredential(e.target.value)}
            required
            />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        <LoginButton type="submit">Log In</LoginButton>
        <LoginButton type="submit" onClick={(e) =>{
          setCredential('demo@user.io')
          setPassword('password')
        }}>Demo</LoginButton>
        </div>
    </form>
  );
}

export default LoginFormPage;
