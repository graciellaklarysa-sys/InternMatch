import React, { useState } from "react";
import { Skill, SkillLevel, UserProfile } from "../types";
import { TagBadge } from "../components/TagBadge";
import { allCommonSkills, allCommonInterests } from "../data/mockData";
import { ArrowLeft, ArrowRight, Check, Plus, Sparkles, User, Briefcase, Heart, BookOpen } from "lucide-react";

interface ProfileBuilderViewProps {
  initialUser: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  onCancel?: () => void;
}

export const ProfileBuilderView: React.FC<ProfileBuilderViewProps> = ({
  initialUser,
  onSaveProfile,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [major, setMajor] = useState(initialUser.major);
  const [semester, setSemester] = useState(initialUser.semester);
  const [location, setLocation] = useState(initialUser.location);
  const [preference, setPreference] = useState(initialUser.preference);
  const [education, setEducation] = useState(initialUser.education);

  const [skills, setSkills] = useState<Skill[]>(initialUser.skills);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>("Intermediate");

  const [experience, setExperience] = useState<string[]>(initialUser.experience);
  const [newExperience, setNewExperience] = useState("");

  const [interests, setInterests] = useState<string[]>(initialUser.interests);
  const [newInterest, setNewInterest] = useState("");

  // Skills helpers
  const handleAddSkill = (name: string, level: SkillLevel = "Intermediate") => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      // Already added, update level
      setSkills(skills.map((s) => (s.name.toLowerCase() === trimmed.toLowerCase() ? { ...s, level } : s)));
    } else {
      setSkills([...skills, { name: trimmed, level }]);
    }
    setNewSkillName("");
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase()));
  };

  // Interests helpers
  const handleToggleInterest = (interest: string) => {
    const exists = interests.some((i) => i.toLowerCase() === interest.toLowerCase());
    if (exists) {
      setInterests(interests.filter((i) => i.toLowerCase() !== interest.toLowerCase()));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleAddCustomInterest = () => {
    const trimmed = newInterest.trim();
    if (!trimmed) return;
    if (!interests.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      setInterests([...interests, trimmed]);
    }
    setNewInterest("");
  };

  // Experience helpers
  const handleAddExperience = () => {
    const trimmed = newExperience.trim();
    if (!trimmed) return;
    setExperience([...experience, trimmed]);
    setNewExperience("");
  };

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleSaveAndFinish = () => {
    const updated: UserProfile = {
      major: major.trim() || "Marketing Communications",
      semester: Number(semester) || 6,
      location: location.trim() || "Jakarta",
      preference: preference || "Hybrid",
      skills,
      interests,
      experience,
      education: education.trim() || "S1, Semester 6",
    };
    onSaveProfile(updated);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Container Card */}
      <div className="bg-white rounded-2xl shadow-navy-soft border border-[#142B4A]/10 overflow-hidden">
        {/* Header with Step Counter & Thin Green Progress Bar */}
        <div className="relative border-b border-[#142B4A]/10 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#38B879]">
                Profile Builder
              </span>
              <h2 className="text-2xl font-extrabold text-[#142B4A] mt-0.5">
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Skills & Proficiency"}
                {currentStep === 3 && "Relevant Experience"}
                {currentStep === 4 && "Interests & Goals"}
              </h2>
            </div>

            {/* "2/4"-style step counter */}
            <div className="text-right">
              <span className="text-sm font-extrabold text-[#142B4A] bg-[#DDEAF4] px-3 py-1 rounded-full">
                {currentStep}/{totalSteps}
              </span>
            </div>
          </div>

          {/* Thin Green Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#142B4A]/5">
            <div
              className="h-full bg-[#38B879] transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-[#142B4A]/70">
                Help us calibrate academic relevance and location requirements for your opportunities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1.5">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Marketing Communications"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1.5">
                    Current Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A] bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1.5">
                    Primary Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jakarta, Bandung, Bali"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142B4A] mb-1.5">
                    Work Mode Preference
                  </label>
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A] bg-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B4A] mb-1.5">
                  Degree Context
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. S1, Semester 6"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] focus:ring-1 focus:ring-[#38B879] text-sm text-[#142B4A]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#142B4A]/70">
                Add skills you currently possess. Our fit algorithm assesses both presence and depth.
              </p>

              {/* Current Skills list */}
              <div>
                <span className="block text-xs font-bold text-[#142B4A] mb-2">
                  Your Current Skills ({skills.length})
                </span>
                <div className="flex flex-wrap gap-2 p-3 bg-[#F7F8F5] rounded-xl border border-[#142B4A]/10 min-h-16">
                  {skills.length === 0 ? (
                    <span className="text-xs text-[#142B4A]/50 italic">
                      No skills added yet. Select from common suggestions below or add your own.
                    </span>
                  ) : (
                    skills.map((s) => (
                      <TagBadge
                        key={s.name}
                        label={s.name}
                        level={s.level}
                        showLevel={true}
                        selected={true}
                        onRemove={() => handleRemoveSkill(s.name)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Add custom skill input */}
              <div className="p-4 rounded-xl border border-[#142B4A]/15 bg-white space-y-3">
                <span className="block text-xs font-bold text-[#142B4A]">
                  + Add Custom Skill
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Skill name (e.g. Figma, SEO)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(newSkillName, newSkillLevel);
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] text-sm"
                  />
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                    className="px-3.5 py-2 rounded-xl border border-[#142B4A]/20 text-sm bg-white font-medium"
                  >
                    <option value="Beginner">Beginner (1)</option>
                    <option value="Intermediate">Intermediate (2)</option>
                    <option value="Advanced">Advanced (3)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleAddSkill(newSkillName, newSkillLevel)}
                    className="bg-[#38B879] hover:bg-[#2fa068] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Quick suggestions */}
              <div>
                <span className="block text-xs font-bold text-[#142B4A]/70 mb-2">
                  Quick Add Suggested Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {allCommonSkills.map((name) => {
                    const isAdded = skills.some((s) => s.name.toLowerCase() === name.toLowerCase());
                    return (
                      <TagBadge
                        key={name}
                        label={name}
                        selected={isAdded}
                        onClick={() => {
                          if (isAdded) {
                            handleRemoveSkill(name);
                          } else {
                            handleAddSkill(name, "Intermediate");
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#142B4A]/70">
                Include campus committees, freelance assignments, student organizations, or personal projects.
              </p>

              {/* Current Experience */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-[#142B4A]">
                  Logged Experiences ({experience.length})
                </span>
                <div className="space-y-2">
                  {experience.length === 0 ? (
                    <div className="p-4 bg-[#F7F8F5] rounded-xl text-xs text-[#142B4A]/50 italic">
                      No experiences listed. Even campus committees count!
                    </div>
                  ) : (
                    experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 bg-[#F7F8F5] rounded-xl border border-[#142B4A]/10 text-sm font-medium text-[#142B4A]"
                      >
                        <span className="flex-1 mr-3 leading-snug">{exp}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(idx)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add experience */}
              <div className="p-4 rounded-xl border border-[#142B4A]/15 bg-white space-y-2">
                <span className="block text-xs font-bold text-[#142B4A]">
                  + Add Experience Item
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    placeholder="e.g. Head of Documentation - University Media Club 2024"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddExperience();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="bg-[#38B879] hover:bg-[#2fa068] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: INTERESTS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#142B4A]/70">
                Select industry areas and topics you wish to work in. These contribute directly to your interest alignment score.
              </p>

              <div>
                <span className="block text-xs font-bold text-[#142B4A] mb-2">
                  Selected Interests ({interests.length})
                </span>
                <div className="flex flex-wrap gap-2 p-3 bg-[#F7F8F5] rounded-xl border border-[#142B4A]/10 min-h-16">
                  {interests.length === 0 ? (
                    <span className="text-xs text-[#142B4A]/50 italic">
                      Select interests from below or type custom ones.
                    </span>
                  ) : (
                    interests.map((interest) => (
                      <TagBadge
                        key={interest}
                        label={interest}
                        selected={true}
                        onRemove={() => handleToggleInterest(interest)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <span className="block text-xs font-bold text-[#142B4A]/70 mb-2">
                  Explore Topics (Click to Toggle):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {allCommonInterests.map((interest) => {
                    const isSelected = interests.some(
                      (i) => i.toLowerCase() === interest.toLowerCase()
                    );
                    return (
                      <TagBadge
                        key={interest}
                        label={interest}
                        selected={isSelected}
                        onClick={() => handleToggleInterest(interest)}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Custom interest */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add custom interest (e.g. FinTech, Climate Tech)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomInterest();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#142B4A]/20 focus:outline-none focus:border-[#38B879] text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomInterest}
                  className="bg-[#142B4A] text-white px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="border-t border-[#142B4A]/10 p-6 bg-[#F7F8F5] flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#142B4A] hover:bg-[#142B4A]/5 px-4 py-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="text-sm font-bold text-[#142B4A]/60 hover:text-[#142B4A] px-3 py-2"
              >
                Cancel
              </button>
            ) : (
              <div />
            )}
          </div>

          <div>
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-[#38B879] hover:bg-[#2fa068] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-sm hover:shadow flex items-center gap-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndFinish}
                className="bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white text-sm font-bold px-7 py-2.5 rounded-full shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile & See Matches</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
