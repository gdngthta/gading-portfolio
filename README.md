# Gading Tahta Widi — Portfolio Website

A premium vinyl record / album archive themed software engineering portfolio for showcasing selected projects, case studies, and internship-ready work.

## Live Demo

> Deploy URL — replace after Vercel deployment

## Tech Stack

| Technology | Role |
|---|---|
| Next.js 16 (App Router) | Framework, routing, SSG |
| TypeScript | Strict typing throughout |
| Tailwind CSS v4 | Design tokens via CSS custom properties |
| Framer Motion v12 | Entrance, hover, and modal animations |
| Lucide React | Icon set |
| Vercel | Deployment target |

## Main Features

- **Vinyl record / album archive identity** — dark editorial aesthetic with gold accents and grain texture
- **Project discography** — interactive project rows with album sleeve hover interaction
- **Mobile phone sleeve** — BudgetBite card shows phone mockup sleeve artwork to signal mobile-app type
- **Full-screen album case study modal** — track-based project slideshow with directional transitions
- **Screenshot format system** — `web-desktop` and `mobile-app` display modes per track
- **Screenshot fallback** — graceful styled placeholders when assets are missing (no broken images)
- **Responsive layout** — mobile, tablet, and desktop breakpoints
- **Accessible navigation** — keyboard focus rings, Escape key, aria labels, role attributes
- **Reduced motion support** — CSS media query + Framer Motion `useReducedMotion()` hook
- **SEO metadata** — Open Graph and Twitter card meta tags
- **Resume download and contact links** — email, GitHub, LinkedIn, PDF resume

## Project Structure

```
.
├── app/
│   ├── icon.svg                  # GTW monogram site icon (auto-detected by Next.js)
│   ├── globals.css               # Design tokens, typography utilities, animations
│   ├── layout.tsx                # Root layout with SEO metadata
│   └── page.tsx                  # Main page (single-page app)
├── components/
│   ├── Contact.tsx               # 05 — Encore / contact section
│   ├── Discography.tsx           # 02 — Discography / project list
│   ├── Equipment.tsx             # 04 — Equipment / skills section
│   ├── Footer.tsx                # Page footer
│   ├── GrainOverlay.tsx          # Fixed grain texture overlay
│   ├── Hero.tsx                  # 01 — Now Playing / hero section
│   ├── LinerNotes.tsx            # 03 — Liner Notes / about section
│   ├── Navbar.tsx                # Fixed navigation bar
│   ├── ProjectModal.tsx          # Full-screen album case study modal
│   ├── ScreenshotPlaceholder.tsx # Screenshot display with format-aware fallback
│   └── VinylRecord.tsx           # Reusable vinyl record SVG
├── lib/
│   └── data.ts                   # Project data, interfaces, skills list
└── public/
    ├── gading/
    │   ├── profile-placeholder.png
    │   └── projects/
    │       ├── courseflow/
    │       ├── satori/
    │       └── budgetbite/
    └── resume/
        └── Gading-Tahta-Widi-Resume.pdf
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Adding Assets

### Profile Photo

Place at:

```
public/gading/profile-placeholder.png
```

Any format (PNG, JPG, WebP). Recommended: portrait orientation, minimum 400×500px, face centered.

If the file is missing, a styled "Artist Profile" placeholder renders automatically — no broken image.

---

### Resume PDF

Place at:

```
public/resume/Gading-Tahta-Widi-Resume.pdf
```

If the file is missing, the Download CV button still renders. Clicking it will return a 404 until the file is placed.

---

### Project Screenshots

If a screenshot is missing, a styled editorial placeholder is shown automatically. **No broken image icons will appear.**

#### CourseFlow — web-desktop format (16:9 or wider recommended)

```
public/gading/projects/courseflow/dashboard.png         ✓ present
public/gading/projects/courseflow/tasks.png             ✓ present
public/gading/projects/courseflow/shared-project.png    ✓ present
public/gading/projects/courseflow/kanban.png            ✓ present
public/gading/projects/courseflow/calendar.png          ✓ present
public/gading/projects/courseflow/telegram.png          ✓ present
public/gading/projects/courseflow/course-filtering.png  ✓ present
public/gading/projects/courseflow/architecture.png      ✓ present  ← architecture diagram format
```

#### Satori Rattan Web — web-desktop format (16:9 or wider recommended)

```
public/gading/projects/satori/homepage.png            ✓ present
public/gading/projects/satori/brand-story.png         ✓ present
public/gading/projects/satori/categories.png          ✓ present
public/gading/projects/satori/featured-collection.png ✓ present
public/gading/projects/satori/product-detail.png      ✓ present
public/gading/projects/satori/email-inquiry.png       ✓ present
```

#### BudgetBite — mobile-app format (portrait, 9:19.5 ratio recommended)

```
public/gading/projects/budgetbite/onboarding.png    ✓ present
public/gading/projects/budgetbite/budget-setup.png  ✓ present
public/gading/projects/budgetbite/budget-split.png  ✓ present
public/gading/projects/budgetbite/home-page.png     ✓ present
public/gading/projects/budgetbite/pantry.png        ✓ present
```

BudgetBite screenshots are displayed inside a large phone mockup stage (album sleeve style). Export at native mobile resolution (portrait, 9:19.5 ratio).

---

## Screenshot Format System

Each track can declare a `screenshotFormat` in `lib/data.ts`:

| Format | Display behaviour | Placeholder label |
|---|---|---|
| `web-desktop` | Fills container, `object-fit: cover` | Screenshot Slot |
| `mobile-app` | Centred phone frame, portrait | Mobile Screenshot |
| `architecture` | Fills container | Architecture Diagram |
| `product-catalog` | Fills container | Product Asset / Photo Pending |

When `screenshotFormat` is not set, the project's `platform` determines the default:
- `"web"` → `"web-desktop"`
- `"mobile"` → `"mobile-app"`

---

## Deployment (Vercel)

This project deploys to Vercel with zero configuration.

1. Push the repository to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Select **Next.js** — default settings work
4. Click **Deploy**

No environment variables required.

```bash
# Or deploy via Vercel CLI
npx vercel
```

---

## Project Status

| # | Project | Status | Screenshots |
|---|---|---|---|
| GTW-001 | CourseFlow | Active Development | All 8 screenshots present ✓ |
| GTW-002 | Satori Rattan Web | In Development | All 6 screenshots present ✓ |
| GTW-003 | BudgetBite | Prototype / Refactoring | All 5 screenshots present ✓ |

---

## Contact

- **Email** — [gadingtahta09@gmail.com](mailto:gadingtahta09@gmail.com)
- **GitHub** — [github.com/gdngthta](https://github.com/gdngthta)
- **LinkedIn** — [linkedin.com/in/gadingtahtawidi](https://linkedin.com/in/gadingtahtawidi)
