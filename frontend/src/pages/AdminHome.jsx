import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AdminHome = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
     /* if (!cookies.adminToken) {
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

  return (
    <>
      <div className="home_page">
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