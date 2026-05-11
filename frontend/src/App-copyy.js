import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import RequestCourse from "./pages/RequestCourse";
import Feedback from "./pages/Feedback";
import AdminRequests from "./pages/AdminRequests";
import InstructorDashboard from "./pages/InstructorDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/request-course" element={<RequestCourse />} />
        <Route path="/feedback" element={<Feedback />} />
	<Route path="/admin/requests" element={<AdminRequests />} />
	<Route path="/instructor" element={<InstructorDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
