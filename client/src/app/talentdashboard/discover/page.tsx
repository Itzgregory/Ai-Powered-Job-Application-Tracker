import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardDiscover from "../../../features/dashboardView/components/discover/dashboardDiscover";

export default function TalentDashboardDiscover() {
    return (
        <TalentDashboardLayout>
            <div className="parent-page">
                <DashboardDiscover />
            </div>
        </TalentDashboardLayout>
    );
}
