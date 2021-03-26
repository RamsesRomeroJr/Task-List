import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='login-signup'>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className='NavBar'>
      <div className='home-Link' >
        <NavLink className='title' exact to="/">
          <h1 className="title">Homework</h1>
        </NavLink>
      </div>
      <div className='login-button'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
