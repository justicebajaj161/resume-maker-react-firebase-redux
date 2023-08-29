import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../redux/authSlice';  // Assuming you've kept your slices in a 'redux' folder

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthentication();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const checkAuthentication = () => {
    let yourpholioData = JSON.parse(localStorage.getItem('yourpholio'));
    if (yourpholioData && yourpholioData.uid) {
      dispatch(authenticate(true));
    } else {
      dispatch(authenticate(false));
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yourpholio'); 
    dispatch(authenticate(false));
    navigate('/signin'); 
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {authStatus && (
            <>
              <NavLink to="/" activeClassName="active-link">Details</NavLink>
              <NavLink to="/resume" activeClassName="active-link">Resume</NavLink>
            </>
          )}
        </div>

        <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
          {!authStatus && (
            <>
              <NavLink to="/signin" activeClassName="active-link">Sign In</NavLink>
              <NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink>
            </>
          )}
          {authStatus && (
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
