"use client";
import { useDashboardData } from "../../../../hooks/talentDashboardHome/useDashboardData";
import {HeaderProfileUpdate} from "../../../Home/components/header/lastUpdate";


export const ProfileHeader = () => {
  const { lastUpdated } = useDashboardData();
  return (
    <div>
      <HeaderProfileUpdate lastUpdated={lastUpdated} />
      <header className="text-left mb-8 md:mb-10">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold text-[#004d40] mb-2">
            Edit your Wellfound profile
        </h1>
      </header>
    </div>
  );
};