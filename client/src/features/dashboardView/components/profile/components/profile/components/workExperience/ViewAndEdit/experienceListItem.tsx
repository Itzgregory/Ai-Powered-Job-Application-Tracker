import { useExperienceListContext } from "./experienceListContext";
import { roleOptions } from "../../../utils/formExperience";
import { ReactNode } from "react";
import { FaBuilding } from "react-icons/fa";

interface ExperienceListItemProps {
  experience: {
    id: string;
    roleType: string;
    employer: string;
    startDate: string;
    endDate?: string;
    isStillEmployed?: boolean;
    [key: string]: any;
    icon?: ReactNode;
    iconPosition?: "left";
  };
}

export const ExperienceListItem: React.FC<ExperienceListItemProps> = ({ experience }) => {
  const { handleEdit } = useExperienceListContext();

  const getRoleLabel = () => {
    return (
      roleOptions.find((option) => option.value === experience.roleType)?.label ||
      experience.roleType
    );
  };

  return (
    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center w-full space-y-2 xs:space-y-0">
      <div className="flex items-center space-x-1 xs:space-x-2 md:space-x-3">
        {/* FiBriefcase icon with responsive size */}
        <div className="flex-shrink-0flex-shrink-0 text-[--text-color-grey] border border-gray-200  p-2">
          <FaBuilding className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 font-cabin">
            {getRoleLabel()}
          </h3>
          <p className="text-sm xs:text-base text-gray-600 font-cabin">{experience.employer}</p>
          <p className="text-xs xs:text-sm text-gray-500 font-cabin">
            {new Date(experience.startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {experience.isStillEmployed
              ? "Present"
              : experience.endDate
              ? new Date(experience.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleEdit(experience.id)}
        className="w-full xs:w-auto rounded-lg text-[--primary-color] px-3 xs:px-4 py-1 xs:py-2 text-xs xs:text-sm hover:text-[--active-menu-hover] transition-colors duration-200 font-cabin"
      >
        Edit
      </button>
    </div>
  );
};