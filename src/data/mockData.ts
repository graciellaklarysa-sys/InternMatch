import { Internship, LearningResource, UserProfile } from "../types";

export const mockUser: UserProfile = {
  major: "Marketing Communications",
  semester: 6,
  location: "Jakarta",
  preference: "Hybrid",
  skills: [
    { name: "Canva", level: "Advanced" },
    { name: "Social Media", level: "Advanced" },
    { name: "Communication", level: "Intermediate" },
    { name: "Copywriting", level: "Intermediate" },
    { name: "Meta Ads", level: "Beginner" },
    { name: "Analytics", level: "Beginner" }
  ],
  interests: ["Marketing", "Social Media", "Business Development"],
  experience: [
    "Marketing Committee - Campus Festival 2025",
    "Freelance Instagram content creator"
  ],
  education: "S1, Semester 6, GPA context not disclosed"
};

export const mockInternships: Internship[] = [
  {
    id: 1,
    title: "Social Media Intern",
    company: "GrowthLab Indonesia",
    location: "Bali",
    mode: "Hybrid",
    duration: "3–6 months",
    requiredSkills: [
      { name: "Content Creation", level: "Intermediate" },
      { name: "Canva", level: "Intermediate" },
      { name: "Social Media", level: "Intermediate" },
      { name: "Communication", level: "Intermediate" },
      { name: "Meta Ads", level: "Intermediate" },
      { name: "Analytics", level: "Intermediate" }
    ],
    requiredInterests: ["Marketing", "Social Media"]
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "BrightWave Creative",
    location: "Jakarta",
    mode: "Hybrid",
    duration: "3–6 months",
    requiredSkills: [
      { name: "Copywriting", level: "Intermediate" },
      { name: "Social Media", level: "Intermediate" },
      { name: "Canva", level: "Beginner" },
      { name: "Communication", level: "Advanced" }
    ],
    requiredInterests: ["Marketing", "Business Development"]
  },
  {
    id: 3,
    title: "Business Development Intern",
    company: "NestGen Tech",
    location: "Jakarta",
    mode: "On-site",
    duration: "3–6 months",
    requiredSkills: [
      { name: "Communication", level: "Advanced" },
      { name: "Excel", level: "Intermediate" },
      { name: "SQL", level: "Beginner" }
    ],
    requiredInterests: ["Business Development", "Data"]
  },
  {
    id: 4,
    title: "Content Marketing Intern",
    company: "Kalika Studio",
    location: "Bandung",
    mode: "Remote",
    duration: "3 months",
    requiredSkills: [
      { name: "Copywriting", level: "Intermediate" },
      { name: "Canva", level: "Intermediate" },
      { name: "Social Media", level: "Beginner" }
    ],
    requiredInterests: ["Marketing"]
  },
  {
    id: 5,
    title: "Data Analyst Intern",
    company: "Bytewise Analytics",
    location: "Jakarta",
    mode: "On-site",
    duration: "6 months",
    requiredSkills: [
      { name: "Excel", level: "Advanced" },
      { name: "SQL", level: "Intermediate" },
      { name: "Python", level: "Beginner" },
      { name: "Analytics", level: "Intermediate" }
    ],
    requiredInterests: ["Data", "AI"]
  },
  {
    id: 6,
    title: "Digital Marketing Intern",
    company: "Anterasa Group",
    location: "Surabaya",
    mode: "Hybrid",
    duration: "3–6 months",
    requiredSkills: [
      { name: "Meta Ads", level: "Intermediate" },
      { name: "Analytics", level: "Intermediate" },
      { name: "Social Media", level: "Advanced" },
      { name: "Communication", level: "Intermediate" }
    ],
    requiredInterests: ["Marketing", "Social Media"]
  },
  {
    id: 7,
    title: "Finance Intern",
    company: "Cendana Capital",
    location: "Jakarta",
    mode: "On-site",
    duration: "6 months",
    requiredSkills: [
      { name: "Excel", level: "Advanced" },
      { name: "Communication", level: "Intermediate" }
    ],
    requiredInterests: ["Finance"]
  },
  {
    id: 8,
    title: "Community & Events Intern",
    company: "Ruangan Kreatif",
    location: "Yogyakarta",
    mode: "Hybrid",
    duration: "3 months",
    requiredSkills: [
      { name: "Communication", level: "Advanced" },
      { name: "Social Media", level: "Intermediate" },
      { name: "Canva", level: "Beginner" }
    ],
    requiredInterests: ["Marketing", "Business Development"]
  }
];

// Curated static learning resources lookup (2 per skill as specified)
export const skillResources: Record<string, LearningResource[]> = {
  "Meta Ads": [
    {
      skill: "Meta Ads",
      title: "Meta Certified Digital Marketing Associate",
      platform: "Meta Blueprint",
      level: "Beginner to Intermediate",
      urlLabel: "Meta Blueprint Course"
    },
    {
      skill: "Meta Ads",
      title: "Facebook Ads & Instagram Campaigns Masterclass",
      platform: "Coursera / Meta",
      level: "Intermediate",
      urlLabel: "Coursera Meta Professional Cert"
    }
  ],
  "Analytics": [
    {
      skill: "Analytics",
      title: "Google Analytics 4 Certification",
      platform: "Google Analytics Academy",
      level: "Beginner to Intermediate",
      urlLabel: "Google Skillshop GA4"
    },
    {
      skill: "Analytics",
      title: "Data-Driven Marketing & Web Metrics",
      platform: "HubSpot Academy",
      level: "Intermediate",
      urlLabel: "HubSpot Academy Free Cert"
    }
  ],
  "SQL": [
    {
      skill: "SQL",
      title: "SQL for Beginners - Full Course",
      platform: "freeCodeCamp",
      level: "Beginner",
      urlLabel: "freeCodeCamp YouTube & Interactive"
    },
    {
      skill: "SQL",
      title: "Relational Database & SQL Queries for Data Analysis",
      platform: "Khan Academy",
      level: "Beginner to Intermediate",
      urlLabel: "Khan Academy Computer Science"
    }
  ],
  "Excel": [
    {
      skill: "Excel",
      title: "Excel Skills for Business Essentials",
      platform: "Macquarie University / Coursera",
      level: "Beginner to Intermediate",
      urlLabel: "Coursera Business Excel"
    },
    {
      skill: "Excel",
      title: "Advanced Excel Formulas, Pivot Tables & Dashboards",
      platform: "Microsoft Learn",
      level: "Intermediate to Advanced",
      urlLabel: "Microsoft Official Training"
    }
  ],
  "Copywriting": [
    {
      skill: "Copywriting",
      title: "Content Marketing & Copywriting Certification",
      platform: "HubSpot Academy",
      level: "Beginner to Intermediate",
      urlLabel: "HubSpot Inbound Copywriting"
    },
    {
      skill: "Copywriting",
      title: "High-Converting Digital Ad & Social Copywriting",
      platform: "Copyhackers Free Tutorials",
      level: "Intermediate",
      urlLabel: "Copyhackers Guides"
    }
  ],
  "Content Creation": [
    {
      skill: "Content Creation",
      title: "Creative Storytelling & Visual Strategy for Social",
      platform: "LinkedIn Learning",
      level: "Beginner to Intermediate",
      urlLabel: "LinkedIn Learning Creative Suite"
    },
    {
      skill: "Content Creation",
      title: "Short-form Video Strategy (TikTok & Reels)",
      platform: "Creator Academy",
      level: "Intermediate",
      urlLabel: "Creator Academy Open Workshop"
    }
  ],
  "Python": [
    {
      skill: "Python",
      title: "Python for Everybody Specialization",
      platform: "University of Michigan / Coursera",
      level: "Beginner",
      urlLabel: "Coursera Python for Everybody"
    },
    {
      skill: "Python",
      title: "Introduction to Python for Data Science",
      platform: "freeCodeCamp",
      level: "Beginner",
      urlLabel: "freeCodeCamp Data Analysis"
    }
  ],
  "Communication": [
    {
      skill: "Communication",
      title: "Professional Communication in the Digital Workplace",
      platform: "Harvard Online Free Learning",
      level: "All Levels",
      urlLabel: "Harvard Business Ed"
    },
    {
      skill: "Communication",
      title: "Pitching, Presentation & Cross-Functional Collaboration",
      platform: "OpenLearn / BBC",
      level: "Intermediate",
      urlLabel: "Open University Courses"
    }
  ]
};

export const sampleCvBullets = [
  "Managed social media accounts for campus festival and designed 15+ poster graphics using Canva",
  "Created daily Instagram reels and stories that reached thousands of student viewers during freshmen orientation",
  "Assisted marketing committee with email newsletters, outreach to sponsors, and scheduling promotional posts",
  "Coordinated with student council team to gather survey feedback on campus events using Google Forms and spreadsheets"
];

export const allCommonSkills = [
  "Canva",
  "Social Media",
  "Communication",
  "Copywriting",
  "Meta Ads",
  "Analytics",
  "Content Creation",
  "Excel",
  "SQL",
  "Python",
  "Figma",
  "Public Speaking",
  "SEO",
  "Market Research",
  "Email Marketing"
];

export const allCommonInterests = [
  "Marketing",
  "Social Media",
  "Business Development",
  "Data",
  "AI",
  "Finance",
  "Design",
  "E-Commerce",
  "Sustainability",
  "Community Management"
];
