import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'

export default function NavBar({ user, design, handleLogout }) {
  return (
    <nav id="nav" className={(design===1?'nav':'e')}>
    <img id = "logoImg" src="https://i.imgur.com/qkIuXh6.png" alt=""></img>
      {user ? 
      <>
      <div id="welcome">Welcome:&nbsp;{user.name}</div>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/profile">Profile</NavLink>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/shared">Shared</NavLink>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/addPhotos">AddPhotos</NavLink>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/" onClick={handleLogout}>Logout</NavLink>
      </>
      :
      <>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/signup">SignUp</NavLink>
      <NavLink className={(design===1?'navLinks':'e')} exact to="/login">Login</NavLink>
      </>
    }
      </nav>
  );
}
