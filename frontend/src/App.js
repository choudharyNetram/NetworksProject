import { Route, Routes } from "react-router-dom";
import { Login, Signup, VisitorForm, Home, AdminLogin, AdminSignup, AdminHome, CurrentVisitors, PreviousVisitors, StudentVisitorForm, CurrentStudentVisitors, PreviousStudentVisitors } from "./pages";
import Navbar from './pages/Navbar';

function App() {
  const WithNavbar = ({ element }) => (
    <div>
      <Navbar />
      {element}
    </div>
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/admin/visitorform"
          element={<WithNavbar element={<VisitorForm />} />}
        />
        <Route
          path="/current-visitors"
          element={<WithNavbar element={<CurrentVisitors />} />}
        />
        <Route
          path="/previous-visitors"
          element={<WithNavbar element={<PreviousVisitors />} />}
        />
        <Route
          path="/admin/student-visitorform"
          element={<WithNavbar element={<StudentVisitorForm />} />}
        />
        <Route
          path="/current-student-visitors"
          element={<WithNavbar element={<CurrentStudentVisitors />} />}
        />
        <Route
          path="/previous-student-visitors"
          element={<WithNavbar element={<PreviousStudentVisitors />} />}
        />
      </Routes>
    </div>
  );
}

export default App;



/*import { Route, Routes } from "react-router-dom";
import { Login, Signup, VisitorForm } from "./pages";
import Home from "./pages/Home";
import { AdminLogin, AdminSignup } from "./pages";
import AdminHome from "./pages/AdminHome";
import CurrentVisitors from './pages/CurrentVisitors'; // Create this component
import PreviousVisitors from './pages/PreviousVisitors'; // Create this component
import StudentVisitorForm from './pages/StudentVisitorForm' ; 
import PreviousStudentVisitors from './pages/PreviousStudentV' ; 
import CurrentStudentVisitors from './pages/CurrentStdVis' ; 
import Navbar from './pages/Navbar' ; 
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/visitorform" element={<div>  <Navbar/>  <VisitorForm />  </div>} />
        <Route path="/current-visitors" element={<div>  <Navbar/>  <CurrentVisitors />  </div>} />
        <Route path="/previous-visitors" element={<div>  <Navbar/>  <PreviousVisitors />  </div>} />
        <Route path="/admin/student-visitorform" element={<div>  <Navbar/>  <StudentVisitorForm /> </div>} />
        <Route path="/current-student-visitors" element={<div>  <Navbar/> <CurrentStudentVisitors /></div>} />
        <Route path="/previous-student-visitors" element={<div>  <Navbar/>  <PreviousStudentVisitors /></div>} />

      </Routes>
    </div>
  );
}



export default App;
*/