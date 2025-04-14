"use client";
import { useDashboardData } from "../../../container/talentDashboard/useDashboard";
import IntroSection from "./hero/intro";
import CurrentStats from "./statsSection/statsSection";
import JobsSection from "./JobSection/jobSections";
import InterviewsSection from "./interviewSection/interviewSection";
import ProfileSection from "./profileSection/profileSection";
import RecommendatioSvg from "./svg/recommendation";
import Link from "next/link";

export default function Dashboard() {
  const { 
    loading, 
    localError, 
    user, 
    jobs, 
    appliedJobs, 
    interviews, 
    stats,
    upcomingInterviews,
    handleStatusChange,
    lastUpdated
  } = useDashboardData();

  const mainIntroData = [
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

  const resourcesIntroData = [
    {
      image: { src: "/profile-picture", alt: "Profile picture" },
      title: "Interview Prep",
      content: "Practice common questions",
      button: { label: "Start Practicing", onClick: () => alert("Practice Started!") },
    },
  ];

  const quickActionsData = [
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
            className="mt-4 px-4 py-2 bg-[#6b4423] text-white rounded hover:bg-[#54361a] transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-cabin text-[#333333] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-left mb-8 md:mb-10">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-[#004d40] mb-2">
          Welcome back!...
        </h1>
        <p className="text-base sm:text-lg text-[#666666]">
          Here's an overview of your job search activity
        </p>
      </header>

      <div className="flex justify-end mb-6 md:mb-8">
        <p className="text-sm text-gray-500">
          Profile last updated on: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
        </p>
      </div>

      <main className="space-y-6 md:space-y-8">
        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <ProfileSection 
            user={user}
            loading={loading}
            error={localError}
            lastUpdated={lastUpdated}
            handleStatusChange={handleStatusChange}
          />
        </section>

        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <CurrentStats stats={stats} />
        </section>

        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[#004d40] mb-1">
                Recommended Jobs
              </h2>
              <p className="text-[#666666]">
                Jobs where you're a top applicant based on your profile job search
              </p>
            </div>
            <Link 
              href="/dashboard/profile/edit/preferences"
              className="text-[#666666] flex justify-end mb-6 md:mb-8">
              Change job preferences
            </Link>
          </div>
          <div className="p-4 text-center">
            <RecommendatioSvg className="mx-auto mb-4" />
            <p className="text-[#666666] mb-4">
              {jobs.length > 0 
                ? "Here are some job recommendations based on your profile"
                : "No recommended jobs available at the moment. Complete your profile to get personalized recommendations."}
            </p>
            <Link 
              href="/dashboard/jobs" 
              className="inline-block bg-[#6b4423] text-white px-4 py-2 rounded text-sm sm:text-base font-semibold hover:bg-[#54361a] transition-colors"
            >
              Browse Jobs
            </Link>
            {jobs.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.slice(0, 3).map(job => (
                  <div 
                    key={job.id} 
                    className="bg-[#FDFDFD] border border-gray-100 p-4 rounded hover:border-[#C0A080] transition-colors"
                  >
                    <h3 className="font-semibold text-[#333333]">{job.title}</h3>
                    <p className="text-sm text-[#666666]">{job.company} • {job.location}</p>
                    <p className="text-xs mt-2 text-[#666666]">{job.jobType}</p>
                    <button className="mt-3 text-sm text-[#6b4423] hover:text-[#54361a] transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <IntroSection intros={mainIntroData} />
        </section>

        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[#004d40]">
              Recent Applications
            </h2>
            <Link 
              href="/dashboard/applications" 
              className="inline-block bg-[#6b4423] text-white px-4 py-2 rounded text-sm sm:text-base font-semibold hover:bg-[#54361a] transition-colors"
            >
              View All
            </Link>
          </div>
          <JobsSection jobs={appliedJobs.slice(0, 3)} />
        </section>
        
        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[#004d40]">
              Upcoming Interviews
            </h2>
            <Link 
              href="/dashboard/interviews" 
              className="inline-block bg-[#6b4423] text-white px-4 py-2 rounded text-sm sm:text-base font-semibold hover:bg-[#54361a] transition-colors"
            >
              View All
            </Link>
          </div>
          <InterviewsSection interviews={interviews.filter(interview => interview.status === "upcoming").slice(0, 3)} />
        </section>

        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[#004d40] mb-4">
            Quick Actions
          </h2>
          <IntroSection intros={quickActionsData} />
        </section>

        <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
          <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[#004d40] mb-4">
            Resources For You
          </h2>
          <IntroSection intros={resourcesIntroData} />
        </section>
      </main>
    </div>
  );
}