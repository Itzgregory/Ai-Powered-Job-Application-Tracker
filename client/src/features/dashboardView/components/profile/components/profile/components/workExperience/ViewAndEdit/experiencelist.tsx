import { useState } from "react";
import { FormConfig, FormPayload } from "../../../types/formField";
import { ExperienceListContext, useExperienceListContext } from "./experienceListContext";
import { ExperienceListItem } from "./experienceListItem";
import { ExperienceEditForm } from "./experienceListEditForm";
import { roleOptions } from "../../../utils/formExperience";

interface Experience {
  id: string;
  roleType: string;
  employer: string; 
  title: string;
  startDate: string;
  endDate?: string;
  isStillEmployed?: boolean;
  [key: string]: any;
}

interface ExperienceItemProps {
  experience: Experience;
  onEdit?: (id: string) => void;
}

interface ExperienceListProps {
  formConfig: FormConfig;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, onEdit }) => {
  const context = useExperienceListContext();
  const handleEdit = onEdit || context?.handleEdit;

  const getRoleLabel = () => {
    return (
      roleOptions.find((option) => option.value === experience.roleType)?.label ||
      experience.roleType
    );
  };

  return (
    <div className="flex justify-between items-start border-gray-500">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{getRoleLabel()}</h3>
        <p className="text-base text-gray-600">{experience.employer}</p>
        <p className="text-sm text-gray-500">
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
      {handleEdit && (
        <button
          onClick={() => handleEdit(experience.id)}
          className=" px-4 py-2 text-sm font-medium text-white hover:bg-[--active-menu-hover] transition-colors duration-200"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export const ExperienceList: React.FC<ExperienceListProps> = ({ formConfig }) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "exp_001",
      roleType: "technical",
      employer: "Tech Innovations Inc.",
      title: "Senior Developer",
      startDate: "2023-02-15",
      endDate: "2024-08-30",
      location: "remote",
      technicalSkills: ["javascript", "python"],
      description: "Developed scalable web applications.",
    },
    {
      id: "exp_002",
      roleType: "sales",
      employer: "Global Sales Ltd.",
      title: "Sales Manager",
      startDate: "2021-06-01",
      isStillEmployed: true,
      location: "hybrid",
      salesAudience: ["b2b", "enterprise"],
      quota: "$750k",
      avgDealSize: "$15k",
      description: "Led sales team to exceed targets.",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (id: string, payload: Partial<FormPayload>) => {
  setExperiences((prev) =>
    prev.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            // we will filter out null values from de payload and spread the rest
            ...Object.fromEntries(
              Object.entries(payload).filter(([_, v]) => v !== null)
            ),
            // we would ensure required fields are not overwritten with undefined
            roleType: payload.roleType ?? exp.roleType,
            employer: payload.employer ?? exp.employer,
            title: payload.title ?? exp.title,
            startDate: payload.startDate ?? exp.startDate,
          }
        : exp
    )
  );
  setEditingId(null);
};

  const handleCancel = () => {
    setEditingId(null);
  };

  const contextValue = {
    experiences,
    editingId,
    loading,
    error,
    handleEdit,
    handleSave,
    handleCancel,
  };

  if (loading) return <div className="text-gray-600 text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (experiences.length === 0) return <div className="text-gray-600 text-center">No experiences found.</div>;

  return (
    <ExperienceListContext.Provider value={contextValue}>
      <div className="w-full space-y-6">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="bg-[--bg-form-color] p-6 border border-b-2  hover:shadow-xl transition-shadow duration-300"
          >
            {editingId === experience.id ? (
              <ExperienceEditForm formConfig={formConfig} experience={experience} />
            ) : (
              <ExperienceListItem experience={experience} />
            )}
          </div>
        ))}
      </div>
    </ExperienceListContext.Provider>
  );
};

export { ExperienceListItem } from "./experienceListItem";