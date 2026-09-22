import React from "react";
import { ActiveTab, ScoredInternship, UserProfile } from "../types";
import { InternshipCard } from "../components/InternshipCard";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Target,
  GraduationCap,
  Users2,
  BookOpenCheck,
} from "lucide-react";

interface HomeViewProps {
  user: UserProfile;
  scoredInternships: ScoredInternship[];
  onNavigate: (tab: ActiveTab) => void;
  onSelectInternship: (scored: ScoredInternship) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  scoredInternships,
  onNavigate,
  onSelectInternship,
}) => {
  // Sort by highest match score for showcase
  const topMatches = [...scoredInternships]
    .sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore)
    .slice(0, 3);

  const topMatch = topMatches[0];
  const gapCount = topMatch?.breakdown.gapSkillsCount ?? 2;

  const journeySteps = [
    {
      step: 1,
      title: "Discover opportunities",
      desc: "Explore verified student internships matched to your actual skills and academic stage.",
      tab: "explore" as ActiveTab,
      icon: <Compass className="w-5 h-5 text-[#38B879]" />,
    },
    {
      step: 2,
      title: "Build skills",
      desc: "Identify exact requirement gaps and follow targeted learning pathways before you submit.",
      tab: "for-you" as ActiveTab,
      icon: <TrendingUp className="w-5 h-5 text-[#38B879]" />,
    },
    {
      step: 3,
      title: "Get prepared",
      desc: "Fine-tune and strengthen your CV bullet points directly against specific job criteria.",
      tab: "application" as ActiveTab,
      icon: <FileCheck2 className="w-5 h-5 text-[#38B879]" />,
    },
    {
      step: 4,
      title: "Apply & grow",
      desc: "Submit with measurable confidence knowing why you belong and how your background aligns.",
      tab: "my-match" as ActiveTab,
      icon: <Sparkles className="w-5 h-5 text-[#38B879]" />,
    },
  ];

  return (
    <div className="space-y-20 pb-12">
      {/* HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 max-w-4xl mx-auto text-center px-4">
        {/* Decorative hand-drawn accent note */}
        <div className="hidden lg:block absolute -top-2 right-4 rotate-3">
          <span className="font-handwritten text-xl text-[#38B879] bg-white/80 px-3 py-1 rounded-full shadow-xs border border-[#38B879]/20">
            For students who value real fit ✦
          </span>
        </div>

        {/* Hero eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEAF4] text-[#142B4A] text-xs font-bold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#38B879]" />
          <span>Your next chapter starts here</span>
        </div>

        {/* Hero headline: verbatim copy with "fit you" in Fresh Green */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#142B4A] tracking-tight leading-[1.15]">
          Find the internships that <span className="text-[#38B879]">fit you.</span>
        </h1>

        {/* Hero sub: verbatim copy */}
        <p className="mt-6 text-base sm:text-lg text-[#142B4A]/80 max-w-2xl mx-auto leading-relaxed font-normal">
          InternMatch helps you discover relevant internships, understand your fit, identify skill gaps, and prepare stronger applications.
        </p>

        {/* Hero CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate("profile-builder")}
            className="w-full sm:w-auto bg-[#38B879] hover:bg-[#2fa068] active:bg-[#278b5a] text-white text-base font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#142B4A]"
          >
            <span>Build My Profile →</span>
          </button>
          <button
            onClick={() => onNavigate("explore")}
            className="w-full sm:w-auto bg-transparent border-2 border-[#142B4A]/20 hover:border-[#142B4A] text-[#142B4A] hover:bg-[#142B4A]/5 text-base font-bold px-7 py-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#142B4A]"
          >
            <span>Explore Opportunities</span>
          </button>
        </div>

        {/* Match Readiness Panel preview banner */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-[#142B4A]/10 shadow-navy-soft max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FCC85B]/20 text-[#142B4A] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-[#142B4A]" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-[#142B4A]/60 tracking-wider">Candidate Readiness</p>
              {/* Match readiness verbatim copy */}
              <p className="text-sm sm:text-base font-bold text-[#142B4A]">
                You're {gapCount} skills away from being a stronger candidate.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("for-you")}
            className="shrink-0 text-xs font-bold text-[#38B879] hover:text-[#2fa068] bg-[#38B879]/10 hover:bg-[#38B879]/20 px-4 py-2 rounded-full transition-colors flex items-center gap-1"
          >
            <span>View Skill Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-[#142B4A]/10 bg-white/50 rounded-2xl p-4">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] shrink-0">
              <Sparkles className="w-4 h-4 text-[#38B879]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#142B4A]">
              Personalized Recommendations
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] shrink-0">
              <TrendingUp className="w-4 h-4 text-[#38B879]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#142B4A]">
              Skill Gap Analysis
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] shrink-0">
              <FileCheck2 className="w-4 h-4 text-[#38B879]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#142B4A]">
              CV & LinkedIn Tailoring
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#38B879]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#142B4A]">
              Trusted & Verified Listings
            </span>
          </div>
        </div>
      </section>

      {/* SECTION ALT-HEADLINE & HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Section alt-headline verbatim copy */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
            Stop applying everywhere. Start applying where you fit.
          </h2>
          <p className="mt-2 text-sm text-[#142B4A]/70 font-medium">
            From confusion to confidence.
          </p>
        </div>

        {/* 4-step journey strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeySteps.map((step) => (
            <div
              key={step.step}
              onClick={() => onNavigate(step.tab)}
              className="group bg-white rounded-2xl p-6 shadow-navy-soft hover:shadow-navy-hover transition-all duration-200 border border-[#142B4A]/5 hover:border-[#38B879]/40 cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNavigate(step.tab);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#DDEAF4] flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
                    {step.icon}
                  </div>
                  <span className="text-xs font-extrabold text-[#142B4A]/40 uppercase tracking-widest">
                    0{step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#142B4A] group-hover:text-[#38B879] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#142B4A]/70 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-[#38B879] gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Start this step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOP MATCHES SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight">
                Recommended For You
              </h2>
              {/* Handwritten accent verbatim */}
              <span className="font-handwritten text-xl text-[#38B879] -rotate-2 select-none">
                Real opportunities. Real fit.
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#142B4A]/70 mt-1">
              Ranked in real-time according to your major, verified skills, and interest alignment.
            </p>
          </div>

          <button
            onClick={() => onNavigate("for-you")}
            className="text-sm font-bold text-[#142B4A] hover:text-[#38B879] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Matches ({scoredInternships.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMatches.map((item) => (
            <InternshipCard
              key={item.internship.id}
              scored={item}
              onSelect={onSelectInternship}
            />
          ))}
        </div>
      </section>

      {/* TEAM / TESTIMONIAL SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#142B4A]/10 shadow-navy-soft relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#38B879]">
                Student Stories
              </span>
              {/* Handwritten accent near team/testimonial verbatim */}
              <span className="font-handwritten text-2xl text-[#142B4A] rotate-[-2deg]">
                Different backgrounds. Same goal.
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight leading-snug">
              “I stopped sending 50 generic applications and focused on the 3 roles where my actual skills shone.”
            </h3>

            <div className="mt-6 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#DDEAF4] flex items-center justify-center text-[#142B4A] font-bold text-sm">
                MK
              </div>
              <div>
                <p className="text-sm font-bold text-[#142B4A]">Maya Kusuma</p>
                <p className="text-xs text-[#142B4A]/70">Communications Major, Semester 6 • Intern at GrowthLab</p>
              </div>
            </div>
          </div>

          {/* Background subtle badge */}
          <div className="hidden lg:block absolute right-12 bottom-8 opacity-10">
            <GraduationCap className="w-48 h-48 text-[#142B4A]" />
          </div>
        </div>
      </section>
    </div>
  );
};
