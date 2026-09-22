import React from "react";
import { X, Check } from "lucide-react";
import { SkillLevel } from "../types";

interface TagBadgeProps {
  label: string;
  level?: SkillLevel;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  variant?: "skill" | "interest" | "status";
  showLevel?: boolean;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  label,
  level,
  selected = true,
  onClick,
  onRemove,
  showLevel = false,
}) => {
  const baseClasses =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38B879]";

  const selectedClasses = selected
    ? "bg-[#DDEAF4] text-[#142B4A] border border-transparent shadow-xs"
    : "bg-transparent text-[#142B4A]/70 border border-[#142B4A]/25 hover:border-[#142B4A]/50 hover:text-[#142B4A]";

  return (
    <span
      className={`${baseClasses} ${selectedClasses} ${onClick ? "cursor-pointer active:scale-95" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span>{label}</span>
      {showLevel && level && (
        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#142B4A]/10 text-[#142B4A]">
          {level}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 rounded-full hover:bg-[#142B4A]/15 text-[#142B4A]/70 hover:text-[#142B4A] focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
