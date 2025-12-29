import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/services/authService';
import { validateRegisterForm } from '@/utils/validationSchemas';
import { Button, FormInput } from '@/components';
import { useToastContext } from '@/components/toast/ToastProvider';

const Register: React.FC = () => {
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();
  const toast = useToastContext();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await registerMutation.mutateAsync(values);
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Sign Up</h1>
      <p className="text-gray-600 mb-6">Create your account to get started.</p>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={validateRegisterForm}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name ? errors.name : undefined}
            />

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

            <Button type="submit"
              variant="primary"
              animation="sweep"
              size="lg"
              fullWidth
              loading={registerMutation.isPending}
              disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Creating account...' : 'Sign Up'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
