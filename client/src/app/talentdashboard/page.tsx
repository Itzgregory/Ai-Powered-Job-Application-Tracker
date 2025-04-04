import TalentDashboardLayout from "@/app/talentdashboard/layout";
import Dashboard from "@/components/view/dashboardView/dashboard";

export default function TalentDashboard() {
  return (
    <TalentDashboardLayout>
      <div className="parent-page">
        <Dashboard />
      </div>
    </TalentDashboardLayout>
  );
}
