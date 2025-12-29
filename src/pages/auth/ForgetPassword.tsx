import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '@/services/authService';
import { validateForgetPasswordForm } from '@/utils/validationSchemas';
import { Button, FormInput } from '@/components';
import { useToastContext } from '@/components/toast/ToastProvider';

const ForgetPassword: React.FC = () => {
    const forgetPasswordMutation = useForgetPasswordMutation();
    const [emailSent, setEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const toast = useToastContext();

    const handleSubmit = async (values: { email: string }) => {
        try {
            await forgetPasswordMutation.mutateAsync({ email: values.email });
            setUserEmail(values.email);
            setEmailSent(true);
            toast.success('OTP has been sent to your email address.');
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                'Failed to send OTP. Please try again.';
            toast.error(errorMessage);
        }
    };

    if (emailSent) {
        return (
            <div className="max-w-md mx-auto p-6">
                <div className="text-center">
                    <div className="mb-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Check Your Email</h1>
                    <p className="text-gray-600 mb-6">
                        We've sent a 6-digit OTP to <strong>{userEmail}</strong>. Please check your inbox.
                    </p>
                    <Button onClick={() => navigate('/verify-otp', { state: { email: userEmail } })} fullWidth>
                        Verify OTP
                    </Button>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <Link to="/login" className="text-blue-600 hover:text-blue-700">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-2">Forget Password</h1>
            <p className="text-gray-600 mb-6">
                Enter your email address and we'll send you an OTP to reset your password.
            </p>

            <Formik
                initialValues={{ email: '' }}
                validate={validateForgetPasswordForm}
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

                        <Button type="submit" disabled={forgetPasswordMutation.isPending} fullWidth>
                            {forgetPasswordMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Remember your password?{' '}
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

export default ForgetPassword;
