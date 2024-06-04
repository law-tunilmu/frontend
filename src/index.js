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
import { ProfileMePage } from './auth/ProfileMe';
import courseRoutes from './course/route';

import 'react-toastify/ReactToastify.css';
import forumRoutes from './forum/router';

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
      courseRoutes,
      forumRoutes
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

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
