import TalentDashboardLayout from "@/app/talentdashboard/layout";
import DashboardMessages from "../../../features/dashboardView/components/messages/dashboardMessages";

export default function TalentDashboardMessages() {
    return (
        <TalentDashboardLayout>
            <div className="parent-page">
                <DashboardMessages />
            </div>
        </TalentDashboardLayout>
    );
}
