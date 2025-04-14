export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  currentRole?: string;
  currentCompany?: string;
  location?: string;
  jobStatus?: 'ready' | 'open' | 'closed';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  password: string;
  confirmPassword: string;
  termsAccepted?: boolean;
}

export interface RegistrationApiPayload {
  email: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  password: string;
  confirmPassword: string;
  termsAccepted?: boolean;
}

export interface LoginApiPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    role: string;
    token: string;
  };
}

export interface ProfileState {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    currentRole?: string;
    currentCompany?: string;
    location?: string;
    jobStatus?: 'ready' | 'open' | 'closed';
  } | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface ProfileState {
  data: User | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export interface ProfileSectionProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  handleStatusChange: (newStatus: 'ready' | 'open' | 'closed') => void;
}