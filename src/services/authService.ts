import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

type Credentials = { email: string; password: string };
type RegisterDto = { name: string; email: string; password: string };
type ForgetPasswordDto = { email: string };
type VerifyOTPDto = { email: string; otp: string };
type ResetPasswordDto = { email: string; otp: string; password: string };

// API functions
const loginApi = async (credentials: Credentials) => {
  return apiRequest('auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
};

const registerApi = async (data: RegisterDto) => {
  return apiRequest('auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const refreshApi = async () => {
  return apiRequest('auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });
};

const logoutApi = async () => {
  return apiRequest('auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
};

const getProfileApi = async () => {
  return apiRequest('auth/me');
};

const forgetPasswordApi = async (data: ForgetPasswordDto) => {
  return apiRequest('auth/forget-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const verifyOTPApi = async (data: VerifyOTPDto) => {
  return apiRequest('auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const resetPasswordApi = async (data: ResetPasswordDto) => {
  return apiRequest('auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// TanStack Query hooks
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};

export const useRefreshMutation = () => {
  return useMutation({
    mutationFn: refreshApi,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useGetProfileQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    enabled,
  });
};

export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
  });
};

export const useVerifyOTPMutation = () => {
  return useMutation({
    mutationFn: verifyOTPApi,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
};
