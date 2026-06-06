export type ProjectStatus    = "Active Development" | "In Development" | "Prototype";
export type ProjectPlatform  = "web" | "mobile";
export type ScreenshotFormat = "web-desktop" | "mobile-app" | "architecture" | "product-catalog";

export interface Track {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  /** Path relative to /public, e.g. "/gading/projects/courseflow/dashboard.png" */
  image?: string;
  /** Descriptive alt text for the screenshot */
  alt?: string;
  /** Short caption shown below the image */
  caption?: string;
  notes?: string;
  /**
   * Override the screenshot display format.
   * When omitted, falls back to the project's platform:
   *   "web"    → "web-desktop"
   *   "mobile" → "mobile-app"
   */
  screenshotFormat?: ScreenshotFormat;
}

export interface Project {
  id: string;
  title: string;
  catalogNumber: string;
  year: string;
  status: ProjectStatus;
  platform: ProjectPlatform;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  myRole: string;
  keyFeatures: string[];
  currentStatus: string;
  nextImprovements: string[];
  tags: string[];
  accentColor: string;
  coverInitial: string;
  /** Optional: live deployment URL */
  liveDemoUrl?: string;
  /** Optional: GitHub repository URL */
  githubUrl?: string;
  /** Optional: external case study or documentation URL */
  caseStudyUrl?: string;
  /** Optional: extra note about project status for the modal */
  statusNote?: string;
  tracks: Track[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const projects: Project[] = [
  /* ── GTW-001 · CourseFlow ─────────────────────────────────── */
  {
    id: "courseflow",
    title: "CourseFlow",
    catalogNumber: "GTW-001",
    year: "2026",
    status: "Active Development",
    platform: "web",
    accentColor: "#D4AF37",
    coverInitial: "C",
    description:
      "A student productivity web app for managing personal coursework tasks and shared group projects in one place — Kanban boards, shared calendars, and a Telegram bot for notifications.",
    longDescription:
      "CourseFlow tackles the fragmentation students face when juggling multiple courses, group projects, and deadlines across different tools. It brings personal task management, shared project workspaces, visual Kanban boards, and a calendar view into a single cohesive app — with Telegram reminders so students don't have to keep the browser open to stay on track.",
    problem:
      "Students often manage coursework, group project responsibilities, links, deadlines, and reminders across LMS platforms, WhatsApp, Telegram, notes apps, Google Drive, and memory. This creates scattered information, missed deadlines, unclear ownership, and poor visibility into group project progress.",
    solution:
      "CourseFlow centralizes personal coursework tasks and shared group project work into one student-focused workspace. It combines course-based task organization, shared project collaboration, role-aware member management, Kanban workflow, calendar planning, risk-based priority tracking, and Telegram reminders so students can understand what needs attention without switching between multiple apps.",
    myRole:
      "Product planning, frontend development, UI/UX structure, Supabase data model planning, task and project workflow design, Telegram bot/reminder integration, risk logic design, and project documentation.",
    keyFeatures: [
      "Personal task management",
      "Shared project workspace",
      "Course-based task filtering",
      "Kanban workflow",
      "Calendar planning",
      "Risk-based priority logic",
      "Telegram bot assistant",
      "Scheduled reminders",
      "Project invitations",
      "Role-aware collaboration",
    ],
    currentStatus:
      "Full-stack active development. Core task, course, project, Kanban, calendar, Supabase persistence, Telegram assistant, and reminder flows are implemented and being refined through product-level testing.",
    nextImprovements: [
      "Smart screenshot-based task import through Telegram",
      "Better mobile responsiveness and interaction polish",
      "Stronger project collaboration edge-case handling",
      "Parser quality testing for academic screenshots",
      "Final production-readiness audit and documentation polish",
    ],
    liveDemoUrl: "https://courseflow-six.vercel.app/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Kanban", "Calendar", "Telegram Bot"],
    tracks: [
      {
        number: "01",
        title: "Dashboard Overview",
        subtitle: "Main workspace for daily tasks and progress",
        description:
          "Shows the main workspace for today's tasks, upcoming deadlines, active courses, and project progress. The dashboard provides a high-level view of everything in motion — designed to answer 'what do I need to do today?' at a glance.",
        image: "/gading/projects/courseflow/dashboard.png",
        alt: "CourseFlow dashboard showing today's tasks, deadlines, and active courses",
        caption: "Main dashboard — daily tasks and progress overview",
      },
      {
        number: "02",
        title: "Personal Task Management",
        subtitle: "Create, view, and manage coursework tasks",
        description:
          "Shows how students create, view, update, and manage their own coursework tasks. Supports task status tracking, priority labels, and deadline assignment. Scoped entirely to the individual student's workflow.",
        image: "/gading/projects/courseflow/tasks.png",
        alt: "CourseFlow personal task list with status labels and deadline assignment",
        caption: "Personal tasks — individual coursework management",
      },
      {
        number: "03",
        title: "Shared Project Workspace",
        subtitle: "Group collaboration and shared task management",
        description:
          "Shows group project structure, members, shared tasks, project status, and collaboration flow. Designed to reduce friction in coordinating across group members without requiring everyone to use the same external tool.",
        image: "/gading/projects/courseflow/shared-project.png",
        alt: "CourseFlow shared project workspace with group tasks and member list",
        caption: "Shared project — group collaboration workspace",
      },
      {
        number: "04",
        title: "Kanban Board Flow",
        subtitle: "Visual task progression through stages",
        description:
          "Shows tasks moving through To Do, In Progress, Review, and Completed columns. Drag-and-drop interaction with status persistence via Supabase. Works for both personal tasks and group project tasks.",
        image: "/gading/projects/courseflow/kanban.png",
        alt: "CourseFlow Kanban board with four columns: To Do, In Progress, Review, Completed",
        caption: "Kanban board — visual task progression",
      },
      {
        number: "05",
        title: "Calendar Planning",
        subtitle: "Deadline and task timeline view",
        description:
          "Shows how deadlines and tasks are organized visually by date. Students can see the week or month ahead and identify heavy workload periods before they become crises.",
        image: "/gading/projects/courseflow/calendar.png",
        alt: "CourseFlow calendar view showing scheduled tasks and upcoming deadlines",
        caption: "Calendar — deadline and timeline planning",
      },
      {
        number: "06",
        title: "Telegram Reminder Logic",
        subtitle: "Automated deadline notifications via bot",
        description:
          "Shows the planned reminder flow for upcoming deadlines, high-risk tasks, and quick task capture via Telegram. Reduces reliance on checking the app manually — the bot comes to the student instead.",
        image: "/gading/projects/courseflow/telegram.png",
        alt: "CourseFlow Telegram bot reminder flow for deadline and task notifications",
        caption: "Telegram integration — automated deadline reminders",
        notes:
          "Integration is planned via Telegram Bot API + Supabase Edge Functions. Currently in architecture and flow design phase.",
      },
      {
        number: "07",
        title: "Course Filtering",
        subtitle: "Filter workspace by subject or course",
        description:
          "Shows how users filter tasks and project work by course. Keeps the workspace focused and prevents context switching between unrelated subjects during a study session.",
        image: "/gading/projects/courseflow/course-filtering.png",
        alt: "CourseFlow course filter interface showing tasks grouped by subject",
        caption: "Course filtering — focus by subject",
      },
      {
        number: "08",
        title: "Project Architecture",
        subtitle: "Tech stack, data flow, and integration overview",
        description:
          "Shows the app structure, data flow, and planned Supabase and Telegram integration. Provides a technical overview of how the authentication, real-time database, and bot notification layers connect.",
        image: "/gading/projects/courseflow/architecture.png",
        alt: "CourseFlow architecture diagram showing Next.js, Supabase, and Telegram integration",
        caption: "Architecture — tech stack and integration overview",
        screenshotFormat: "architecture",
        notes:
          "Next.js App Router · Supabase (Auth + Realtime + Storage) · Telegram Bot API · Vercel deployment.",
      },
    ],
  },

  /* ── GTW-002 · Satori Rattan Web ─────────────────────────── */
  {
    id: "satori-rattan",
    title: "Satori Rattan Web",
    catalogNumber: "GTW-002",
    year: "2026",
    status: "In Development",
    platform: "web",
    accentColor: "#7D9A6E",
    coverInitial: "SR",
    description:
      "A B2B website for a premium rattan furniture manufacturer — brand story, product collections, and a Request for Quotation flow targeting commercial clients and interior designers.",
    longDescription:
      "Satori Rattan is a real client project — a B2B website for a premium rattan furniture manufacturer based in Cirebon, Indonesia. The brand has been operating since 2014, serves clients in 40+ countries, and targets hospitality brands, interior designers, and commercial developers. The site presents the company story, product collections (natural and synthetic rattan), and a structured quotation request form rather than a generic contact page.",
    problem:
      "The business needs a professional online presence that communicates its B2B manufacturing credentials, presents its product range clearly, and converts international client interest into structured quotation requests.",
    solution:
      "Satori Rattan Web presents the brand story, collections, and craftsmanship positioning professionally, then routes serious buyers to a structured Request for Quotation form with project type, estimated quantity, and budget range fields.",
    myRole:
      "Website planning, frontend structure, visual layout, responsive design, product catalog flow, and quotation form design.",
    keyFeatures: [
      "B2B brand landing page",
      "Company story and credentials",
      "Product catalog and collections",
      "Featured products grid",
      "Collection detail with specs",
      "Request for Quotation form",
      "Bespoke and craftsmanship pages",
    ],
    currentStatus:
      "Client project in development. Core pages (homepage, brand story, collections, featured products, collection detail, and quotation form) are implemented. Remaining pages and full product catalog are in progress.",
    nextImprovements: [
      "Complete remaining collection pages",
      "Add Bespoke project inquiry flow",
      "Expand product catalog entries",
      "Improve quotation form and email templates",
      "Deploy public version",
    ],
    tags: ["Next.js", "TypeScript", "Responsive Design", "Product Catalog", "Email Inquiry"],
    tracks: [
      {
        number: "01",
        title: "Homepage",
        subtitle: "Premium B2B landing with clear entry points",
        description:
          "The hero section positions Satori as a premium rattan manufacturer — 'Crafting Excellence in Natural & Synthetic Rattan'. Trusted by global brands for 12+ years. Two primary CTAs guide visitors toward the product catalog or starting a project. Navigation covers Projects, Collections, Bespoke, Craftsmanship, About, and Contact.",
        image: "/gading/projects/satori/homepage.png",
        alt: "Satori Rattan homepage with hero rattan chair, brand tagline, and VIEW COLLECTIONS / START YOUR PROJECT CTAs",
        caption: "Homepage — premium B2B brand entry",
      },
      {
        number: "02",
        title: "Our Story",
        subtitle: "Brand history and craftsmanship credentials",
        description:
          "The About page presents the company's founding story — established in 2014 by master craftsman Satori in Cirebon, Indonesia. Grew from 5 artisans to 150+ professionals, now supplying 40+ countries. Positions the brand as a trusted B2B partner for hospitality brands, residential developers, and commercial projects.",
        image: "/gading/projects/satori/brand-story.png",
        alt: "Satori Rattan brand story page — A Legacy of Craftsmanship, company history since 2014",
        caption: "Our story — craftsmanship legacy since 2014",
      },
      {
        number: "03",
        title: "Product Catalog",
        subtitle: "Collections overview and catalog entry point",
        description:
          "The Collections page introduces the product catalog with a full-width header — 'Our Collections / Explore our curated range of premium rattan furniture, designed for clients seeking quality, durability, and timeless style.' Acts as the entry point for browsing the full product range.",
        image: "/gading/projects/satori/categories.png",
        alt: "Satori Rattan product catalog page with Our Collections header",
        caption: "Collections — product catalog entry",
      },
      {
        number: "04",
        title: "Featured Products",
        subtitle: "Curated product grid with lounge, dining, and commercial pieces",
        description:
          "Shows the featured products grid — Kolor Chair (Lounge), Canari (Dining, carbon steel powder coated), Man O (Lounge, rattan core weave), and Koreza (Commercial, Singapore). Each card displays the product category and client/use context. Layout is production-ready with real product photography.",
        image: "/gading/projects/satori/featured-collection.png",
        alt: "Satori Rattan featured products grid showing Kolor Chair, Canari, Man O, and Koreza pieces",
        caption: "Featured products — lounge, dining, and commercial",
      },
      {
        number: "05",
        title: "Collection Detail",
        subtitle: "Synthetic rattan range with product specs",
        description:
          "The Synthetic Rattan Collection page lists individual products with photography, material specs, lead times, and dimensions — Marina Outdoor Sofa, Coastal Bar Stool, Horizon Lounger, Reef Dining Collection. Targets commercial buyers who need specification-level detail before requesting a quotation.",
        image: "/gading/projects/satori/product-detail.png",
        alt: "Satori Rattan synthetic rattan collection page with Marina Outdoor Sofa, Coastal Bar Stool, Horizon Lounger, Reef Dining Collection",
        caption: "Synthetic rattan — product specs and detail",
      },
      {
        number: "06",
        title: "Request for Quotation",
        subtitle: "Structured inquiry form for commercial clients",
        description:
          "The Contact page combines company information (head office address, phone, email, business hours) with a structured Request for Quotation form. Fields include Company Name, Contact Name, Email, Phone, Project Type, Estimated Quantity, Budget Range, and Project Details — designed for serious B2B buyers rather than casual inquiries.",
        image: "/gading/projects/satori/email-inquiry.png",
        alt: "Satori Rattan contact page with company information and Request for Quotation form including project type and budget range fields",
        caption: "Request for Quotation — B2B inquiry form",
      },
    ],
  },

  /* ── GTW-003 · BudgetBite ─────────────────────────────────── */
  {
    id: "budgetbite",
    title: "BudgetBite",
    catalogNumber: "GTW-003",
    year: "2025",
    status: "Prototype",
    platform: "mobile",
    accentColor: "#8B7BAE",
    coverInitial: "B",
    description:
      "A mobile app prototype helping students manage food spending by setting a monthly budget, splitting it across categories, and tracking what's left — with pantry-aware recipe suggestions.",
    longDescription:
      "BudgetBite addresses a specific student pain point: the anxiety of running out of food money mid-week. The app walks users through setting a monthly or weekly food budget, splitting it across spending categories (Groceries, Eat Out, Snacks), and tracking remaining balance per category. A pantry screen lets students log what they have at home, and the app surfaces recipe suggestions based on available ingredients — reducing both food waste and unplanned spending. Currently a functional prototype undergoing a full refactor to improve architecture and state management.",
    problem:
      "Students often overspend on food because they do not translate their monthly or weekly budget into category-level spending limits or plan meals around what they already have at home.",
    solution:
      "BudgetBite is a mobile app prototype that guides students through budget setup, category splitting, spending tracking, and pantry-aware recipe suggestions in a single focused flow.",
    myRole:
      "Product idea, mobile app planning, user flow design, UI design, and frontend implementation.",
    keyFeatures: [
      "Mascot-guided onboarding",
      "Monthly / weekly food budget setup",
      "Category budget split (Groceries, Eat Out, Snacks)",
      "Spending breakdown by category",
      "Remaining budget tracker",
      "Pantry item tracking",
      "Pantry-aware recipe suggestions",
    ],
    currentStatus:
      "Prototype / refactoring. Core onboarding, budget setup, category split, home dashboard, and pantry flows are implemented. Refactoring state management and architecture before adding new features.",
    nextImprovements: [
      "Refactor state management with Zustand",
      "Add reliable local persistence with MMKV",
      "Expand recipe suggestion logic",
      "Add spending history and insights view",
      "Prepare a stable demo version",
    ],
    statusNote: "This is an honest prototype in active iteration. The core budget setup, category split, and pantry flows are implemented and working.",
    tags: ["React Native", "TypeScript", "Expo", "Budgeting", "Meal Planning", "Student Finance"],
    tracks: [
      {
        number: "01",
        title: "Welcome Screen",
        subtitle: "Meet Bite and see what the app does",
        description:
          "Introduces the app mascot Bite and communicates the three core value props upfront: adaptive daily meal suggestions, tracking across groceries/eat out/snacks, and pantry-aware recipe ideas. A clear 'Get Started' entry with a sign-in option for returning users.",
        image: "/gading/projects/budgetbite/onboarding.png",
        alt: "BudgetBite welcome screen with mascot Bite and core value propositions",
        caption: "Welcome — meet Bite and get started",
      },
      {
        number: "02",
        title: "Set Your Food Budget",
        subtitle: "Monthly or weekly food budget input",
        description:
          "Lets users set their total food budget for the month or week. Includes a toggle between monthly and weekly modes, a numeric input with live RM/week and RM/day breakdowns, and quick-pick presets (400 / 600 / 800 / 1000). The mascot provides friendly real-time feedback on the chosen amount.",
        image: "/gading/projects/budgetbite/budget-setup.png",
        alt: "BudgetBite food budget setup screen with monthly/weekly toggle, RM 800 input, and quick pick presets",
        caption: "Budget setup — monthly food budget",
      },
      {
        number: "03",
        title: "Split Your Food Budget",
        subtitle: "Allocate budget across spending categories",
        description:
          "After setting the total, users drag sliders to split it across three categories: Groceries, Eat Out, and Snacks. Each slider shows a live percentage and RM amount. The mascot reacts once the split looks balanced — 'Perfect split! Looks great.'",
        image: "/gading/projects/budgetbite/budget-split.png",
        alt: "BudgetBite budget split screen with sliders for Groceries, Eat Out, and Snacks categories",
        caption: "Budget split — allocate across categories",
      },
      {
        number: "04",
        title: "Home Dashboard",
        subtitle: "Total remaining budget and spending breakdown",
        description:
          "The main screen after setup. Shows total remaining budget (RM 800.00), days left in the period, and a spending breakdown card for each category — Groceries, Eat Out, and Snacks — with current spend vs. allocation. Bottom navigation provides quick access to Pantry, History, and Insights.",
        image: "/gading/projects/budgetbite/home-page.png",
        alt: "BudgetBite home dashboard showing total remaining budget and per-category spending breakdown",
        caption: "Home — budget overview and category breakdown",
      },
      {
        number: "05",
        title: "My Pantry",
        subtitle: "Ingredient tracking and recipe suggestions",
        description:
          "Lists available pantry ingredients as selectable tags — the user marks what they currently have at home. Below, the app surfaces recipes that can be made from those ingredients and flags any missing items (e.g. 'Need: Garlic'). Connects pantry inventory directly to meal suggestions, reducing food waste and unplanned spending.",
        image: "/gading/projects/budgetbite/pantry.png",
        alt: "BudgetBite pantry screen showing ingredient tags and recipe suggestions with missing ingredient flags",
        caption: "Pantry — ingredients and recipe suggestions",
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    category: "Mobile",
    skills: ["React Native", "Expo"],
  },
  {
    category: "Backend & Data",
    skills: ["Supabase", "PostgreSQL", "REST APIs", "Node.js"],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "GitHub", "Figma", "VS Code", "Vercel", "npm"],
  },
  {
    category: "Currently Learning",
    skills: ["Docker", "CI/CD"],
  },
];
