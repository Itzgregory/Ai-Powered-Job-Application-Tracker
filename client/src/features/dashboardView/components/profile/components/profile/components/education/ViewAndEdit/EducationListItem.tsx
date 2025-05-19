import { useEducationListContext } from "./educationListContext";
import { majorsOptions } from "../../../utils/formEducation";
import { ReactNode } from "react";
import { GiGraduateCap } from "react-icons/gi";

interface EducationListItemProps {
  education: {
    id: string;
    Education: string;
    Graduation: string;
    Degree: string;
    Major: string;
    gpa?: string;
    [key: string]: any;
    icon?: ReactNode;
    iconPosition?: "left";
  };
}

export const EducationListItem: React.FC<EducationListItemProps> = ({ education }) => {
  const context = useEducationListContext();
  const handleEdit = context ? context.handleEdit : undefined;

  const getDegreeLabel = () => {
    return (
      majorsOptions.find((option) => option.value === education.Degree)?.label ||
      education.Degree
    );
  };

  const formatGraduationDate = (graduation: string) => {
    const [month, year] = graduation.split("/");
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center w-full space-y-2 xs:space-y-0">
      <div className="flex items-center space-x-1 xs:space-x-2 md:space-x-3">
        <div className="flex-shrink-0flex-shrink-0 text-[--text-color-grey] border border-gray-200  p-2">
          <GiGraduateCap className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 font-cabin">
            {education.Education}
          </h3>
          <p className="text-sm xs:text-base text-gray-600 font-cabin">{getDegreeLabel()}, {education.Major}</p>
          <p className="text-xs xs:text-sm text-gray-500 font-cabin">
            Graduated: {formatGraduationDate(education.Graduation)}
          </p>
        </div>
      </div>
      {handleEdit && (
        <button
          onClick={() => handleEdit(education.id)}
          className="w-full xs:w-auto rounded-lg text-[--primary-color] px-3 xs:px-4 py-1 xs:py-2 text-xs xs:text-sm hover:text-[--active-menu-hover] transition-colors duration-200 font-cabin"
      >
        Edit
      </button>
      )}
    </div>
  );
};