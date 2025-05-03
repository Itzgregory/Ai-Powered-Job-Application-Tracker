export interface DashboardProps {
    loading: boolean;
    localError: string | null;
    user: any;
    jobs: any[];
    appliedJobs: any[];
    interviews: any[];
    stats: any[];
    upcomingInterviews: number;
    handleStatusChange: (status: string) => void;
    lastUpdated: number | null;
  }
  
  export interface IntroItem {
    title: string;
    content: string;
    button?: {
      label: string;
      onClick: () => void;
    };
    link?: {
      label: string;
      href: string;
    };
    image?: {
      src: string;
      alt: string;
    };
  }