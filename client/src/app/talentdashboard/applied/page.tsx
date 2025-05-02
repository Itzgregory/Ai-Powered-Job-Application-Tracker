import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardApplied from "../../../features/dashboardView/components/applied/dashboardApplied";

export default function TalentDashboardApplied() {
    return (
        <TalentDashboardLayout>
            <div className="parent-page">
                <DashboardApplied />
            </div>
        </TalentDashboardLayout>
    );
}