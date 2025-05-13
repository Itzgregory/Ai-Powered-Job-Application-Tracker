import { FormConfig } from "../types/formField";
import { DropdownOption } from "../types/dropDownTypes";
import { FiUser, FiBriefcase, FiMapPin, FiCode } from "react-icons/fi";
import React from "react";

export const roleOptions: DropdownOption[] = [
  { label: "Sales", value: "sales", icon: React.createElement(FiUser) },
  { label: "Non-Sales", value: "non-sales", icon: React.createElement(FiUser) },
  { label: "Technical", value: "technical", icon: React.createElement(FiUser) },
];

export const salesAudienceOptions: DropdownOption[] = [
  { label: "B2B", value: "b2b", icon: React.createElement(FiBriefcase) },
  { label: "B2C", value: "b2c", icon: React.createElement(FiBriefcase) },
  { label: "Enterprise", value: "enterprise", icon: React.createElement(FiBriefcase) },
  { label: "SMBs", value: "smbs", icon: React.createElement(FiBriefcase) },
];

export const technicalSkillsOptions: DropdownOption[] = [
  { label: "JavaScript", value: "javascript", icon: React.createElement(FiCode) },
  { label: "Python", value: "python", icon: React.createElement(FiCode) },
  { label: "SQL", value: "sql", icon: React.createElement(FiCode) },
  { label: "DevOps", value: "devops", icon: React.createElement(FiCode) },
];

export const locationOptions: DropdownOption[] = [
  { label: "Remote", value: "remote", icon: React.createElement(FiMapPin) },
  { label: "On-site", value: "on-site", icon: React.createElement(FiMapPin) },
  { label: "Hybrid", value: "hybrid", icon: React.createElement(FiMapPin) },
];

export const experienceFormConfig: FormConfig = {
  payloadType: "experience",
  primaryField: {
    key: "roleType",
    options: roleOptions,
    placeholder: "Select role type",
    type: "dropdown",
    label: "Role Type",
    required: true,
  },
  fields: [
    {
      type: "input",
      key: "employer",
      placeholder: "Enter employer name",
      required: true,
      label: "Company",
    },
    {
      type: "input",
      key: "title",
      placeholder: "Enter job title",
      required: true,
      label: "Title",
    },
    {
      type: "date",
      key: "startDate",
      placeholder: "MM/YYYY",
      required: true,
      label: "Start Date",
    },
    {
      type: "checkbox",
      key: "isStillEmployed",
      label: "Currently Employed",
      required: false,
    },
    {
      type: "date",
      key: "endDate",
      placeholder: "MM/YYYY",
      label: "End Date",
      required: false,
    },
    {
      type: "description",
      key: "description",
      placeholder: "Enter job description",
      required: false,
      label: "Description",
      maxLength: 200,
    },
    {
      type: "dropdown",
      key: "location",
      placeholder: "Select work location",
      options: locationOptions,
      label: "Location",
      required: false,
    },
  ],
  conditionalFields: [
    {
      type: "dropdown",
      key: "salesAudience",
      placeholder: "Who did you sell to?",
      options: salesAudienceOptions,
      isMulti: true,
      label: "Sales Audience",
      conditional: { key: "roleType", value: "sales" },
    },
    {
      type: "input",
      key: "quota",
      placeholder: "Quota (e.g., 500k)",
      label: "Quota",
      conditional: { key: "roleType", value: "sales" },
    },
    {
      type: "input",
      key: "avgDealSize",
      placeholder: "Average deal size (e.g., 10k)",
      label: "Average Deal Size",
      conditional: { key: "roleType", value: "sales" },
    },
    {
      type: "dropdown",
      key: "technicalSkills",
      placeholder: "Select skills",
      options: technicalSkillsOptions,
      isMulti: true,
      label: "Technical Skills",
      conditional: { key: "roleType", value: "technical" },
    },
  ],
};