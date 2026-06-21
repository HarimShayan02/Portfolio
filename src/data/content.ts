import bottestAiImg from "../assets/bottest-ai.png";
import structureLabImg from "../assets/structure-lab.png";
import tenderMatchImg from "../assets/tender-match.png";
import oempartsImg from "../assets/oemparts.png";
import sloanLeaderImg from "../assets/sloan-leader.png";
import beautiseryImg from "../assets/beautisery.png";
import exploration1 from "../assets/techstack/exploration-1.png";
import exploration2 from "../assets/techstack/exploration-2.png";
import exploration3 from "../assets/techstack/exploration-3.png";
import exploration4 from "../assets/techstack/exploration-4.png";
import exploration5 from "../assets/techstack/exploration-5.png";
import exploration6 from "../assets/techstack/exploration-6.png";

export const PROFILE = {
  name: "Harim Shayan",
  title: "Software Engineer",
  email: "harimshayan13@gmail.com",
  linkedin: "https://www.linkedin.com/in/harimshayan",
  phone: "0347-2212209",
  phoneHref: "tel:+923472212209",
  address: "A-48 Sunny Castle, Block 14, Gulistan-e-Jauhar, Karachi",
  location: "Karachi",
  summary:
    "Web Developer with 3+ years of experience specializing in React.js, Next.js, and modern frontend development. Experienced in building scalable web applications, integrating APIs, managing databases with Supabase, and delivering production-ready features.",
};

export const ROLES = ["React.js", "Next.js", "TypeScript", "Frontend"];

export const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Redux",
  "REST APIs",
  "Supabase",
  "Firebase",
  "Clerk Authentication",
  "Git",
];

export const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "Brisktech",
    period: "Jan 2026 – Present",
    level: "Senior",
    focus: "Leading end-to-end delivery — UI, Supabase, APIs, and payments.",
    spotlight: "Own full-stack features from schema design to production.",
    highlights: [
      "Lead development of scalable web applications using React.js, Next.js, and TypeScript.",
      "Design database tables and schemas in Supabase and manage data flow between frontend and APIs.",
      "Integrate REST APIs, third-party services, and payment gateways for end-to-end functionality.",
      "Build and maintain full-featured applications with authentication, payments, and real-time data.",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "Brisktech",
    period: "Jul 2023 – Dec 2025",
    level: "Junior",
    focus: "Shipping responsive UIs and integrating APIs on client projects.",
    spotlight: "React & Next.js features across fintech, enterprise, and SaaS products.",
    highlights: [
      "Developed responsive web applications using React.js, Next.js, JavaScript, and TypeScript.",
      "Implemented UI components and integrated REST APIs to build dynamic user interfaces.",
      "Worked on bug fixing, performance improvements, and feature enhancements.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Brisktech",
    period: "Jan 2023 – Jun 2023",
    level: "Intern",
    focus: "Frontend foundations — HTML, CSS, JavaScript, and React.",
    highlights: [
      "Built responsive websites using HTML, CSS, JavaScript, and React.js.",
      "Learned modern frontend development practices including ES6+, Git, and component-based architecture.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Software Engineering",
    school: "UBIT, University of Karachi",
    period: "2021 – 2025",
  },
  {
    degree: "Pre-Engineering",
    school: "Govt. Degree College Gulshan-e-Iqbal",
    period: "2017 – 2019",
  },
];

export const PROJECTS = [
  {
    title: "Bottest AI",
    category: "AI",
    description:
      "Automated testing platform for AI chatbots to record, replay, and benchmark chatbot conversations.",
    url: "https://bottest.ai/",
    period: "Mar 2024 – Jun 2024",
    location: "United States",
    tags: ["Next.js", "Node", "Tailwind CSS", "Clerk", "MongoDB", "Express", "Vercel"],
    image: bottestAiImg,
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    featured: true,
  },
  {
    title: "Structure Lab",
    category: "FINANCE",
    description:
      "Platform that helps traders analyze statistical market patterns for better decision-making.",
    url: "https://www.structurelab.ai/",
    period: "Sep 2024 – Present",
    location: "United States",
    tags: ["React", "SciChart", "Supabase", "ApexChart", "Tailwind CSS", "Clerk", "Stripe"],
    image: structureLabImg,
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    featured: true,
  },
  {
    title: "Tender Match",
    category: "ENTERPRISE",
    description:
      "Tender evaluation platform providing insights into risk, feasibility, and collaboration opportunities.",
    url: "https://stagging.mytendermatch.nl/",
    period: "Jan 2026 – Present",
    location: "Netherlands",
    tags: ["Next.js", "Chakra UI", "Supabase", "n8n"],
    image: tenderMatchImg,
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    featured: true,
  },
  {
    title: "OEMParts",
    category: "AUTOMOTIVE",
    description:
      "Automotive parts platform focused on quality and transparency in spare parts sourcing.",
    url: "https://dev.oemparts.com.br/",
    period: "Mar 2025 – Present",
    location: "Brazil",
    tags: ["Vue.js", "Node", "MongoDB", "Express.js", "Tailwind CSS", "Stripe"],
    image: oempartsImg,
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    featured: true,
  },
  {
    title: "Sloan Leader",
    category: "EDUCATION",
    description:
      "Sloan Leader is a coaching and evaluation platform designed to streamline the relationship between coaches, coachees, and corporate clients. With seamless scheduling, video calling, evaluation scoring, and performance analytics, Sloan bridges the gap between mentorship and measurable outcomes — all in one intuitive interface.",
    private: true,
    period: "2024 – 2025",
    location: "United States",
    tags: [
      "React",
      "Node",
      "Styled Components",
      "MongoDB",
      "Express",
      "React Calendar",
      "Ant Design",
    ],
    image: sloanLeaderImg,
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    featured: false,
  },
  {
    title: "Beautisery",
    category: "WELLNESS",
    description:
      "Indulge in luxury and relaxation with our premier services, thoughtfully curated to nurture your body, mind, and spirit. Step into an environment where sophistication meets tranquility, and allow yourself to be enveloped in comfort from the very first moment.",
    private: true,
    period: "Mar 2024 – May 2024",
    location: "Saudi Arabia",
    tags: ["React", "Firebase", "Tailwind CSS"],
    image: beautiseryImg,
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const WORK_VISUALS = [
  { id: "1", img: exploration1, title: "Custom UI" },
  { id: "2", img: exploration2, title: "Component Design" },
  { id: "3", img: exploration3, title: "Fintech Dashboard" },
  { id: "4", img: exploration4, title: "Interface Layout" },
  { id: "5", img: exploration5, title: "Frontend Craft" },
  { id: "6", img: exploration6, title: "Coding" },
];

export const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "6", label: "Projects Done" },
  { value: "2", label: "Languages Spoken" },
];
