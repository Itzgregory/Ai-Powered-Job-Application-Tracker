import { useState } from "react";
import { FormConfig, FormPayload } from "../../../types/formField";
import { EducationListContext } from "./educationListContext";
import { EducationListItem } from "./EducationListItem";
import { EducationEditForm } from "./EducationEditForm";

interface Education {
  id: string;
  Education: string;
  Graduation: string;
  Degree: string;
  Major: string;
  gpa?: string;
  [key: string]: any;
}

interface EducationListProps {
  formConfig: FormConfig;
}

export const EducationList: React.FC<EducationListProps> = ({ formConfig }) => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "edu_001",
      Education: "MIT",
      Graduation: "05/2023",
      Degree: "computer-science",
      Major: "Software Engineering",
      gpa: "3.8",
    },
    {
      id: "edu_002",
      Education: "MIT",
      Graduation: "05/2023",
      Degree: "computer-science",
      Major: "Software Engineering",
      gpa: "3.8",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (id: string, payload: Partial<FormPayload>) => {
    setEducations((prev) =>
      prev.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              ...Object.fromEntries(
                Object.entries(payload).filter(([_, v]) => v !== null)
              ),
              Education: typeof payload.Education === "string" ? payload.Education : edu.Education,
              Graduation: typeof payload.Graduation === "string" ? payload.Graduation : edu.Graduation,
              Degree: typeof payload.Degree === "string" ? payload.Degree : edu.Degree,
              Major: typeof payload.Major === "string" ? payload.Major : edu.Major,
            }
          : edu
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const contextValue = {
    educations,
    editingId,
    loading,
    error,
    handleEdit,
    handleSave,
    handleCancel,
  };

  if (loading) return <div className="text-gray-600 text-center font-cabin">Loading...</div>;
  if (error) return <div className="text-red-600 text-center font-cabin">{error}</div>;
  if (educations.length === 0) return <div className="text-gray-600 text-center font-cabin">No education entries found.</div>;

  return (
    <EducationListContext.Provider value={contextValue}>
      <div className="w-full space-y-6">
        {educations.map((education) => (
          <div
            key={education.id}
            className="bg-[--bg-form-color] p-6 border border-b-2  hover:shadow-xl transition-shadow duration-300"
          >
            {editingId === education.id ? (
              <EducationEditForm formConfig={formConfig} education={education} />
            ) : (
              <EducationListItem education={education} />
            )}
          </div>
        ))}
      </div>
    </EducationListContext.Provider>
  );
};