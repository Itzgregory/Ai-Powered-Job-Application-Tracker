"use client";

import { useDashboardData } from "@/components/container/talentDashboard/useDashboard";
import IntroSection from "@/components/view/dashboardView/hero/intro";
import CurrentStats from "@/components/view/dashboardView/statsSection/statsSection";
import JobsSection from "@/components//view/dashboardView/JobSection/jobSections";
import InterviewsSection from "@/components/view/dashboardView/interviewSection/interviewSection";
import Link from "next/link";

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
      <div className="parent-page p-4 flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (localError) {
    return (
      <div className="parent-page p-4 flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">{localError}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-page p-4 pb-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your job search activity
        </p>
      </header>

      <section className="mb-10">
        <IntroSection intros={introData} />
      </section>
      
      <section className="mb-10">
        <CurrentStats stats={stats} />
      </section>
      
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-blue-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <JobsSection jobs={appliedJobs.slice(0, 3)} />
      </section>
      
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
          <Link href="/dashboard/interviews" className="text-blue-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <InterviewsSection interviews={interviews.filter(interview => interview.status === "upcoming").slice(0, 3)} />
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended Jobs</h2>
          <Link href="/dashboard/jobs" className="text-blue-600 text-sm hover:underline">
            Browse Jobs
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600 text-center">
            {jobs.length > 0 
              ? "Here are some job recommendations based on your profile"
              : "No recommended jobs available at the moment. Complete your profile to get personalized recommendations."}
          </p>
          {jobs.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {jobs.slice(0, 2).map(job => (
                <div key={job.id} className="border border-gray-200 rounded p-3">
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.jobType}</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}