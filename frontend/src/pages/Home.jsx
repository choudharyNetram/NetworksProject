import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../styles/all.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [adminName, setAdminName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3001/",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello Admin ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
      


    <>
      <div className="home_page">
      <h2>Visitor Management System</h2>
        <h4>
          {" "}
          Welcome Admin <span>{username}</span>
        </h4>
        
        <div>
       
        <Link to="/current-visitors">
          <button>Currently Inside Campus</button>
        </Link>
        <Link to="/previous-visitors">
          <button>Previous Visitors</button>
        </Link>
        <Link to="/current-student-visitors">
          <button>Student Related Current Visitors</button>
        </Link>
        <Link to="/previous-student-visitors">
          <button>Student Related Previous Visitors</button>
        </Link>
        <Link to="/admin/visitorform">
          <button> Visitors Form </button>
        </Link>
        <Link to="/admin/student-visitorform">
          <button> Student Visitors Form </button>
        </Link>
      </div>

        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;