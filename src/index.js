import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './auth/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard';
import Layout from './Layout';
import AuthProvider from './auth/authProvider';
import SignUp from './auth/SignUp';
import CourseDetailView from './course/CourseDetailView';
import { courseLoader } from './course/CourseLoader';
import CourseEdit from './course/EditCourse';
import { ProfileMePage } from './auth/ProfileMe';
import { CreatedCourseMentor } from './course/CreatedCourseMentor';
import CreateCourse from './course/CreateCourse';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
        path: "course/:id", element: <CourseDetailView />,
        loader: courseLoader
      },
      {
        path: "course/create", element: <CreateCourse />
      },
      {
        path: "course/:id/edit", element: <CourseEdit />,
        loader: courseLoader
      },
      {
        path: "user/me", element: <ProfileMePage />
      },
      {
        path: "mentor/courses/:mentorUsername", element: <CreatedCourseMentor />
      }
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
