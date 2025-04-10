"use client";
import { useDashboardData } from "@/components/container/talentDashboard/useDashboard";
import IntroSection from "@/components/view/dashboardView/hero/intro";
import CurrentStats from "@/components/view/dashboardView/statsSection/statsSection";
import JobsSection from "@/components/view/dashboardView/JobSection/jobSections";
import InterviewsSection from "@/components/view/dashboardView/interviewSection/interviewSection";
import Link from "next/link";
import styles from "./GeneralStyles.module.css";

export default function Dashboard() {
  const { 
    loading, 
    localError, 
    user, 
    jobs, 
    appliedJobs, 
    interviews, 
    stats 
  } = useDashboardData();

  const introData = [
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (localError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">{localError}</p>
          <button 
            className="mt-4 px-4 py-2 bg-[#6b4423] text-[#FDFDFD] rounded hover:bg-[#54361a]"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Welcome{user?.firstName && `, ${user.firstName}`}!</h1>
        <p>Here's an overview of your job search activity</p>
      </header>

      <section className={styles.section}>
        <IntroSection intros={introData} />
      </section>
      
      <section className={styles.section}>
        <CurrentStats stats={stats} />
      </section>

      <section className={styles.section}>
        <div className="flex justify-between items-center mb-4">
          <h2>Recent Applications</h2>
          <Link href="/dashboard/applications" className={styles.button}>
            View All
          </Link>
        </div>
        <JobsSection jobs={appliedJobs.slice(0, 3)} />
      </section>
      
      <section className={styles.section}>
        <div className="flex justify-between items-center mb-4">
          <h2>Upcoming Interviews</h2>
          <Link href="/dashboard/interviews" className={styles.button}>
            View All
          </Link>
        </div>
        <InterviewsSection interviews={interviews.filter(interview => interview.status === "upcoming").slice(0, 3)} />
      </section>
      
      <section className={styles.recommendedJobs}>
        <div className="flex justify-between items-center mb-4">
          <h2>Recommended Jobs</h2>
          <Link href="/dashboard/jobs" className={styles.button}>
            Browse Jobs
          </Link>
        </div>
        <div className="p-4">
          <p>
            {jobs.length > 0 
              ? "Here are some job recommendations based on your profile"
              : "No recommended jobs available at the moment. Complete your profile to get personalized recommendations."}
          </p>
          {jobs.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {jobs.slice(0, 2).map(job => (
                <div key={job.id} className={styles.jobCard}>
                  <h3>{job.title}</h3>
                  <p>{job.company} • {job.location}</p>
                  <p className="text-sm mt-1">{job.jobType}</p>
                  <button className="mt-2 text-sm text-[#6b4423] hover:text-[#54361a]">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}