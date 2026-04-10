import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, FlaskConical, Newspaper,
  MapPin, Cpu, ScanLine, Globe, Grid, Telescope,
  Award, ExternalLink, Menu, X, Mail, Phone,
} from "lucide-react";

// ── Theme ──────────────────────────────────────────────────────────────────────
const gold = "#CFAE70";
const goldDark = "#B49248";

// ── Asset helper ───────────────────────────────────────────────────────────────
const base = (p) => import.meta.env.BASE_URL + p;
const FALLBACK = base("placeholders/card-fallback.png");

// ── Data ───────────────────────────────────────────────────────────────────────
const nav = [
  { label: "Research",     href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "People",       href: "#people" },
  { label: "News",         href: "#news" },
  { label: "Contact",      href: "#contact" },
];

const research = [
  { icon: Telescope,    name: "Meta-optics & metasurfaces",    blurb: "Flat optics for imaging, beam shaping, and analog compute via nanoscale patterning." },
  { icon: ScanLine,     name: "Snapshot hyperspectral imaging", blurb: "Compressive spectral capture with learned reconstruction algorithms." },
  { icon: Cpu,          name: "Computational imaging",          blurb: "Inverse problems, differentiable optics, and neural network reconstruction." },
  { icon: FlaskConical, name: "Active & tunable photonics",    blurb: "Phase-change, electro-optic, and thermo-optic reconfigurable devices." },
  { icon: Grid,         name: "Nanofab & metamaterials",        blurb: "RCWA/FDTD design with VINSE-enabled electron beam and photolithography." },
  { icon: Globe,        name: "Applications",                   blurb: "Sensing, SWIR/MWIR imaging, nonlinear photonics, and energy conversion." },
];

const highlights = [
  {
    title: "Three-dimensional optical metamaterial with a negative refractive index",
    venue: "Nature · 2008 · Time Magazine Top 10 Scientific Discovery",
    cta: "Read paper",
    href: "https://www.nature.com/articles/nature07247",
  },
  {
    title: "An optical cloak made of dielectrics",
    venue: "Nature Materials · 2009 · Cover Article",
    cta: "Read paper",
    href: "https://www.nature.com/articles/nmat2461",
  },
  {
    title: "Prof. Valentine appointed as Vanderbilt's Oak Ridge National Laboratory Liaison",
    venue: "Vanderbilt News · 2019",
    cta: "Read announcement",
    href: "https://news.vanderbilt.edu/2019/11/07/valentine-appointed-new-faculty-liaison-to-oak-ridge-national-lab/",
  },
];

const publications = [
  {
    title: "Flat optics for image differentiation",
    authors: "Y. Zhou, H. Zheng, I. I. Kravchenko, J. Valentine",
    venue: "Nature Photonics", year: "2020",
    url: "https://www.nature.com/articles/s41566-020-0591-3",
    tags: ["meta-optics", "computation"],
  },
  {
    title: "Multifunctional metaoptics based on bilayer metasurfaces",
    authors: "Y. Zhou, I. Kravchenko, H. Wang, H. Zheng, G. Gu, J. Valentine",
    venue: "Light: Science & Applications", year: "2019",
    url: "https://www.nature.com/articles/s41377-019-0193-3",
    tags: ["metasurfaces", "multi-function"],
  },
  {
    title: "Dynamic transmission control based on all-dielectric Huygens metasurfaces",
    authors: "A. Howes, W. Wang, I. Kravchenko, J. Valentine",
    venue: "Optica", year: "2018",
    url: "https://opg.optica.org/optica/abstract.cfm?uri=optica-5-7-787",
    tags: ["dynamic", "Huygens"],
  },
  {
    title: "Multilayer non-interacting dielectric metasurfaces for multiwavelength metaoptics",
    authors: "Y. Zhou, I. Kravchenko, H. Wang, J. R. Nolen, G. Gu, J. Valentine",
    venue: "Nano Letters", year: "2018",
    url: "https://pubs.acs.org/doi/abs/10.1021/acs.nanolett.8b03017",
    tags: ["multilayer", "multiwavelength"],
  },
  {
    title: "Optical limiting based on Huygens' metasurfaces",
    authors: "A. Howes, Z. Zhu, D. Curie, J. R. Avila, V. D. Wheeler, R. F. Haglund, J. Valentine",
    venue: "Nano Letters", year: "2020",
    url: "https://pubs.acs.org/doi/abs/10.1021/acs.nanolett.0c01574",
    tags: ["nonlinear", "limiting"],
  },
  {
    title: "Dynamically reconfigurable metadevice employing nanostructured phase-change materials",
    authors: "Z. Zhu, P. G. Evans, R. F. Haglund, J. Valentine",
    venue: "Nano Letters", year: "2017",
    url: "http://pubs.acs.org/doi/abs/10.1021/acs.nanolett.7b01767",
    tags: ["phase-change", "dynamic"],
  },
  {
    title: "Realization of an all-dielectric zero-index optical metamaterial",
    authors: "P. Moitra, Y. Yang, Z. Anderson, I. I. Kravchenko, D. P. Briggs, J. Valentine",
    venue: "Nature Photonics", year: "2013",
    url: "https://www.nature.com/articles/nphoton.2013.214",
    tags: ["zero-index", "metamaterial"],
  },
  {
    title: "Circularly polarized light detection with hot electrons in chiral plasmonic metamaterials",
    authors: "W. Li, Z. J. Coppens, L. V. Besteiro, W. Wang, A. O. Govorov, J. Valentine",
    venue: "Nature Communications", year: "2015",
    url: "https://www.nature.com/articles/ncomms9379",
    tags: ["hot electrons", "plasmonics"],
  },
  {
    title: "All-dielectric metasurface analogue of electromagnetically induced transparency",
    authors: "Y. Yang, I. I. Kravchenko, D. P. Briggs, J. Valentine",
    venue: "Nature Communications", year: "2014",
    url: "https://www.nature.com/articles/ncomms6753",
    tags: ["all-dielectric", "EIT"],
  },
  {
    title: "An optical cloak made of dielectrics",
    authors: "J. Valentine, J. Li, T. Zentgraf, G. Bartal, X. Zhang",
    venue: "Nature Materials", year: "2009",
    url: "https://www.nature.com/articles/nmat2461",
    tags: ["cloak", "transformation optics"],
    note: "Cover Article",
  },
  {
    title: "Three-dimensional optical metamaterial exhibiting negative refractive index",
    authors: "J. Valentine, S. Zhang, T. Zentgraf, E. Ulin-Avila, D. A. Genov, G. Bartal, X. Zhang",
    venue: "Nature", year: "2008",
    url: "https://www.nature.com/articles/nature07247",
    tags: ["negative index", "metamaterial"],
    note: "Time Magazine Top 10 Discovery of 2008",
  },
  {
    title: "Metamaterial perfect absorber based hot electron photodetection",
    authors: "W. Li, J. Valentine",
    venue: "Nano Letters", year: "2014",
    url: "https://pubs.acs.org/doi/abs/10.1021/nl501090w",
    tags: ["hot electrons", "photodetection"],
  },
];

// Update photos by adding images to public/people/<name>.jpg
const people = [
  {
    name: "Jason G. Valentine",
    role: "Professor & PI",
    dept: "Mechanical Engineering & Electrical Engineering",
    img: base("people/Jason-Valentine-Young.png"),
    url: "https://engineering.vanderbilt.edu/bio/jason-valentine",
    bio: "B.S. Purdue (2004) · Ph.D. UC Berkeley (2010). NSF CAREER Award, ONR Young Investigator.",
  },
  { name: "Rahul Shah",  role: "Ph.D. Student", dept: "Mechanical Engineering", img: "", url: "" },
  { name: "Chris",       role: "Ph.D. Student", dept: "",                        img: "", url: "" },
  { name: "Brandon",     role: "Ph.D. Student", dept: "",                        img: "", url: "" },
  { name: "Carson",      role: "Ph.D. Student", dept: "",                        img: "", url: "" },
];

const news = [
  {
    date: "2019-11-07",
    headline: "Prof. Valentine appointed as Vanderbilt's Oak Ridge National Laboratory Liaison",
    summary: "Prof. Valentine will serve as faculty liaison to ORNL, strengthening research ties between Vanderbilt and the national lab.",
    url: "https://news.vanderbilt.edu/2019/11/07/valentine-appointed-new-faculty-liaison-to-oak-ridge-national-lab/",
  },
  {
    date: "2020-04-01",
    headline: "Flat optics for image differentiation published in Nature Photonics",
    summary: "The lab demonstrates metasurface-based optical analog computing for edge detection and image processing.",
    url: "https://www.nature.com/articles/s41566-020-0591-3",
  },
  {
    date: "2019-09-01",
    headline: "Multifunctional meta-optics work featured in Light: Science & Applications",
    summary: "A bilayer metasurface platform enables independent control of multiple optical functions simultaneously.",
    url: "https://www.nature.com/articles/s41377-019-0193-3",
  },
];

// ── App ────────────────────────────────────────────────────────────────────────
export default function ValentineLabWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        background: `radial-gradient(ellipse 120% 40% at 70% -5%, ${gold}1a, transparent),
                     linear-gradient(180deg, #0B0B0B 0%, #0E0E0E 60%, #080808 100%)`,
      }}
    >

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-md bg-black/30">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div
              className="h-9 w-9 rounded-lg shrink-0"
              style={{ background: `conic-gradient(from 180deg, ${goldDark}, ${gold}, ${goldDark})` }}
            />
            <div className="leading-tight">
              <div className="text-[11px] text-zinc-400 uppercase tracking-widest">Vanderbilt University</div>
              <div className="font-semibold tracking-tight text-sm">Valentine Lab</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <a key={n.label} href={n.href}
                className="text-zinc-400 hover:text-white transition-colors duration-150">
                {n.label}
              </a>
            ))}
            <a
              href="#prospective"
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ backgroundColor: gold, color: "#1C1C1C" }}
            >
              Join the Lab <ArrowRight size={14} />
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {nav.map((n) => (
                  <a key={n.label} href={n.href} onClick={() => setMobileOpen(false)}
                    className="py-2.5 px-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition text-sm">
                    {n.label}
                  </a>
                ))}
                <a
                  href="#prospective"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 text-center rounded-lg px-4 py-2.5 text-sm font-semibold"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}
                >
                  Join the Lab
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 pt-16 pb-20">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-5"
                style={{ borderColor: `${gold}55`, color: gold }}
              >
                Vanderbilt University · Mechanical Engineering
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
                Engineering light with{" "}
                <span style={{ color: gold }}>meta-optics</span>{" "}
                &amp; materials
              </h1>
              <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
                We study how nanoscale structuring can engineer a material's optical properties,
                developing novel platforms for imaging, communications, sensing, optoelectronics,
                and energy conversion. The lab is directed by Prof. Jason Valentine in the
                Department of Mechanical Engineering at Vanderbilt University.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#research"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium bg-white/[0.07] hover:bg-white/[0.12] transition border border-white/10">
                  Explore research
                </a>
                <a href="#publications"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-white/30 transition">
                  Publications
                </a>
                <a
                  href="#prospective"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium transition hover:opacity-90"
                  style={{ backgroundColor: gold, color: "#1C1C1C" }}
                >
                  Open positions
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5"><FlaskConical size={14} /> VINSE Nanofabrication</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14} /> 36+ journal publications</span>
                <span className="flex items-center gap-1.5"><Award size={14} /> NSF CAREER · ONR YIP</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 z-10" />
              <img
                src={base("people/Jason-Valentine-Young.png")}
                alt="Prof. Jason Valentine in the VINSE cleanroom"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK; }}
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 z-20">
                <span>Prof. Valentine · VINSE cleanroom</span>
                <span
                  className="px-2 py-1 rounded-md bg-black/50 text-[11px]"
                  style={{ border: `1px solid ${gold}44` }}
                >
                  Meta-optics
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research ──────────────────────────────────────────────────────────── */}
      <section id="research" className="py-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Research Areas</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm md:text-base">
            From flat optics to learned reconstruction — our work spans design, fabrication, and computation.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {research.map((r) => (
              <div
                key={r.name}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200"
              >
                <r.icon className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: gold }} />
                <div className="font-semibold text-sm md:text-base">{r.name}</div>
                <div className="mt-2 text-sm text-zinc-400 leading-relaxed">{r.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="opacity-60" style={{ color: gold }} />
              <h3 className="text-lg font-semibold">Highlights</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <a
                  key={i}
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-white/[0.08] bg-black/20 p-5 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-200"
                >
                  <div className="font-medium text-sm leading-snug flex-1">{h.title}</div>
                  {h.venue && <div className="mt-3 text-xs text-zinc-500">{h.venue}</div>}
                  <div
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all"
                    style={{ color: gold }}
                  >
                    {h.cta} <ArrowRight size={13} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Publications ─────────────────────────────────────────────────────── */}
      <section id="publications" className="py-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Selected Publications</h2>
              <p className="mt-2 text-zinc-400 text-sm">36 journal publications · see Google Scholar for full list</p>
            </div>
            <a
              href="https://scholar.google.com/citations?user=6yh8YJgAAAAJ"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 transition"
            >
              <ExternalLink size={14} /> Google Scholar
            </a>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {publications.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0"
                    style={{ background: `${gold}22`, color: gold }}
                  >
                    {p.venue} · {p.year}
                  </span>
                  {p.note && <span className="text-[10px] text-zinc-400 italic text-right">{p.note}</span>}
                </div>
                <div className="font-medium text-sm leading-snug flex-1 mt-1">{p.title}</div>
                <div className="mt-2 text-xs text-zinc-500 leading-relaxed">{p.authors}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}
                >
                  Read paper <ArrowRight size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── People ───────────────────────────────────────────────────────────── */}
      <section id="people" className="py-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">People</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {people.map((m) => {
              const card = (
                <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200 h-full">
                  <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                    {m.img ? (
                      <img src={m.img} alt={m.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-sm">{m.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{m.role}</div>
                    {m.dept && <div className="text-xs text-zinc-600 mt-0.5">{m.dept}</div>}
                    {m.bio  && <div className="text-xs text-zinc-500 mt-2 leading-relaxed">{m.bio}</div>}
                  </div>
                </div>
              );
              return m.url ? (
                <a key={m.name} href={m.url} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={m.name}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Prospective ──────────────────────────────────────────────────────── */}
      <section id="prospective" className="py-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold">Prospective Graduate Students</h3>
                <p className="mt-3 text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                  We are actively seeking motivated students to tackle challenges at the frontier of
                  nanoscale optics and photonics. If you're interested, apply to Vanderbilt and reach
                  out to Prof. Valentine directly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://apply.vanderbilt.edu"
                    target="_blank" rel="noopener noreferrer"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
                    style={{ backgroundColor: gold, color: "#1C1C1C" }}
                  >
                    Apply to Vanderbilt
                  </a>
                  <a
                    href="mailto:jason.g.valentine@vanderbilt.edu"
                    className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/15 hover:border-white/30 transition"
                  >
                    Contact Prof. Valentine
                  </a>
                </div>
              </div>
              <div>
                <div className="rounded-xl border border-white/[0.08] bg-black/20 p-5 space-y-3">
                  <div className="font-semibold text-sm">Why Nashville?</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    A fast-growing tech and culture hub with world-class nanofabrication at VINSE and
                    close research ties to Oak Ridge National Laboratory.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">VINSE Nanofab</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">ORNL partnership</span>
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Nashville</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── News ─────────────────────────────────────────────────────────────── */}
      <section id="news" className="py-16 border-t border-white/[0.05]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">News</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {news.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200"
              >
                <div className="text-xs text-zinc-500">{item.date}</div>
                <div className="mt-2 font-medium text-sm leading-snug flex-1">{item.headline}</div>
                <div className="mt-2 text-xs text-zinc-400 leading-relaxed">{item.summary}</div>
                <div
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: gold }}
                >
                  Read more <ArrowRight size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer id="contact" className="pt-14 pb-16 border-t border-white/[0.08]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div>
              <div className="text-sm font-semibold mb-3">Contact</div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="font-medium text-zinc-200">Prof. Jason G. Valentine</div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="shrink-0" />
                  <a href="mailto:jason.g.valentine@vanderbilt.edu"
                    className="hover:text-white transition text-xs break-all">
                    jason.g.valentine@vanderbilt.edu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="shrink-0" />
                  <span className="text-xs">615-875-5508</span>
                </div>
                <div className="text-xs text-zinc-500 mt-1">Office: 332 Olin Hall</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Find Us</div>
              <div className="space-y-3 text-xs text-zinc-400">
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-300 font-medium mb-0.5">Lab — 609 Olin Hall</div>
                    <div>2400 Highland Avenue<br />Nashville, TN 37212</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="text-zinc-300 font-medium mb-0.5">Mailing</div>
                    <div>2301 Vanderbilt Place, PMB 351592<br />Nashville, TN 37235-1592</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Links</div>
              <div className="flex flex-col gap-2.5 text-xs">
                <a href="https://scholar.google.com/citations?user=6yh8YJgAAAAJ"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                  <ExternalLink size={12} /> Google Scholar
                </a>
                <a href="https://engineering.vanderbilt.edu/bio/jason-valentine"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                  <ExternalLink size={12} /> Faculty Profile
                </a>
                <a href="https://www.vanderbilt.edu/vinse/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                  <ExternalLink size={12} /> VINSE
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Affiliations</div>
              <div className="flex flex-col gap-1.5 text-xs text-zinc-500">
                <span>Dept. of Mechanical Engineering</span>
                <span>Dept. of Electrical Engineering</span>
                <span>Vanderbilt Institute of Nanoscale Science and Engineering (VINSE)</span>
                <span>Oak Ridge National Laboratory Liaison</span>
              </div>
            </div>

          </div>
          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
            <div>© {new Date().getFullYear()} Vanderbilt University — Valentine Research Group</div>
            <div>Nashville, TN · Mechanical Engineering</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
