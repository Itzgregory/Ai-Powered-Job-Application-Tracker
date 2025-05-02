import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardProfile from "../../../features/dashboardView/components/profile/dashboardProfile";
  

export default function TalentDashboardProfile() {
    return (
      <TalentDashboardLayout>
        <div className="parent-page">
          <DashboardProfile />
        </div>
      </TalentDashboardLayout>
    );
  }
  

