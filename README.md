# Frontend Boilerplate - Redux Toolkit

A modern, production-ready React boilerplate built with TypeScript, Vite, Redux Toolkit, and Tailwind CSS v4. This boilerplate provides a solid foundation for building scalable React applications with authentication, state management, form handling, and more.

## 🚀 Features

### Core Technologies
- **React 18** - Latest React with concurrent features
- **TypeScript 5.6** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Redux Toolkit 2.2** - Modern Redux with RTK Query
- **React Router v6** - Declarative routing with lazy loading

### State Management
- **Redux Toolkit** - Simplified Redux with best practices
- **Redux Persist** - Persist user data (not tokens) to localStorage
- **RTK Query** - Powerful data fetching and caching
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

### Data Visualization & Calendar
- **Recharts** - Powerful charting library for React
  - Line charts, bar charts, pie charts, and more
  - Responsive and customizable
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
├── redux/          # Redux store and slices
│   ├── api/        # RTK Query API setup
│   └── slices/     # Redux slices
├── routes/         # Route configuration
├── services/       # API service definitions
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

### API Services
RTK Query services for:
- Authentication (`authService.ts`)
- User management (`userService.ts`)
- Admin operations (`adminService.ts`)

## 📊 Data Visualization Examples

### Using Recharts
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
```

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
- @reduxjs/toolkit, react-redux, redux-persist

### UI & Styling
- tailwindcss (v4)
- lucide-react (icons)
- class-variance-authority, clsx, tailwind-merge

### Forms
- formik
- react-select

### Data Visualization & Calendar
- recharts - Charting library for React
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
