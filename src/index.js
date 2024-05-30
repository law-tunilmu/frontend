import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard';
import Layout from './Layout';
import AuthProvider from './auth/authProvider';
import SignUp from './auth/SignUp';
import CourseDetailView from './course/CourseDetailView';
import CourseEdit from './course/EditCourse';
import { ProfileMePage } from './auth/ProfileMe';
import { CreatedCourseMentor } from './course/CreatedCourseMentor';
import CreateCourse from './course/CreateCourse';
import CourseLayout from './course/CourseLayout';

import 'react-toastify/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const courseRouter =
  {
    path: 'course',
    element: <CourseLayout />,
    children: [
      { path: "create", element: <CreateCourse /> },
      { path: "detail/:id", element: <CourseDetailView /> },
      { path: "edit/:id", element: <CourseEdit /> },
      { path: "by/:mentorUsername", element: <CreatedCourseMentor /> }
    ]
  };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, element: <Dashboard />
      },
      {
        path: "login", element: <Login />
      },
      {
        path: "signup", element: <SignUp />
      },
      {
        path: "user/me", element: <ProfileMePage />
      },
      courseRouter
    ]
  }
]);

root.render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
