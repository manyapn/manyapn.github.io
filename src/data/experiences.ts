export type Experience = {
  id: string;
  period: string;
  role: string;
  org: string;
  orgUrl?: string;
  description: string;
  collaborator?: { name: string; url: string };
  category: "research" | "internship" | "club";
  current: boolean;
};

export const experiences: Experience[] = [
  {
    id: "uw-security",
    period: "may – aug '26",
    role: "REU Summer Research Intern",
    org: "UW Security & Privacy Lab",
    orgUrl: "https://www.franziroesner.com/students.html",
    description:
      "researching how agentic browser systems behave around dark patterns, ads, cookie banners, phishing pages, and other messy parts of the web.",
    category: "research",
    current: true,
  },
  {
    id: "finmd",
    period: "june – aug '26",
    role: "Full-Stack/Product Engineering Intern",
    org: "FinMD",
    orgUrl: "https://www.finmd.com/",
    description:
      "working on scope, finmd's physician intelligence platform for healthcare lending.",
    category: "internship",
    current: true,
  },
  {
    id: "uw-ra",
    period: "may '26 – present",
    role: "Research Assistant",
    org: "University of Washington",
    description:
      "building an llm pipeline to analyze android talkback traces and identify accessibility issues.",
    collaborator: { name: "mingyuan zhong", url: "https://mingyuanz.com/" },
    category: "research",
    current: true,
  },
  {
    id: "cornell-c2l",
    period: "jan – may '26",
    role: "Undergraduate Research Assistant",
    org: "Cornell Culture & Computation Lab",
    orgUrl: "https://c2l.infosci.cornell.edu/",
    description:
      "worked on narrative geography data, annotation guidelines, and computational humanities research.",
    category: "research",
    current: false,
  },
  {
    id: "lessonloop",
    period: "nov '25 – may '26",
    role: "Software Engineering Intern",
    org: "LessonLoop",
    orgUrl: "https://lessonloop.org/our-platform/",
    description:
      "built product features for an edtech platform helping teachers find and use engagement strategies.",
    category: "internship",
    current: false,
  },
  {
    id: "ewb",
    period: "nov '25 – present",
    role: "Backend Developer",
    org: "Cornell Engineers Without Borders",
    orgUrl: "https://www.ewbcornell.org/software-development",
    description:
      "building backend systems for inventory, donations, and sales workflows.",
    category: "club",
    current: true,
  },
  {
    id: "deca",
    period: "mar '24 – apr '25",
    role: "State President",
    org: "Washington DECA",
    orgUrl: "https://wadeca.org/",
    description:
      "led a statewide student organization of 17,000+ members across 165+ chapters.",
    category: "club",
    current: false,
  },
];
