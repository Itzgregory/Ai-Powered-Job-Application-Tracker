import { CounterComponent } from "../components/about/descriptioncharacterCounter";
import { ReactNode } from "react";
import { InputField } from "../components/about/inputField";

export interface DescriptionFieldProps {
    children: ReactNode;
    className?: string;
    maxLength?: number;
    value?: string;
    onChange?: (value: string) => void;
  }
  
  export interface DescriptionFieldSubComponents {
    Input: typeof InputField;
    Counter: typeof CounterComponent;
  }
  
  export interface CounterProps {
    value?: string;
    maxLength?: number;
  }