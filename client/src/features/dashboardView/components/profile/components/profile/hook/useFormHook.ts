import { useState } from "react";
import { FormConfig, FormPayload } from "../types/formField";

export const useFormState = (config: FormConfig) => {
  // Initialize formData with types matching FormPayload
  const [formData, setFormData] = useState<Partial<FormPayload>>({});

  // Update field with type-safe values
  const updateField = (
    key: keyof FormPayload,
    value: string | string[] | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Reset form data
  const resetFields = () => {
    setFormData({});
  };

  // Build payload matching FormPayload type
  const buildPayload = (): FormPayload => {
    const payload: FormPayload = {
      employer: formData.employer || "",
      title: formData.title || "",
      startDate: formData.startDate || "",
      roleType: formData.roleType || "",
      endDate: formData.isStillEmployed ? "Present" : formData.endDate,
      isStillEmployed: formData.isStillEmployed,
      description: formData.description,
      customRole: formData.customRole,
      skills: formData.skills,
      location: formData.location,
    };

    // Include conditional fields only if conditions are met
    (config.fields ?? []).forEach((field) => {
      if (
        field.conditional &&
        formData[field.conditional.key as keyof FormPayload] !== field.conditional.value
      ) {
        delete payload[field.key as keyof FormPayload];
      }
    });

    return payload;
  };

  // Validate required fields
  const isFormValid = () => {
    const requiredFields = (config.fields || []).filter(
      (field) =>
        field.required &&
        (!field.conditional ||
          formData[field.conditional.key as keyof FormPayload] === field.conditional.value) &&
        !(field.key === "endDate" && formData.isStillEmployed === true)
    );
    return requiredFields.every(
      (field) => formData[field.key as keyof FormPayload] !== undefined
    );
  };

  return { formData, updateField, resetFields, buildPayload, isFormValid };
};