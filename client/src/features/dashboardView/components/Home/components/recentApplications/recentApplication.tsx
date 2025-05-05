import JobsSection from "../JobSection/components/jobSections";
import Link from "next/link";

export const RecentApplicationsSection = ({ appliedJobs }: { appliedJobs: any[] }) => (
    <section className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[--primary-color]">
          Recent Applications
        </h2>
        <Link 
          href="/dashboard/applications" 
          className="inline-block bg-[#6b4423] text-white px-4 py-2 rounded text-sm sm:text-base font-semibold hover:bg-[#54361a] transition-colors"
        >
          View All
        </Link>
      </div>
      <JobsSection jobs={appliedJobs.slice(0, 3)} />
    </section>
  );