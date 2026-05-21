import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "6281386771587";
const STORE_NAME = "AquaRay Premium";

const products = [
  {
    id: 1, name: "Ikan Pari Motoro", type: "Motoro", size: "15-20 cm",
    age: "5-7 bulan", gender: "Jantan", origin: "Captive Bred",
    price: 850000, priceLabel: "Rp 850.000",
    badge: "Best Seller", stock: 8,
    desc: "Pari Motoro dengan motif bintik khas yang cantik. Salah satu jenis paling populer di kalangan kolektor ikan hias air tawar. Aktif, jinak, dan mudah beradaptasi.",
    highlights: ["Motif bintik khas", "Jinak & aktif", "Cocok untuk pemula", "Sudah makan rutin"],
    emoji: "🟤",
    specs: { suhu: "26–30°C", pH: "6.5–7.5", akuarium: "Min. 200L" }
  },
  {
    id: 2, name: "Ikan Pari Leopoldi", type: "Leopoldi", size: "12-15 cm",
    age: "4-6 bulan", gender: "Betina", origin: "Captive Bred",
    price: 1200000, priceLabel: "Rp 1.200.000",
    badge: "Limited", stock: 3,
    desc: "Leopoldi dengan pola titik putih menawan di tubuh hitam. Jenis ini lebih jarang dan sangat diminati kolektor serius. Perawakan elegan dan gerakan anggun.",
    highlights: ["Pola titik putih unik", "Tubuh hitam pekat", "Langka & eksklusif", "Grade A"],
    emoji: "⚫",
    specs: { suhu: "26–30°C", pH: "6.5–7.5", akuarium: "Min. 250L" }
  },
  {
    id: 3, name: "Ikan Pari Black Diamond", type: "Black Diamond", size: "18-22 cm",
    age: "7-9 bulan", gender: "Jantan", origin: "Captive Bred",
    price: 2500000, priceLabel: "Rp 2.500.000",
    badge: "Premium", stock: 2,
    desc: "Black Diamond adalah mahkota dunia ikan pari hias. Tubuh gelap berkilau dengan aksen putih yang menawan. Sangat eksklusif dan hanya dimiliki kolektor premium.",
    highlights: ["Kilau tubuh premium", "Super rare", "Certificate of health", "Breeding pair available"],
    emoji: "💎",
    specs: { suhu: "26–29°C", pH: "6.5–7.2", akuarium: "Min. 300L" }
  },
  {
    id: 4, name: "Ikan Pari Galaxy", type: "Galaxy", size: "14-18 cm",
    age: "5-8 bulan", gender: "Betina", origin: "Captive Bred",
    price: 1800000, priceLabel: "Rp 1.800.000",
    badge: "New Arrival", stock: 5,
    desc: "Galaxy Stingray dengan pola bintang galaksi spektakuler. Motif tidak ada yang sama antara satu dengan lainnya, menjadikannya unik seperti karya seni alam.",
    highlights: ["Pola unik tiap individu", "Warna kontras menawan", "Aktif & sehat", "Dokumentasi lengkap"],
    emoji: "🌟",
    specs: { suhu: "26–30°C", pH: "6.5–7.5", akuarium: "Min. 250L" }
  },
  {
    id: 5, name: "Ikan Pari Hystrix", type: "Hystrix", size: "10-14 cm",
    age: "3-5 bulan", gender: "Jantan", origin: "Captive Bred",
    price: 650000, priceLabel: "Rp 650.000",
    badge: "Best Seller", stock: 10,
    desc: "Hystrix dengan tekstur tubuh kasar yang unik dan eksotis. Cocok bagi pemula yang ingin memulai hobi memelihara ikan pari hias. Harga terjangkau, kualitas terjamin.",
    highlights: ["Tekstur unik", "Harga bersahabat", "Cocok pemula", "Stok banyak"],
    emoji: "🐟",
    specs: { suhu: "26–30°C", pH: "6.5–7.5", akuarium: "Min. 150L" }
  },
  {
    id: 6, name: "Ikan Pari Tigrinus", type: "Tigrinus", size: "16-20 cm",
    age: "6-8 bulan", gender: "Betina", origin: "Captive Bred",
    price: 3200000, priceLabel: "Rp 3.200.000",
    badge: "Premium", stock: 1,
    desc: "Tigrinus dengan corak harimau eksotis yang memukau. Salah satu jenis pari hias paling langka dan paling dicari. Hanya tersedia 1 ekor, jangan sampai ketinggalan!",
    highlights: ["Corak harimau eksotis", "Sangat langka", "Stok 1 ekor only", "Museum quality"],
    emoji: "🐯",
    specs: { suhu: "25–29°C", pH: "6.0–7.0", akuarium: "Min. 300L" }
  },
];

const testimonials = [
  { name: "Budi Santoso", city: "Jakarta", rating: 5, text: "Pari Motoro yang saya beli kondisinya sangat sehat, packing rapi banget! Sudah 3 bulan masih lincah dan aktif. Pelayanan CS nya juga ramah.", date: "Maret 2025", avatar: "BS" },
  { name: "Rina Wijaya", city: "Surabaya", rating: 5, text: "Sudah 5x order di sini, selalu puas! Black Diamond yang terakhir beli sungguh luar biasa indahnya. Pengiriman ke Surabaya aman 100%.", date: "April 2025", avatar: "RW" },
  { name: "Dimas Pratama", city: "Bandung", rating: 5, text: "Leopoldi betina yang saya dapat sudah beranak! Kualitas ikan dari sini memang sudah terbukti. Sangat rekomen buat sesama kolektor.", date: "Mei 2025", avatar: "DP" },
  { name: "Siti Rahayu", city: "Medan", rating: 5, text: "Pertama kali beli ikan online, tadinya ragu. Tapi hasilnya luar biasa! Ikan sampai sehat, ada garansi live, dan responnya cepat. Top!", date: "April 2025", avatar: "SR" },
];

const faqs = [
  { q: "Apakah ada garansi hidup?", a: "Ya! Kami memberikan garansi hidup 100% selama proses pengiriman. Jika ikan tidak sampai dalam kondisi hidup, kami akan memberikan penggantian atau refund penuh." },
  { q: "Bagaimana proses pengiriman ikan?", a: "Ikan dikemas dengan teknik double bag + oksigen murni, styrofoam tebal, dan coolpack. Pengiriman via kargo udara untuk jarak jauh, atau J&T/SiCepat untuk area Jawa." },
  { q: "Berapa lama pengiriman?", a: "Untuk area Jawa 1-2 hari. Luar Jawa 2-3 hari via kargo udara. Kami kirim setiap Senin-Jumat, estimasi waktu kirim diinformasikan setelah konfirmasi pembayaran." },
  { q: "Apakah bisa request jenis/ukuran tertentu?", a: "Tentu! Hubungi kami via WhatsApp untuk request spesifik. Kami memiliki koleksi lebih banyak yang tidak semua terdaftar di katalog online." },
  { q: "Bagaimana cara perawatan ikan pari?", a: "Ikan pari membutuhkan akuarium minimal 150-300L tergantung ukuran, filter yang kuat, suhu 26-30°C, dan pH 6.5-7.5. Kami selalu sediakan panduan perawatan gratis untuk setiap pembelian." },
  { q: "Apakah bisa COD?", a: "COD tersedia untuk area Jabodetabek. Untuk area lain, pembayaran via transfer bank sebelum pengiriman. DP 50% untuk pemesanan pre-order." },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────
const openWhatsApp = (msg) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
};

const orderMsg = (p) =>
  `Halo AquaRay Premium! Saya tertarik memesan:\n\n🐟 *${p.name}*\n📏 Ukuran: ${p.size}\n🏷️ Harga: ${p.priceLabel}\n\nMohon info ketersediaan dan detail pengirimannya. Terima kasih!`;

// ─── STYLES ────────────────────────────────────────────────────────────────
const style = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --navy: #0A3D6B;
  --ocean: #0A6DAD;
  --sky: #3DA5D9;
  --aqua: #7EC8E3;
  --foam: #E8F6FC;
  --gold: #C8963E;
  --gold-light: #F0C96A;
  --white: #FFFFFF;
  --off-white: #F7FAFE;
  --text: #1A2B40;
  --text-muted: #5E7A96;
  --border: #D8EBF5;
  --shadow: 0 4px 24px rgba(10,61,107,0.10);
  --shadow-lg: 0 12px 48px rgba(10,61,107,0.16);
  --radius: 16px;
  --radius-sm: 10px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--white);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
}

h1,h2,h3,h4 { font-family: 'Cormorant Garamond', serif; }

/* ── NAVBAR ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  height: 68px;
  transition: box-shadow 0.3s;
}
.navbar.scrolled { box-shadow: 0 4px 24px rgba(10,61,107,0.12); }
.nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.nav-logo-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: linear-gradient(135deg, var(--navy), var(--ocean));
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
.nav-logo-text { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: var(--navy); line-height: 1.1; }
.nav-logo-sub { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; }
.nav-links { display: flex; gap: 4px; }
.nav-link {
  padding: 8px 16px; border-radius: 8px; cursor: pointer;
  font-size: 14px; font-weight: 500; color: var(--text-muted);
  transition: all 0.2s; border: none; background: none;
}
.nav-link:hover { color: var(--ocean); background: var(--foam); }
.nav-link.active { color: var(--navy); background: var(--foam); font-weight: 600; }
.nav-cta {
  padding: 10px 20px; border-radius: 8px; cursor: pointer;
  font-size: 14px; font-weight: 600; color: white;
  background: linear-gradient(135deg, var(--navy), var(--ocean));
  border: none; transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
}
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(10,109,173,0.35); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--navy); border-radius: 2px; transition: 0.3s; }

/* ── MOBILE NAV ── */
.mobile-menu {
  display: none; position: fixed; top: 68px; left: 0; right: 0; z-index: 999;
  background: white; border-bottom: 1px solid var(--border);
  padding: 16px 24px 24px;
  flex-direction: column; gap: 4px;
  animation: slideDown 0.3s ease;
}
.mobile-menu.open { display: flex; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.mobile-link {
  padding: 12px 16px; border-radius: 10px; cursor: pointer;
  font-size: 15px; font-weight: 500; color: var(--text);
  border: none; background: none; text-align: left; transition: 0.2s;
}
.mobile-link:hover, .mobile-link.active { background: var(--foam); color: var(--navy); }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  background: linear-gradient(160deg, #EAF4FB 0%, #DDEEF8 40%, #C5E3F5 100%);
  display: flex; align-items: center;
  padding: 100px 24px 60px;
  position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 80% 50%, rgba(10,109,173,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero-bubble {
  position: absolute; border-radius: 50%;
  background: rgba(10,109,173,0.06); pointer-events: none;
  animation: floatBubble linear infinite;
}
@keyframes floatBubble {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.5; }
  100% { transform: translateY(-20vh) scale(1); opacity: 0; }
}
.hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 1; }
.hero-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; background: rgba(200,150,62,0.12); border: 1px solid rgba(200,150,62,0.3); font-size: 12px; font-weight: 600; color: var(--gold); letter-spacing: 0.5px; margin-bottom: 20px; }
.hero-title { font-size: clamp(42px, 5.5vw, 72px); font-weight: 700; color: var(--navy); line-height: 1.05; margin-bottom: 20px; }
.hero-title em { font-style: italic; color: var(--ocean); }
.hero-desc { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 440px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.btn-primary {
  padding: 14px 28px; border-radius: 12px; cursor: pointer;
  font-size: 15px; font-weight: 600; color: white;
  background: linear-gradient(135deg, var(--navy) 0%, var(--ocean) 100%);
  border: none; transition: all 0.25s; display: flex; align-items: center; gap: 8px;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,61,107,0.3); }
.btn-secondary {
  padding: 14px 28px; border-radius: 12px; cursor: pointer;
  font-size: 15px; font-weight: 600; color: var(--navy);
  background: white; border: 1.5px solid var(--border);
  transition: all 0.25s; display: flex; align-items: center; gap: 8px;
}
.btn-secondary:hover { border-color: var(--ocean); color: var(--ocean); background: var(--foam); }
.hero-stats { display: flex; gap: 32px; flex-wrap: wrap; }
.hero-stat { text-align: center; }
.hero-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--navy); line-height: 1; }
.hero-stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
.hero-card-main {
  background: white; border-radius: 24px; padding: 32px;
  box-shadow: var(--shadow-lg); position: relative; z-index: 2;
  width: 100%; max-width: 360px;
}
.hero-fish-display { width: 100%; height: 220px; background: linear-gradient(135deg, #C5E3F5, #A5D4EE); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 96px; margin-bottom: 20px; position: relative; overflow: hidden; }
.hero-fish-display::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(10,61,107,0.08)); }
.hero-card-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.badge-trust { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
.badge-trust.gold { background: rgba(200,150,62,0.12); color: var(--gold); border: 1px solid rgba(200,150,62,0.25); }
.badge-trust.blue { background: var(--foam); color: var(--ocean); border: 1px solid var(--border); }
.hero-float-card {
  position: absolute; background: white; border-radius: 14px; padding: 12px 16px;
  box-shadow: var(--shadow); display: flex; align-items: center; gap: 10px;
}
.hero-float-1 { top: -20px; right: -20px; }
.hero-float-2 { bottom: 20px; left: -30px; }
.float-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.float-icon.green { background: #E8FAF0; }
.float-icon.blue { background: var(--foam); }

/* ── SECTIONS ── */
.section { padding: 80px 24px; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-label { font-size: 12px; font-weight: 600; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
.section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--navy); line-height: 1.15; margin-bottom: 16px; }
.section-sub { font-size: 16px; color: var(--text-muted); max-width: 560px; }
.section-header { margin-bottom: 48px; }
.section-header.center { text-align: center; }
.section-header.center .section-sub { margin: 0 auto; }

/* ── TRUST STRIP ── */
.trust-strip { background: linear-gradient(135deg, var(--navy), #0A5490); padding: 28px 24px; }
.trust-strip-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px; }
.trust-item { display: flex; align-items: center; gap: 12px; color: white; }
.trust-icon { font-size: 28px; }
.trust-text-label { font-size: 13px; opacity: 0.75; }
.trust-text-val { font-size: 15px; font-weight: 600; }

/* ── CARDS ── */
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.product-card {
  background: white; border-radius: var(--radius); overflow: hidden;
  border: 1.5px solid var(--border); transition: all 0.3s; cursor: pointer;
  position: relative;
}
.product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--sky); }
.card-img { height: 200px; background: linear-gradient(135deg, var(--foam), #C5E3F5); display: flex; align-items: center; justify-content: center; font-size: 72px; position: relative; }
.card-badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; }
.badge-best { background: var(--gold); color: white; }
.badge-limited { background: #E55A2B; color: white; }
.badge-premium { background: linear-gradient(135deg, #7B2D8B, #B44ECC); color: white; }
.badge-new { background: #28A865; color: white; }
.card-stock { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.55); color: white; font-size: 11px; padding: 3px 8px; border-radius: 5px; }
.card-body { padding: 18px 20px 20px; }
.card-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.card-specs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.card-spec { font-size: 11px; padding: 3px 8px; border-radius: 5px; background: var(--foam); color: var(--ocean); border: 1px solid var(--border); }
.card-price { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--navy); margin-bottom: 14px; }
.card-price span { font-size: 14px; font-weight: 400; color: var(--text-muted); font-family: 'DM Sans', sans-serif; }
.card-btn { width: 100%; padding: 11px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--navy); background: var(--foam); border: 1.5px solid var(--border); transition: 0.2s; }
.card-btn:hover { background: var(--navy); color: white; border-color: var(--navy); }

/* ── FILTER BAR ── */
.filter-bar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; align-items: center; }
.filter-search { flex: 1; min-width: 200px; padding: 11px 16px; border-radius: 10px; border: 1.5px solid var(--border); font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--text); outline: none; transition: 0.2s; }
.filter-search:focus { border-color: var(--ocean); background: var(--foam); }
.filter-chip { padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; border: 1.5px solid var(--border); color: var(--text-muted); background: white; transition: 0.2s; }
.filter-chip:hover { border-color: var(--ocean); color: var(--ocean); }
.filter-chip.active { background: var(--navy); color: white; border-color: var(--navy); }
.sort-select { padding: 10px 14px; border-radius: 10px; border: 1.5px solid var(--border); font-size: 13px; font-family: 'DM Sans', sans-serif; color: var(--text); outline: none; background: white; cursor: pointer; }

/* ── ABOUT ── */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.about-img-block { position: relative; }
.about-img-main { width: 100%; height: 420px; background: linear-gradient(135deg, #C5E3F5, #A5D4EE); border-radius: 24px; display: flex; align-items: center; justify-content: center; font-size: 120px; }
.about-img-float { position: absolute; bottom: -20px; right: -20px; background: white; border-radius: 16px; padding: 20px 24px; box-shadow: var(--shadow-lg); text-align: center; }
.about-float-num { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 700; color: var(--navy); line-height: 1; }
.about-float-label { font-size: 13px; color: var(--text-muted); }
.milestone-list { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
.milestone-item { display: flex; gap: 16px; align-items: flex-start; padding: 16px; border-radius: 12px; transition: 0.2s; }
.milestone-item:hover { background: var(--foam); }
.milestone-year { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--gold); min-width: 60px; }
.milestone-text { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.milestone-text strong { color: var(--text); }
.value-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 32px; }
.value-card { padding: 20px; border-radius: 14px; background: var(--foam); border: 1px solid var(--border); }
.value-icon { font-size: 28px; margin-bottom: 10px; }
.value-title { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
.value-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

/* ── TESTIMONIALS ── */
.testimonials-bg { background: var(--off-white); }
.testi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.testi-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid var(--border); transition: 0.3s; }
.testi-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.testi-stars { display: flex; gap: 2px; margin-bottom: 14px; font-size: 16px; }
.testi-text { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--navy), var(--ocean)); color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.testi-name { font-size: 14px; font-weight: 600; color: var(--text); }
.testi-city { font-size: 12px; color: var(--text-muted); }
.testi-date { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

/* ── FEATURES ── */
.features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
.feature-card { padding: 28px 24px; border-radius: var(--radius); background: white; border: 1.5px solid var(--border); text-align: center; transition: 0.3s; }
.feature-card:hover { border-color: var(--sky); box-shadow: var(--shadow); transform: translateY(-4px); }
.feature-icon { width: 60px; height: 60px; border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; background: var(--foam); }
.feature-title { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 8px; }
.feature-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* ── PRODUCT DETAIL ── */
.detail-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
.detail-gallery { position: sticky; top: 90px; }
.detail-main-img { width: 100%; height: 380px; background: linear-gradient(135deg, var(--foam), #C5E3F5); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 140px; border: 1.5px solid var(--border); margin-bottom: 16px; }
.detail-thumbs { display: flex; gap: 10px; }
.detail-thumb { width: 72px; height: 72px; border-radius: 12px; background: var(--foam); display: flex; align-items: center; justify-content: center; font-size: 32px; border: 2px solid var(--border); cursor: pointer; transition: 0.2s; }
.detail-thumb.active, .detail-thumb:hover { border-color: var(--ocean); background: #C5E3F5; }
.detail-info { }
.detail-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.detail-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--navy); line-height: 1.1; margin-bottom: 8px; }
.detail-price-block { display: flex; align-items: center; gap: 16px; margin: 20px 0 24px; }
.detail-price { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 700; color: var(--navy); }
.detail-price-per { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
.detail-spec-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 24px 0; }
.detail-spec-item { padding: 14px 16px; background: var(--foam); border-radius: 12px; border: 1px solid var(--border); }
.detail-spec-label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.detail-spec-val { font-size: 15px; font-weight: 600; color: var(--navy); }
.detail-desc { font-size: 15px; color: var(--text-muted); line-height: 1.8; margin-bottom: 24px; }
.detail-highlights { list-style: none; margin-bottom: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.detail-highlights li { font-size: 13px; color: var(--text); display: flex; align-items: center; gap: 8px; }
.detail-highlights li::before { content: '✓'; color: var(--ocean); font-weight: 700; flex-shrink: 0; }
.detail-req-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 28px; }
.detail-req { padding: 12px; background: var(--foam); border-radius: 10px; text-align: center; }
.detail-req-icon { font-size: 20px; margin-bottom: 4px; }
.detail-req-label { font-size: 11px; color: var(--text-muted); }
.detail-req-val { font-size: 13px; font-weight: 600; color: var(--navy); }
.btn-wa { width: 100%; padding: 16px; border-radius: 12px; cursor: pointer; font-size: 16px; font-weight: 700; color: white; background: #25D366; border: none; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px; }
.btn-wa:hover { background: #1ebe58; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
.btn-inquiry { width: 100%; padding: 14px; border-radius: 12px; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--navy); background: white; border: 1.5px solid var(--border); transition: 0.2s; }
.btn-inquiry:hover { border-color: var(--ocean); background: var(--foam); }
.guarantee-box { margin-top: 20px; padding: 14px 16px; background: #E8FAF0; border-radius: 10px; border: 1px solid #B8E8CC; display: flex; align-items: center; gap: 12px; }
.guarantee-icon { font-size: 24px; }
.guarantee-text { font-size: 13px; color: #1A6640; }

/* ── CONTACT ── */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.contact-card { background: var(--foam); border-radius: 20px; padding: 32px; border: 1px solid var(--border); margin-bottom: 20px; }
.contact-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
.contact-item:last-child { margin-bottom: 0; }
.contact-icon-wrap { width: 48px; height: 48px; border-radius: 12px; background: white; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.contact-label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.contact-val { font-size: 15px; font-weight: 600; color: var(--navy); }
.contact-val-sub { font-size: 13px; color: var(--text-muted); }
.hours-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hours-item { display: flex; justify-content: space-between; font-size: 13px; padding: 8px 12px; background: white; border-radius: 8px; }
.hours-day { color: var(--text-muted); }
.hours-time { font-weight: 600; color: var(--navy); }
.hours-closed { color: #E55A2B; }

/* ── FAQ ── */
.faq-list { display: flex; flex-direction: column; gap: 12px; }
.faq-item { border-radius: 12px; border: 1.5px solid var(--border); overflow: hidden; background: white; }
.faq-q { padding: 18px 20px; font-size: 15px; font-weight: 600; color: var(--text); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; }
.faq-q:hover { background: var(--foam); color: var(--navy); }
.faq-q.open { background: var(--foam); color: var(--navy); border-bottom: 1px solid var(--border); }
.faq-arrow { font-size: 18px; transition: transform 0.3s; }
.faq-arrow.open { transform: rotate(180deg); }
.faq-a { padding: 16px 20px; font-size: 14px; color: var(--text-muted); line-height: 1.7; animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

/* ── PACKING GUIDE ── */
.pack-steps { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.pack-step { text-align: center; padding: 24px 16px; background: white; border-radius: 14px; border: 1.5px solid var(--border); position: relative; }
.pack-step-num { width: 36px; height: 36px; border-radius: 50%; background: var(--navy); color: white; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.pack-step-icon { font-size: 40px; margin-bottom: 12px; }
.pack-step-title { font-size: 14px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.pack-step-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

/* ── FOOTER ── */
.footer { background: var(--navy); color: rgba(255,255,255,0.85); padding: 60px 24px 32px; }
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; margin-bottom: 48px; }
.footer-brand .nav-logo-text { color: white; font-size: 24px; }
.footer-brand .nav-logo-sub { color: var(--gold-light); }
.footer-tagline { font-size: 14px; opacity: 0.7; margin-top: 12px; line-height: 1.6; max-width: 260px; }
.footer-socials { display: flex; gap: 10px; margin-top: 20px; }
.footer-social { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; transition: 0.2s; border: 1px solid rgba(255,255,255,0.15); }
.footer-social:hover { background: var(--ocean); border-color: var(--ocean); }
.footer-col-title { font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: white; margin-bottom: 16px; }
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-link { font-size: 14px; opacity: 0.75; cursor: pointer; transition: 0.2s; }
.footer-link:hover { opacity: 1; color: var(--aqua); }
.footer-contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 14px; opacity: 0.8; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; }
.footer-copy { font-size: 13px; opacity: 0.6; }
.footer-badges { display: flex; gap: 8px; }
.footer-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; border: 1px solid rgba(255,255,255,0.2); opacity: 0.7; }

/* ── WA FLOAT ── */
.wa-float {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  width: 56px; height: 56px; border-radius: 50%;
  background: #25D366; color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; cursor: pointer; box-shadow: 0 6px 24px rgba(37,211,102,0.5);
  transition: 0.2s; animation: waPulse 2s infinite;
  border: none;
}
.wa-float:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.6); }
@keyframes waPulse {
  0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.5), 0 0 0 0 rgba(37,211,102,0.3); }
  50% { box-shadow: 0 6px 24px rgba(37,211,102,0.5), 0 0 0 12px rgba(37,211,102,0); }
}
.wa-tooltip {
  position: absolute; right: 68px; background: var(--navy); color: white;
  padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;
  white-space: nowrap; opacity: 0; pointer-events: none; transition: 0.2s;
}
.wa-float:hover .wa-tooltip { opacity: 1; }

/* ── BACK BTN ── */
.back-btn { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--text-muted); background: var(--foam); border: 1.5px solid var(--border); transition: 0.2s; margin-bottom: 32px; }
.back-btn:hover { color: var(--navy); border-color: var(--navy); }

/* ── BREADCRUMB ── */
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted); margin-bottom: 32px; }
.breadcrumb span { cursor: pointer; }
.breadcrumb span:hover { color: var(--ocean); }
.breadcrumb .sep { opacity: 0.4; }

/* ── PAGE HEADER ── */
.page-header { background: linear-gradient(160deg, #EAF4FB, #DDEEF8); padding: 100px 24px 60px; text-align: center; }
.page-header-inner { max-width: 700px; margin: 0 auto; }

/* ── EMPTY ── */
.empty-state { text-align: center; padding: 80px 24px; color: var(--text-muted); }
.empty-state-icon { font-size: 64px; margin-bottom: 16px; }
.empty-state-text { font-size: 18px; font-weight: 500; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-visual { order: -1; }
  .hero-card-main { max-width: 100%; }
  .hero-float-1, .hero-float-2 { display: none; }
  .about-grid, .contact-grid, .detail-layout { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .detail-gallery { position: static; }
  .detail-highlights { grid-template-columns: 1fr; }
  .detail-req-grid { grid-template-columns: repeat(3, 1fr); }
  .trust-strip-inner { gap: 16px; }
  .hero-stats { gap: 20px; }
  .value-cards { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
  .pack-steps { grid-template-columns: 1fr; }
  .detail-spec-grid { grid-template-columns: 1fr; }
}
`;

// ─── COMPONENTS ────────────────────────────────────────────────────────────
function Navbar({ page, setPage, mobileOpen, setMobileOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = [
    { key: "home", label: "Beranda" },
    { key: "catalog", label: "Katalog" },
    { key: "about", label: "Tentang Kami" },
    { key: "contact", label: "Kontak" },
  ];
  const go = (k) => { setPage(k); setMobileOpen(false); window.scrollTo(0, 0); };
  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => go("home")}>
          <div className="nav-logo-icon">🐟</div>
          <div>
            <div className="nav-logo-text">{STORE_NAME}</div>
            <div className="nav-logo-sub">Premium Stingray</div>
          </div>
        </div>
        <div className="nav-links">
          {nav.map(n => (
            <button key={n.key} className={`nav-link${page === n.key ? " active" : ""}`} onClick={() => go(n.key)}>{n.label}</button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => openWhatsApp("Halo AquaRay Premium! Saya ingin bertanya tentang produk ikan pari.")}>
          💬 Chat WA
        </button>
        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {nav.map(n => (
          <button key={n.key} className={`mobile-link${page === n.key ? " active" : ""}`} onClick={() => go(n.key)}>{n.label}</button>
        ))}
        <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => { openWhatsApp("Halo! Saya ingin bertanya tentang produk."); setMobileOpen(false); }}>
          💬 Chat WhatsApp
        </button>
      </div>
    </>
  );
}

function WAButton() {
  return (
    <button className="wa-float" onClick={() => openWhatsApp("Halo AquaRay Premium! Saya tertarik dengan koleksi ikan pari Anda. Bisa info lebih lanjut?")}>
      <div className="wa-tooltip">Chat Sekarang</div>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.173.58 4.208 1.589 5.963L0 24l6.232-1.563A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.96 0-3.79-.516-5.378-1.418l-.386-.228-4.003 1.004 1.03-3.9-.25-.4A9.801 9.801 0 012.18 12C2.18 6.564 6.564 2.18 12 2.18S21.82 6.564 21.82 12 17.436 21.82 12 21.82z"/>
      </svg>
    </button>
  );
}

function Footer({ setPage }) {
  const go = (k) => { setPage(k); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-logo-icon">🐟</div>
              <div>
                <div className="nav-logo-text">{STORE_NAME}</div>
                <div className="nav-logo-sub">Premium Stingray</div>
              </div>
            </div>
            <p className="footer-tagline">Spesialis ikan pari hias terpercaya sejak 2015. Garansi hidup 100%, packing profesional, pengiriman ke seluruh Indonesia.</p>
            <div className="footer-socials">
              {["📘", "📸", "🎵", "▶️"].map((ic, i) => <div key={i} className="footer-social">{ic}</div>)}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Menu</div>
            <div className="footer-links">
              {[["home","Beranda"],["catalog","Katalog"],["about","Tentang Kami"],["contact","Kontak"]].map(([k,l]) => (
                <div key={k} className="footer-link" onClick={() => go(k)}>{l}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Jenis Pari</div>
            <div className="footer-links">
              {["Motoro","Leopoldi","Black Diamond","Galaxy","Hystrix","Tigrinus"].map(t => (
                <div key={t} className="footer-link" onClick={() => go("catalog")}>{t}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Kontak</div>
            {[
              ["📱","WhatsApp","0813-8677-1587"],
              ["📧","Email","info@aquaray.id"],
              ["📍","Lokasi","Jakarta Timur, DKI Jakarta"],
              ["🕐","Jam Buka","Senin–Sabtu 09.00–18.00"],
            ].map(([ic,label,val]) => (
              <div key={label} className="footer-contact-item">
                <span>{ic}</span>
                <div>
                  <div style={{fontSize:11,opacity:0.6,textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</div>
                  <div style={{fontSize:14}}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 {STORE_NAME}. All rights reserved.</div>
          <div className="footer-badges">
            {["✓ Terpercaya","✓ Bersertifikat","✓ Garansi Live"].map(b => (
              <div key={b} className="footer-badge">{b}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGES ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedProduct }) {
  const features = [
    { icon: "🛡️", title: "Garansi Hidup 100%", desc: "Jaminan ikan tiba hidup dan sehat atau penggantian penuh tanpa pertanyaan." },
    { icon: "📦", title: "Packing Profesional", desc: "Double bag + oksigen murni + styrofoam + coolpack untuk keamanan maksimal." },
    { icon: "✈️", title: "Pengiriman Nasional", desc: "Kargo udara ke seluruh Indonesia. Estimasi 1-3 hari kerja setelah pembayaran." },
    { icon: "🏅", title: "Breeder Berpengalaman", desc: "10+ tahun pengalaman breeding ikan pari hias berkualitas premium." },
    { icon: "📋", title: "Sertifikat Kesehatan", desc: "Setiap ikan dilengkapi catatan kesehatan dan riwayat pakan lengkap." },
    { icon: "💬", title: "After-Sales Support", desc: "Konsultasi perawatan gratis seumur hidup untuk semua pembeli setia kami." },
  ];
  return (
    <>
      {/* HERO */}
      <section className="hero">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="hero-bubble" style={{
            width: 20 + Math.random()*60, height: 20 + Math.random()*60,
            left: `${Math.random()*100}%`, animationDuration: `${8+Math.random()*12}s`,
            animationDelay: `${Math.random()*10}s`
          }}/>
        ))}
        <div className="hero-inner">
          <div>
            <div className="hero-badge">⭐ Trusted Seller #1 Indonesia</div>
            <h1 className="hero-title">Koleksi Ikan Pari <em>Hias Premium</em> Terbaik</h1>
            <p className="hero-desc">Temukan keindahan dunia bawah laut di akuarium Anda. Spesialis breeding & penjualan ikan pari hias sejak 2015 — kualitas terjamin, pengiriman aman ke seluruh Indonesia.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => { setPage("catalog"); window.scrollTo(0,0); }}>🐟 Lihat Katalog</button>
              <button className="btn-secondary" onClick={() => openWhatsApp("Halo! Saya mau konsultasi tentang ikan pari. Boleh minta rekomendasinya?")}>💬 Konsultasi Gratis</button>
            </div>
            <div className="hero-stats">
              {[["5.000+","Pelanggan Puas"],["10+","Tahun Pengalaman"],["15.000+","Pengiriman Sukses"],["100%","Garansi Hidup"]].map(([n,l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hero-fish-display">🐟</div>
              <div className="hero-card-badges">
                <span className="badge-trust gold">🏅 Trusted Seller</span>
                <span className="badge-trust blue">✓ Garansi Live 100%</span>
                <span className="badge-trust gold">⭐ 5.000+ Happy Buyers</span>
              </div>
              <div style={{fontSize:14,color:"var(--text-muted)"}}>Koleksi ikan pari hias premium siap kirim ke seluruh Indonesia</div>
            </div>
            <div className="hero-float-card hero-float-1">
              <div className="float-icon green">✅</div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--navy)"}}>Pengiriman Aman</div>
                <div style={{fontSize:11,color:"var(--text-muted)"}}>15.000+ paket terkirim</div>
              </div>
            </div>
            <div className="hero-float-card hero-float-2">
              <div className="float-icon blue">⭐</div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"var(--navy)"}}>Rating 4.9/5</div>
                <div style={{fontSize:11,color:"var(--text-muted)"}}>Dari 5.000+ ulasan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-strip-inner">
          {[["🛡️","Garansi Hidup","100% Live Arrival"],["📦","Packing Premium","Double Bag + O₂"],["✈️","Pengiriman Cepat","Seluruh Indonesia"],["🏅","Berpengalaman","Sejak 2015"],["💬","CS Responsif","Fast Response 24/7"]].map(([ic,l,v]) => (
            <div key={l} className="trust-item">
              <span className="trust-icon">{ic}</span>
              <div>
                <div className="trust-text-label">{l}</div>
                <div className="trust-text-val">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">Koleksi Pilihan</div>
            <h2 className="section-title">Produk Unggulan</h2>
            <p className="section-sub">Koleksi ikan pari hias terbaik pilihan para kolektor dan pecinta ikan hias premium.</p>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} onDetail={() => { setSelectedProduct(p); setPage("detail"); window.scrollTo(0,0); }} />
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:40}}>
            <button className="btn-primary" onClick={() => { setPage("catalog"); window.scrollTo(0,0); }}>Lihat Semua Produk →</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{background:"var(--off-white)"}}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Mengapa Kami?</div>
            <h2 className="section-title">Keunggulan AquaRay Premium</h2>
            <p className="section-sub">Dipercaya ribuan kolektor di seluruh Indonesia dengan standar kualitas tertinggi.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-bg">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Testimoni Pelanggan</div>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-sub">Ribuan pelanggan telah mempercayakan kebutuhan ikan pari mereka kepada kami.</p>
          </div>
          <div className="testi-grid">
            {testimonials.map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">{"⭐".repeat(t.rating)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-city">{t.city}</div>
                    <div className="testi-date">{t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{padding:"60px 24px",background:"linear-gradient(135deg, var(--navy), #0A5490)"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center",color:"white"}}>
          <div style={{fontSize:14,fontWeight:600,color:"var(--gold-light)",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Siap Memulai?</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,marginBottom:16}}>Temukan Ikan Pari Impian Anda</h2>
          <p style={{opacity:0.8,fontSize:16,marginBottom:32,lineHeight:1.7}}>Konsultasikan kebutuhan Anda dengan tim ahli kami. Kami siap membantu memilihkan ikan pari yang tepat untuk koleksi Anda.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-primary" style={{background:"white",color:"var(--navy)"}} onClick={() => { setPage("catalog"); window.scrollTo(0,0); }}>🐟 Lihat Katalog</button>
            <button className="btn-secondary" style={{background:"transparent",color:"white",borderColor:"rgba(255,255,255,0.4)"}} onClick={() => openWhatsApp("Halo! Saya mau konsultasi ikan pari. Bisa bantu rekomendasikan?")}>💬 Chat WhatsApp</button>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product: p, onDetail }) {
  const badgeClass = { "Best Seller": "badge-best", "Limited": "badge-limited", "Premium": "badge-premium", "New Arrival": "badge-new" };
  return (
    <div className="product-card" onClick={onDetail}>
      <div className="card-img">
        <span>{p.emoji}</span>
        {p.badge && <span className={`card-badge ${badgeClass[p.badge] || "badge-best"}`}>{p.badge}</span>}
        <span className="card-stock">Stok: {p.stock}</span>
      </div>
      <div className="card-body">
        <div className="card-name">{p.name}</div>
        <div className="card-specs">
          <span className="card-spec">{p.size}</span>
          <span className="card-spec">{p.gender}</span>
          <span className="card-spec">{p.origin}</span>
        </div>
        <div className="card-price">{p.priceLabel} <span>/ ekor</span></div>
        <button className="card-btn">Lihat Detail →</button>
      </div>
    </div>
  );
}

function CatalogPage({ setPage, setSelectedProduct }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [sort, setSort] = useState("default");
  const types = ["Semua", ...new Set(products.map(p => p.type))];
  let filtered = products.filter(p => {
    const matchType = filterType === "Semua" || p.type === filterType;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });
  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Koleksi Lengkap</div>
          <h1 className="section-title" style={{textAlign:"center"}}>Katalog Ikan Pari Hias</h1>
          <p style={{color:"var(--text-muted)",fontSize:16,textAlign:"center"}}>{products.length} jenis ikan pari hias premium siap kirim ke seluruh Indonesia</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="filter-bar">
            <input className="filter-search" placeholder="🔍 Cari jenis ikan pari..." value={search} onChange={e => setSearch(e.target.value)} />
            {types.map(t => <button key={t} className={`filter-chip${filterType === t ? " active" : ""}`} onClick={() => setFilterType(t)}>{t}</button>)}
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Urutkan</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="name">Nama A–Z</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <div className="empty-state-text">Tidak ada produk yang cocok dengan pencarian Anda</div>
              <button className="btn-secondary" style={{margin:"20px auto",display:"flex"}} onClick={() => { setSearch(""); setFilterType("Semua"); }}>Reset Filter</button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onDetail={() => { setSelectedProduct(p); setPage("detail"); window.scrollTo(0,0); }} />
              ))}
            </div>
          )}
          <div style={{marginTop:48,padding:"28px 32px",background:"linear-gradient(135deg,#EAF4FB,#DDEEF8)",borderRadius:20,border:"1px solid var(--border)",display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{fontSize:32}}>💬</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"var(--navy)",marginBottom:4}}>Tidak menemukan yang Anda cari?</div>
              <div style={{fontSize:14,color:"var(--text-muted)"}}>Kami memiliki koleksi lebih banyak! Chat kami untuk melihat stok terbaru dan request jenis pari tertentu.</div>
            </div>
            <button className="btn-primary" onClick={() => openWhatsApp("Halo! Saya mencari ikan pari jenis tertentu yang tidak ada di katalog. Bisa bantu?")}>Chat Sekarang</button>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailPage({ product: p, setPage }) {
  const [openFaq, setOpenFaq] = useState(null);
  if (!p) return null;
  const simpleFaqs = faqs.slice(0, 3);
  return (
    <section className="section" style={{paddingTop:100}}>
      <div className="section-inner">
        <div className="breadcrumb">
          <span onClick={() => { setPage("home"); window.scrollTo(0,0); }}>Beranda</span>
          <span className="sep">›</span>
          <span onClick={() => { setPage("catalog"); window.scrollTo(0,0); }}>Katalog</span>
          <span className="sep">›</span>
          <span style={{color:"var(--navy)",fontWeight:500}}>{p.name}</span>
        </div>
        <div className="detail-layout">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="detail-main-img">{p.emoji}</div>
            <div className="detail-thumbs">
              {[p.emoji, "🌊", "💧", "🐠"].map((e, i) => (
                <div key={i} className={`detail-thumb${i === 0 ? " active" : ""}`}>{e}</div>
              ))}
            </div>
            <div className="guarantee-box" style={{marginTop:20}}>
              <span className="guarantee-icon">🛡️</span>
              <div className="guarantee-text"><strong>Garansi Hidup 100%</strong> — Ikan tiba sehat atau kami ganti/refund penuh</div>
            </div>
          </div>
          {/* Info */}
          <div className="detail-info">
            <div className="detail-badges">
              {p.badge && <span className={`card-badge ${p.badge === "Best Seller" ? "badge-best" : p.badge === "Limited" ? "badge-limited" : "badge-premium"}`} style={{position:"static"}}>{p.badge}</span>}
              <span className="badge-trust blue">✓ Captive Bred</span>
              <span className="badge-trust gold">🏅 Grade A</span>
            </div>
            <h1 className="detail-title">{p.name}</h1>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              {"⭐".repeat(5)}
              <span style={{fontSize:14,color:"var(--text-muted)"}}>(4.9 · 127 ulasan)</span>
            </div>
            <div className="detail-price-block">
              <div>
                <div className="detail-price">{p.priceLabel}</div>
                <div className="detail-price-per">per ekor · Stok: {p.stock} ekor tersedia</div>
              </div>
            </div>
            <div className="detail-spec-grid">
              {[["📏","Ukuran",p.size],["⏰","Umur",p.age],["♂️","Jenis Kelamin",p.gender],["🌍","Asal",p.origin],["🔬","Jenis",p.type],["📦","Kondisi","Sehat, Aktif"]].map(([ic,l,v]) => (
                <div key={l} className="detail-spec-item">
                  <div className="detail-spec-label">{ic} {l}</div>
                  <div className="detail-spec-val">{v}</div>
                </div>
              ))}
            </div>
            <p className="detail-desc">{p.desc}</p>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:600,color:"var(--navy)",marginBottom:10}}>✨ Keunggulan Produk</div>
              <ul className="detail-highlights">
                {p.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
            </div>
            <div style={{fontSize:14,fontWeight:600,color:"var(--navy)",marginBottom:10}}>🌡️ Persyaratan Akuarium</div>
            <div className="detail-req-grid">
              <div className="detail-req"><div className="detail-req-icon">🌡️</div><div className="detail-req-label">Suhu</div><div className="detail-req-val">{p.specs.suhu}</div></div>
              <div className="detail-req"><div className="detail-req-icon">🧪</div><div className="detail-req-label">pH Air</div><div className="detail-req-val">{p.specs.pH}</div></div>
              <div className="detail-req"><div className="detail-req-icon">🐠</div><div className="detail-req-label">Akuarium</div><div className="detail-req-val">{p.specs.akuarium}</div></div>
            </div>
            <button className="btn-wa" onClick={() => openWhatsApp(orderMsg(p))}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.173.58 4.208 1.589 5.963L0 24l6.232-1.563A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.96 0-3.79-.516-5.378-1.418l-.386-.228-4.003 1.004 1.03-3.9-.25-.4A9.801 9.801 0 012.18 12C2.18 6.564 6.564 2.18 12 2.18S21.82 6.564 21.82 12 17.436 21.82 12 21.82z"/></svg>
              Pesan via WhatsApp Sekarang
            </button>
            <button className="btn-inquiry" onClick={() => openWhatsApp(`Halo! Saya ingin tanya-tanya dulu tentang ${p.name}. Boleh minta info lebih lanjut?`)}>
              💬 Tanya Dulu Sebelum Beli
            </button>
          </div>
        </div>

        {/* Mini FAQ */}
        <div style={{marginTop:64}}>
          <div className="section-header">
            <div className="section-label">Pertanyaan Umum</div>
            <h2 className="section-title">FAQ Singkat</h2>
          </div>
          <div className="faq-list">
            {simpleFaqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className={`faq-arrow${openFaq === i ? " open" : ""}`}>⌄</span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const milestones = [
    { year: "2015", title: "Awal Perjalanan", desc: "Dimulai dari hobi kecil memelihara ikan pari di akuarium rumah di Jakarta Timur." },
    { year: "2017", title: "Pertama Ekspansi", desc: "Mulai melakukan breeding profesional dan menjual ke sesama kolektor lokal." },
    { year: "2019", title: "Go Online", desc: "Membuka toko online dan mulai melayani pengiriman ke luar Jakarta." },
    { year: "2021", title: "1000+ Pelanggan", desc: "Mencapai milestone 1.000 pelanggan dengan reputasi 5 bintang." },
    { year: "2023", title: "Ekspansi Nasional", desc: "Memperluas jaringan pengiriman ke seluruh Indonesia termasuk Papua & Kalimantan." },
    { year: "2025", title: "5000+ Pelanggan", desc: "Kini dipercaya lebih dari 5.000 kolektor dan pecinta ikan pari di seluruh Indonesia." },
  ];
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Cerita Kami</div>
          <h1 className="section-title" style={{textAlign:"center"}}>Tentang AquaRay Premium</h1>
          <p style={{color:"var(--text-muted)",fontSize:16,textAlign:"center"}}>10 tahun dedikasi untuk ikan pari hias berkualitas premium</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img-block">
              <div className="about-img-main">🐟</div>
              <div className="about-img-float">
                <div className="about-float-num">10+</div>
                <div className="about-float-label">Tahun Pengalaman</div>
              </div>
            </div>
            <div>
              <div className="section-label">Siapa Kami</div>
              <h2 className="section-title">Spesialis Ikan Pari Hias Terpercaya</h2>
              <p style={{color:"var(--text-muted)",fontSize:15,lineHeight:1.8,marginBottom:16}}>AquaRay Premium lahir dari kecintaan mendalam terhadap keindahan ikan pari air tawar. Berawal dari hobi kecil di tahun 2015, kini kami telah berkembang menjadi salah satu penjual dan breeder ikan pari hias paling terpercaya di Indonesia.</p>
              <p style={{color:"var(--text-muted)",fontSize:15,lineHeight:1.8}}>Kami bangga telah melayani lebih dari 5.000 pelanggan setia dari Sabang sampai Merauke. Setiap ikan yang kami jual adalah hasil breeding sendiri dengan standar kualitas tertinggi — sehat, aktif, dan beradaptasi dengan baik sebelum dikirim.</p>
              <div className="value-cards">
                {[["🎯","Misi Kami","Menjadi jembatan terbaik antara keindahan ikan pari dengan para pecintanya di seluruh Indonesia."],["❤️","Nilai Kami","Integritas, kualitas, dan kepuasan pelanggan adalah fondasi utama bisnis kami."],["🌱","Komitmen","Breeding bertanggung jawab, tidak mengambil dari alam, 100% captive bred."],["🏆","Prestasi","5.000+ pelanggan, 15.000+ pengiriman sukses, rating 4.9/5 bintang."]].map(([ic,t,d]) => (
                  <div key={t} className="value-card">
                    <div className="value-icon">{ic}</div>
                    <div className="value-title">{t}</div>
                    <div className="value-desc">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--off-white)"}}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Perjalanan Kami</div>
            <h2 className="section-title">Milestone 2015–2025</h2>
          </div>
          <div className="milestone-list" style={{maxWidth:700,margin:"0 auto"}}>
            {milestones.map(m => (
              <div key={m.year} className="milestone-item">
                <div className="milestone-year">{m.year}</div>
                <div className="milestone-text"><strong>{m.title}</strong><br/>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-label">Fasilitas Kami</div>
            <h2 className="section-title">Breeding & Fasilitas Profesional</h2>
            <p className="section-sub">Kolam dan akuarium khusus dengan sistem filtrasi premium untuk menghasilkan ikan pari berkualitas terbaik.</p>
          </div>
          <div className="features-grid">
            {[["🏊","Kolam Breeding","12 kolam breeding terpisah sesuai jenis dan ukuran ikan."],["🌡️","Kontrol Suhu","Sistem pemanas otomatis untuk menjaga suhu ideal 26–30°C."],["🔬","Lab Kualitas Air","Pengecekan pH, amonia, dan nitrit rutin setiap hari."],["📦","Area Packing","Ruang packing steril dengan double bag + oksigen murni."]].map(f => (
              <div key={f[1]} className="feature-card">
                <div className="feature-icon">{f[0]}</div>
                <div className="feature-title">{f[1]}</div>
                <div className="feature-desc">{f[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const packSteps = [
    { num: 1, icon: "🧪", title: "Karantina", desc: "Ikan dikarantina 5–7 hari untuk memastikan kondisi prima sebelum kirim." },
    { num: 2, icon: "💧", title: "Puasa Makan", desc: "Ikan dipuasakan 24 jam sebelum packing untuk mengurangi kotoran selama perjalanan." },
    { num: 3, icon: "🫧", title: "Double Bag", desc: "Dikemas dalam double bag khusus dengan oksigen murni dan anti-stress agent." },
    { num: 4, icon: "📦", title: "Styrofoam", desc: "Dimasukkan dalam box styrofoam tebal dengan coolpack untuk menjaga suhu." },
    { num: 5, icon: "✈️", title: "Kargo Udara", desc: "Dikirim via kargo udara untuk pengiriman luar Jawa, lebih cepat dan aman." },
    { num: 6, icon: "📸", title: "Dokumentasi", desc: "Video packing lengkap dikirimkan ke pembeli sebagai bukti kondisi ikan saat kirim." },
  ];
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="section-label">Hubungi Kami</div>
          <h1 className="section-title" style={{textAlign:"center"}}>Kontak & Informasi</h1>
          <p style={{color:"var(--text-muted)",fontSize:16,textAlign:"center"}}>Siap membantu Anda 6 hari seminggu</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <div className="section-label">Info Kontak</div>
              <h2 className="section-title">Hubungi Kami</h2>
              <p style={{color:"var(--text-muted)",fontSize:15,marginBottom:28,lineHeight:1.7}}>Tim kami siap membantu menjawab pertanyaan dan memandu proses pembelian Anda.</p>
              <div className="contact-card">
                {[
                  ["📱","WhatsApp (Utama)","0813-8677-1587","Fast response, 09.00–18.00"],
                  ["📧","Email","info@aquaray.id","Balasan maks. 1×24 jam"],
                  ["📍","Lokasi","Jakarta Timur, DKI Jakarta","Kunjungan dengan perjanjian"],
                  ["📸","Instagram","@aquaray.premium","Follow untuk update stok"],
                ].map(([ic,l,v,sub]) => (
                  <div key={l} className="contact-item">
                    <div className="contact-icon-wrap">{ic}</div>
                    <div>
                      <div className="contact-label">{l}</div>
                      <div className="contact-val">{v}</div>
                      <div className="contact-val-sub">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-card">
                <div style={{fontSize:15,fontWeight:600,color:"var(--navy)",marginBottom:16}}>🕐 Jam Operasional</div>
                <div className="hours-grid">
                  {[["Senin","09.00–18.00"],["Selasa","09.00–18.00"],["Rabu","09.00–18.00"],["Kamis","09.00–18.00"],["Jumat","09.00–17.00"],["Sabtu","09.00–15.00"],["Minggu","Tutup"],["Hari Raya","Tutup"]].map(([d,t]) => (
                    <div key={d} className="hours-item">
                      <span className="hours-day">{d}</span>
                      <span className={t === "Tutup" ? "hours-closed" : "hours-time"}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-wa" onClick={() => openWhatsApp("Halo AquaRay Premium! Saya ingin bertanya tentang produk ikan pari Anda.")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.173.58 4.208 1.589 5.963L0 24l6.232-1.563A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.96 0-3.79-.516-5.378-1.418l-.386-.228-4.003 1.004 1.03-3.9-.25-.4A9.801 9.801 0 012.18 12C2.18 6.564 6.564 2.18 12 2.18S21.82 6.564 21.82 12 17.436 21.82 12 21.82z"/></svg>
                Chat WhatsApp Sekarang
              </button>
            </div>

            <div>
              {/* Packing Guide */}
              <div className="section-label">Proses Pengiriman</div>
              <h2 className="section-title" style={{fontSize:"clamp(26px,3vw,36px)",marginBottom:8}}>Panduan Pengiriman Ikan Hidup</h2>
              <p style={{color:"var(--text-muted)",fontSize:14,marginBottom:24,lineHeight:1.7}}>Kami menggunakan prosedur pengiriman yang telah teruji untuk memastikan ikan tiba dalam kondisi prima.</p>
              <div className="pack-steps">
                {packSteps.map(s => (
                  <div key={s.num} className="pack-step">
                    <div className="pack-step-num">{s.num}</div>
                    <div className="pack-step-icon">{s.icon}</div>
                    <div className="pack-step-title">{s.title}</div>
                    <div className="pack-step-desc">{s.desc}</div>
                  </div>
                ))}
              </div>

              {/* Testimonials mini */}
              <div style={{marginTop:40}}>
                <div className="section-label">Testimoni</div>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"var(--navy)",marginBottom:20}}>Pengiriman Sukses</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {testimonials.slice(0,2).map(t => (
                    <div key={t.name} className="testi-card">
                      <div className="testi-stars" style={{marginBottom:8}}>{"⭐".repeat(t.rating)}</div>
                      <p className="testi-text">"{t.text}"</p>
                      <div className="testi-author">
                        <div className="testi-avatar">{t.avatar}</div>
                        <div>
                          <div className="testi-name">{t.name} — {t.city}</div>
                          <div className="testi-date">{t.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{marginTop:64}}>
            <div className="section-header center">
              <div className="section-label">Pertanyaan Umum</div>
              <h2 className="section-title">FAQ Lengkap</h2>
              <p className="section-sub">Temukan jawaban atas pertanyaan yang sering diajukan pelanggan kami.</p>
            </div>
            <div className="faq-list" style={{maxWidth:800,margin:"0 auto"}}>
              {faqs.map((f, i) => (
                <div key={i} className="faq-item">
                  <div className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}
                    <span className={`faq-arrow${openFaq === i ? " open" : ""}`}>⌄</span>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [page]);

  return (
    <>
      <style>{style}</style>
      <Navbar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main style={{paddingTop: page === "home" ? 0 : 0}}>
        {page === "home" && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
        {page === "catalog" && <CatalogPage setPage={setPage} setSelectedProduct={setSelectedProduct} />}
        {page === "detail" && <DetailPage product={selectedProduct} setPage={setPage} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer setPage={setPage} />
      <WAButton />
    </>
  );
}
