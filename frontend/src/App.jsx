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
import CreateDocument from "./pages/teacher/documentManagement/CreateDocument";
import ListDocument from "./pages/teacher/documentManagement/ListDocument";
import UpdateDocument from "./pages/teacher/documentManagement/UpdateDocument";
import CreateExam from "./pages/teacher/examManager/CreateExam";
import UpdateExam from "./pages/teacher/examManager/UpdateExam";
import ListExam from "./pages/teacher/examManager/ListExam";
import ListSubjects from "./pages/admin/subjectManegment.jsx/ListSubjects";
import CreateSubject from "./pages/admin/subjectManegment.jsx/CreateSubject";
import UpdateSubject from "./pages/admin/subjectManegment.jsx/UpdateSubject";
import CreateSession from "./pages/admin/sessionManegmet.jsx/CreateSession";
import SessionList from "./pages/admin/sessionManegmet.jsx/ListeSession";
import UpdateSession from "./pages/admin/sessionManegmet.jsx/UpdateSession";
import StudentCalendar from "./pages/student/StudentCalendar";
import SubjectStudent from "./pages/student/StudentSubjects";
import SubjectDocuments from "./pages/student/SubjectDocuments";
import Sidebar from "./layout/SideBar";
import AppLayout from "./layout/GenericLayout";
import Unauthorized from "./pages/commun/Unauthorized";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import Profile from "./pages/commun/Profile";
import TeacherCalendar from "./pages/teacher/teacherCalendar/TeacherCalendar";

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
        <Route path="/update_exam/:id" element={<UpdateExam />} />
        <Route path="/list_exams" element={<ListExam />} />
        <Route path="/list_documents" element={<ListDocument />} />
        <Route
          path="/teacher/documents/update/:id"
          element={<UpdateDocument />}
        />
        <Route
          path="/list_users"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AppLayout>
                <ListUsers />
              </AppLayout>
            </ProtectedRoutes>
          }
        />
        <Route path="/list_groups" element={<ListGroup />} />
        <Route path="/update_group/:id" element={<UpdateGroup />} />
        <Route path="/usersAdmin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*  ----------------------  */}
        <Route path="/subjects-list" element={<ListSubjects />} />
        <Route path="/create-subject" element={<CreateSubject />} />
        <Route path="/update-subject/:id" element={<UpdateSubject />} />
        {/*  ----------sessions ------------  */}
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/liste-sessions" element={<SessionList />} />
        <Route path="/update-session/:id" element={<UpdateSession />} />
        {/* -------------------calendar --------------  */}
        <Route path="/student-calendar" element={<StudentCalendar />} />
        <Route path="/student-subjects" element={<SubjectStudent />} />
        <Route path="/subject_documents/:id" element={<SubjectDocuments />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={["admin", "teacher", "student"]}>
              <AppLayout>
                <Profile />
              </AppLayout>{" "}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/teacher-calendar"
          element={
            <ProtectedRoutes allowedRoles={["teacher"]}>
              <AppLayout>
                <TeacherCalendar />
              </AppLayout>{" "}
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
