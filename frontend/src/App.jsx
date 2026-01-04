import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/landing/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import AdminDashboard from "./components/SidebarAdmin";
import { ToastContainer } from "react-toastify";
import CreateGroup from "./pages/admin/groupManagement/CreateGroup";
import ListGroup from "./pages/admin/groupManagement/ListGroup";
import UpdateGroup from "./pages/admin/groupManagement/UpdateGroup";
import ListUsers from "./pages/admin/usersManagement/ListUsers";
import CreateDocument from "./pages/admin/documentManagement/CreateDocument";
import ListDocument from "./pages/admin/documentManagement/ListDocument";
import UpdateDocument from "./pages/admin/documentManagement/UpdateDocument";
import CreateExam from "./pages/admin/examManager/CreateExam";
import ListExam from "./pages/admin/examManager/ListExam";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/create_group" element={<CreateGroup />} />
        <Route path="/create_document" element={<CreateDocument />} />
        <Route path="/create_exam" element={<CreateExam />} />
        <Route path="/list_exams" element={<ListExam />} />
        <Route path="/list_documents" element={<ListDocument />} />
        <Route path="/update_document/:id" element={<UpdateDocument />} />
        <Route path="/list_users" element={<ListUsers />} />
        <Route path="/list_groups" element={<ListGroup />} />
        <Route path="/update_group/:id" element={<UpdateGroup />} />
        <Route path="/usersAdmin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
