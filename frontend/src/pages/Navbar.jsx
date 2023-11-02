import React, {useState} from "react"
import '../styles/navbar.css';
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isActive, setActive] = useState(false);
  const Toggle = () => {
    setActive(!isActive)
  }
  const Links = document.getElementsByClassName("linkEventListener");
  for (let index = 0; index < Links.length; index++) {
    const link = Links[index];
    link.addEventListener("click", () => {
      Toggle();
    });
  }

  return (
    <div id="navbar" className={`h-semibold ${isActive ? "active" : ""}`}>
      <ul>
        <li className="nav-item"><Link to="/">Visitors Management System</Link></li>
      </ul>
      <ul>

      <li className="navbar-item"><Link to="/">Home</Link></li>

<li className="navbar-item"><Link to="/login">Login</Link></li>

<li className="navbar-item"><Link to="/signup">Signup</Link></li>

<li className="navbar-item"><Link to="/admin">Admin Home</Link></li>

<li className="navbar-item"><Link to="/admin/login">Admin Login</Link></li>

<li className="navbar-item"><Link to="/admin/signup">Admin Signup</Link></li>

<li className="navbar-item"><Link to="/admin/dashboard">Admin Dashboard</Link></li>

<li className="navbar-item"><Link to="/admin/visitorform">Visitor Form</Link></li>
<li className="navbar-item"><Link to="/current-visitors">Current Visitors</Link></li>

<li className="navbar-item"><Link to="/previous-visitors">Previous Visitors</Link></li>

<li className="navbar-item"><Link to="/admin/student-visitorform">Student Visitor Form</Link></li>

<li className="navbar-item"><Link to="/current-student-visitors">Current Student Visitors</Link></li>

<li className="navbar-item"><Link to="/previous-student-visitors">Previous Student Visitors</Link></li>
</ul>

       
    
      <div className={`backdrop ${isActive ? "active" : ""}`}></div>

    </div>
  )
}


/*  
        <div className={`hamburger ${isActive ? "active" : ""}`} onClick={Toggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </ul>
      <div className={`ham-menu ${isActive ? "active" : ""}`}>
        <div className="ham-container">
          <ul className="ham-subcontainer">
            <li className="ham-item">
              <Link to="/" className="ham-link linkEventListener">Home</Link>
            </li>
            <li className="ham-item">
              <Link to="/council" className="ham-link linkEventListener">Council</Link>
            </li>
            <li className="ham-item">
              <Link to="/events" className="ham-link linkEventListener">Events</Link>
            </li>
            <li className="ham-item">
              <Link to="/experiences" className="ham-link linkEventListener">Experiences</Link>
            </li>
            <ul>
              <li className="subham-item">
                <Link to="/quill" className="ham-link linkEventListener">The Quill</Link>
              </li>
              <li className="subham-item">
                <Link to="/student-archive" className="ham-link linkEventListener">Student Archive</Link>
              </li>
              <li className="subham-item">
                <Link to="/alumni-corner" className="ham-link linkEventListener">Alumni Corner</Link>
              </li>
              <li className="subham-item">
                <Link to="/QnA" className="ham-link linkEventListener">QnA with Faculty</Link>
              </li>
            </ul>
          </ul>
         
        </div>*/