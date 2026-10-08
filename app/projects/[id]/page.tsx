import { eq } from "drizzle-orm";
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, Download, MapPin, MessageCircle, Play, ShieldCheck, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "../../../db";
import { projects } from "../../../db/schema";
import { demoProjects, money, type Project } from "../../../lib/project-data";

export const dynamic = "force-dynamic";

async function getProject(id: number): Promise<Project | null> {
  if (id < 0) return demoProjects.find(project => project.id === id) || null;
  const [project] = await getDb().select().from(projects).where(eq(projects.id, id)).limit(1);
  return project && project.status === "active" ? project : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return { title: "Project Not Found", robots: { index: false, follow: false } };
  const project = await getProject(numericId);
  if (!project) return { title: "Project Not Found", robots: { index: false, follow: false } };
  const description = `${project.description} Starting from PKR ${money(project.price)}. Contact LMAR Marketing for current availability.`;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} | LMAR Marketing`,
      description,
      url: `/projects/${project.id}`,
      images: [{ url: project.imageUrl || "/lmar-hero.jpg", alt: project.title }],
    },
    twitter: { card: "summary_large_image", title: project.title, description, images: [project.imageUrl || "/lmar-hero.jpg"] },
  };
}

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();
  const project = await getProject(numericId);
  if (!project) notFound();

  const downPayment = project.price * project.downPaymentPercent / 100;
  const financed = project.price - downPayment;
  const monthly = financed / Math.max(project.installmentMonths, 1);
  const whatsapp = `https://wa.me/923171117341?text=${encodeURIComponent(`Hello LMAR Marketing, I am interested in ${project.title}. Please share the latest availability and price.`)}`;

  return <main className="min-h-screen bg-[#f7f7f4] text-[#13271f]">
    <header className="bg-[#102b21] text-white"><div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 lg:px-12"><a href="/"><img src="/lmar-logo-white.png" alt="LMAR Marketing" className="h-16 w-auto"/></a><a href="/#projects" className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"><ArrowLeft size={16}/> All properties</a></div></header>

    <section className="bg-[#102b21] pb-16 text-white"><div className="mx-auto grid max-w-[1320px] gap-10 px-5 pt-10 lg:grid-cols-[1.1fr_.9fr] lg:px-12">
      <div className="overflow-hidden rounded-[2rem]"><img src={project.imageUrl || "/lmar-hero.jpg"} alt={project.title} className="h-full min-h-[420px] w-full object-cover"/></div>
      <div className="flex flex-col justify-center"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#d7b465] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#173127]">{project.tag || "Available"}</span><span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold">{project.category}</span></div><p className="mt-7 flex items-center gap-2 text-sm text-white/65"><MapPin size={17}/>{project.city}</p><h1 className="font-display mt-3 text-5xl leading-tight sm:text-6xl">{project.title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-white/65">{project.description}</p><div className="mt-8"><span className="text-sm text-white/50">Starting from</span><strong className="mt-1 block text-3xl text-[#e1c06f]">PKR {money(project.price)}</strong></div><div className="mt-8 flex flex-wrap gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#d7b465] px-6 py-4 font-semibold text-[#173127]"><MessageCircle size={19}/> Ask on WhatsApp</a>{project.locationUrl ? <a href={project.locationUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-semibold"><MapPin size={19}/> Google Maps</a> : null}</div></div>
    </div></section>

    <section className="mx-auto max-w-[1320px] px-5 py-16 lg:px-12"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"><Metric icon={<Building2/>} label="Property type" value={project.category}/><Metric icon={<ShieldCheck/>} label="Down payment" value={`${project.downPaymentPercent}%`}/><Metric icon={<CalendarDays/>} label="Installment plan" value={`${project.installmentMonths} months`}/><Metric icon={<TrendingUp/>} label="Development progress" value={`${project.constructionProgress}%`}/></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><article className="rounded-[2rem] bg-white p-7 shadow-sm sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87d27]">PROJECT OVERVIEW</p><h2 className="font-display mt-3 text-4xl">Plan your investment clearly.</h2><p className="mt-5 leading-7 text-[#65736c]">Use these figures as an initial planning estimate. The LMAR team will confirm current inventory, exact location, category, possession status and the official payment schedule before you proceed.</p><div className="mt-8"><div className="mb-3 flex items-center justify-between text-sm"><span>Construction progress</span><strong>{project.constructionProgress}%</strong></div><div className="h-3 overflow-hidden rounded-full bg-[#e7ece8]"><span className="block h-full rounded-full bg-[#d7b465]" style={{ width: `${Math.min(Math.max(project.constructionProgress, 0), 100)}%` }}/></div></div><ul className="mt-8 space-y-4 text-sm text-[#45574f]"><li className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#247452]" size={20}/>Direct consultation with the LMAR sales team</li><li className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#247452]" size={20}/>Location and project information available before booking</li><li className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#247452]" size={20}/>Site visit assistance and current availability confirmation</li></ul></article>
        <aside className="rounded-[2rem] bg-[#173c2e] p-7 text-white sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e1c06f]">PAYMENT ESTIMATE</p><div className="mt-7 space-y-5"><Row label="Property price" value={`PKR ${money(project.price)}`}/><Row label={`Down payment (${project.downPaymentPercent}%)`} value={`PKR ${money(downPayment)}`}/><Row label="Estimated financed amount" value={`PKR ${money(financed)}`}/><div className="border-t border-white/15 pt-5"><span className="text-sm text-white/55">Estimated monthly installment</span><strong className="mt-1 block text-3xl text-[#e1c06f]">PKR {money(monthly)}</strong></div></div><p className="mt-6 text-xs leading-5 text-white/45">Planning estimate only. Taxes, development charges, category premiums and other fees may apply.</p><div className="mt-7 grid gap-3">{project.brochureUrl ? <a href={project.brochureUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-semibold text-[#173127]"><Download size={18}/> Download brochure</a> : null}{project.videoUrl ? <a href={project.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-4 font-semibold"><Play size={18}/> Watch project video</a> : null}</div></aside></div>
    </section>

    <section className="bg-[#e9eee9] py-16"><div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-7 px-5 text-center md:flex-row md:text-left lg:px-12"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87d27]">READY FOR THE NEXT STEP?</p><h2 className="font-display mt-3 text-4xl">Request the latest project details.</h2><p className="mt-3 text-[#65736c]">Our team can confirm price, availability and arrange your site visit.</p></div><a href={whatsapp} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-2 rounded-full bg-[#173c2e] px-7 py-4 font-semibold text-white"><MessageCircle size={19}/> Contact LMAR</a></div></section>
    <footer className="bg-[#102b21] py-8 text-center text-sm text-white/50">© {new Date().getFullYear()} LMAR Marketing. Property information is subject to confirmation.</footer>
  </main>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-[#dfe5e0] bg-white p-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#edf3ed] text-[#1d5b43]">{icon}</span><span className="mt-4 block text-xs text-[#6b7871]">{label}</span><strong className="mt-1 block">{value}</strong></div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4"><span className="text-sm text-white/55">{label}</span><strong className="text-right">{value}</strong></div>;
}
