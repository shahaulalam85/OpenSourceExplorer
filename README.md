# Open Source Project Explorer

Open Source Project Explorer is a responsive, feature-rich web application built with **Next.js 16 (App Router)** and **React 19** designed to help developers find and track open-source projects. Developers can discover repositories filtered by tech domains, coding difficulty, and technology tags, with bookmarking supported via local persistence.

---

## 🚀 Key Features

* **Home Dashboard**: Offers dynamic, programmatically derived repository statistics, featured repositories sorted by stars, and browse-by-category cards.
* **Multi-Criteria Filter & Search**: Supports live search matching name, description, language, or technology tag. Filters include Domain selection tabs, a Difficulty dropdown, and a "Beginner Friendly" indicator checkbox.
* **Reactive Bookmarking**: Persists user bookmarks inside browser `localStorage`. Uses custom browser window events to synchronize saved lists across different pages instantly.
* **Presenter Saved Layout**: The `/saved` path renders saved cards with specialized layout actions: `[View Details]` (redirect to detail page) and `[Remove]` (remove from shortlist immediately).
* **Tag-Click Redirection**: Clicking a technology tag on any project card dynamically populates the search bar to filter the catalog.
* **Static Generation Details Route (`/projects/[id]`)**: Auto-generates static details pages at build-time using `generateStaticParams()` for high SEO scoring and immediate loading.
* **Premium Theme Styling**: Structured entirely with vanilla CSS variables (no external CSS libraries) showcasing custom scrollbars, emerald accents on dark slate backgrounds, and micro-interaction hover scaling.

---

## 🛠️ Technology Stack

* **Core Framework**: Next.js 16 (App Router)
* **Library**: React 19
* **Styling**: Vanilla CSS3 Custom Properties (CSS variables)
* **Persistence**: Web Storage API (`localStorage`)
* **Package Manager**: npm

---

## 📁 Project Architecture

```text
OpenSourceProject/
├── app/
│   ├── globals.css           # Styling theme tokens and global rules
│   ├── layout.js             # Root layout with Inter font and Navbar
│   ├── page.js               # Home dashboard view & dynamic stats
│   ├── not-found.js          # Fallback custom 404 page
│   ├── projects/
│   │   ├── page.js           # Server Component fetching URL parameters
│   │   └── [id]/
│   │       └── page.js       # Static generated details page
│   └── saved/
│       └── page.js           # Client Component for saved bookmarks
├── components/
│   ├── Navbar.js             # Navigation header tracking route state
│   ├── ProjectCard.js        # Repository block card supporting actions mode
│   ├── ProjectExplorer.js    # Multi-filter search control panel
│   └── BookmarkButton.js     # React client bookmark state toggle
├── lib/
│   └── projects.js           # Shared mock database of 10 repositories
├── jsconfig.json             # Absolute path mapping (@/* -> ./*)
├── package.json              # Dependency declarations
└── README.md                 # Project documentation
```

---

## ⚙️ Getting Started

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Build

Compile, build, and optimize the application for production:
```bash
npm run build
npm run start
```


