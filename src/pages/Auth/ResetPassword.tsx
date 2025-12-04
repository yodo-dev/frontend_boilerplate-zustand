import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '@/services/authService';
import { validateResetPasswordForm } from '@/utils/validationSchemas';
import { Button, FormInput } from '@/components';
import { useToastContext } from '@/components/toast/ToastProvider';

const ResetPassword: React.FC = () => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToastContext();

    // Get email and otp from location state
    const email = (location.state as any)?.email || '';
    const otp = (location.state as any)?.otp || '';

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        if (!email || !otp) {
            toast.error('Session expired. Please start the password reset process again.');
            navigate('/forget-password');
            return;
        }

        try {
            await resetPassword({ email, otp, password: values.password }).unwrap();
            toast.success('Password reset successfully! Please login with your new password.');
            navigate('/login');
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                'Failed to reset password. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
            <p className="text-gray-600 mb-6">
                Enter your new password below.
            </p>

            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validate={validateResetPasswordForm}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form className="space-y-4">
                        <FormInput
                            label="New Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && errors.password ? errors.password : undefined}
                        />

                        <FormInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                        />

                        <Button type="submit" disabled={isLoading} fullWidth>
                            {isLoading ? 'Resetting password...' : 'Reset Password'}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            <Link to="/login" className="text-blue-600 hover:text-blue-700">
                                Back to Login
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;

