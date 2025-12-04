import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { loggedIn } from '@/redux/slices/authSlice';
import { setAccessToken } from '@/utils/tokenMemory';
import { validateLoginForm } from '@/utils/validationSchemas';
import { Button, FormInput } from '@/components';
import { useToastContext } from '@/components/toast/ToastProvider';

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToastContext();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res: any = await login(values).unwrap();
      const accessToken = res?.payload?.accessToken || res?.accessToken || res?.token;
      const user = res?.payload?.user || res?.user;

      if (accessToken) {
        setAccessToken(accessToken);
      }

      dispatch(loggedIn({ user }));
      toast.success('Login successful!');
      navigate('/admin');
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'Login failed. Please check your credentials and try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <p className="text-gray-600 mb-6">Welcome back! Please login to your account.</p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validateLoginForm}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-4">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? errors.password : undefined}
            />

            <div className="flex items-center justify-between">
              <Link
                to="/forget-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={isLoading} fullWidth>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
