import {
  Internship,
  MatchBreakdown,
  ScoredInternship,
  Skill,
  SkillGapItem,
  SkillLevel,
  UserProfile,
} from "../types";

export const LEVEL_MAP: Record<SkillLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function getLevelValue(level?: SkillLevel | "Not added"): number {
  if (!level || level === "Not added") return 0;
  return LEVEL_MAP[level] || 0;
}

/**
 * Computes exact match metrics based on the specified specification:
 * Overall match % = (skillScore × 0.5) + (interestScore × 0.25) + (experienceScore × 0.15) + (educationScore × 0.10)
 */
export function calculateMatch(user: UserProfile, internship: Internship): MatchBreakdown {
  const userSkillMap = new Map<string, SkillLevel>();
  user.skills.forEach((s) => {
    userSkillMap.set(s.name.trim().toLowerCase(), s.level);
  });

  const userInterestsSet = new Set(user.interests.map((i) => i.trim().toLowerCase()));

  // 1. Skill Score
  const greatSkills: Skill[] = [];
  const skillsToImprove: Skill[] = [];
  const gapItems: SkillGapItem[] = [];

  let skillPointsTotal = 0;
  const totalRequiredSkills = internship.requiredSkills.length || 1;

  for (const req of internship.requiredSkills) {
    const key = req.name.trim().toLowerCase();
    const userLevel = userSkillMap.get(key);
    const userLevelVal = userLevel ? LEVEL_MAP[userLevel] : 0;
    const reqLevelVal = LEVEL_MAP[req.level];

    if (userLevelVal > 0) {
      const ratio = Math.min(userLevelVal / reqLevelVal, 1);
      skillPointsTotal += ratio;

      if (userLevelVal >= reqLevelVal) {
        greatSkills.push(req);
        gapItems.push({
          name: req.name,
          requiredLevel: req.level,
          userLevel: userLevel!,
          userLevelValue: userLevelVal,
          requiredLevelValue: reqLevelVal,
          isMet: true,
          gapText: userLevelVal > reqLevelVal ? "Exceeds requirement" : "Requirement met",
        });
      } else {
        skillsToImprove.push(req);
        gapItems.push({
          name: req.name,
          requiredLevel: req.level,
          userLevel: userLevel!,
          userLevelValue: userLevelVal,
          requiredLevelValue: reqLevelVal,
          isMet: false,
          gapText: `${userLevel} (Need ${req.level})`,
        });
      }
    } else {
      // Absent skill
      skillPointsTotal += 0;
      skillsToImprove.push(req);
      gapItems.push({
        name: req.name,
        requiredLevel: req.level,
        userLevel: "Not added",
        userLevelValue: 0,
        requiredLevelValue: reqLevelVal,
        isMet: false,
        gapText: `Missing (Need ${req.level})`,
      });
    }
  }

  const skillScore = (skillPointsTotal / totalRequiredSkills) * 100;

  // 2. Interest Score
  const totalReqInterests = internship.requiredInterests.length || 1;
  let matchedInterests = 0;
  for (const interest of internship.requiredInterests) {
    if (userInterestsSet.has(interest.trim().toLowerCase())) {
      matchedInterests++;
    }
  }
  const interestScore = (matchedInterests / totalReqInterests) * 100;

  // 3. Experience Score
  // Note: flat 80 if user.experience.length > 0, else 40 (mock heuristic — placeholder for a real experience-relevance model)
  const experienceScore = user.experience && user.experience.length > 0 ? 80 : 40;

  // 4. Education Score
  // flat 90 if user.major loosely relates to role category (string-match major keywords against role title/interests), else 60
  const majorLower = (user.major || "").toLowerCase();
  const majorKeywords = majorLower
    .split(/[\s,/-]+/)
    .filter((w) => w.length > 3 && !["study", "department", "general", "science"].includes(w));

  const roleTokens = [
    internship.title.toLowerCase(),
    internship.company.toLowerCase(),
    ...internship.requiredInterests.map((i) => i.toLowerCase()),
    ...internship.requiredSkills.map((s) => s.name.toLowerCase()),
  ].join(" ");

  const hasEducationMatch =
    majorKeywords.some((keyword) => roleTokens.includes(keyword)) ||
    (majorLower.includes("marketing") && roleTokens.includes("marketing")) ||
    (majorLower.includes("communication") && roleTokens.includes("communication")) ||
    (majorLower.includes("business") && roleTokens.includes("business")) ||
    (majorLower.includes("computer") && (roleTokens.includes("sql") || roleTokens.includes("python") || roleTokens.includes("data"))) ||
    (majorLower.includes("finance") && roleTokens.includes("finance")) ||
    (majorLower.includes("data") && roleTokens.includes("data"));

  const educationScore = hasEducationMatch ? 90 : 60;

  // Overall match %
  const overall = skillScore * 0.5 + interestScore * 0.25 + experienceScore * 0.15 + educationScore * 0.1;
  const overallScore = Math.min(100, Math.max(0, Math.round(overall)));

  return {
    overallScore,
    skillScore: Math.round(skillScore),
    interestScore: Math.round(interestScore),
    experienceScore: Math.round(experienceScore),
    educationScore: Math.round(educationScore),
    greatSkills,
    skillsToImprove,
    gapItems,
    gapSkillsCount: skillsToImprove.length,
    interestOverlapCount: matchedInterests,
  };
}

export function scoreAllInternships(user: UserProfile, internships: Internship[]): ScoredInternship[] {
  return internships.map((internship) => ({
    internship,
    breakdown: calculateMatch(user, internship),
  }));
}

/**
 * Computes profile completion percentage: (filled fields / total fields) * 100
 */
export function calculateProfileCompletion(user: UserProfile): number {
  let filledCount = 0;
  const totalFields = 8;

  if (user.major && user.major.trim().length > 0) filledCount++;
  if (user.semester && user.semester > 0) filledCount++;
  if (user.location && user.location.trim().length > 0) filledCount++;
  if (user.preference && user.preference.trim().length > 0) filledCount++;
  if (user.skills && user.skills.length >= 3) filledCount++;
  if (user.interests && user.interests.length >= 2) filledCount++;
  if (user.experience && user.experience.length >= 1) filledCount++;
  if (user.education && user.education.trim().length > 0) filledCount++;

  return Math.min(100, Math.round((filledCount / totalFields) * 100));
}
