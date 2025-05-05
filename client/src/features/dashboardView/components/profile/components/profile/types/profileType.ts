export interface Profile {
    id: string;
    name: string;
    avatar?: string;
    location: string;
    primaryRole: { value: string; label: string };
    yearsExperience: { value: string; label: string };
    roles: { value: string; label: string }[];
    bio: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    skills: string[];
    workExperience: { company: string; role: string; startDate: string; endDate?: string }[];
    education: { school: string; degree: string; year: string }[];
    achievements?: string;
    pronouns?: { value: string; label: string };
    gender?: { value: string; label: string };
    raceEthnicity: string[];
  }