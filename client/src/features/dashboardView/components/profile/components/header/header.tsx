"use client";
import { useDashboardData } from "../../../../hooks/talentDashboardHome/useDashboardData";
import { HeaderProfileUpdate } from "../../../Home/components/header/lastUpdate";

export const ProfileHeader = () => {
  const { lastUpdated } = useDashboardData();

  return (
    <div>
      <HeaderProfileUpdate lastUpdated={lastUpdated} />
      <header className="text-left mb-6 sm:mb-8 md:mb-10">
        <h1
          className="
            font-playfair font-semibold text-[--primary-color]
            text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
            leading-tight sm:leading-snug md:leading-normal
            mb-2
          "
        >
          Edit your Wellfound profile
        </h1>
      </header>
    </div>
  );
};
