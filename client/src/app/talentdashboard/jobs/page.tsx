import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardJobs from "../../../features/dashboardView/components/jobs/dashboardJobs";

export default function TalentDashboardJobs() {
    return (
        <TalentDashboardLayout>
            <div className="parent-page">
                <DashboardJobs />
            </div>
        </TalentDashboardLayout>
    );
}