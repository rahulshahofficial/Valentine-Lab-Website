import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, FlaskConical, Newspaper,
  MapPin, Cpu, ScanLine, Globe, Grid, Telescope,
  Award, ExternalLink, Menu, X, Mail, Phone,
  ArrowLeft, Users,
} from "lucide-react";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                       WEBSITE CONTENT GUIDE                                 ║
// ║  All editable content lives in clearly marked sections below.               ║
// ║  Search (Ctrl/Cmd+F) for these labels to jump straight to each section:     ║
// ║                                                                              ║
// ║  📰 CONTENT: NEWS           → update news headlines & summaries             ║
// ║  📄 CONTENT: RECENT PAPERS  → add/remove recent publications                ║
// ║  🏆 CONTENT: LANDMARK PAPERS→ foundational papers (rarely changes)          ║
// ║  👥 CONTENT: PEOPLE         → add/remove lab members & update bios          ║
// ║  📸 CONTENT: LAB LIFE PHOTOS→ add group photos                              ║
// ║  🔢 CONTENT: HERO STATS     → update publication count / awards badge       ║
// ║                                                                              ║
// ║  After editing, run:  npm run build                                          ║
// ║  Then commit & push the docs/ folder for changes to go live.                ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ── Theme & helpers ────────────────────────────────────────────────────────────
const gold  = "#CFAE70";
const goldD = "#B49248";
const base  = (p) => import.meta.env.BASE_URL + p;

// ── Shared style tokens ────────────────────────────────────────────────────────
const CONTAINER = "w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION   = "py-10 md:py-14";
const H2        = "text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight";
const SUBHEAD   = "mt-3 text-base md:text-lg text-zinc-400 leading-relaxed";

// ── Smooth scroll (ease-out cubic) ────────────────────────────────────────────
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const NAV = 72;
  const target = el.getBoundingClientRect().top + window.scrollY - NAV;
  const start  = window.scrollY;
  const dist   = target - start;
  const dur    = Math.min(900, Math.max(350, Math.abs(dist) * 0.45));
  let t0 = null;
  const ease = (t) => 1 - Math.pow(1 - t, 3); // fast start → slow finish
  const step = (ts) => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    window.scrollTo(0, start + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const CARD      = "rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-200";

// ── Nav links ──────────────────────────────────────────────────────────────────
const mainNav = [
  { label: "Research",     href: "#research",     page: null },
  { label: "Publications", href: "#publications", page: null },
  { label: "People",       href: null,            page: "people" },
  { label: "News",         href: "#news",         page: null },
  { label: "Contact",      href: "#contact",      page: null },
];

// ── Research areas ─────────────────────────────────────────────────────────────
const research = [
  { icon: Telescope,    name: "Meta-optics & Metasurfaces",     blurb: "Flat optical elements that manipulate light using nanoscale patterned structures — enabling ultra-thin lenses, beam shapers, and optical analog computing." },
  { icon: ScanLine,     name: "Snapshot Hyperspectral Imaging",  blurb: "Single-shot spectral capture using compressive encoding and learned reconstruction for real-time, wide-field spectral imaging." },
  { icon: Cpu,          name: "Computational Imaging",           blurb: "Co-designing optics and algorithms — inverse problems, differentiable optical design, and neural network-based reconstruction." },
  { icon: FlaskConical, name: "Active & Tunable Photonics",     blurb: "Reconfigurable optical devices using phase-change, electro-optic, and thermo-optic materials for dynamic, programmable light control." },
  { icon: Grid,         name: "Nanofabrication & Metamaterials", blurb: "Simulation-driven design (RCWA/FDTD) combined with VINSE-enabled electron beam lithography and photolithography fabrication." },
  { icon: Globe,        name: "Applications",                    blurb: "SWIR/MWIR sensing, nonlinear photonics, thermal emission control, flow cytometry, and integrated optoelectronic devices." },
];

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  🏆 CONTENT: LANDMARK PAPERS                                                 ║
// ║  High-impact foundational papers — rarely needs changing.                    ║
// ║  Reorder items to change display order. Keep to ~4 entries.                  ║
// ║                                                                              ║
// ║  To add an entry, copy this template:                                        ║
// ║  {                                                                           ║
// ║    title: "Full paper title",                                                ║
// ║    authors: "A. Author, B. Author, J. Valentine",                            ║
// ║    venue: "Nature",  year: "2024",                                           ║
// ║    url: "https://doi.org/...",                                               ║
// ║    note: "Cover Article",  // optional — award/coverage note                ║
// ║    img: base("papers/filename.png"),  // optional — upload to public/papers/ ║
// ║    tags: ["keyword1", "keyword2"],                                           ║
// ║  },                                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const landmarkPapers = [
  {
    title: "Three-dimensional optical metamaterial exhibiting negative refractive index",
    authors: "J. Valentine, S. Zhang, T. Zentgraf, E. Ulin-Avila, D. A. Genov, G. Bartal, X. Zhang",
    venue: "Nature", year: "2008",
    url: "https://www.nature.com/articles/nature07247",
    note: "Time Magazine Top 10 Scientific Discovery of 2008",
    tags: ["negative index", "metamaterial"],
  },
  {
    title: "An optical cloak made of dielectrics",
    authors: "J. Valentine, J. Li, T. Zentgraf, G. Bartal, X. Zhang",
    venue: "Nature Materials", year: "2009",
    url: "https://www.nature.com/articles/nmat2461",
    note: "Cover Article",
    tags: ["transformation optics", "cloak"],
  },
  {
    title: "Realization of an all-dielectric zero-index optical metamaterial",
    authors: "P. Moitra, Y. Yang, Z. Anderson, I. I. Kravchenko, D. P. Briggs, J. Valentine",
    venue: "Nature Photonics", year: "2013",
    url: "https://www.nature.com/articles/nphoton.2013.214",
    tags: ["zero-index", "all-dielectric"],
  },
  {
    title: "Flat optics for image differentiation",
    authors: "Y. Zhou, H. Zheng, I. I. Kravchenko, J. Valentine",
    venue: "Nature Photonics", year: "2020",
    url: "https://www.nature.com/articles/s41566-020-0591-3",
    tags: ["meta-optics", "analog compute"],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  📄 CONTENT: RECENT PAPERS                                                   ║
// ║  Add newest papers at the TOP. Aim to keep ~4–6 entries.                     ║
// ║  When a paper becomes old, move it out or delete it.                         ║
// ║                                                                              ║
// ║  Copy this template and fill in your values:                                 ║
// ║                                                                              ║
// ║  {                                                                           ║
// ║    title: "Full paper title",                                                ║
// ║    authors: "A. Author, B. Author, J. Valentine",                            ║
// ║    venue: "Nature Photonics",  year: "2025",                                 ║
// ║    url: "https://doi.org/10.xxxx/xxxxx",                                     ║
// ║    img: base("papers/filename.png"),  // optional — upload to public/papers/ ║
// ║    tags: ["keyword1", "keyword2", "keyword3"],                               ║
// ║  },                                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const recentPapers = [
  // ── ADD NEW PAPERS HERE ↓ (paste template above, newest first) ────────────────

  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "ExtremeMETA: High-speed lightweight image segmentation model by remodeling multi-channel metamaterial imagers",
    authors: "Q. Liu, B. T. Swartz, I. I. Kravchenko, J. Valentine, Y. Huo",
    venue: "Journal of Imaging Science and Technology", year: "2025",
    url: "https://doi.org/10.2352/j.imagingsci.technol.2025.69.4.040406",
    tags: ["computational imaging", "segmentation"],
  },
  {
    title: "Nanoscale optical nonreciprocity with nonlinear metasurfaces",
    authors: "A. Tripathi, C. F. Ugwu, V. Asadchy, I. Faniayeu, I. I. Kravchenko, S. Fan, Y. S. Kivshar, J. Valentine, S. S. Kruk",
    venue: "Nature Communications", year: "2024",
    url: "https://doi.org/10.1038/s41467-024-49436-1",
    tags: ["nonreciprocity", "nonlinear", "metasurfaces"],
  },
  {
    title: "Metasurface-enabled barcoding for compact flow cytometry",
    authors: "T. Hong, D. Li, J. G. Valentine",
    venue: "Optica", year: "2024",
    url: "https://doi.org/10.1364/optica.511669",
    tags: ["metasurfaces", "flow cytometry", "barcoding"],
  },
  {
    title: "Roadmap for optical metasurfaces",
    authors: "A. I. Kuznetsov, M. L. Brongersma, J. Yao, ... J. Valentine, et al.",
    venue: "ACS Photonics", year: "2024",
    url: "https://doi.org/10.1021/acsphotonics.3c00457",
    tags: ["metasurfaces", "roadmap", "review"],
  },
];

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  👥 CONTENT: PEOPLE                                                          ║
// ║  Keep Jason Valentine FIRST — he always appears at the top.                 ║
// ║  Add new members at the END of the array (before the closing "]").          ║
// ║  Remove graduated members by deleting their entry.                           ║
// ║                                                                              ║
// ║  Copy this template for a new member:                                        ║
// ║  {                                                                           ║
// ║    name: "First Last",                                                       ║
// ║    role: "Ph.D. Student",   // Ph.D. Student / Ph.D. Candidate / Postdoc    ║
// ║    dept: "Mechanical Engineering",                                           ║
// ║    img:  base("people/filename.png"),  // upload photo to public/people/    ║
// ║          // — OR leave img: "" for a "Photo coming soon" placeholder        ║
// ║    url:  "",                // personal/profile page link, or ""            ║
// ║    bio:  "Research focus in one sentence.",                                  ║
// ║  },                                                                          ║
// ║                                                                              ║
// ║  ADDING A PHOTO:                                                             ║
// ║    1. Rename photo to something like "firstname-lastname.png"                ║
// ║    2. Upload it to the  public/people/  folder in this repo                 ║
// ║    3. Set img: base("people/firstname-lastname.png")  in the entry below    ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const people = [
  {
    name: "Jason G. Valentine",
    role: "Professor & PI",
    dept: "Mechanical Engineering & Electrical Engineering",
    img: base("people/Jason-Valentine-Young.png"),
    url: "https://engineering.vanderbilt.edu/bio/jason-valentine",
    bio: "B.S. Purdue (2004) · Ph.D. UC Berkeley (2010) · NSF CAREER Award · ONR Young Investigator Award · ORNL Faculty Liaison",
  },
  {
    name: "Brandon Swartz",
    role: "Ph.D. Candidate",
    dept: "Mechanical Engineering",
    img: "",
    url: "",
    bio: "Be cool",
  },
  {
    name: "Tao Hong",
    role: "Ph.D. Candidate",
    dept: "Interdisciplinary Materials Science",
    img: "",
    url: "",
    bio: "Research: Metasurface-integrated microfluidics for next-generation flow cytometry.",
  },
  {
    name: "Rahul Shah",
    role: "Ph.D. Student",
    dept: "Interdisciplinary Materials Science",
    img: "",
    url: "",
    bio: "Research: Metasurface-enabled hyperspectral imaging",
  },
  {
    name: "Chris Boyd",
    role: "Ph.D. Student",
    dept: "Mechanical Engineering",
    img: "",
    url: "",
    bio: "Be lame",
  },
  {
    name: "Carson Snow",
    role: "Ph.D. Student",
    dept: "Interdisciplinary Materials Science",
    img: "",
    url: "",
    bio: "Just be",
  },
  // ── ADD NEW MEMBERS HERE ↓ ────────────────────────────────────────────────────
  // {
  //   name: "First Last",
  //   role: "Ph.D. Student",
  //   dept: "Mechanical Engineering",
  //   img:  "",
  //   url:  "",
  //   bio:  "Research focus in one sentence.",
  // },
  // ─────────────────────────────────────────────────────────────────────────────
];

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  📸 CONTENT: LAB LIFE PHOTOS                                                 ║
// ║  Add real photos by replacing entries below.                                 ║
// ║                                                                              ║
// ║  For each photo:                                                             ║
// ║    1. Upload image to the  public/lab-life/  folder in this repo            ║
// ║    2. Change  img: ""  to  img: base("lab-life/your-photo.jpg")             ║
// ║                                                                              ║
// ║  Leave  img: ""  to keep a placeholder tile until you have a real photo.    ║
// ║  Add or remove entries to change the number of tiles shown.                 ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const labLifePhotos = [
  // ── REPLACE img: "" WITH A REAL PATH ONCE YOU HAVE PHOTOS ────────────────────
  { label: "Group Outing",     img: "" },
  { label: "Cleanroom Work",   img: "" },
  { label: "Lab Meeting",      img: "" },
  { label: "Conference Trip",  img: "" },
  { label: "Celebration",      img: "" },
  { label: "Friday Afternoon", img: "" },
  // To add more: { label: "Your Caption", img: base("lab-life/photo.jpg") },
];

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  📰 CONTENT: NEWS                                                            ║
// ║  Add new items at the TOP of this array. Keep ~3–5 items total.             ║
// ║                                                                              ║
// ║  Copy this template and fill in your values:                                 ║
// ║                                                                              ║
// ║  {                                                                           ║
// ║    date: "April 2025",          // month + year, or just "2025"             ║
// ║    headline: "Short headline",  // one sentence, plain text                 ║
// ║    summary: "1–2 sentences.",   // brief description                        ║
// ║    url: "https://...",          // link to paper/press release, or ""       ║
// ║    img: base("news/photo.jpg"), // optional — upload to public/news/        ║
// ║  },                                                                          ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
const news = [
  // ── ADD NEW ITEMS HERE ↓ (paste template above, newest first) ─────────────────

  // ─────────────────────────────────────────────────────────────────────────────
  {
    date: "2025",
    headline: "ExtremeMETA: metamaterial-based image segmentation published",
    summary: "Collaboration with Vanderbilt AI group demonstrates high-speed segmentation using multi-channel metamaterial imagers.",
    url: "https://doi.org/10.2352/j.imagingsci.technol.2025.69.4.040406",
  },
  {
    date: "2024",
    headline: "Nanoscale optical nonreciprocity with nonlinear metasurfaces — Nature Communications",
    summary: "New work demonstrating nonreciprocal light propagation at the nanoscale using nonlinear dielectric metasurfaces.",
    url: "https://doi.org/10.1038/s41467-024-49436-1",
  },
  {
    date: "2019",
    headline: "Prof. Valentine appointed as Vanderbilt's Oak Ridge National Laboratory Liaison",
    summary: "Prof. Valentine will serve as faculty liaison to ORNL, deepening research ties between Vanderbilt and the national lab.",
    url: "https://news.vanderbilt.edu/2019/11/07/valentine-appointed-new-faculty-liaison-to-oak-ridge-national-lab/",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// NAV (shared)
// ══════════════════════════════════════════════════════════════════════════════
function Nav({ page, navigate, mobileOpen, setMobileOpen }) {
  // Navigate to home then smooth-scroll to section id
  function goSection(id) {
    if (page !== "home") {
      navigate("home");
      setTimeout(() => smoothScrollTo(id), 320);
    } else {
      smoothScrollTo(id);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-black/25">
      <div className={`${CONTAINER} py-4 flex items-center justify-between`}>

        <button onClick={() => navigate("home")} className="flex items-center gap-4 shrink-0">
          <div className="h-11 w-11 rounded-xl shrink-0"
            style={{ background: `conic-gradient(from 180deg, ${goldD}, ${gold}, ${goldD})` }} />
          <div className="leading-tight text-left">
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Vanderbilt University</div>
            <div className="font-bold text-xl tracking-tight">Valentine Lab</div>
          </div>
        </button>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {mainNav.map((n) =>
            n.page ? (
              <button key={n.label} onClick={() => navigate(n.page)}
                className={`text-base transition-colors duration-150 ${page === n.page ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}>
                {n.label}
              </button>
            ) : (
              <button key={n.label} onClick={() => goSection(n.href.slice(1))}
                className="text-base text-zinc-400 hover:text-white transition-colors duration-150">
                {n.label}
              </button>
            )
          )}
          <button
            onClick={() => goSection("prospective")}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
            style={{ backgroundColor: gold, color: "#1C1C1C" }}>
            Join the Lab <ArrowRight size={15} />
          </button>
        </nav>

        <button className="md:hidden p-2 rounded-xl text-zinc-300 hover:bg-white/10 transition"
          onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mob"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-black/85 backdrop-blur-xl overflow-hidden">
            <div className="px-6 py-5 flex flex-col gap-1">
              {mainNav.map((n) =>
                n.page ? (
                  <button key={n.label} onClick={() => { navigate(n.page); setMobileOpen(false); }}
                    className="py-3 px-4 rounded-xl text-base text-zinc-300 hover:text-white hover:bg-white/10 transition text-left">
                    {n.label}
                  </button>
                ) : (
                  <button key={n.label} onClick={() => { goSection(n.href.slice(1)); setMobileOpen(false); }}
                    className="py-3 px-4 rounded-xl text-base text-zinc-300 hover:text-white hover:bg-white/10 transition text-left">
                    {n.label}
                  </button>
                )
              )}
              <button onClick={() => { goSection("prospective"); setMobileOpen(false); }}
                className="mt-2 text-center rounded-xl px-5 py-3 text-sm font-bold"
                style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                Join the Lab
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PEOPLE PAGE
// ══════════════════════════════════════════════════════════════════════════════
function PeoplePage({ navigate }) {
  return (
    <div>
      {/* Back + header */}
      <section className={`${SECTION} pb-12`}>
        <div className={CONTAINER}>
          <button onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 text-lg text-zinc-400 hover:text-white transition mb-10">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <h1 className={`${H2}`}>Meet the Team</h1>
          <p className={`${SUBHEAD} max-w-2xl`}>
            Researchers working at the intersection of nanophotonics, meta-optics, and computational imaging.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="pb-20">
        <div className={CONTAINER}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {people.map((m) => {
              const card = (
                <div className={`${CARD} overflow-hidden h-full`}>
                  <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                    {m.img ? (
                      <img src={m.img} alt={m.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-base">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <div className="text-xl md:text-2xl font-semibold">{m.name}</div>
                    <div className="text-lg text-zinc-400 mt-1.5">{m.role}</div>
                    {m.dept && <div className="text-base text-zinc-600 mt-1">{m.dept}</div>}
                    {m.bio && <div className="text-base text-zinc-500 mt-4 leading-relaxed">{m.bio}</div>}
                  </div>
                </div>
              );
              return m.url ? (
                <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
              ) : (
                <div key={m.name}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Life */}
      <section className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>Lab Life</h2>
          <p className={`${SUBHEAD} max-w-2xl`}>
            Research is better together — from cleanroom sessions to group outings.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {labLifePhotos.map(({ label, img }) => (
              <div key={label} className="aspect-[4/3] rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden">
                {img ? (
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-600">
                    <div className="text-3xl">📸</div>
                    <div className="text-base font-medium">{label}</div>
                    <div className="text-sm text-zinc-700">Photo coming soon</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-zinc-600">
            To add photos: upload images to <code className="text-zinc-500">public/lab-life/</code>, then update the <code className="text-zinc-500">labLifePhotos</code> array near the top of <code className="text-zinc-500">src/App.jsx</code>.
          </p>
        </div>
      </section>

      {/* Join section */}
      <section className={`${SECTION} border-t border-white/[0.05]`} id="prospective">
        <div className={CONTAINER}>
          <div className={`${CARD} p-8 md:p-12`}>
            <h2 className="text-3xl md:text-4xl font-bold">Join the Lab</h2>
            <p className="mt-5 text-xl text-zinc-400 leading-relaxed max-w-2xl">
              We're always looking for motivated graduate students and researchers
              passionate about nanophotonics and meta-optics.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://apply.vanderbilt.edu" target="_blank" rel="noopener noreferrer"
                className="rounded-xl px-6 py-3 text-base font-bold transition hover:opacity-90"
                style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                Apply to Vanderbilt
              </a>
              <a href="mailto:jason.g.valentine@vanderbilt.edu"
                className="rounded-xl px-6 py-3 text-base font-medium border border-white/20 hover:border-white/40 transition">
                Email Prof. Valentine
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════════════════════
function HomePage({ navigate }) {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="w-full pt-12 pb-16 md:pt-16 md:pb-24">
        <div className={`${CONTAINER} grid lg:grid-cols-12 gap-10 items-center`}>
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5"
                style={{ borderColor: `${gold}50`, color: gold }}>
                Vanderbilt University · Mechanical Engineering
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05]">
                Engineering light<br />with{" "}
                <span style={{ color: gold }}>meta-optics</span>
                <br />&amp; materials
              </h1>
              <p className="mt-5 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                We study how nanoscale structuring engineers a material's optical
                properties — building platforms for imaging, communications,
                sensing, and energy conversion.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={() => smoothScrollTo("research")}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium bg-white/[0.08] hover:bg-white/[0.14] transition border border-white/10">
                  Explore research
                </button>
                <button onClick={() => smoothScrollTo("publications")}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-white/30 transition">
                  Publications
                </button>
                <button onClick={() => smoothScrollTo("prospective")}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                  Open positions
                </button>
              </div>
              {/* 🔢 CONTENT: HERO STATS — update the numbers/badges below as needed */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-2"><FlaskConical size={15} /> VINSE Nanofabrication</span>
                <span className="flex items-center gap-2"><BookOpen size={15} /> 36+ publications</span>{/* ← update count */}
                <span className="flex items-center gap-2"><Award size={15} /> NSF CAREER · ONR YIP</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 z-10" />
              <img src={base("people/Jason-Valentine-Young.png")}
                alt="Prof. Jason Valentine in the VINSE cleanroom"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.opacity = "0"; }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-base text-zinc-300 z-20">
                <span>Prof. Valentine · VINSE cleanroom</span>
                <span className="px-3 py-1 rounded-lg bg-black/50 text-sm font-medium"
                  style={{ border: `1px solid ${gold}40` }}>Meta-optics</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ──────────────────────────────────────────────────────── */}
      <section id="research" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>Research Areas</h2>
          <p className={`${SUBHEAD} max-w-2xl`}>
            Spanning design, fabrication, and computation — from flat optics to learned reconstruction.
          </p>
          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {research.map((r) => (
              <div key={r.name} className={`${CARD} group p-6`}>
                <r.icon className="mb-3 opacity-60 group-hover:opacity-100 transition-opacity" size={22} style={{ color: gold }} />
                <div className="text-base font-semibold">{r.name}</div>
                <div className="mt-2 text-sm text-zinc-400 leading-relaxed">{r.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ──────────────────────────────────────────────────────────── */}
      <section id="news" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>News</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {news.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col overflow-hidden`}>
                {/* Image area — always shown */}
                <div className="h-36 overflow-hidden bg-zinc-900">
                  {item.img ? (
                    <img src={item.img} alt={item.headline}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm gap-2">
                      <Newspaper size={18} /> Photo coming soon
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="text-xs text-zinc-500 font-medium">{item.date}</div>
                  <div className="mt-2 text-sm font-semibold leading-snug flex-1">{item.headline}</div>
                  <div className="mt-2 text-xs text-zinc-400 leading-relaxed">{item.summary}</div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: gold }}>
                    Read more <ArrowRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ──────────────────────────────────────────────────── */}
      <section id="publications" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>

          {/* Landmark */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className={H2}>Landmark Papers</h2>
              <p className={`${SUBHEAD} max-w-xl`}>Foundational work that defined the field.</p>
            </div>
            <a href="https://scholar.google.com/citations?user=6yh8YJgAAAAJ"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 transition">
              <ExternalLink size={14} /> All on Google Scholar
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {landmarkPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col overflow-hidden`}>
                {/* Figure / image area */}
                <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                  {p.img ? (
                    <img src={p.img} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-zinc-700">
                      <div className="text-2xl">🔬</div>
                      <div className="text-xs">Figure coming soon</div>
                    </div>
                  )}
                </div>
                {/* Text */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md shrink-0"
                      style={{ background: `${gold}25`, color: gold }}>
                      {p.venue} · {p.year}
                    </span>
                    {p.note && <span className="text-xs text-zinc-500 italic text-right leading-snug">{p.note}</span>}
                  </div>
                  <div className="text-sm font-semibold leading-snug flex-1">{p.title}</div>
                  <div className="mt-2 text-xs text-zinc-500 leading-relaxed">{p.authors}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: gold }}>
                    Read paper <ArrowRight size={11} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Recent */}
          <div className="mb-8">
            <h2 className={H2}>Recent Publications</h2>
            <p className={`${SUBHEAD} max-w-xl`}>Latest work from the lab.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col overflow-hidden`}>
                {/* Figure / image area */}
                <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                  {p.img ? (
                    <img src={p.img} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-zinc-700">
                      <div className="text-2xl">🔬</div>
                      <div className="text-xs">Figure coming soon</div>
                    </div>
                  )}
                </div>
                {/* Text */}
                <div className="flex flex-col flex-1 p-4">
                  <div className="mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{ background: `${gold}18`, color: gold }}>
                      {p.venue} · {p.year}
                    </span>
                  </div>
                  <div className="text-sm font-semibold leading-snug flex-1">{p.title}</div>
                  <div className="mt-2 text-xs text-zinc-500 leading-relaxed">{p.authors}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: gold }}>
                    Read paper <ArrowRight size={11} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEOPLE TEASER ─────────────────────────────────────────────────── */}
      <section id="people" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className={H2}>People</h2>
              <p className={`${SUBHEAD} max-w-xl`}>Meet the researchers behind the work.</p>
            </div>
            <button onClick={() => navigate("people")}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-medium bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 transition">
              <Users size={16} /> Full team &amp; lab life →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.slice(0, 4).map((m) => {
              const card = (
                <div className={`${CARD} overflow-hidden h-full`}>
                  <div className="aspect-[3/2] bg-zinc-900 overflow-hidden">
                    {m.img ? (
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-base">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xl font-semibold">{m.name}</div>
                    <div className="text-base text-zinc-400 mt-1">{m.role}</div>
                    {m.dept && <div className="text-sm text-zinc-600 mt-0.5">{m.dept}</div>}
                  </div>
                </div>
              );
              return m.url ? (
                <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
              ) : <div key={m.name}>{card}</div>;
            })}
          </div>
          <div className="mt-8">
            <button onClick={() => navigate("people")}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium border border-white/15 hover:border-white/30 transition"
              style={{ color: gold }}>
              See all {people.length} team members + lab life <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PROSPECTIVE ───────────────────────────────────────────────────── */}
      <section id="prospective" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <div className={`${CARD} p-8 md:p-12`}>
            <div className="grid lg:grid-cols-3 gap-10 items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">Join the Lab</h2>
                <p className="mt-5 text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl">
                  We are actively seeking motivated graduate students to tackle challenges
                  at the frontier of nanoscale optics and photonics. Apply to Vanderbilt
                  and reach out to Prof. Valentine directly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="https://apply.vanderbilt.edu" target="_blank" rel="noopener noreferrer"
                    className="rounded-xl px-7 py-3.5 text-lg font-bold transition hover:opacity-90"
                    style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                    Apply to Vanderbilt
                  </a>
                  <a href="mailto:jason.g.valentine@vanderbilt.edu"
                    className="rounded-xl px-7 py-3.5 text-lg font-medium border border-white/20 hover:border-white/40 transition">
                    Email Prof. Valentine
                  </a>
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-6 space-y-4">
                  <div className="text-lg font-semibold">Why Nashville?</div>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    World-class nanofabrication at VINSE, close partnership with Oak Ridge
                    National Laboratory, and a thriving tech and culture hub.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["VINSE Nanofab", "ORNL partnership", "Nashville"].map(t => (
                      <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer id="contact" className="pt-16 pb-20 border-t border-white/[0.08]">
        <div className={CONTAINER}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="text-lg font-semibold mb-4">Contact</div>
              <div className="space-y-3 text-base text-zinc-400">
                <div className="font-medium text-white text-lg">Prof. Jason G. Valentine</div>
                <a href="mailto:jason.g.valentine@vanderbilt.edu"
                  className="flex items-start gap-3 hover:text-white transition">
                  <Mail size={17} className="shrink-0 mt-0.5" /> jason.g.valentine@vanderbilt.edu
                </a>
                <div className="flex items-center gap-3">
                  <Phone size={17} className="shrink-0" /> 615-875-5508
                </div>
                <div className="text-zinc-500">Office: 332 Olin Hall</div>
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold mb-4">Find Us</div>
              <div className="space-y-4 text-base text-zinc-400">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium mb-1">Lab — 609 Olin Hall</div>
                    2400 Highland Avenue<br />Nashville, TN 37212
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium mb-1">Mailing</div>
                    2301 Vanderbilt Place, PMB 351592<br />Nashville, TN 37235-1592
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold mb-4">Links</div>
              <div className="flex flex-col gap-3 text-base">
                {[
                  ["Google Scholar", "https://scholar.google.com/citations?user=6yh8YJgAAAAJ"],
                  ["Faculty Profile", "https://engineering.vanderbilt.edu/bio/jason-valentine"],
                  ["VINSE", "https://www.vanderbilt.edu/vinse/"],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                    <ExternalLink size={14} /> {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold mb-4">Affiliations</div>
              <div className="flex flex-col gap-2 text-base text-zinc-500">
                <span>Dept. of Mechanical Engineering</span>
                <span>Dept. of Electrical Engineering</span>
                <span>VINSE</span>
                <span>Oak Ridge National Laboratory Liaison</span>
              </div>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-base text-zinc-600">
            <span>© {new Date().getFullYear()} Vanderbilt University — Valentine Research Group</span>
            <span>Nashville, TN · Mechanical Engineering</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP — hash-based routing
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState(() =>
    window.location.hash === "#people" ? "people" : "home"
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(to) {
    setPage(to);
    setMobileOpen(false);
    window.location.hash = to === "people" ? "people" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handler = () => {
      const next = window.location.hash === "#people" ? "people" : "home";
      setPage(next);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <div
      className="min-h-screen w-full text-white overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse 140% 45% at 65% -8%, ${gold}18, transparent),
                     linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 50%, #070707 100%)`,
      }}
    >
      <Nav page={page} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <AnimatePresence mode="wait">
        <motion.div key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}>
          {page === "people"
            ? <PeoplePage navigate={navigate} />
            : <HomePage navigate={navigate} />
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
