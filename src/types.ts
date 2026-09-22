export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface UserProfile {
  major: string;
  semester: number;
  location: string;
  preference: string; // "Hybrid" | "Remote" | "On-site"
  skills: Skill[];
  interests: string[];
  experience: string[];
  education: string;
}

export interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  mode: "Hybrid" | "Remote" | "On-site" | string;
  duration: string;
  requiredSkills: Skill[];
  requiredInterests: string[];
}

export interface SkillGapItem {
  name: string;
  requiredLevel: SkillLevel;
  userLevel: SkillLevel | "Not added";
  userLevelValue: number;
  requiredLevelValue: number;
  isMet: boolean;
  gapText: string;
}

export interface MatchBreakdown {
  overallScore: number;
  skillScore: number;
  interestScore: number;
  experienceScore: number;
  educationScore: number;
  greatSkills: Skill[];
  skillsToImprove: Skill[];
  gapItems: SkillGapItem[];
  gapSkillsCount: number;
  interestOverlapCount: number;
}

export interface ScoredInternship {
  internship: Internship;
  breakdown: MatchBreakdown;
}

export interface LearningResource {
  skill: string;
  title: string;
  platform: string;
  level: string;
  urlLabel: string;
}

export type ActiveTab =
  | "home"
  | "explore"
  | "for-you"
  | "my-match"
  | "application"
  | "profile"
  | "profile-builder";
