import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import '../styles/all.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {  
      /* 
     if (!cookies.adminToken) {
        navigate("/admin/login");
      }*/
      const { data } = await axios.post(
        "http://localhost:3001/admin",
        {},
        { withCredentials: true }
      );
      const { status, admin } = data;
      setAdminName(admin);
      return status
        ? toast(`Hello Admin ${admin}`, {
            position: "top-right",
          })
        : (removeCookie("adminToken"), navigate("/admin/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("adminToken");
    navigate("/admin/login");
  };
/*  <Route path="/admin/student-visitorform" element={<StudentVisitorForm />} />
        <Route path="/current-student-visitors" element={<CurrentStudentVisitors />} />
        <Route path="/previous-student-visitors" element={<PreviousSt */
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome Admin <span>{adminName}</span>
        </h4>
        
        <div>
        <h2>Visitor Management System</h2>
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
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminHome;

/*
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminHome = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [adminName, setAdminName] = useState("");

  // Create an Axios instance with the base URL
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/admin", // Set your server's URL
    withCredentials: true, // Include this line to send cookies with the requests
  });

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.adminToken) {
        navigate("/admin/login");
      }
      try {
        const { data } = await axiosInstance.post("/", {}); // Use the base URL "/"
        const { status, admin } = data;
        setAdminName(admin);
        if (status) {
          toast(`Hello Admin ${admin}`, {
            position: "top-right",
          });
        } else {
          removeCookie("adminToken");
          navigate("/admin/login");
        }
      } catch (error) {
        console.error(error);
        // Handle any errors here
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <div className="admin_home_page">
        <h4>
          {" "}
          Welcome Admin <span>{adminName}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminHome;
*/

/*
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.adminToken) {
    const verifyCookie = async () => {   
     if (!cookies.token) {
        navigate("/admin/login");
      }
    }
    const { data } = await axios.post(
      "http://localhost:3001/admin",
      {},
    const AdminHome = () => {
      ? toast(`Hello Admin ${admin}`, {
          position: "top-right",
        })
      : (removeCookie("adminToken"), navigate("/admin/login"));
      : (removeCookie("token"), navigate("/admin/login"));
  };
  verifyCookie();
}, [cookies, navigate, removeCookie]);

const logout = () => {
  removeCookie("adminToken");
  removeCookie("token");
  navigate("/admin/login");
};

    */