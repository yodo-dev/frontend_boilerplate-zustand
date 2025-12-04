import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useVerifyOTPMutation } from '@/services/authService';
import { validateVerifyOTPForm } from '@/utils/validationSchemas';
import { Button, FormInput } from '@/components';
import { useToastContext } from '@/components/toast/ToastProvider';

const VerifyOTP: React.FC = () => {
    const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToastContext();

    // Get email from location state or query params
    const email = (location.state as any)?.email || new URLSearchParams(location.search).get('email') || '';

    const handleSubmit = async (values: { otp: string }) => {
        if (!email) {
            toast.error('Email is required. Please go back to forget password page.');
            navigate('/forget-password');
            return;
        }

        try {
            await verifyOTP({ email, otp: values.otp }).unwrap();
            toast.success('OTP verified successfully!');
            navigate('/reset-password', { state: { email, otp: values.otp } });
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                'Invalid OTP. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-2">Verify OTP</h1>
            <p className="text-gray-600 mb-6">
                Enter the 6-digit OTP sent to your email address.
            </p>

            <Formik
                initialValues={{ otp: '' }}
                validate={validateVerifyOTPForm}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form className="space-y-4">
                        <FormInput
                            label="OTP Code"
                            name="otp"
                            type="text"
                            value={values.otp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.otp && errors.otp ? errors.otp : undefined}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                        />

                        <Button type="submit" disabled={isLoading} fullWidth>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Didn't receive OTP?{' '}
                            <Link to="/forget-password" className="text-blue-600 hover:text-blue-700 font-medium">
                                Resend OTP
                            </Link>
                        </div>

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

export default VerifyOTP;

