import RecommendatioSvg from "./recommendation";
import Link from "next/link";
import { DashboardProps } from "../../types/dashboardTypes";

export default function RecommendedJobsSection({ 
  jobs 
}: Pick<DashboardProps, 'jobs'>) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h2 className="font-playfair text-xl sm:text-2xl font-semibold text-[--primary-color] mb-1">
            Recommended Jobs
          </h2>
          <p className="text-[#666666]">
            Jobs where you're a top applicant based on your profile job search
          </p>
        </div>
        <Link 
          href="/dashboard/profile/edit/preferences"
          className="text-[#666666] flex justify-end mb-6 md:mb-8">
          Change job preferences
        </Link>
      </div>
      <div className="p-4 text-center">
        <RecommendatioSvg className="mx-auto mb-4" />
        <p className="text-[#666666] mb-4">
          {jobs.length > 0 
            ? "Here are some job recommendations based on your profile"
            : "No recommended jobs available at the moment. Complete your profile to get personalized recommendations."}
        </p>
        <Link 
          href="/dashboard/jobs" 
          className="inline-block bg-[#6b4423] text-white px-4 py-2 rounded text-sm sm:text-base font-semibold hover:bg-[#54361a] transition-colors"
        >
          Browse Jobs
        </Link>
        {jobs.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.slice(0, 3).map((job: any) => (
              <div 
                key={job.id} 
                className="bg-[#FDFDFD] border border-gray-100 p-4 rounded hover:border-[#C0A080] transition-colors"
              >
                <h3 className="font-semibold text-[#333333]">{job.title}</h3>
                <p className="text-sm text-[#666666]">{job.company} • {job.location}</p>
                <p className="text-xs mt-2 text-[#666666]">{job.jobType}</p>
                <button className="mt-3 text-sm text-[#6b4423] hover:text-[#54361a] transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}