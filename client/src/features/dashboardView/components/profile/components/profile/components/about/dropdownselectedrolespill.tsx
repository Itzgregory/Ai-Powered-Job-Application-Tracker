import { X } from "lucide-react";

interface SelectedRolesPillsProps {
  roles: string[];
  onRemove: (role: string, index: number) => void;
}

export const SelectedRolesPills = ({ roles, onRemove }: SelectedRolesPillsProps) => {
  if (roles.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 xs:gap-2 mb-1 xs:mb-2">
      {roles.map((role, index) => (
        <div
          key={`${role}-${index}`}
          className="flex items-center bg-gray-100 rounded-full px-1 xs:px-2 sm:px-3 py-0.5 xs:py-1 text-[10px] xs:text-xs sm:text-sm"
        >
          {role}
          <button
            onClick={() => onRemove(role, index)}
            className="ml-0.5 xs:ml-1 sm:ml-2 text-gray-500 hover:text-gray-700"
            aria-label={`Remove ${role}`}
          >
            <X size={10} className="w-3 xs:w-4 h-3 xs:h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};