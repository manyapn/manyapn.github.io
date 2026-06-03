export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string;
  links: ProjectLink[];
};

export type ProjectGroup = {
  id: string;
  label: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    id: "personal",
    label: "personal projects",
    projects: [
      {
        id: "tiny-habit-coach",
        title: "Tiny Habit Coach",
        description:
          "an ai habit coach that helps people redesign habits after missed days, instead of just tracking streaks.",
        tech: "react · flask · claude api",
        links: [
          { label: "live", url: "https://tiny-habit-coach.vercel.app/" },
          { label: "github", url: "https://github.com/manyapn/tiny-habit-coach" },
        ],
      },
      {
        id: "magicfold",
        title: "MagicFold",
        description:
          "a web-based zine maker for designing 8-panel digital zines, previewing them as flip books, and downloading print-ready pdfs.",
        tech: "react · next.js · typescript",
        links: [{ label: "live", url: "https://magic-fold.vercel.app/" }],
      },
      {
        id: "sudoku-solver",
        title: "Sudoku Solver",
        description:
          "a sudoku visualizer that shows a backtracking algorithm solving puzzles in real time.",
        tech: "flask · javascript",
        links: [{ label: "live", url: "https://sudoku-solver-sable.vercel.app/" }],
      },
    ],
  },
  {
    id: "team",
    label: "team projects",
    projects: [
      {
        id: "nanobanana",
        title: "NanoBanana",
        description:
          "a generative ai mobile app for real-time image creation and sharing, built at cornell appdev hack challenge.",
        tech: "node.js · postgresql · swift · xai api",
        links: [{ label: "github", url: "https://github.com/benyadabest/hackchallenge" }],
      },
      {
        id: "symbolic-equation-solver",
        title: "Symbolic Equation Solver",
        description:
          "a latex-based symbolic math engine with a lexer, parser, ast, and client-server multiplayer extension.",
        tech: "ocaml",
        links: [
          {
            label: "github",
            url: "https://github.coecis.cornell.edu/bws72/3110-Team-Project",
          },
        ],
      },
    ],
  },
  {
    id: "data",
    label: "data storytelling",
    projects: [
      {
        id: "boxer-analysis",
        title: "The Myth of the Undefeated Boxer",
        description:
          "a cornell data journal story analyzing 4,500+ boxing matches across 60 years.",
        tech: "python · pandas · beautifulsoup",
        links: [
          {
            label: "read",
            url: "https://drive.google.com/file/d/1AklK5eIyK92vlWpr6OAhOCkkg2isP6X9/view?usp=sharing",
          },
        ],
      },
      {
        id: "brave-new-world",
        title: "Brave New World Computational Analysis",
        description:
          "a computational humanities reading of huxley's novel through power, identity, and surveillance.",
        tech: "nlp · corpus analysis",
        links: [
          {
            label: "read",
            url: "https://gracorossanigo.github.io/classic_novels_website/articles/brave-new-world.html",
          },
        ],
      },
    ],
  },
];
