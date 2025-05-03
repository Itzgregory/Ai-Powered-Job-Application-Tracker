"use client";
import { useDashboardData } from "../../hooks/talentDashboardHome/useDashboardData";
import {Header} from "./components/header/header"
import IntroSection from "./components/hero/componet/intro";
import CurrentStats from "./components/statsSection/statsSection";
import ProfileSection from "./components/profileSection/components/profileSection";
import RecommendedJobsSection from "./components/svg/recommendationJobs";
import {RecentApplicationsSection} from "./components/recentApplications/recentApplication";
import {UpcomingInterviewsSection} from "./components/upcomingInterviews/upcomingInterviews";
import {ResourcesSection, QuickActionsSection} from "./components/resourceQuickActions/resource";
import {LoadingState, ErrorState} from "../../libs/loadingState"

import { 
  getMainIntroData, 
  getResourcesIntroData, 
  getQuickActionsData 
} from "./utils/dashboardUtils";

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

  if (loading) return <LoadingState />;
  if (localError) return <ErrorState error={localError} />;

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-cabin text-[#333333] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ">
      <Header />
      
      <main className="space-y-6 md:space-y-8">
        <ProfileSection 
          user={user}
          loading={loading}
          error={localError}
          lastUpdated={lastUpdated}
          handleStatusChange={handleStatusChange}
        />

        <CurrentStats stats={stats} />

        <RecommendedJobsSection jobs={jobs} />
        
        <IntroSection intros={getMainIntroData()} />

        <RecentApplicationsSection appliedJobs={appliedJobs} />

        <UpcomingInterviewsSection interviews={interviews} />

        <QuickActionsSection intros={getQuickActionsData()} />

        <ResourcesSection intros={getResourcesIntroData()} />
      </main>
    </div>
  );
}