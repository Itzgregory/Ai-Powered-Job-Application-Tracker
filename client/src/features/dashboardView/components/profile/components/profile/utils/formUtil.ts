import { ProfileFormData } from '../types/profileType';

// This file is responsibile for handling the process of returning an empty profile object with default values for form initialization.
// It will be used when the backend returns null or an empty array to populate the form with empty fields.

export const initializeEmptyProfile = (): ProfileFormData => {
  return {
    id: '',
    firstName: '',
    lastName: '',
    avatar: '',
    location: '',
    primaryRole: { value: '', label: '' },
    yearsExperience: { value: '', label: '' },
    roles: [],
    bio: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    skills: [],
    workExperience:[],
    education: [],
    achievements: '',
    pronouns: { value: '', label: '' },
    gender: { value: '', label: '' },
    raceEthnicity:[],
  };
};