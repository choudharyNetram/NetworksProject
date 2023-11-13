import { Route, Routes } from "react-router-dom";
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
