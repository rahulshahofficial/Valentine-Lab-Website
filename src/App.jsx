import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, FlaskConical, Newspaper,
  MapPin, Cpu, ScanLine, Globe, Grid, Telescope,
  Award, ExternalLink, Menu, X, Mail, Phone,
  ArrowLeft, Users, Search,
} from "lucide-react";

// ── Theme & helpers ────────────────────────────────────────────────────────────
const gold  = "#CFAE70";
const goldD = "#B49248";
const base  = (p) => import.meta.env.BASE_URL + p;

// ── Shared style tokens ────────────────────────────────────────────────────────
const CONTAINER = "w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION   = "py-20 md:py-28";
const H2        = "text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight";
const SUBHEAD   = "mt-5 text-xl md:text-2xl text-zinc-400 leading-relaxed";
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

// ── Publications ───────────────────────────────────────────────────────────────
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

const recentPapers = [
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

// ── People ─────────────────────────────────────────────────────────────────────
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
  
];

// ── News ───────────────────────────────────────────────────────────────────────
const news = [
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
                className={`text-lg transition-colors duration-150 ${page === n.page ? "text-white font-semibold" : "text-zinc-400 hover:text-white"}`}>
                {n.label}
              </button>
            ) : (
              <a key={n.label} href={n.href}
                className="text-lg text-zinc-400 hover:text-white transition-colors duration-150"
                onClick={() => page !== "home" && navigate("home")}>
                {n.label}
              </a>
            )
          )}
          <a href="https://lab-paper-bot.onrender.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg text-zinc-400 hover:text-white transition-colors duration-150">
            <BookOpen size={17} /> Lab Papers
          </a>
          <a href="#prospective"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-base font-bold transition hover:opacity-90"
            style={{ backgroundColor: gold, color: "#1C1C1C" }}
            onClick={() => page !== "home" && navigate("home")}>
            Join the Lab <ArrowRight size={16} />
          </a>
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
                    className="py-3 px-4 rounded-xl text-lg text-zinc-300 hover:text-white hover:bg-white/10 transition text-left">
                    {n.label}
                  </button>
                ) : (
                  <a key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 rounded-xl text-lg text-zinc-300 hover:text-white hover:bg-white/10 transition">
                    {n.label}
                  </a>
                )
              )}
              <a href="https://lab-paper-bot.onrender.com/" target="_blank" rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-xl text-lg text-zinc-300 hover:text-white hover:bg-white/10 transition flex items-center gap-2">
                <BookOpen size={17} /> Lab Papers
              </a>
              <a href="#prospective" onClick={() => setMobileOpen(false)}
                className="mt-2 text-center rounded-xl px-5 py-3 text-base font-bold"
                style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                Join the Lab
              </a>
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
            {[
              "Group Outing",
              "Cleanroom Work",
              "Lab Meeting",
              "Conference Trip",
              "Celebration",
              "Friday Afternoon",
            ].map((label) => (
              <div key={label}
                className="aspect-[4/3] rounded-2xl border border-white/[0.08] bg-white/[0.025] flex flex-col items-center justify-center gap-3 text-zinc-600">
                <div className="text-3xl">📸</div>
                <div className="text-base font-medium">{label}</div>
                <div className="text-sm text-zinc-700">Photo coming soon</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-zinc-600">
            Add photos by uploading images to <code className="text-zinc-500">public/lab-life/</code> and updating the gallery here.
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
      <section className="w-full pt-16 pb-24 md:pt-20 md:pb-32">
        <div className={`${CONTAINER} grid lg:grid-cols-12 gap-12 items-center`}>
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border mb-7"
                style={{ borderColor: `${gold}50`, color: gold }}>
                Vanderbilt University · Mechanical Engineering
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
                Engineering light<br />with{" "}
                <span style={{ color: gold }}>meta-optics</span>
                <br />&amp; materials
              </h1>
              <p className="mt-7 text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
                We study how nanoscale structuring engineers a material's optical
                properties — building platforms for imaging, communications,
                sensing, and energy conversion.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#research"
                  className="rounded-xl px-7 py-3.5 text-lg font-medium bg-white/[0.08] hover:bg-white/[0.14] transition border border-white/10">
                  Explore research
                </a>
                <a href="#publications"
                  className="rounded-xl px-7 py-3.5 text-lg font-medium border border-white/15 hover:border-white/30 transition">
                  Publications
                </a>
                <a href="#prospective"
                  className="rounded-xl px-7 py-3.5 text-lg font-medium transition hover:opacity-90"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                  Open positions
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 text-base text-zinc-500">
                <span className="flex items-center gap-2"><FlaskConical size={18} /> VINSE Nanofabrication</span>
                <span className="flex items-center gap-2"><BookOpen size={18} /> 36+ publications</span>
                <span className="flex items-center gap-2"><Award size={18} /> NSF CAREER · ONR YIP</span>
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
          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {research.map((r) => (
              <div key={r.name} className={`${CARD} group p-8 md:p-9`}>
                <r.icon className="mb-5 opacity-60 group-hover:opacity-100 transition-opacity" size={30} style={{ color: gold }} />
                <div className="text-xl md:text-2xl font-semibold">{r.name}</div>
                <div className="mt-3 text-lg text-zinc-400 leading-relaxed">{r.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ──────────────────────────────────────────────────── */}
      <section id="publications" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>

          {/* Landmark */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className={H2}>Landmark Papers</h2>
              <p className={`${SUBHEAD} max-w-xl`}>Foundational work that defined the field.</p>
            </div>
            <a href="https://scholar.google.com/citations?user=6yh8YJgAAAAJ"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-medium bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 transition">
              <ExternalLink size={16} /> All on Google Scholar
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {landmarkPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-8 md:p-9`}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="text-base font-bold px-3 py-1.5 rounded-lg shrink-0"
                    style={{ background: `${gold}25`, color: gold }}>
                    {p.venue} · {p.year}
                  </span>
                  {p.note && <span className="text-sm text-zinc-400 italic text-right leading-snug">{p.note}</span>}
                </div>
                <div className="text-xl md:text-2xl font-semibold leading-snug flex-1">{p.title}</div>
                <div className="mt-4 text-base text-zinc-500 leading-relaxed">{p.authors}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-sm px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400">{t}</span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read paper <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>

          {/* Recent */}
          <div className="mb-10">
            <h2 className={H2}>Recent Publications</h2>
            <p className={`${SUBHEAD} max-w-xl`}>Latest work from the lab.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-8 md:p-9`}>
                <div className="mb-4">
                  <span className="text-base font-bold px-3 py-1.5 rounded-lg"
                    style={{ background: `${gold}18`, color: gold }}>
                    {p.venue} · {p.year}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-semibold leading-snug flex-1">{p.title}</div>
                <div className="mt-4 text-base text-zinc-500 leading-relaxed">{p.authors}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-sm px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400">{t}</span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read paper <ArrowRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAB PAPER BOT ─────────────────────────────────────────────────── */}
      <section className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <div className={`${CARD} p-8 md:p-12`}
            style={{ background: `linear-gradient(135deg, ${gold}0d, transparent 60%)` }}>
            <div className="grid lg:grid-cols-3 gap-10 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6"
                  style={{ borderColor: `${gold}50`, color: gold }}>
                  Lab Resource
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Lab Paper Bot</h2>
                <p className="mt-5 text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl">
                  Browse, search, and track the latest research from the Valentine Lab
                  and the broader meta-optics community. AI-powered semantic search,
                  updated daily from arXiv and author feeds.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="https://lab-paper-bot.onrender.com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-bold transition hover:opacity-90"
                    style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                    Open Lab Paper Bot <ArrowRight size={18} />
                  </a>
                  <a href="https://lab-paper-bot.onrender.com/search" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-lg font-medium border border-white/20 hover:border-white/40 transition">
                    <Search size={18} /> Search Papers
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  ["📄", "Daily arXiv feed", "New papers every morning"],
                  ["✨", "AI semantic search", "Find papers by description"],
                  ["👥", "Author tracking",   "Follow lab members' work"],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="text-base font-semibold">{title}</div>
                      <div className="text-sm text-zinc-500 mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

      {/* ── NEWS ──────────────────────────────────────────────────────────── */}
      <section id="news" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>News</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-8`}>
                <div className="text-base text-zinc-500 font-medium">{item.date}</div>
                <div className="mt-3 text-xl font-semibold leading-snug flex-1">{item.headline}</div>
                <div className="mt-3 text-lg text-zinc-400 leading-relaxed">{item.summary}</div>
                <div className="mt-6 inline-flex items-center gap-2 text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read more <ArrowRight size={16} />
                </div>
              </a>
            ))}
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
                  ["Lab Paper Bot", "https://lab-paper-bot.onrender.com/"],
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
