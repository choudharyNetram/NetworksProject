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


         <div className={`hamburger ${isActive ? "active" : ""}`} onClick={Toggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>

        <div className={`ham-menu ${isActive ? "active" : ""}`}>
        <div className="ham-container">
          <ul className="ham-subcontainer">
            <li className="ham-item">
              <Link to="/" className="ham-link linkEventListener">Home</Link>
            </li>
            <li className="ham-item">
              <Link to="/login" className="ham-link linkEventListener">Login</Link>
            </li>
            <li className="ham-item">
              <Link to="/signup" className="ham-link linkEventListener">Signup</Link>
            </li>
            <li className="ham-item">
              <Link to="/current-visitors" className="ham-link linkEventListener">Current Visitors</Link>
            </li>
              <li className="ham-item">
                <Link to="/previous-visitors" className="ham-link linkEventListener">Previous Visitors</Link>
              </li>
              <li className="ham-item">
                <Link to="/current-student-visitors" className="ham-link linkEventListener">Current Student Visitors</Link>
              </li>
              <li className="ham-item">
                <Link to="/previous-student-visitors" className="ham-link linkEventListener">Previous Student Visitors</Link>
              </li>
              <li className="ham-item">
                <Link to="/admin/student-visitorform" className="ham-link linkEventListener">Student Visitor Form</Link>
              </li>
              <li className="ham-item">
                <Link to="/admin/visitorform" className="ham-link linkEventListener">Visitor Form</Link>
              </li>
              
       
         </ul>
        
        </div>

        </div>
     
       
      <div className={`backdrop ${isActive ? "active" : ""}`}></div>

    </div>
  )
}


/*  
         <ul>
      <li className="navbar-item"><Link to="/">Home</Link></li>

      <li className="navbar-item"><Link to="/login">Login</Link></li>

      <li className="navbar-item"><Link to="/signup">Signup</Link></li>

      <li className="navbar-item"><Link to="/current-visitors">Current Visitors</Link></li>

      <li className="navbar-item"><Link to="/previous-visitors">Previous Visitors</Link></li>

      <li className="navbar-item"><Link to="/current-student-visitors">Current Student Visitors</Link></li>

      <li className="navbar-item"><Link to="/previous-student-visitors">Previous Student Visitors</Link></li>
      <li className="navbar-item"><Link to="/admin/student-visitorform">Student Visitor Form</Link></li>
      <li className="navbar-item"><Link to="/admin/visitorform">Visitor Form</Link></li>

</ul>

      
     */