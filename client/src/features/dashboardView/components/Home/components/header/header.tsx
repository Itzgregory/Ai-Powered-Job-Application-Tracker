"use client";
import { useDashboardData } from "../../../../hooks/talentDashboardHome/useDashboardData";
import {HeaderProfileUpdate} from "./lastUpdate";
import {HeaderWelcome} from "./message";

export const Header = () => {
  const { lastUpdated } = useDashboardData();
  return (
    <div>
      <HeaderWelcome/>
      <HeaderProfileUpdate lastUpdated={lastUpdated} />
    </div>
  );
};