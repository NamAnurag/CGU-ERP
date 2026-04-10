import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';

import StudentLogin   from './pages/student/Login';
import StudentLayout  from './components/student/Layout';
import SDashboard     from './pages/student/Dashboard';
import SCourses       from './pages/student/Courses';
import STimetable     from './pages/student/Timetable';
import SAttendance    from './pages/student/Attendance';
import SResults       from './pages/student/Results';
import SAssignments   from './pages/student/Assignments';
import SExams         from './pages/student/ExamSchedule';
import SFees          from './pages/student/FeePayment';
import SGrievances    from './pages/student/Grievances';
import SFeedback      from './pages/student/Feedback';

import TeacherLogin   from './pages/teacher/Login';
import TeacherLayout  from './components/teacher/Layout';
import TDashboard     from './pages/teacher/Dashboard';
import TAttendance    from './pages/teacher/Attendance';
import TAssignments   from './pages/teacher/Assignments';
import TMarks         from './pages/teacher/Marks';
import TStudents      from './pages/teacher/Students';
import TLeave         from './pages/teacher/Leave';
import TAnnouncements from './pages/teacher/Announcements';
import TFeedback      from './pages/teacher/Feedback';

import AdminLogin     from './pages/admin/Login';
import AdminLayout    from './components/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers     from './pages/admin/Users';
import AdminStudents  from './pages/admin/Students';
import AdminFaculty   from './pages/admin/Faculty';
import AdminCourses   from './pages/admin/Courses';
import AdminFees      from './pages/admin/Fees';
import AdminAccess    from './pages/admin/Access';
import AdminSettings  from './pages/admin/Settings';
import AdminFeedback  from './pages/admin/Feedback';

import FinanceLogin   from './pages/finance/Login';
import FinanceLayout  from './pages/finance/Layout';
import FinanceDashboard from './pages/finance/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard"   element={<SDashboard />} />
          <Route path="courses"     element={<SCourses />} />
          <Route path="timetable"   element={<STimetable />} />
          <Route path="attendance"  element={<SAttendance />} />
          <Route path="results"     element={<SResults />} />
          <Route path="assignments" element={<SAssignments />} />
          <Route path="exams"       element={<SExams />} />
          <Route path="fees"        element={<SFees />} />
          <Route path="grievances"  element={<SGrievances />} />
          <Route path="feedback"    element={<SFeedback />} />
        </Route>

        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard"     element={<TDashboard />} />
          <Route path="attendance"    element={<TAttendance />} />
          <Route path="assignments"   element={<TAssignments />} />
          <Route path="marks"         element={<TMarks />} />
          <Route path="students"      element={<TStudents />} />
          <Route path="leave"         element={<TLeave />} />
          <Route path="announcements" element={<TAnnouncements />} />
          <Route path="feedback"       element={<TFeedback />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users"     element={<AdminUsers />} />
          <Route path="students"  element={<AdminStudents />} />
          <Route path="faculty"   element={<AdminFaculty />} />
          <Route path="courses"   element={<AdminCourses />} />
          <Route path="fees"      element={<AdminFees />} />
          <Route path="access"    element={<AdminAccess />} />
          <Route path="settings"  element={<AdminSettings />} />
          <Route path="feedback"  element={<AdminFeedback />} />
        </Route>

        <Route path="/finance/login" element={<FinanceLogin />} />
        <Route path="/finance" element={<FinanceLayout />}>
          <Route index element={<Navigate to="/finance/dashboard" replace />} />
          <Route path="dashboard" element={<FinanceDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
