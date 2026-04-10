import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, FlaskConical, Newspaper,
  MapPin, Cpu, ScanLine, Globe, Grid, Telescope,
  Award, ExternalLink, Menu, X, Mail, Phone,
} from "lucide-react";

const gold  = "#CFAE70";
const goldD = "#B49248";
const base  = (p) => import.meta.env.BASE_URL + p;

// ── Nav ────────────────────────────────────────────────────────────────────────
const nav = [
  { label: "Research",     href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "People",       href: "#people" },
  { label: "News",         href: "#news" },
  { label: "Contact",      href: "#contact" },
];

// ── Research ───────────────────────────────────────────────────────────────────
const research = [
  { icon: Telescope,    name: "Meta-optics & Metasurfaces",    blurb: "Flat optical elements that manipulate light with nanoscale patterned structures — enabling ultra-thin lenses, beam shapers, and analog compute." },
  { icon: ScanLine,     name: "Snapshot Hyperspectral Imaging", blurb: "Single-shot spectral capture using compressive encoding and learned reconstruction for real-time spectral imaging." },
  { icon: Cpu,          name: "Computational Imaging",          blurb: "Co-designing optics and algorithms — inverse problems, differentiable optical design, and neural network reconstruction." },
  { icon: FlaskConical, name: "Active & Tunable Photonics",    blurb: "Reconfigurable optical devices using phase-change, electro-optic, and thermo-optic materials for dynamic light control." },
  { icon: Grid,         name: "Nanofabrication & Metamaterials",blurb: "Simulation-driven design (RCWA/FDTD) with VINSE-enabled electron beam and photolithography fabrication." },
  { icon: Globe,        name: "Applications",                   blurb: "SWIR/MWIR sensing, nonlinear photonics, thermal emission control, and integrated optoelectronic devices." },
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
    title: "Flat optics for image differentiation",
    authors: "Y. Zhou, H. Zheng, I. I. Kravchenko, J. Valentine",
    venue: "Nature Photonics", year: "2020",
    url: "https://www.nature.com/articles/s41566-020-0591-3",
    tags: ["meta-optics", "analog compute"],
  },
  {
    title: "Realization of an all-dielectric zero-index optical metamaterial",
    authors: "P. Moitra, Y. Yang, Z. Anderson, I. I. Kravchenko, D. P. Briggs, J. Valentine",
    venue: "Nature Photonics", year: "2013",
    url: "https://www.nature.com/articles/nphoton.2013.214",
    tags: ["zero-index", "all-dielectric"],
  },
];

const recentPapers = [
  {
    title: "Multifunctional metaoptics based on bilayer metasurfaces",
    authors: "Y. Zhou, I. Kravchenko, H. Wang, H. Zheng, G. Gu, J. Valentine",
    venue: "Light: Science & Applications", year: "2019",
    url: "https://www.nature.com/articles/s41377-019-0193-3",
    tags: ["metasurfaces", "multi-function"],
  },
  {
    title: "Optical limiting based on Huygens' metasurfaces",
    authors: "A. Howes, Z. Zhu, D. Curie, J. R. Avila, V. D. Wheeler, R. F. Haglund, J. Valentine",
    venue: "Nano Letters", year: "2020",
    url: "https://pubs.acs.org/doi/abs/10.1021/acs.nanolett.0c01574",
    tags: ["nonlinear", "Huygens"],
  },
  {
    title: "Dynamic transmission control based on all-dielectric Huygens metasurfaces",
    authors: "A. Howes, W. Wang, I. Kravchenko, J. Valentine",
    venue: "Optica", year: "2018",
    url: "https://opg.optica.org/optica/abstract.cfm?uri=optica-5-7-787",
    tags: ["dynamic", "all-dielectric"],
  },
  {
    title: "Dynamically reconfigurable metadevice employing nanostructured phase-change materials",
    authors: "Z. Zhu, P. G. Evans, R. F. Haglund, J. Valentine",
    venue: "Nano Letters", year: "2017",
    url: "http://pubs.acs.org/doi/abs/10.1021/acs.nanolett.7b01767",
    tags: ["phase-change", "dynamic"],
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
    bio: "B.S. Purdue (2004) · Ph.D. UC Berkeley (2010) · NSF CAREER Award · ONR Young Investigator Award",
  },
  { name: "Rahul Shah",  role: "Ph.D. Candidate", dept: "Mechanical Engineering", img: "", url: "" },
  { name: "Chris",       role: "Ph.D. Student",   dept: "",                        img: "", url: "" },
  { name: "Brandon",     role: "Ph.D. Student",   dept: "",                        img: "", url: "" },
  { name: "Carson",      role: "Ph.D. Student",   dept: "",                        img: "", url: "" },
];

// ── News ───────────────────────────────────────────────────────────────────────
const news = [
  {
    date: "Nov 2019",
    headline: "Prof. Valentine appointed as Vanderbilt's Oak Ridge National Laboratory Liaison",
    summary: "Prof. Valentine will serve as faculty liaison to ORNL, deepening research ties between Vanderbilt and the national lab.",
    url: "https://news.vanderbilt.edu/2019/11/07/valentine-appointed-new-faculty-liaison-to-oak-ridge-national-lab/",
  },
  {
    date: "Apr 2020",
    headline: "Flat optics for image differentiation published in Nature Photonics",
    summary: "The lab demonstrates metasurface-based optical analog computing for edge detection and image processing.",
    url: "https://www.nature.com/articles/s41566-020-0591-3",
  },
  {
    date: "Sep 2019",
    headline: "Multifunctional meta-optics published in Light: Science & Applications",
    summary: "A bilayer metasurface platform enables independent control of multiple optical functions simultaneously.",
    url: "https://www.nature.com/articles/s41377-019-0193-3",
  },
];

// ── Shared styles ──────────────────────────────────────────────────────────────
const CONTAINER = "w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-20";
const SECTION   = "py-20 md:py-28";
const H2        = "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight";
const SUBHEAD   = "mt-4 text-lg md:text-xl text-zinc-400 leading-relaxed";
const CARD      = "rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-200";

// ── App ────────────────────────────────────────────────────────────────────────
export default function ValentineLabWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full text-white overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse 140% 45% at 65% -8%, ${gold}18, transparent),
                     linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 50%, #070707 100%)`,
      }}
    >

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-black/25">
        <div className={`${CONTAINER} py-4 flex items-center justify-between`}>

          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 rounded-xl shrink-0"
              style={{ background: `conic-gradient(from 180deg, ${goldD}, ${gold}, ${goldD})` }} />
            <div className="leading-tight">
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest">Vanderbilt University</div>
              <div className="font-bold text-base tracking-tight">Valentine Lab</div>
            </div>
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.label} href={n.href}
                className="text-base text-zinc-400 hover:text-white transition-colors duration-150">
                {n.label}
              </a>
            ))}
            <a href="#prospective"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
              style={{ backgroundColor: gold, color: "#1C1C1C" }}>
              Join the Lab <ArrowRight size={15} />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-xl text-zinc-300 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div key="mob"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 bg-black/85 backdrop-blur-xl overflow-hidden">
              <div className="px-6 py-5 flex flex-col gap-1">
                {nav.map((n) => (
                  <a key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                    className="py-3 px-4 rounded-xl text-base text-zinc-300 hover:text-white hover:bg-white/10 transition">
                    {n.label}
                  </a>
                ))}
                <a href="#prospective" onClick={() => setMobileOpen(false)}
                  className="mt-3 text-center rounded-xl px-5 py-3 text-sm font-bold"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                  Join the Lab
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="w-full pt-16 pb-24 md:pt-20 md:pb-32">
        <div className={`${CONTAINER} grid lg:grid-cols-12 gap-12 items-center`}>

          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: `${gold}50`, color: gold }}>
                Vanderbilt University · Mechanical Engineering
              </div>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
                Engineering light<br />
                with{" "}
                <span style={{ color: gold }}>meta-optics</span>
                <br />&amp; materials
              </h1>

              <p className="mt-7 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                We study how nanoscale structuring engineers a material's optical properties —
                building platforms for imaging, communications, sensing, and energy conversion.
                Led by Prof. Jason Valentine at Vanderbilt University.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#research"
                  className="rounded-xl px-6 py-3 text-base font-medium bg-white/[0.08] hover:bg-white/[0.14] transition border border-white/10">
                  Explore research
                </a>
                <a href="#publications"
                  className="rounded-xl px-6 py-3 text-base font-medium border border-white/15 hover:border-white/30 transition">
                  Publications
                </a>
                <a href="#prospective"
                  className="rounded-xl px-6 py-3 text-base font-medium transition hover:opacity-90"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}>
                  Open positions
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-8 text-sm text-zinc-500">
                <span className="flex items-center gap-2"><FlaskConical size={16} /> VINSE Nanofabrication</span>
                <span className="flex items-center gap-2"><BookOpen size={16} /> 36+ publications</span>
                <span className="flex items-center gap-2"><Award size={16} /> NSF CAREER · ONR YIP</span>
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-zinc-300 z-20">
                <span>Prof. Valentine · VINSE cleanroom</span>
                <span className="px-3 py-1 rounded-lg bg-black/50 text-xs font-medium"
                  style={{ border: `1px solid ${gold}40` }}>
                  Meta-optics
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ────────────────────────────────────────────────────────── */}
      <section id="research" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>Research Areas</h2>
          <p className={`${SUBHEAD} max-w-2xl`}>
            From flat optics to learned reconstruction — spanning design, fabrication, and computation.
          </p>
          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {research.map((r) => (
              <div key={r.name}
                className={`${CARD} group p-7 md:p-8`}>
                <r.icon className="mb-5 opacity-60 group-hover:opacity-100 transition-opacity" size={28} style={{ color: gold }} />
                <div className="text-lg md:text-xl font-semibold">{r.name}</div>
                <div className="mt-3 text-base text-zinc-400 leading-relaxed">{r.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ─────────────────────────────────────────────────────── */}
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
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 transition">
              <ExternalLink size={15} /> All on Google Scholar
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-20">
            {landmarkPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-7 md:p-8`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-sm font-bold px-3 py-1 rounded-lg shrink-0"
                    style={{ background: `${gold}25`, color: gold }}>
                    {p.venue} · {p.year}
                  </span>
                  {p.note && (
                    <span className="text-xs text-zinc-400 italic text-right leading-snug">{p.note}</span>
                  )}
                </div>
                <div className="text-lg md:text-xl font-semibold leading-snug flex-1">{p.title}</div>
                <div className="mt-3 text-sm text-zinc-500 leading-relaxed">{p.authors}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read paper <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>

          {/* Recent */}
          <h2 className={H2}>Recent Publications</h2>
          <p className={`${SUBHEAD} max-w-xl mb-10`}>Selected work from the last several years.</p>

          <div className="grid md:grid-cols-2 gap-5">
            {recentPapers.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-7 md:p-8`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold px-3 py-1 rounded-lg"
                    style={{ background: `${gold}18`, color: gold }}>
                    {p.venue} · {p.year}
                  </span>
                </div>
                <div className="text-lg md:text-xl font-semibold leading-snug flex-1">{p.title}</div>
                <div className="mt-3 text-sm text-zinc-500 leading-relaxed">{p.authors}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read paper <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── PEOPLE ───────────────────────────────────────────────────────────── */}
      <section id="people" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>People</h2>
          <p className={`${SUBHEAD} max-w-xl mb-12`}>
            A team of researchers in nanophotonics, meta-optics, and computational imaging.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {people.map((m) => {
              const card = (
                <div className={`${CARD} overflow-hidden h-full`}>
                  <div className="aspect-[3/2] bg-zinc-900 overflow-hidden">
                    {m.img ? (
                      <img src={m.img} alt={m.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-lg font-semibold">{m.name}</div>
                    <div className="text-sm text-zinc-400 mt-1">{m.role}</div>
                    {m.dept && <div className="text-sm text-zinc-600 mt-0.5">{m.dept}</div>}
                    {m.bio  && <div className="text-sm text-zinc-500 mt-3 leading-relaxed">{m.bio}</div>}
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

      {/* ── PROSPECTIVE ──────────────────────────────────────────────────────── */}
      <section id="prospective" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <div className={`${CARD} p-8 md:p-12`}>
            <div className="grid lg:grid-cols-3 gap-10 items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold">Join the Lab</h2>
                <p className="mt-5 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
                  We are actively seeking motivated graduate students to tackle challenges at the
                  frontier of nanoscale optics and photonics. Apply to Vanderbilt and reach out to
                  Prof. Valentine directly.
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
              <div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-6 space-y-4">
                  <div className="text-base font-semibold">Why Nashville?</div>
                  <p className="text-base text-zinc-400 leading-relaxed">
                    World-class nanofabrication at VINSE, close partnership with Oak Ridge National
                    Laboratory, and a growing tech and culture hub.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {["VINSE Nanofab", "ORNL partnership", "Nashville"].map(t => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ─────────────────────────────────────────────────────────────── */}
      <section id="news" className={`${SECTION} border-t border-white/[0.05]`}>
        <div className={CONTAINER}>
          <h2 className={H2}>News</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                className={`${CARD} group flex flex-col p-7`}>
                <div className="text-sm text-zinc-500 font-medium">{item.date}</div>
                <div className="mt-3 text-lg font-semibold leading-snug flex-1">{item.headline}</div>
                <div className="mt-3 text-base text-zinc-400 leading-relaxed">{item.summary}</div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}>
                  Read more <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer id="contact" className="pt-16 pb-20 border-t border-white/[0.08]">
        <div className={CONTAINER}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>
              <div className="text-base font-semibold mb-4">Contact</div>
              <div className="space-y-3 text-base text-zinc-400">
                <div className="font-medium text-white">Prof. Jason G. Valentine</div>
                <a href="mailto:jason.g.valentine@vanderbilt.edu"
                  className="flex items-start gap-2.5 hover:text-white transition text-sm">
                  <Mail size={15} className="shrink-0 mt-0.5" />
                  jason.g.valentine@vanderbilt.edu
                </a>
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone size={15} className="shrink-0" /> 615-875-5508
                </div>
                <div className="text-sm text-zinc-500">Office: 332 Olin Hall</div>
              </div>
            </div>

            <div>
              <div className="text-base font-semibold mb-4">Find Us</div>
              <div className="space-y-4 text-sm text-zinc-400">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium mb-1">Lab — 609 Olin Hall</div>
                    2400 Highland Avenue<br />Nashville, TN 37212
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium mb-1">Mailing</div>
                    2301 Vanderbilt Place, PMB 351592<br />Nashville, TN 37235-1592
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-semibold mb-4">Links</div>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  ["Google Scholar", "https://scholar.google.com/citations?user=6yh8YJgAAAAJ"],
                  ["Faculty Profile", "https://engineering.vanderbilt.edu/bio/jason-valentine"],
                  ["VINSE", "https://www.vanderbilt.edu/vinse/"],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                    <ExternalLink size={13} /> {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-base font-semibold mb-4">Affiliations</div>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <span>Dept. of Mechanical Engineering</span>
                <span>Dept. of Electrical Engineering</span>
                <span>Vanderbilt Institute of Nanoscale Science and Engineering (VINSE)</span>
                <span>Oak Ridge National Laboratory Liaison</span>
              </div>
            </div>

          </div>

          <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600">
            <span>© {new Date().getFullYear()} Vanderbilt University — Valentine Research Group</span>
            <span>Nashville, TN · Mechanical Engineering</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
