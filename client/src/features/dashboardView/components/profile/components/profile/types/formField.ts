import { DropdownOption } from "./dropDownTypes";

export interface FormField {
  type: "dropdown" | "input" | "checkbox" | "description" | "date";
  key: string;
  placeholder?: string;
  label?: string;
  options?: DropdownOption[];
  isMulti?: boolean;
  conditional?: {
    key: string;
    value: string;
  };
  required?: boolean;
  maxLength?: number;
}

export interface FormConfig {
  payloadType: string;
  primaryField?: FormField;
  fields?: FormField[];
  conditionalFields?: FormField[];
}

// export interface FormPayload {
//   [key: string]: unknown;
// }

export interface FormPayload {
  [key: string]: string | string[] | boolean | null | undefined;
  employer?: string;
  title?: string;
  startDate?: string | null;
  endDate?: string | null;
  isStillEmployed?: boolean;
  description?: string;
  roleType?: string;
  customRole?: string;
  skills?: string[];
  location?: string;
  salesAudience?: string[];
  quota?: string;
  avgDealSize?: string;
  technicalSkills?: string[];
}







