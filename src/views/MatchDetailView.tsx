import React from "react";
import { ScoredInternship, UserProfile } from "../types";
import { ProgressRing } from "../components/ProgressRing";
import { skillResources } from "../data/mockData";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Laptop,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Target,
  Sparkles,
} from "lucide-react";

interface MatchDetailViewProps {
  scored: ScoredInternship;
  user: UserProfile;
  onBack: () => void;
  onTailorApplication: (scored: ScoredInternship) => void;
}

export const MatchDetailView: React.FC<MatchDetailViewProps> = ({
  scored,
  user,
  onBack,
  onTailorApplication,
}) => {
  const { internship, breakdown } = scored;
  const {
    overallScore,
    skillScore,
    interestScore,
    experienceScore,
    educationScore,
    greatSkills,
    skillsToImprove,
    gapItems,
    gapSkillsCount,
  } = breakdown;

  // Collect relevant learning resources for any skills in "skillsToImprove"
  const recommendedResources = skillsToImprove.flatMap((skill) => {
    return skillResources[skill.name] || [];
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#142B4A]/80 hover:text-[#142B4A] hover:bg-[#142B4A]/5 px-3 py-1.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38B879]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Matches</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-navy-soft border border-[#142B4A]/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#142B4A]/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#38B879] uppercase tracking-wider mb-1">
              <span>Detailed Fit Breakdown</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
              {internship.title}
            </h1>
            <p className="text-base font-semibold text-[#142B4A]/70 flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-[#142B4A]/60" />
              {internship.company}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-[#142B4A]/70">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#142B4A]/50" />
                {internship.location}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DDEAF4] text-[#142B4A] font-semibold">
                <Laptop className="w-3 h-3 text-[#142B4A]/60" />
                {internship.mode}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#142B4A]/50" />
                {internship.duration}
              </span>
            </div>
          </div>

          {/* Large Animated Match Ring */}
          <div className="flex items-center gap-4 bg-[#F7F8F5] p-4 rounded-2xl border border-[#142B4A]/5 self-start lg:self-auto">
            <ProgressRing
              score={overallScore}
              size={100}
              strokeWidth={8}
              labelSize="lg"
              subLabel="OVERALL FIT"
            />
            <div className="text-left max-w-[150px]">
              <span className="text-xs font-extrabold uppercase text-[#38B879]">
                {overallScore >= 80 ? "High Alignment" : overallScore >= 60 ? "Moderate Alignment" : "Growth Opportunity"}
              </span>
              <p className="text-[11px] text-[#142B4A]/70 leading-snug mt-1">
                Weighted across skills (50%), interests (25%), experience (15%), and major (10%).
              </p>
            </div>
          </div>
        </div>

        {/* Readiness Panel verbatim copy */}
        <div className="mt-6 p-4 rounded-xl bg-[#FCC85B]/15 border border-[#FCC85B]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#FCC85B] flex items-center justify-center text-[#142B4A] shrink-0 font-bold">
              <Target className="w-4 h-4 text-[#142B4A]" />
            </div>
            <div>
              {/* Verbatim copy: "You're X skills away from being a stronger candidate." */}
              <p className="text-sm sm:text-base font-bold text-[#142B4A]">
                You're {gapSkillsCount} {gapSkillsCount === 1 ? "skill" : "skills"} away from being a stronger candidate.
              </p>
              <p className="text-xs text-[#142B4A]/70">
                Close these gaps through the targeted resources below, then sharpen your CV bullet.
              </p>
            </div>
          </div>

          <button
            onClick={() => onTailorApplication(scored)}
            className="shrink-0 bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs hover:shadow transition-all flex items-center gap-1.5"
          >
            <span>Tailor CV for this Role</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sub-Score Bars */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-[#142B4A] uppercase tracking-wider mb-4">
            Component Score Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Skill Score */}
            <div className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/5">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-[#142B4A]">Skills Match (50%)</span>
                <span className="text-[#38B879]">{skillScore}%</span>
              </div>
              <div className="w-full bg-[#142B4A]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38B879] h-full rounded-full transition-all duration-500"
                  style={{ width: `${skillScore}%` }}
                />
              </div>
            </div>

            {/* Interest Score */}
            <div className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/5">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-[#142B4A]">Interests (25%)</span>
                <span className="text-[#38B879]">{interestScore}%</span>
              </div>
              <div className="w-full bg-[#142B4A]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38B879] h-full rounded-full transition-all duration-500"
                  style={{ width: `${interestScore}%` }}
                />
              </div>
            </div>

            {/* Experience Score */}
            <div className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/5">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-[#142B4A]">Experience (15%)</span>
                <span className="text-[#38B879]">{experienceScore}%</span>
              </div>
              <div className="w-full bg-[#142B4A]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38B879] h-full rounded-full transition-all duration-500"
                  style={{ width: `${experienceScore}%` }}
                />
              </div>
            </div>

            {/* Education Score */}
            <div className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/5">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-[#142B4A]">Major Relevance (10%)</span>
                <span className="text-[#38B879]">{educationScore}%</span>
              </div>
              <div className="w-full bg-[#142B4A]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38B879] h-full rounded-full transition-all duration-500"
                  style={{ width: `${educationScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column: What You're Great At vs. Skills to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What You're Great At */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#38B879]/15 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[#38B879]" />
            </div>
            <h2 className="text-base font-extrabold text-[#142B4A]">
              What you're great at ({greatSkills.length})
            </h2>
          </div>

          {greatSkills.length > 0 ? (
            <ul className="space-y-2.5">
              {greatSkills.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F5] text-xs font-semibold text-[#142B4A]"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38B879]" />
                    {s.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#DDEAF4] text-[#142B4A] text-[11px] font-bold">
                    Req: {s.level}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#142B4A]/60 italic py-4">
              None of the role's required skills currently match your recorded proficiency level.
            </p>
          )}
        </div>

        {/* Skills to Improve */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#FCC85B]/25 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-[#FCC85B]" />
            </div>
            <h2 className="text-base font-extrabold text-[#142B4A]">
              Skills to improve ({skillsToImprove.length})
            </h2>
          </div>

          {skillsToImprove.length > 0 ? (
            <ul className="space-y-2.5">
              {skillsToImprove.map((s) => {
                const userSkill = user.skills.find((us) => us.name.toLowerCase() === s.name.toLowerCase());
                return (
                  <li
                    key={s.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F5] text-xs font-semibold text-[#142B4A]"
                  >
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-[#FCC85B]" />
                      {s.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FCC85B]/25 text-[#142B4A] text-[11px] font-bold">
                      {userSkill ? `Current: ${userSkill.level} (Req: ${s.level})` : `Not added (Req: ${s.level})`}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-xs text-[#38B879] font-bold py-4">
              Outstanding! You meet or exceed all required skills for this position.
            </p>
          )}
        </div>
      </div>

      {/* Skill-Gap Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-navy-soft border border-[#142B4A]/10">
        <h2 className="text-lg font-extrabold text-[#142B4A] mb-4">
          Complete Skill Gap Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#142B4A]/10 text-[#142B4A]/60 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Skill</th>
                <th className="py-3 px-3">Required Level</th>
                <th className="py-3 px-3">Your Level</th>
                <th className="py-3 px-3">Gap Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#142B4A]/5">
              {gapItems.map((item) => (
                <tr key={item.name} className="hover:bg-[#F7F8F5]/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[#142B4A]">{item.name}</td>
                  <td className="py-3.5 px-3 font-medium text-[#142B4A]/80">{item.requiredLevel}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`font-semibold ${
                        item.userLevel === "Not added"
                          ? "text-[#142B4A]/50 italic"
                          : "text-[#142B4A]"
                      }`}
                    >
                      {item.userLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {item.isMet ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38B879]/15 text-[#38B879] font-bold text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.gapText}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FCC85B]/25 text-[#142B4A] font-bold text-xs">
                        <AlertCircle className="w-3 h-3 text-[#FCC85B]" />
                        {item.gapText}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curated Learning Resources Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-navy-soft border border-[#142B4A]/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#38B879] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Skill Bridge Resources</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#142B4A]">
              Recommended Free & Low-Cost Courses
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#142B4A]/70">
          Targeted study pathways curated specifically for the skill gaps identified in this role:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {recommendedResources.length > 0 ? (
            recommendedResources.map((res, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/10 hover:border-[#38B879]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DDEAF4] text-[#142B4A]">
                      {res.skill}
                    </span>
                    <span className="text-[11px] font-medium text-[#142B4A]/60">
                      {res.platform}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#142B4A] leading-snug">
                    {res.title}
                  </h4>
                  <p className="text-xs text-[#142B4A]/65 mt-1">Level: {res.level}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#142B4A]/5 flex items-center justify-between text-xs font-bold text-[#38B879]">
                  <span>{res.urlLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-6 rounded-xl bg-[#F7F8F5] text-center text-xs text-[#142B4A]/70">
              No specific skill gaps detected for this role. You are well prepared to apply directly!
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA: Tailor Application */}
      <div className="bg-[#DDEAF4] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#142B4A]/10">
        <div>
          <h3 className="text-lg font-extrabold text-[#142B4A]">
            Ready to tailor your CV for {internship.company}?
          </h3>
          <p className="text-xs sm:text-sm text-[#142B4A]/75 mt-0.5">
            Use our structure-enhancing tool to rephrase your bullet points to match these exact role requirements.
          </p>
        </div>

        <button
          onClick={() => onTailorApplication(scored)}
          className="shrink-0 bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
        >
          <span>Tailor Application</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
