import React from "react";
import { UserProfile } from "../types";
import { calculateProfileCompletion } from "../utils/scoring";
import { TagBadge } from "../components/TagBadge";
import {
  User,
  GraduationCap,
  MapPin,
  Laptop,
  CheckCircle2,
  Sparkles,
  Edit3,
  RotateCcw,
  Briefcase,
  Heart,
  Award,
} from "lucide-react";

interface ProfileViewProps {
  user: UserProfile;
  onEditProfile: () => void;
  onResetDemoProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onEditProfile,
  onResetDemoProfile,
}) => {
  const completionPercentage = calculateProfileCompletion(user);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-navy-soft border border-[#142B4A]/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#142B4A]/10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] font-extrabold text-2xl shadow-xs">
              {user.major.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#38B879]">
                Student Profile
              </span>
              <h1 className="text-2xl font-extrabold text-[#142B4A]">
                {user.major}
              </h1>
              <p className="text-sm text-[#142B4A]/70 flex items-center gap-2 mt-0.5 font-medium">
                <span>Semester {user.semester}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5" />
                  {user.preference}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onEditProfile}
              className="bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs hover:shadow transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onResetDemoProfile}
              title="Reset to default benchmark student profile"
              className="p-2.5 rounded-full border border-[#142B4A]/15 text-[#142B4A]/70 hover:text-[#142B4A] hover:bg-[#142B4A]/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center text-xs font-bold text-[#142B4A] mb-1.5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#38B879]" />
              Profile Completion
            </span>
            <span className="text-[#38B879] font-extrabold">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-[#142B4A]/10 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#38B879] h-full rounded-full transition-all duration-600 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-[#142B4A]/60 mt-1">
            Complete profiles yield higher fidelity match predictions and sharper skill gap analyses.
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Card */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#38B879]" />
              <h2 className="text-base font-extrabold text-[#142B4A]">
                Recorded Skills ({user.skills.length})
              </h2>
            </div>
            <button
              onClick={onEditProfile}
              className="text-xs font-bold text-[#38B879] hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.skills.map((s) => (
              <TagBadge
                key={s.name}
                label={s.name}
                level={s.level}
                showLevel={true}
                selected={true}
              />
            ))}
          </div>
        </div>

        {/* Interests Card */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#38B879]" />
              <h2 className="text-base font-extrabold text-[#142B4A]">
                Selected Interests ({user.interests.length})
              </h2>
            </div>
            <button
              onClick={onEditProfile}
              className="text-xs font-bold text-[#38B879] hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <TagBadge key={interest} label={interest} selected={true} />
            ))}
          </div>
        </div>

        {/* Experience Card */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#38B879]" />
              <h2 className="text-base font-extrabold text-[#142B4A]">
                Campus & Work Experience ({user.experience.length})
              </h2>
            </div>
            <button
              onClick={onEditProfile}
              className="text-xs font-bold text-[#38B879] hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#F7F8F5] border border-[#142B4A]/10 text-xs sm:text-sm font-semibold text-[#142B4A]"
              >
                {exp}
              </div>
            ))}
          </div>
        </div>

        {/* Academic Context Card */}
        <div className="bg-white rounded-2xl p-6 shadow-navy-soft border border-[#142B4A]/10 space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#38B879]" />
            <h2 className="text-base font-extrabold text-[#142B4A]">
              Education & Academic Level
            </h2>
          </div>
          <p className="text-sm font-semibold text-[#142B4A] bg-[#F7F8F5] p-3 rounded-xl border border-[#142B4A]/5">
            {user.education}
          </p>
        </div>
      </div>
    </div>
  );
};
