import { FormConfig } from "../types/formField";
import { DropdownOption } from "../types/dropDownTypes";
import { GiGraduateCap } from 'react-icons/gi';
import React from "react";


export const majorsOptions: DropdownOption[] = [
  { label: "Computer Science", value: "computer-science", icon: React.createElement(GiGraduateCap) },
  { label: "Business Administration", value: "business-administration", icon: React.createElement(GiGraduateCap) },
  { label: "Engineering", value: "engineering", icon: React.createElement(GiGraduateCap) },
  { label: "Information Technology", value: "information-technology", icon: React.createElement(GiGraduateCap) },
  { label: "Finance", value: "finance", icon: React.createElement(GiGraduateCap) },
  { label: "Marketing", value: "marketing", icon: React.createElement(GiGraduateCap) },
  { label: "Biology", value: "biology", icon: React.createElement(GiGraduateCap) },
  { label: "Psychology", value: "psychology", icon: React.createElement(GiGraduateCap) },
  { label: "English Literature", value: "english-literature", icon: React.createElement(GiGraduateCap) },
  { label: "Bachelor’s Degree", value: "bachelors-degree", icon: React.createElement(GiGraduateCap) },
  { label: "Master’s Degree", value: "masters-degree", icon: React.createElement(GiGraduateCap) },
  { label: "Doctorate (Ph.D.)", value: "doctorate", icon: React.createElement(GiGraduateCap) },
  { label: "Associate Degree", value: "associate-degree", icon: React.createElement(GiGraduateCap) },
];

export const EducationFormConfig: FormConfig = {
  payloadType: "education" ,
  fields: [
    {
      type: "input",
      key: "Education",
      placeholder: "Enter Schools name",
      required: true,
      label: "Education*",
    },
    {
      type: "date",
      key: "Graduation",
      placeholder: "MM/YYYY",
      required: true,
      label: "Graduation*",
    },
    {
        type: "dropdown",
        key: "Degree",
        placeholder: "Select your degree",
        options: majorsOptions,
        label: "Degree & Major*",
        required: true,
    },
    {
      type: "input",
      key: "Major",
      placeholder: "Enter Major / field of study",
      required: true,
      label: "Major",
    },
    {
      type: "input",
      key: "gpa",
      placeholder: "GPA",
      required: false,
      label: "GPA",
    },
  ],
};