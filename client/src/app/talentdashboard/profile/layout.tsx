import TalentDashboardLayout from "@/app/talentdashboard/layout";
import { ProfileHeader } from "@/features/dashboardView/components/profile/components/header/header";
import { NavWrapper } from "@/features/dashboardView/components/profile/components/navigation/components/main";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TalentDashboardLayout>
      <div className="flex-1 flex flex-col bg-[#FDFDFD] min-h-screen font-cabin text-[#333333] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ">
        <ProfileHeader />
        <NavWrapper />
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </TalentDashboardLayout>
  );
}