import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FlaskConical, Newspaper, MapPin, Cpu, ScanLine, Globe, Grid, Telescope, Mic } from "lucide-react";

const colors = {
  bg: "#0E0E0E",
  black: "#1C1C1C",
  gold: "#B49248",
  flatGold: "#CFAE70",
  white: "#FFFFFF",
  gray: "#777777",
};

const highlights = [
  {
    title: "Three-dimensional optical metamaterial with a negative refractive index",
    venue: "Nature(2008)",
    cta: "Read paper",
    href: "https://valentineoptics.github.io/LabWebsite/index.html",
  },
  {
    title: "Professor Valentine Appointed as Vanderbilt's Oak Ridge National Laboratory Liaison",
    venue: "",
    cta: "Read more about the appointment here",
    href: "https://news.vanderbilt.edu/2019/11/07/valentine-appointed-new-faculty-liaison-to-oak-ridge-national-lab/",
  },
  {
    title: "Three-dimensional optical metamaterial with a negative refractive index",
    venue: "Nature(2008)",
    cta: "Read paper",
    href: "https://valentineoptics.github.io/LabWebsite/index.html",
  },
];

const research = [
  { icon: Telescope, name: "Meta‑optics & metasurfaces", blurb: "Flat optics for imaging, beam shaping, and analog compute." },
  { icon: ScanLine, name: "Snapshot hyperspectral imaging", blurb: "Compressive spectral capture with learned reconstruction." },
  { icon: Cpu, name: "Computational imaging", blurb: "Inverse problems, differentiable optics, and neural recon." },
  { icon: FlaskConical, name: "Active & tunable photonics", blurb: "Phase‑change, electro‑optics, thermo‑optics." },
  { icon: Grid, name: "Nanofab & meta‑materials", blurb: "Design, RCWA/FDTD, and VINSE‑enabled fabrication." },
  { icon: Globe, name: "Applications", blurb: "Sensing, SWIR/MWIR imaging, nonlinear & thermal photonics." },
];

const people = [
  { name: "Jason G. Valentine", role: "Professor & PI", img: "", url: "https://engineering.vanderbilt.edu/bio/jason-valentine" },
  { name: "Your Team Here", role: "Graduate & Undergraduate Researchers", img: "", url: "#people" },
];
const jason = import.meta.env.BASE_URL + 'people/Jason-Valentine-Young.png';

const publications = [
  { title: "Metasurface-enabled barcoding for compact flow cytometry", venue: "Optica (2024)", url: "https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-577&id=549223", tags: ["metasurfaces", "nonlinear"] },
  { title: "Metasurface-enabled barcoding for compact flow cytometry", venue: "Optica (2024)", url: "https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-577&id=549223", tags: ["metasurfaces", "nonlinear"] },
  { title: "Metasurface-enabled barcoding for compact flow cytometry", venue: "Optica (2024)", url: "https://opg.optica.org/optica/fulltext.cfm?uri=optica-11-4-577&id=549223", tags: ["metasurfaces", "nonlinear"]},
];

const nav = [
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "People", href: "#people" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function VanderbiltOpticsLabLanding() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-white" style={{ background: `radial-gradient(1200px 500px at 70% -10%, ${colors.flatGold}22, transparent), linear-gradient(180deg, #0B0B0B 0%, #0E0E0E 50%, #060606 100%)` }}>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg" style={{ background: `conic-gradient(from 180deg at 50% 50%, ${colors.gold}, ${colors.flatGold}, ${colors.gold})` }} />
            <div className="leading-tight">
              <div className="text-sm text-zinc-300">Vanderbilt University</div>
              <div className="font-semibold tracking-tight">NanOptics Lab</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-zinc-300 hover:text-white transition-colors">{n.label}</a>
            ))}
            <a href="#prospective" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium"
               style={{ backgroundColor: colors.flatGold, color: "#1C1C1C" }}>
              Join the Lab <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 pt-16 pb-20">
          <div className="lg:col-span-7">
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight">
              Engineering light with <span style={{ color: colors.flatGold }}>meta‑optics</span> & materials
            </motion.h1>
            <p className="mt-6 text-lg text-zinc-300 max-w-2xl">
              We are a team of researchers interested in understanding how nanoscale structuring can be used to engineer a material's optical properties.
              We are focused on using this understanding to develop novel materials for applications such as communications, imaging, optoelectronic devices, information processing, and energy conversion.
              The lab is under the direction of Prof. Jason Valentine in the Mechanical Engineering Department at Vanderbilt University.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#research" className="rounded-xl px-5 py-3 font-medium bg-white/5 hover:bg-white/10">
                Explore research
              </a>
              <a href="#publications" className="rounded-xl px-5 py-3 font-medium border border-white/15 hover:border-white/30">
                Recent publications
              </a>
              <a href="#prospective" className="rounded-xl px-5 py-3 font-medium"
                 style={{ backgroundColor: colors.flatGold, color: "#1C1C1C" }}>
                Open positions
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2"><FlaskConical size={16} /> VINSE Nanofab</div>
              <div className="flex items-center gap-2"><Mic size={16} /> Optics & photonics</div>
              <div className="flex items-center gap-2"><BookOpen size={16} /> extra stuff</div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20" />
              <img alt="Lab hero" src={jason} className="h-full w-full object-cover" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-200">
                <span>Young Jason Valentine • VINSE cleanroom </span>
                <span className="px-2 py-1 rounded-md bg-black/40" style={{ border: `1px solid ${colors.flatGold}55` }}>Meta‑optics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Research Areas</h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">From flat optics to learned reconstruction, our work spans design, computation and fabrication.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((r) => (
              <div key={r.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors">
                <r.icon className="mb-4" />
                <div className="font-semibold">{r.name}</div>
                <div className="mt-2 text-sm text-zinc-400">{r.blurb}</div>
                <div className="mt-4 text-sm text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6">
            <div className="flex items-center gap-3">
              <Newspaper />
              <h3 className="text-xl font-semibold">Highlights</h3>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <a key={h.title} href={h.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors">
                  <div className="font-medium">{h.title}</div>
                  <div className="mt-2 text-sm text-zinc-400">{h.venue}</div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm" style={{ color: colors.flatGold }}>
                    {h.cta} <ArrowRight size={16} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="publications" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Recent Publications</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {publications.map((p) => (
              <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors">
                <div className="font-medium leading-snug">{p.title}</div>
                <div className="mt-2 text-sm text-zinc-400">{p.venue}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">{t}</span>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm" style={{ color: colors.flatGold }}>Read →</div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href="#" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium bg-white/5 hover:bg-white/10">View all publications</a>
          </div>
        </div>
      </section>

      <section id="people" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">People</h2>
            <a href="#" className="text-sm text-zinc-300 hover:text-white">See all →</a>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((m) => (
              <a key={m.name} href={m.url} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="aspect-[4/3] bg-zinc-900" />
                <div className="p-4">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-zinc-400">{m.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="prospective" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold">Prospective Graduate Students</h3>
                <p className="mt-3 text-zinc-300 max-w-2xl">We are actively seeking motivated students to tackle challenges at the frontier of nanoscale optics and photonics. If this looks like your place, apply to Vanderbilt and contact Prof. Valentine.</p>
                <div className="mt-5 flex gap-3">
                  <a href="https://apply.vanderbilt.edu" className="rounded-xl px-5 py-3 font-medium"
                     style={{ backgroundColor: colors.flatGold, color: colors.black }}>Apply</a>
                  <a href="#contact" className="rounded-xl px-5 py-3 font-medium border border-white/15">Contact PI</a>
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                  <div className="font-medium">Why Nashville?</div>
                  <p className="mt-2 text-zinc-400">A fast‑growing tech & culture hub with vibrant food and music scenes—plus a collaborative photonics community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">News</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <a key={i} href="#" className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors">
                <div className="text-sm text-zinc-400">2025‑08‑01</div>
                <div className="mt-2 font-medium">Sample headline — replace with lab update</div>
                <div className="mt-2 text-sm text-zinc-400">One‑line summary of the update with a link to the full post.</div>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <a href="#" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium bg-white/5 hover:bg-white/10">All news</a>
          </div>
        </div>
      </section>

      <footer id="contact" className="pt-12 pb-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-lg font-semibold">Contact</div>
              <div className="mt-3 text-sm text-zinc-300 leading-relaxed">
                Valentine Research Group<br />
                Olin Hall, Vanderbilt University<br />
                Nashville, TN 37212
              </div>
              <div className="mt-4 text-sm text-zinc-300">Email: jason.g.valentine@vanderbilt.edu</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Find us</div>
              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                <MapPin size={16} /> <a className="hover:underline" href="https://maps.google.com" target="_blank">Olin Hall on Google Maps</a>
              </div>
              <div className="mt-3 text-sm text-zinc-400">VINSE • Mechanical Engineering • Interdisciplinary Materials Science</div>
            </div>
            <div>
              <div className="text-lg font-semibold">Follow</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-zinc-300">
                <a href="#" className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center">Google Scholar</a>
                <a href="#" className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center">VINSE</a>
                <a href="#" className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center">YouTube</a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
            <div>© {new Date().getFullYear()} Vanderbilt University — Valentine Lab</div>
            <div>This site follows Vanderbilt brand colors and AA contrast guidance.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
