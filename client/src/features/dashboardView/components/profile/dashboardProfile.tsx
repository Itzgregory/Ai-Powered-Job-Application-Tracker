"use client";
import { useDashboardData } from "../../hooks/talentDashboardHome/useDashboardData";
import {ProfileHeader} from "./components/header/header";
import {NavWrapper} from "./components/navigation/components/main";
import {LoadingState, ErrorState} from "../../libs/loadingState"


export default function DashboardProfile() {
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
    <div className="bg-[#FDFDFD] min-h-screen font-cabin text-[#333333] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <ProfileHeader />
      <NavWrapper />
    </div>
  );
}