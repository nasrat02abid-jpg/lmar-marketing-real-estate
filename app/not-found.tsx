import { ArrowLeft, Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#102b21] px-5 text-white">
    <section className="max-w-xl text-center">
      <img src="/lmar-logo-white.png" alt="LMAR Marketing" className="mx-auto h-20 w-auto"/>
      <p className="mt-10 text-sm font-bold tracking-[.25em] text-[#e1c06f]">404 — PAGE NOT FOUND</p>
      <h1 className="font-display mt-4 text-5xl sm:text-6xl">This property page is unavailable.</h1>
      <p className="mx-auto mt-5 max-w-lg leading-7 text-white/60">The project may have been removed, made inactive, or the link may be incorrect. Return home to explore currently available opportunities.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href="/" className="flex items-center gap-2 rounded-full bg-[#d7b465] px-6 py-4 font-semibold text-[#173127]"><Home size={18}/> Return home</a>
        <a href="/#projects" className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 font-semibold"><ArrowLeft size={18}/> Browse projects</a>
        <a href="https://wa.me/923171117341" target="_blank" rel="noreferrer" aria-label="Contact LMAR on WhatsApp" className="grid h-14 w-14 place-items-center rounded-full border border-white/20"><MessageCircle size={20}/></a>
      </div>
    </section>
  </main>;
}
