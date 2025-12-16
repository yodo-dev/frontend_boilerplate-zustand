import { useAuthStore } from '@/stores/authStore';

export type AuthState = {
  isLoggedIn: boolean;
  user: { name?: string; email?: string; role?: string } | null;
  role: string | null;
};

export const useAuth = () => {
  const { isLoggedIn, user, role } = useAuthStore();
  return { isLoggedIn, user, role };
};
