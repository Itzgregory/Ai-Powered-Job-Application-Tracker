import { IntroItem } from '../types/dashboardTypes';

export const getMainIntroData = (): IntroItem[] => [
  {
    title: "Profile Review",
    content: "See my Review",
    button: { label: "Review Now", onClick: () => alert("Review Clicked!") },
  },
  {
    title: "Google Curated Jobs",
    content: "Check it out",
    link: { label: "Explore Jobs", href: "/jobs" },
  },
  {
    title: "CV Template",
    content: "Download CV template",
    image: { src: "/cv-template.png", alt: "CV Template Preview" },
  },
];

export const getResourcesIntroData = (): IntroItem[] => [
  {
    image: { src: "/profile-picture", alt: "Profile picture" },
    title: "Interview Prep",
    content: "Practice common questions",
    button: { label: "Start Practicing", onClick: () => alert("Practice Started!") },
  },
];

export const getQuickActionsData = (): IntroItem[] => [
  {
    title: "Save Job Search",
    content: "Save your current search",
    button: { label: "Save Search", onClick: () => alert("Search Saved!") },
  },
  {
    title: "Network Events",
    content: "Upcoming networking opportunities",
    link: { label: "View Events", href: "/events" },
  },
];