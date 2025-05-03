import StatusOption  from '../types/profileTypes';
import { FaBriefcase } from 'react-icons/fa';
import { createElement } from 'react';

export const getInitials = (firstName?: string, lastName?: string) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

export const statusOptions: StatusOption[] = [
  { 
    value: 'ready', 
    label: 'Ready to interview', 
    summary: 'Actively looking and available for interviews', 
    icon: createElement(FaBriefcase, { className: "text-green-500 mr-2" })
  },
  { 
    value: 'open', 
    label: 'Open to offers', 
    summary: 'Not actively searching but open to opportunities',
    icon: createElement(FaBriefcase, { className: "text-blue-500 mr-2" })
  },
  { 
    value: 'closed', 
    label: 'Closed to offers', 
    summary: 'Not interested in new opportunities',
    icon: createElement(FaBriefcase, { className: "text-gray-500 mr-2" })
  }
];