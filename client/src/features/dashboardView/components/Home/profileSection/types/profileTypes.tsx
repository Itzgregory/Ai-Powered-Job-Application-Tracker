import { ReactNode } from 'react';
import { User, JobStatus } from '../../../../../../types/user/user.types';


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
  handleStatusChange: (newStatus: JobStatus) => void;
}

export default interface StatusOption {
    value: string;
    label: string;
    summary: string;
    icon: ReactNode;
  }