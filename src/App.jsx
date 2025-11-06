// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./index.css";

/*
FULL: Alkindo Company Profile - Interactive + Bilingual
Place required assets into /public:
  - logo.png
  - hero.jpg
  - timeline-1998.jpg ... timeline-2025.jpg (or fewer; fallback hero.jpg)
  - cert-iso.png, cert-fsc.png, cert-halal.png
  - client-logo-1.png ... client-logo-6.png
  - product-nonfmcg.jpg, product-fmcg.jpg
Install deps:
  npm install framer-motion lucide-react
*/

/////////////////////
// TEXT DICTIONARY //
/////////////////////
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
      "Sejak berdiri, Alkindo fokus pada konversi kertas bekas, peningkatan efisiensi energi, serta kerja sama dengan mitra industri. Kami menyediakan solusi kemasan untuk berbagai sektor, mulai dari industri berat hingga FMCG, sambil mempertahankan standar mutu internasional dan sertifikasi lingkungan.",
    journeyTitle: "Perjalanan Alkindo",
    visiTitle: "Visi & Misi",
    visi:
      "Menjadi pemimpin konversi kertas berkelanjutan di Asia Tenggara.",
    misi: [
      "Menyediakan produk kertas berkualitas tinggi.",
      "Mengurangi jejak karbon produksi.",
      "Mendukung circular economy bersama mitra.",
    ],
    valuechainTitle: "Rantai Nilai Industri",
    nonFMCG: "Industri Non-FMCG",
    fmcg: "Industri FMCG",
    more: "Lihat Selengkapnya",
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
      "Since inception, Alkindo focuses on waste-paper conversion, energy efficiency, and sustainable partnerships. We develop product lines for both Non-FMCG and FMCG industries while maintaining high quality standards and international certifications.",
    journeyTitle: "Our Journey",
    visiTitle: "Vision & Mission",
    visi:
      "To be the leading sustainable paper conversion company in Southeast Asia.",
    misi: [
      "Provide high-quality paper products.",
      "Reduce production carbon footprint.",
      "Support circular economy with partners.",
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

/////////////////////
// DATA & ASSETS   //
/////////////////////
const TIMELINE = [
  { year: "1998", desc: "Mulai produksi paper core & tube.", img: "/timeline-1998.jpg" },
  { year: "2005", desc: "Diversifikasi produk: paper tube & honeycomb.", img: "/timeline-2005.jpg" },
  { year: "2011", desc: "Pencapaian sertifikasi & perluasan kapasitas.", img: "/timeline-2011.jpg" },
  { year: "2018", desc: "Inovasi produk kemasan ramah lingkungan.", img: "/timeline-2018.jpg" },
  { year: "2020", desc: "Peningkatan efisiensi & program sustainability.", img: "/timeline-2020.jpg" },
  { year: "2023", desc: "Peluncuran produk Paper Cup & Bowl.", img: "/timeline-2023.jpg" },
  { year: "2025", desc: "Menuju target kapasitas & green roadmap.", img: "/timeline-2025.jpg" },
];

const PRODUCTS_NON_FMCG = [
  { id: "n1", title: "Paper Tube", desc: "Core & tube untuk kebutuhan industri (corrugator)." },
  { id: "n2", title: "Honeycomb", desc: "Panel honeycomb untuk proteksi dan struktur." },
];

const PRODUCTS_FMCG = [
  { id: "f1", title: "Paper Box", desc: "Kemasan retail dan e-commerce." },
  { id: "f2", title: "Paper Bag", desc: "Tas kertas custom untuk brand." },
];

const CERTS = ["/cert-iso.png", "/cert-fsc.png", "/cert-halal.png"];
const CLIENT_LOGOS = [
  "/client-logo-1.png",
  "/client-logo-2.png",
  "/client-logo-3.png",
  "/client-logo-4.png",
  "/client-logo-5.png",
];

/////////////////////
// Helper utils    //
/////////////////////
const saveLang = (lang) => {
  try {
    localStorage.setItem("alkindo_lang", lang);
  } catch (e) {}
};

const loadLang = () => {
  try {
    return localStorage.getItem("alkindo_lang") || "id";
  } catch (e) {
    return "id";
  }
};

function translateStep(step, lang) {
  const map = {
    Koleksi: { en: "Collection", id: "Koleksi" },
    Sortir: { en: "Sorting", id: "Sortir" },
    Olahan: { en: "Processing", id: "Olahan" },
    Produksi: { en: "Production", id: "Produksi" },
    Distribusi: { en: "Distribution", id: "Distribusi" },
  };
  if (!map[step]) return step;
  return lang === "id" ? map[step].id : map[step].en;
}

/////////////////////
// Main Component  //
/////////////////////
export default function App() {
  // language
  const [lang, setLang] = useState(loadLang());
  const t = TEXT[lang];

  // UI state
  const [openMenu, setOpenMenu] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // refs
  const timelineRef = useRef(null);
  const clientsRef = useRef(null);

  // save lang
  useEffect(() => saveLang(lang), [lang]);

  // clients auto-scroll
  useEffect(() => {
    const el = clientsRef.current;
    if (!el) return;
    let pos = 0;
    let rafId;
    const step = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // timeline scroll helper
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

  // animation variants
  const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
  const shakeVariant = {
    hover: { rotate: [0, -6, 6, -4, 0], transition: { duration: 0.5 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b">
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

            <motion.button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="border border-slate-200 px-2 py-1 rounded text-sm"
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              {lang === "id" ? "🇬🇧 EN" : "🇮🇩 ID"}
            </motion.button>
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
              <button onClick={() => { setLang(lang === "id" ? "en" : "id"); setOpenMenu(false); }} className="mt-2 border px-2 py-1 rounded text-sm">
                {lang === "id" ? "EN" : "ID"}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-24">
        {/* HERO */}
        <section className="relative">
          <div className="h-96 md:h-[540px] w-full overflow-hidden rounded-b-2xl shadow-xl" style={{ boxShadow: "0 20px 60px rgba(30,64,175,0.08)" }}>
            <img src="/hero.jpg" alt="pabrik" className="object-cover w-full h-full brightness-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{t.heroTitle}</motion.h1>
                <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 text-lg md:text-xl text-white/90">{t.heroSlogan}</motion.p>
                <div className="mt-6 flex justify-center gap-4">
                  <motion.a whileHover="hover" variants={shakeVariant} className="inline-block bg-amber-500 text-white px-5 py-3 rounded-lg font-medium shadow" href="#contact">{lang === "id" ? "Hubungi Kami" : "Contact Us"}</motion.a>
                  <motion.a whileHover="hover" variants={shakeVariant} className="inline-block border border-white/40 text-white px-5 py-3 rounded-lg font-medium" href="#products">{lang === "id" ? "Lihat Produk" : "View Products"}</motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold text-emerald-800">{t.aboutTitle}</h2>
              <p className="mt-4 text-slate-700">{aboutExpanded ? t.aboutLong : t.aboutShort}</p>
              <div className="mt-4">
                <motion.button whileHover="hover" variants={shakeVariant} onClick={() => setAboutExpanded(b => !b)} className="text-emerald-700 underline text-sm">
                  {aboutExpanded ? t.readLess : t.readMore}
                </motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-emerald-50 p-6 rounded-lg border">
              <h4 className="font-semibold text-emerald-800">Rantai Nilai (Ringkas)</h4>
              <p className="mt-3 text-slate-700">{lang === "id" ? "Pengumpulan → Pengolahan → Produksi → Distribusi" : "Collection → Processing → Production → Distribution"}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded">Supplier</div>
                <div className="p-3 bg-white rounded">Produksi</div>
                <div className="p-3 bg-white rounded">Quality</div>
                <div className="p-3 bg-white rounded">Distribusi</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="py-10 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-emerald-800">{t.journeyTitle}</h3>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.05 }} className="p-2 bg-white rounded shadow-sm" onClick={() => scrollTimeline(timelineRef, "left")}><ChevronLeft size={18} /></motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="p-2 bg-white rounded shadow-sm" onClick={() => scrollTimeline(timelineRef, "right")}><ChevronRight size={18} /></motion.button>
              </div>
            </div>

            <div ref={timelineRef} className="overflow-x-auto no-scrollbar flex gap-4 pb-4">
              {TIMELINE.map((item, idx) => (
                <motion.article key={idx} whileHover={{ y: -6 }} className="min-w-[300px] md:min-w-[380px] bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-44 bg-slate-100">
                    <img src={item.img || "/hero.jpg"} alt={item.year} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-bold text-emerald-700">{item.year}</div>
                    <div className="text-sm text-slate-600 mt-2">{lang === "id" ? item.desc : translateTimeline(item.desc)}</div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section id="visi" className="max-w-6xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-emerald-800">{t.visiTitle}</h3>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">{lang === "id" ? "Visi" : "Vision"}</h4>
              <p className="mt-2 text-slate-700">{t.visi}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">{lang === "id" ? "Misi" : "Mission"}</h4>
              <ul className="mt-2 text-slate-700 list-disc pl-5 space-y-2">
                {t.misi.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* VALUE CHAIN (Interactive steps) */}
        <section id="valuechain" className="bg-emerald-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.valuechainTitle}</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6 items-start">
              <div className="col-span-2">
                <div className="relative p-6 bg-white rounded-lg shadow">
                  <ol className="flex items-center gap-4 md:gap-6 justify-between">
                    {["Koleksi", "Sortir", "Olahan", "Produksi", "Distribusi"].map((s, i) => (
                      <li key={s} className="flex-1 text-center group">
                        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-700 text-white flex items-center justify-center font-semibold">{i+1}</div>
                        <div className="mt-2 text-sm text-slate-700">{lang === "id" ? s : translateStep(s, lang)}</div>
                        <div className="mt-3 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">Klik untuk melihat detail (coming soon)</div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-emerald-800">{lang === "id" ? "Interaktif" : "Interactive"}</h4>
                  <p className="mt-2 text-slate-700">{lang === "id" ? "Hover pada angka untuk melihat detail proses (pengembangan selanjutnya)." : "Hover the steps to see process details (future enhancement)."}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.nav.products}</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {/* Non-FMCG */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.nonFMCG}</h4>
                    <p className="mt-2 text-slate-600">Produk industri untuk kebutuhan manufaktur & transportasi.</p>
                  </div>
                  <div>
                    <motion.button whileHover="hover" variants={shakeVariant} onClick={() => openCatalog(t.catalogNonFMCG)} className="px-3 py-2 bg-emerald-600 text-white rounded">{t.more}</motion.button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {PRODUCTS_NON_FMCG.map(p => (
                    <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="p-3 border rounded cursor-pointer" onClick={() => setSelectedProduct(p)}>
                      <div className="font-semibold text-emerald-700">{p.title}</div>
                      <div className="text-sm text-slate-600">{p.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FMCG */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.fmcg}</h4>
                    <p className="mt-2 text-slate-600">Kemasan retail & sekali pakai berbasis kertas untuk FMCG.</p>
                  </div>
                  <div>
                    <motion.button whileHover="hover" variants={shakeVariant} onClick={() => openCatalog(t.catalogFMCG)} className="px-3 py-2 bg-emerald-600 text-white rounded">{t.more}</motion.button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  {PRODUCTS_FMCG.map(p => (
                    <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="p-3 border rounded cursor-pointer" onClick={() => setSelectedProduct(p)}>
                      <div className="font-semibold text-emerald-700">{p.title}</div>
                      <div className="text-sm text-slate-600">{p.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY COUNTERS */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">1200+</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Ton kertas daur ulang / tahun" : "Tons recycled / year"}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">35%</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Pengurangan emisi" : "Emission reduction"}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-6 bg-emerald-50 rounded-lg text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-slate-700">{lang === "id" ? "Mitra & Pelanggan" : "Partners & Clients"}</div>
            </motion.div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800">{t.certsTitle}</h3>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {CERTS.map((c, i) => (
                <motion.div whileHover={{ scale: 1.03 }} key={i} className="p-4 bg-slate-50 rounded flex items-center justify-center">
                  <img src={c} alt={`cert-${i}`} className="max-h-16 object-contain" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTS (auto scroll) */}
        <section id="clients" className="bg-emerald-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t.clientsTitle}</h3>
            <div ref={clientsRef} className="flex gap-6 overflow-hidden no-scrollbar py-4" style={{ alignItems: "center" }}>
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
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
                  <motion.button whileHover="hover" variants={shakeVariant} className="bg-emerald-600 text-white px-4 py-2 rounded">{lang === "id" ? "Kirim" : "Send"}</motion.button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-blue-700 text-white py-6 mt-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
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
        <AnimatePresence>
          {selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.98, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 20 }} className="bg-white rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-emerald-800">{selectedProduct.title}</h4>
                    <p className="text-slate-600 mt-2">{selectedProduct.desc}</p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-slate-400">✕</button>
                </div>
                <div className="mt-4 text-sm text-slate-500">{lang === "id" ? "Untuk spesifikasi teknis, hubungi tim sales kami." : "For technical specifications, contact our sales team."}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/////////////////////
// Additional Helpers
/////////////////////

// translate timeline short (simple fallback)
function translateTimeline(text) {
  // Simple heuristic: if ID -> EN mapping, else return original
  // For production, replace with full translations
  const mapping = {
    "Mulai produksi paper core & tube.": "Started production of paper core & tubes.",
    "Diversifikasi produk: paper tube & honeycomb.": "Diversified products: paper tube & honeycomb.",
    "Pencapaian sertifikasi & perluasan kapasitas.": "Achieved certifications & capacity expansion.",
    "Inovasi produk kemasan ramah lingkungan.": "Innovated eco-friendly packaging products.",
    "Peningkatan efisiensi & program sustainability.": "Improved efficiency & sustainability programs.",
    "Peluncuran produk Paper Cup & Bowl.": "Launched Paper Cup & Bowl products.",
    "Menuju target kapasitas & green roadmap.": "Moving toward capacity targets & green roadmap.",
  };
  return mapping[text] || text;
}