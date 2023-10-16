
import { Route, Routes } from "react-router-dom";
import { Login, MainComponent, Signup, VisitorForm } from "./pages";
import Home from "./pages/Home";
import { AdminLogin, AdminSignup } from "./pages";
import AdminHome from "./pages/AdminHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<MainComponent />} />
        <Route path="/admin/visitorform" element={<VisitorForm />} />

      </Routes>
    </div>
  );
}

export default App;