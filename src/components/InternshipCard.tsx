import React from "react";
import { ScoredInternship } from "../types";
import { ProgressRing } from "./ProgressRing";
import { MapPin, Clock, Building2, Laptop, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { TagBadge } from "./TagBadge";

interface InternshipCardProps {
  scored: ScoredInternship;
  onSelect: (scored: ScoredInternship) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ scored, onSelect }) => {
  const { internship, breakdown } = scored;
  const { overallScore, greatSkills, skillsToImprove } = breakdown;

  // Generate pleasant company avatar colors based on company name
  const initials = internship.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      onClick={() => onSelect(scored)}
      className="group relative bg-white rounded-2xl p-6 shadow-navy-soft hover:shadow-navy-hover transition-all duration-200 border border-[#142B4A]/5 hover:border-[#142B4A]/15 cursor-pointer flex flex-col justify-between"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(scored);
        }
      }}
    >
      <div>
        {/* Top Header: Company Avatar + Title + Match Ring */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            {/* Company Thumbnail Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] font-bold text-base shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
              {initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#142B4A] group-hover:text-[#38B879] transition-colors duration-150 leading-snug">
                {internship.title}
              </h3>
              <p className="text-sm font-semibold text-[#142B4A]/70 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                {internship.company}
              </p>
            </div>
          </div>

          {/* Animated Circular Progress Ring */}
          <div className="shrink-0">
            <ProgressRing score={overallScore} size={62} strokeWidth={5.5} labelSize="sm" subLabel="FIT" />
          </div>
        </div>

        {/* Location / Mode / Duration Row */}
        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-[#142B4A]/70">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#142B4A]/50" />
            {internship.location}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#142B4A]/5 text-[#142B4A] font-semibold">
            <Laptop className="w-3 h-3 text-[#142B4A]/60" />
            {internship.mode}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#142B4A]/50" />
            {internship.duration}
          </span>
        </div>

        {/* Skills Fit Highlights */}
        <div className="mt-5 pt-4 border-t border-[#142B4A]/5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#142B4A]/80 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#38B879]" />
              {greatSkills.length} Great Match{greatSkills.length === 1 ? "" : "es"}
            </span>
            {skillsToImprove.length > 0 && (
              <span className="font-semibold text-[#142B4A]/80 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#FCC85B]" />
                {skillsToImprove.length} Skill{skillsToImprove.length === 1 ? "" : "s"} to Boost
              </span>
            )}
          </div>

          {/* Required Skills Pill preview */}
          <div className="flex flex-wrap gap-1.5">
            {internship.requiredSkills.slice(0, 4).map((skill) => {
              const isGreat = greatSkills.some((g) => g.name.toLowerCase() === skill.name.toLowerCase());
              return (
                <TagBadge
                  key={skill.name}
                  label={skill.name}
                  selected={isGreat}
                  showLevel={false}
                />
              );
            })}
            {internship.requiredSkills.length > 4 && (
              <span className="text-[11px] font-medium text-[#142B4A]/50 self-center">
                +{internship.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 flex items-center justify-between text-xs font-bold text-[#142B4A] group-hover:text-[#38B879]">
        <span>Analyze Fit & Gaps</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-150" />
      </div>
    </div>
  );
};
