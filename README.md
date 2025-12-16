# Frontend Boilerplate - Zustand & TanStack Query

A modern, production-ready React boilerplate built with TypeScript, Vite, Zustand, TanStack Query, and Tailwind CSS v4. This boilerplate provides a solid foundation for building scalable React applications with authentication, state management, form handling, and more.

## 🚀 Features

### Core Technologies
- **React 18** - Latest React with concurrent features
- **TypeScript 5.6** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Zustand 5.0** - Lightweight state management
- **TanStack Query 5.59** - Powerful data fetching and caching
- **React Router v6** - Declarative routing with lazy loading

### State Management
- **Zustand** - Simple, lightweight state management with minimal boilerplate
- **Zustand Persist** - Persist user data (not tokens) to localStorage
- **TanStack Query** - Powerful data fetching, caching, and synchronization
- **In-Memory Token Management** - Secure access token storage in JavaScript memory

### Authentication
- Complete authentication flow:
  - Login
  - Registration
  - Forget Password
  - Verify OTP
  - Reset Password
- Protected routes with role-based access control
- Automatic token refresh on 401 errors
- Server-managed refresh tokens (HttpOnly cookies)

### Form Management
- **Formik** - Form state management and validation
- Pre-built form components:
  - FormInput
  - FormSelect (with react-select)
  - FormTextarea
  - FormCheckbox
  - FormRadio
  - FormDatePicker
- Comprehensive validation schemas for:
  - Email
  - First/Last name (no leading spaces)
  - Mobile number
  - Password
  - Date of birth

### UI Components
- **Lucide React** - Beautiful, consistent icons
- Pre-built UI components:
  - Button (with variants, sizes, animations)
  - Card
  - Modal
  - Alert
  - Badge
- Toast notifications system
- Data tables with react-data-table-component
- Loading skeletons
- Responsive layouts (Public & Admin)

### Calendar
- **FullCalendar** - Full-featured calendar component
  - Day grid view
  - Event management
  - Customizable and extensible

### Developer Experience
- **ESLint v9** - Code quality and style enforcement
- **TypeScript** - Full type safety
- **Path Aliases** - Clean imports with `@/` prefix
- **Class Utilities** - `cn`, `cls`, and `classVariants` for Tailwind
- **Error Boundary** - Graceful error handling
- **404 Page** - User-friendly not found page

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yodo-dev/frontend_boilerplate-redux-tool-kit.git
cd frontend-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your API base URL:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 📁 Project Structure

```
src/
├── assets/          # Icons, images, SVG icons
├── components/      # Reusable UI components
│   ├── form/       # Form components
│   ├── ui/         # UI components (Button, Card, etc.)
│   ├── table/      # Data table components
│   ├── toast/      # Toast notification system
│   └── skeletons/  # Loading skeletons
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
│   ├── AdminLayout/
│   ├── PublicLayout/
│   └── features/   # Shared layout features
├── pages/          # Page components
│   ├── Auth/       # Authentication pages
│   ├── Admin/      # Admin pages
│   └── Public/     # Public pages
├── stores/         # Zustand stores
│   ├── authStore.ts    # Authentication state
│   └── userStore.ts    # User state
├── routes/         # Route configuration
├── services/       # API service definitions
├── lib/            # Library configurations
│   └── queryClient.ts  # TanStack Query client
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
    ├── cn.ts       # Class name utilities
    ├── tokenMemory.ts      # In-memory token management
    └── validationSchemas.ts # Form validation
```

## 🔐 Authentication & Token Management

### In-Memory Access Tokens
Access tokens are stored in JavaScript memory (not localStorage or cookies) for enhanced security. They are automatically cleared on page refresh.

```typescript
import { getAccessToken, setAccessToken, clearAccessToken } from '@/utils/tokenMemory';

// Get token
const token = getAccessToken();

// Set token
setAccessToken('your-access-token');

// Clear token
clearAccessToken();
```

### Refresh Token Strategy
- Refresh tokens are managed by the server via HttpOnly cookies
- Automatic token refresh on 401 errors
- Seamless user experience with automatic retry

### Protected Routes
```typescript
// In router.tsx
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<AdminDashboard />} />
</Route>
```

## 🎨 Styling & Class Utilities

### Tailwind CSS v4
This boilerplate uses Tailwind CSS v4 with PostCSS configuration.

### Class Utilities
```typescript
import { cn, cls, classVariants } from '@/utils/cn';

// cn - Primary utility for merging Tailwind classes
const classes = cn('base-class', condition && 'conditional-class', className);

// cls - Alias for clsx (conditional classes)
const classes = cls('class1', { class2: condition });

// classVariants - Component variant management (CVA)
const buttonVariants = classVariants({
  base: 'btn-base',
  variants: {
    variant: { primary: 'btn-primary', secondary: 'btn-secondary' }
  }
});
```

## 📝 Form Validation

Pre-built validation functions for common fields:

```typescript
import { validateEmail, validatePassword, validateMobile } from '@/utils/validationSchemas';

// In Formik validation
const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};
  
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);
  errors.mobile = validateMobile(values.mobile);
  
  return errors;
};
```

Available validators:
- `validateEmail` - Email format validation
- `validateFirstName` - First name (no leading spaces)
- `validateLastName` - Last name (no leading spaces)
- `validateMobile` - Mobile number validation
- `validatePassword` - Password strength validation
- `validateDateOfBirth` - Date of birth validation
- `validateNoLeadingSpaces` - General no leading/trailing spaces

## 🧭 Routing

Routes are configured in `src/routes/router.tsx`:

- **Public Routes**: Home, About, Contact, Auth pages
- **Protected Routes**: Admin dashboard, user management
- **404 Handling**: Custom not found page
- **Error Boundary**: Global error handling

## 🎯 Naming Conventions

This boilerplate follows consistent naming conventions:

| Use Case | Convention | Example |
|----------|-----------|---------|
| Variables | `camelCase` | `userName`, `isLoading` |
| Functions | `camelCase` | `handleSubmit`, `getAccessToken` |
| Props | `camelCase` | `onClick`, `isDisabled` |
| Inline Styles | `camelCase` | `{ fontSize: '16px' }` |
| CSS Class Names | `kebab-case` | `btn-primary`, `form-input` |
| React Components | `PascalCase` | `Button`, `FormInput` |
| Folders | `camelCase` | `adminLayout`, `publicLayout` |
| Pages Name | `kebab-case` | `forget-password`, `verify-otp` |

## 🔧 Configuration

### Path Aliases
Only `@/` alias is used, pointing to `src/`:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}

// Usage
import { Button } from '@/components/UI/Button';
import { useAuth } from '@/hooks/useAuth';
```

### Vite Config
The `vite.config.ts` file is in TypeScript format with proper type definitions.

### ESLint
ESLint v9 with flat config format, enforcing:
- TypeScript best practices
- React and React Hooks rules
- JSX accessibility
- Naming conventions

## 📚 Key Utilities

### Custom Hooks
- `useAuth` - Authentication state and user info
- `useToast` - Toast notifications
- `useModal` - Modal state management
- `useResponsive` - Responsive breakpoint detection

### State Management (Zustand)
```typescript
import { useAuthStore } from '@/stores/authStore';

// In component
const { isLoggedIn, user, loggedIn, userLogout } = useAuthStore();

// Login
loggedIn({ user: { name: 'John', email: 'john@example.com' } });

// Logout
userLogout();
```

### Data Fetching (TanStack Query)
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['user'],
  queryFn: authService.getUser
});

// Mutation
const mutation = useMutation({
  mutationFn: authService.login,
  onSuccess: (data) => {
    // Handle success
  }
});
```

### API Services
Service definitions for:
- Authentication (`authService.ts`)
- User management (`userService.ts`)
- Admin operations (`adminService.ts`)

## 📅 Calendar Examples

### Using FullCalendar
```typescript
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
  { title: 'Meeting', start: '2025-01-15' },
  { title: 'Conference', start: '2025-01-20' },
];

<FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  events={events}
  height="auto"
/>
```

## 🚨 Error Handling

- **Error Boundary**: Catches React component errors
- **404 Page**: Handles unmatched routes
- **Toast Notifications**: User-friendly error messages
- **API Error Handling**: Automatic retry and error display

## 📦 Dependencies

### Core
- react, react-dom
- react-router-dom
- zustand (state management)
- @tanstack/react-query, @tanstack/react-query-devtools (data fetching)

### UI & Styling
- tailwindcss (v4)
- lucide-react (icons)
- class-variance-authority, clsx, tailwind-merge

### Forms
- formik
- react-select

### Calendar
- @fullcalendar/react - Full-featured calendar component
- @fullcalendar/core - FullCalendar core
- @fullcalendar/daygrid - Day grid view plugin

### Utilities
- dateformat
- react-data-table-component
- react-multi-carousel

## 🔒 Security Features

- In-memory access token storage (not in localStorage)
- HttpOnly cookie refresh tokens
- Automatic token refresh on expiration
- Protected routes with role-based access
- Input validation and sanitization

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a boilerplate project. Feel free to fork and customize for your needs.

## 📞 Support

For issues or questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Develop By**: Muhammad Noor (Team Lead , Yodo Design)
