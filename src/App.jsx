// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import "./index.css";

/*
  Alkindo - Full Interactive Company Profile (Bilingual)
  Paste this file to src/App.jsx (replace existing).
  Required assets (place into public/):
    - logo.png
    - hero.jpg
    - timeline-1998.jpg ... timeline-2025.jpg (optional; fallback hero.jpg)
    - cert-iso.png, cert-fsc.png, cert-halal.png
    - client-logo-1.png ... client-logo-6.png
    - product-nonfmcg.jpg, product-fmcg.jpg
  Install deps:
    npm install framer-motion lucide-react
*/

// ------------------ TEXT DICTIONARY (BILINGUAL) ------------------
const TEXT = {
  id: {
    nav: {
      about: "Tentang",
      journey: "Perjalanan",
      visi: "Visi & Misi",
      valuechain: "Rantai Nilai",
      products: "Produk",
      certs: "Sertifikasi",
      clients: "Pelanggan",
      contact: "Hubungi",
    },
    heroTitle: "Alkindo Naratama",
    heroSlogan: "Mengubah Kertas Bekas Menjadi Solusi Kemasan Berkelanjutan",
    aboutTitle: "Tentang Alkindo",
    aboutShort:
      "Alkindo mengubah kertas bekas menjadi produk kemasan berkualitas dengan prinsip circular economy.",
    aboutLong:
      "Sejak berdiri, Alkindo fokus pada konversi kertas bekas, peningkatan efisiensi energi, dan kerja sama berkelanjutan dengan mitra. Kami mengembangkan lini produk untuk industri Non-FMCG dan FMCG, sambil menjaga standar mutu dan sertifikasi internasional.",
    journeyTitle: "Perjalanan Alkindo",
    visiTitle: "Visi & Misi",
    visi:
      "Menjadi pemimpin konversi kertas berkelanjutan di Asia Tenggara.",
    misi: [
      "Menyediakan produk berkualitas tinggi",
      "Mengurangi jejak karbon produksi",
      "Mendukung circular economy bersama mitra",
    ],
    valuechainTitle: "Rantai Nilai Industri",
    nonFMCG: "Industri Non-FMCG",
    fmcg: "Industri FMCG",
    more: "More Produk",
    certsTitle: "Sertifikasi & Penghargaan",
    clientsTitle: "Pelanggan Kami",
    contactTitle: "Hubungi Kami",
    contactAddress: "Jl. Contoh Alamat No.123, Bandung",
    contactEmail: "info@alkindo.co.id",
    contactPhone: "+62 21-xxxx-xxxx",
    readMore: "Baca lebih lanjut",
    readLess: "Tampilkan lebih sedikit",
    allrights: "Semua Hak Dilindungi",
    catalogNonFMCG: "https://drive.google.com/drive/folders/REPLACE_NON_FMCG",
    catalogFMCG: "https://drive.google.com/drive/folders/REPLACE_FMCG",
  },
  en: {
    nav: {
      about: "About",
      journey: "Journey",
      visi: "Vision & Mission",
      valuechain: "Value Chain",
      products: "Products",
      certs: "Certifications",
      clients: "Clients",
      contact: "Contact",
    },
    heroTitle: "Alkindo Naratama",
    heroSlogan: "Transforming Waste Paper into Sustainable Packaging Solutions",
    aboutTitle: "About Alkindo",
    aboutShort:
      "Alkindo converts waste paper into quality packaging products aligned with circular economy principles.",
    aboutLong:
      "Since inception, Alkindo focuses on waste-paper conversion, energy efficiency, and sustainable partnerships. We develop product lines for both Non-FMCG and FMCG industries while maintaining high quality and international certifications.",
    journeyTitle: "Our Journey",
    visiTitle: "Vision & Mission",
    visi:
      "To be the leading sustainable paper conversion company in Southeast Asia.",
    misi: [
      "Provide high-quality paper products",
      "Reduce production carbon footprint",
      "Support circular economy with partners",
    ],
    valuechainTitle: "Value Chain",
    nonFMCG: "Non-FMCG Industry",
    fmcg: "FMCG Industry",
    more: "View Catalog",
    certsTitle: "Certifications & Awards",
    clientsTitle: "Our Clients",
    contactTitle: "Contact Us",
    contactAddress: "Jl. Contoh Alamat No.123, Bandung",
    contactEmail: "info@alkindo.co.id",
    contactPhone: "+62 21-xxxx-xxxx",
    readMore: "Read more",
    readLess: "Show less",
    allrights: "All Rights Reserved",
    catalogNonFMCG: "https://drive.google.com/drive/folders/REPLACE_NON_FMCG",
    catalogFMCG: "https://drive.google.com/drive/folders/REPLACE_FMCG",
  },
};

// ------------------ TIMELINE / DATA / ASSETS ------------------
const timelineItems = [
  { year: 1998, desc: "Mulai produksi paper core (contoh).", img: "/timeline-1998.jpg" },
  { year: 2005, desc: "Diversifikasi produk paper tube & honeycomb.", img: "/timeline-2005.jpg" },
  { year: 2011, desc: "Pencapaian sertifikasi & ekspansi pabrik.", img: "/timeline-2011.jpg" },
  { year: 2018, desc: "Inovasi produk kemasan ramah lingkungan.", img: "/timeline-2018.jpg" },
  { year: 2020, desc: "Peningkatan efisiensi & sustainability program.", img: "/timeline-2020.jpg" },
  { year: 2023, desc: "Peluncuran produk Paper Cup & Bowl.", img: "/timeline-2023.jpg" },
  { year: 2025, desc: "Menuju target kapasitas & green roadmap.", img: "/timeline-2025.jpg" },
];

const productsNonFMCG = [
  { id: "n1", title: "Paper Tube", desc: "Core & tube untuk kebutuhan industri." },
  { id: "n2", title: "Honeycomb", desc: "Solusi ringan dan kuat untuk proteksi." },
];

const productsFMCG = [
  { id: "f1", title: "Paper Box", desc: "Kemasan retail & e-commerce." },
  { id: "f2", title: "Paper Bag", desc: "Tas kertas custom untuk brand." },
];

const certs = ["/cert-iso.png", "/cert-fsc.png", "/cert-halal.png"];
const clientLogos = [
  "/client-logo-1.png",
  "/client-logo-2.png",
  "/client-logo-3.png",
  "/client-logo-4.png",
  "/client-logo-5.png",
];

// ------------------ COMPONENT ------------------
export default function App() {
  // language with localStorage
  const stored = (typeof window !== "undefined" && localStorage.getItem("alkindo_lang")) || "id";
  const [lang, setLang] = useState(stored);
  const t = TEXT[lang];

  // ui state
  const [openMenu, setOpenMenu] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // refs for timeline and clients
  const timelineRef = useRef(null);
  const clientsRef = useRef(null);

  // on lang change -> store
  useEffect(() => {
    try {
      localStorage.setItem("alkindo_lang", lang);
    } catch (e) {}
  }, [lang]);

  // auto scroll clients logos (infinite loop via duplicated array)
  useEffect(() => {
    const el = clientsRef.current;
    if (!el) return;
    let pos = 0;
    let raf;
    const step = () => {
      pos += 0.5; // speed
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // timeline scroll
  const scrollTimeline = (dir) => {
    const el = timelineRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const amt = dir === "left" ? -w * 0.8 : w * 0.8;
    el.scrollBy({ left: amt, behavior: "smooth" });
  };

  const openCatalog = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Alkindo" className="w-12 h-12 object-contain" />
            <div>
              <div className="text-sm font-semibold">PT Alkindo Naratama Tbk</div>
              <div className="text-xs text-slate-500">Sustainable paper conversion</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-emerald-700">{t.nav.about}</a>
            <a href="#timeline" className="hover:text-emerald-700">{t.nav.journey}</a>
            <a href="#visi" className="hover:text-emerald-700">{t.nav.visi}</a>
            <a href="#valuechain" className="hover:text-emerald-700">{t.nav.valuechain}</a>
            <a href="#products" className="hover:text-emerald-700">{t.nav.products}</a>
            <a href="#certs" className="hover:text-emerald-700">{t.nav.certs}</a>
            <a href="#clients" className="hover:text-emerald-700">{t.nav.clients}</a>
            <a href="#contact" className="bg-emerald-600 text-white px-4 py-2 rounded">{t.nav.contact}</a>

            {/* language toggle */}
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="border border-slate-200 px-2 py-1 rounded text-sm hover:bg-slate-100"
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              {lang === "id" ? "🇬🇧 EN" : "🇮🇩 ID"}
            </button>
          </nav>

          <button className="md:hidden p-2" onClick={() => setOpenMenu(o => !o)} aria-label="Toggle menu">
            {openMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {openMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col gap-2 px-6 py-4">
              <a href="#about" onClick={() => setOpenMenu(false)}>{t.nav.about}</a>
              <a href="#timeline" onClick={() => setOpenMenu(false)}>{t.nav.journey}</a>
              <a href="#visi" onClick={() => setOpenMenu(false)}>{t.nav.visi}</a>
              <a href="#valuechain" onClick={() => setOpenMenu(false)}>{t.nav.valuechain}</a>
              <a href="#products" onClick={() => setOpenMenu(false)}>{t.nav.products}</a>
              <a href="#certs" onClick={() => setOpenMenu(false)}>{t.nav.certs}</a>
              <a href="#clients" onClick={() => setOpenMenu(false)}>{t.nav.clients}</a>
              <a href="#contact" className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded text-center">{t.nav.contact}</a>
              <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="mt-2 border px-2 py-1 rounded">{lang === "id" ? "EN" : "ID"}</button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24">
        {/* HERO */}
        <section className="relative">
          <div className="h-96 md:h-[520px] w-full overflow-hidden rounded-b-2xl shadow-xl" style={{ boxShadow: "0 20px 60px rgba(30,64,175,0.08)" }}>
            <img src="/hero.jpg" alt="pabrik" className="object-cover w-full h-full brightness-90"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">{t.heroTitle}</h1>
                <p className="mt-3 text-lg md:text-xl text-white/90">{t.heroSlogan}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">{t.aboutTitle}</h2>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-slate-700">
                {readMore ? t.aboutLong : t.aboutShort}
              </motion.p>

              <div className="mt-4">
                <button className="text-emerald-700 underline text-sm" onClick={() => setReadMore(r => !r)}>
                  {readMore ? t.readLess : t.readMore}
                </button>
              </div>
            </div>

            <div>
              <div className="bg-emerald-50 p-6 rounded-lg border">
                <h4 className="font-semibold text-emerald-800">{t.valuechainTitle}</h4>
                <p className="mt-3 text-slate-700">{lang === "id" ? "Pengumpulan → Pengolahan → Produksi → Distribusi" : "Collection → Processing → Production → Distribution"}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded">Supplier</div>
                  <div className="p-3 bg-white rounded">Produksi</div>
                  <div className="p-3 bg-white rounded">Quality</div>
                  <div className="p-3 bg-white rounded">Distribusi</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE (horizontal slider) */}
        <section id="timeline" className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-emerald-800">{t.journeyTitle}</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollTimeline(timelineRef, "left")} className="p-2 bg-white rounded shadow-sm"><ChevronLeft size={18}/></button>
                <button onClick={() => scrollTimeline(timelineRef, "right")} className="p-2 bg-white rounded shadow-sm"><ChevronRight size={18}/></button>
              </div>
            </div>

            <div ref={timelineRef} className="overflow-x-auto no-scrollbar flex gap-4 pb-4">
              {timelineItems.map((titem, idx) => (
                <motion.div key={idx} whileHover={{ y: -6 }} className="min-w-[320px] md:min-w-[380px] bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-44 bg-slate-100">
                    <img src={titem.img || "/hero.jpg"} alt={titem.year} className="object-cover w-full h-full"/>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-emerald-700">{titem.year}</div>
                    <div className="text-sm text-slate-600 mt-2">{titem.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section id="visi" className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-emerald-800">{t.visiTitle}</h3>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">{lang === "id" ? "Visi" : "Vision"}</h4>
              <p className="mt-2 text-slate-700">{t.visi}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">{lang === "id" ? "Misi" : "Mission"}</h4>
              <ul className="mt-2 text-slate-700 list-disc pl-5 space-y-2">
                {t.misi.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* VALUE CHAIN interactive */}
        <section id="valuechain" className="bg-emerald-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.valuechainTitle}</h3>
            <div className="mt-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <div className="relative p-6 bg-white rounded-lg shadow">
                  <ol className="flex items-center gap-3 md:gap-6 justify-between">
                    {["Koleksi", "Sortir", "Olahan", "Produksi", "Distribusi"].map((s, i) => (
                      <li key={s} className="flex-1 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-700 text-white flex items-center justify-center font-semibold">{i+1}</div>
                        <div className="mt-2 text-sm text-slate-700">{lang === "id" ? s : translateStep(s)}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-emerald-800">{lang === "id" ? "Interaktif" : "Interactive"}</h4>
                  <p className="mt-2 text-slate-700">{lang === "id" ? "Hover pada angka untuk detail (pengembangan selanjutnya)." : "Hover the steps for details (future enhancement)."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.productsTitle}</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.nonFMCG}</h4>
                    <p className="mt-2 text-slate-600">Produk industri untuk kebutuhan manufaktur & transportasi.</p>
                  </div>
                  <div>
                    <button className="px-3 py-2 bg-emerald-600 text-white rounded" onClick={() => openCatalog(t.catalogNonFMCG)}>{t.more}</button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {productsNonFMCG.map(p => (
                    <div key={p.id} className="p-3 border rounded cursor-pointer" onClick={() => setSelectedProduct(p)}>
                      <div className="font-semibold text-emerald-700">{p.title}</div>
                      <div className="text-sm text-slate-600">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.fmcg}</h4>
                    <p className="mt-2 text-slate-600">Kemasan retail & sekali pakai berbasis kertas untuk FMCG.</p>
                  </div>
                  <div>
                    <button className="px-3 py-2 bg-emerald-600 text-white rounded" onClick={() => openCatalog(t.catalogFMCG)}>{t.more}</button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {productsFMCG.map(p => (
                    <div key={p.id} className="p-3 border rounded cursor-pointer" onClick={() => setSelectedProduct(p)}>
                      <div className="font-semibold text-emerald-700">{p.title}</div>
                      <div className="text-sm text-slate-600">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY counters */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">1200+</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Ton kertas daur ulang / tahun" : "Tons recycled / year"}</div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">35%</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Pengurangan emisi" : "Emission reduction"}</div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Mitra & pelanggan" : "Partners & clients"}</div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.certsTitle}</h3>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {certs.map((c, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded flex items-center justify-center">
                  <img src={c} alt={`cert-${i}`} className="max-h-16 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTS auto-scroll */}
        <section id="clients" className="bg-emerald-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t.clientsTitle}</h3>
            <div ref={clientsRef} className="flex gap-6 overflow-hidden no-scrollbar py-4" style={{ alignItems: "center" }}>
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-40 h-20 bg-white rounded-md p-3 flex items-center justify-center shadow">
                  <img src={logo} alt={`client-${i}`} className="object-contain max-h-12" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-emerald-800">{t.contactTitle}</h3>
              <p className="mt-2 text-slate-700">{t.contactAddress}</p>
              <div className="mt-4 space-y-2 text-slate-700">
                <div className="flex items-center gap-3"><Phone size={16} /> <span>{t.contactPhone}</span></div>
                <div className="flex items-center gap-3"><Mail size={16} /> <span>{t.contactEmail}</span></div>
                <div className="flex items-center gap-3"><MapPin size={16} /> <span>{t.contactAddress}</span></div>
              </div>
            </div>

            <div>
              <form className="bg-white p-6 rounded shadow" onSubmit={(e) => { e.preventDefault(); alert(lang === "id" ? "Terima kasih! Pesan terkirim." : "Thanks! Message sent."); }}>
                <label className="block">Nama <input className="w-full mt-1 p-2 border rounded" required /></label>
                <label className="block mt-3">Email <input className="w-full mt-1 p-2 border rounded" type="email" required /></label>
                <label className="block mt-3">Pesan <textarea className="w-full mt-1 p-2 border rounded" rows={4} required></textarea></label>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">{lang === "id" ? "Kirim" : "Send"}</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-blue-700 text-white py-6 mt-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-semibold">PT Alkindo Naratama Tbk</div>
                <div className="text-sm">© {new Date().getFullYear()}</div>
              </div>
            </div>

            <div className="text-sm">
              {t.contactAddress} • {t.contactEmail} • {t.contactPhone}
            </div>
          </div>
        </footer>

        {/* PRODUCT MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-emerald-800">{selectedProduct.title}</h4>
                  <p className="text-slate-600 mt-2">{selectedProduct.desc}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400">✕</button>
              </div>
              <div className="mt-4 text-sm text-slate-500">{lang === "id" ? "Untuk spesifikasi teknis, hubungi tim sales kami." : "For technical specifications, contact our sales team."}</div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

// ------------------ Helper functions ------------------
function translateStep(step) {
  const map = {
    Koleksi: "Collection",
    Sortir: "Sorting",
    Olahan: "Processing",
    Produksi: "Production",
    Distribusi: "Distribution",
  };
  return map[step] || step;
}

function scrollTimeline(ref, dir) {
  const el = ref.current;
  if (!el) return;
  const w = el.clientWidth;
  const amt = dir === "left" ? -w * 0.8 : w * 0.8;
  el.scrollBy({ left: amt, behavior: "smooth" });
}