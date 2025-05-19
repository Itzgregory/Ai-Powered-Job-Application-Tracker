"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BorderlessButton } from "../../workExperience/Create/addButton";
import { AddItemForm } from "./addItemForm";
import { EducationFormConfig } from "../../../utils/formEducation";
import { FormPayload } from "../../../types/formField";

export default function AddEducation() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<FormPayload>>({});

  const handleChange = (payload: Partial<FormPayload>) => {
    setFormData(payload);
    console.log("Form data:", payload);
  };

  const handleSave = (payload: Partial<FormPayload>) => {
    console.log("Saved:", payload);
    setShowForm(false);
    setFormData({}); 
  };

  const handleToggle = () => {
    setShowForm((prev) => !prev);
    if (showForm) {
      setFormData({});
    }
  };

  return (
    <div className="w-full mt-3 mb-3 xs:mt-2 sm:mt-4">
      {showForm ? (
        <AddItemForm
          formConfig={EducationFormConfig}
          value={formData}
          onChange={handleChange}
          alignButtons="left"
          onCancel={handleToggle}
          onSave={handleSave}
        />
      ) : (
        <BorderlessButton
          icon={<FiPlus className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />}
          text="Add Education"
          onClick={handleToggle}
          className="text-[--primary-color]"
        />
      )}
    </div>
  );
}