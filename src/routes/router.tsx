import React, { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import PublicLayout from '@/layouts/publicLayout';
import AdminLayout from '@/layouts/adminLayout';
import ProtectedRoute from '@/pages/layout/ProtectedRoute';

const HomePage = lazy(() => import('@/pages/public/homePage'));
const AboutPage = lazy(() => import('@/pages/public/aboutPage'));
const ContactPage = lazy(() => import('@/pages/public/contactPage'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgetPassword = lazy(() => import('@/pages/auth/ForgetPassword'));
const VerifyOTP = lazy(() => import('@/pages/auth/VerifyOTP'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const AdminDashboard = lazy(() => import('@/pages/admin/dashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/users'));
const NotFound = lazy(() => import('@/pages/404'));
const Unauth = lazy(() => import('@/pages/Unauth'));

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forget-password', element: <ForgetPassword /> },
      { path: '/verify-otp', element: <VerifyOTP /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/unauth', element: <Unauth /> },
      { path: '/404', element: <NotFound /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    element: <AdminLayout />,
    children: [
      {
        // element: <ProtectedRoute roles={["admin", "manager"]} />,
        children: [
          { path: '/admin', element: <AdminDashboard /> },
          { path: '/admin/users', element: <AdminUsers /> }
        ]
      },
      { path: '/admin/*', element: <NotFound /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
export default router;

