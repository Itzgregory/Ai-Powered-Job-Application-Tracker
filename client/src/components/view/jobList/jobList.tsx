// import React from "react";

// const JobList = ({ jobs }) => {
//   return (
//     <div className="space-y-4">
//       {jobs.map((job) => (
//         <div
//           key={job.id}
//           className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//         >
//           <h3 className="text-xl font-semibold">{job.title}</h3>
//           <p className="text-gray-600">{job.company}</p>
//           <p className="text-gray-600">{job.location}</p>
//           <p className="text-gray-600">{job.salary}</p>
//           <div className="mt-2">
//             <MatchScore score={job.matchScore} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const MatchScore = ({ score }) => {
//   let color = "red";
//   if (score >= 80) color = "green";
//   else if (score >= 50) color = "yellow";

//   return (
//     <div className="flex items-center">
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div
//           className={`h-2.5 rounded-full bg-${color}-500`}
//           style={{ width: `${score}%` }}
//         ></div>
//       </div>
//       <span className="ml-2 text-sm font-medium">{score}%</span>
//     </div>
//   );
// };

// export default JobList;