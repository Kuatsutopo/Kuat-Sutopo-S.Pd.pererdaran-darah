/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Play, 
  BookOpen, 
  Trophy, 
  Navigation,
  Mail,
  Instagram,
  User,
  ArrowRight,
  CircleCheck,
  Zap,
  ArrowDown,
  Info,
  Shield,
  Stethoscope,
  Smile,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Constants & Types ---

const THEME = {
  bg: '#F0F9FF',
  primary: '#EF4444', // Red 500
  secondary: '#3B82F6', // Blue 500
  accent: '#FACC15', // Yellow 400
  slate: {
    500: '#64748B',
    800: '#1E293B',
    900: '#0F172A'
  }
};

type BloodParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  type: 'red' | 'white';
};

// --- Sub-components ---

const BloodBackground = () => {
  const [particles, setParticles] = useState<BloodParticle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      type: Math.random() > 0.8 ? 'white' : 'red' as const,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.type === 'red' ? 'bg-red-500' : 'bg-blue-100 shadow-inner'}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, -1000],
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const SectionTitle = ({ title, subtitle, variant = 'red' }: { title: string, subtitle: string, variant?: 'red' | 'blue' | 'yellow' }) => {
  const colorMap = {
    red: 'text-red-600 border-red-500',
    blue: 'text-blue-600 border-blue-500',
    yellow: 'text-yellow-600 border-yellow-500'
  };

  return (
    <div className="mb-12">
      <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 ${colorMap[variant].split(' ')[0]}`}>
        {title}
      </h2>
      <div className={`h-2 w-24 border-b-4 ${colorMap[variant].split(' ')[1]} mb-4`} />
      <p className="text-slate-500 font-bold text-lg">{subtitle}</p>
    </div>
  );
};

const MicroLearningCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className={`bg-white p-6 rounded-[30px] border-2 shadow-sm transition-all flex flex-col gap-3 ${color === 'red' ? 'border-red-200' : color === 'blue' ? 'border-blue-200' : 'border-yellow-200'}`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-2xl ${color === 'red' ? 'bg-red-100 text-red-600' : color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
        <Icon size={24} />
      </div>
      <h3 className={`font-black uppercase tracking-wide ${color === 'red' ? 'text-red-600' : color === 'blue' ? 'text-blue-600' : 'text-yellow-600'}`}>
        {title}
      </h3>
    </div>
    <p className="text-sm font-medium text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const DetailCard = ({ title, content, icon: Icon, color }: { title: string, content: string[], icon: any, color: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-3xl border-2 transition-all overflow-hidden ${isOpen ? 'shadow-xl' : 'shadow-sm'} ${color === 'red' ? 'border-red-100' : 'border-blue-100'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
            <Icon size={20} />
          </div>
          <span className="text-lg font-black text-slate-800">{title}</span>
        </div>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <ul className="space-y-3">
              {content.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm leading-relaxed">
                  <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-red-200 scroll-smooth bg-[#F0F9FF]">
      <BloodBackground />
      
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-red-500 shadow-sm px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-pulse">
              ❤️
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-red-600 leading-none">PETUALANGAN DARAH</h1>
              <p className="text-[10px] md:text-sm font-bold text-slate-500 hidden sm:block">SDN 1 Tinggarjaya • Bersama Pak Kuat Sutopo</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { name: 'MATERI', color: 'bg-blue-500 text-white', id: 'materi' },
              { name: 'VIDEO', color: 'bg-white border-2 border-blue-100 text-blue-600', id: 'video-player' },
              { name: 'KUIS', color: 'bg-white border-2 border-blue-100 text-blue-600', id: 'kuis' },
              { name: 'SKOR', color: 'bg-white border-2 border-blue-100 text-blue-600', id: 'skor' }
            ].map((nav) => (
              <a 
                key={nav.name}
                href={`#${nav.id}`}
                className={`px-3 md:px-5 py-2 rounded-2xl font-black text-[10px] md:text-xs tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center ${nav.color}`}
              >
                {nav.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 md:px-8 py-12 md:py-20 bg-gradient-to-r from-red-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
              Halo Anak Hebat! 👋<br />
              <span className="text-red-500 uppercase">Siap Menjelajah Tubuhmu?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-bold mb-8 italic">
              "Darah kita seperti kurir pahlawan yang mengantar oksigen ke seluruh pelosok tubuh. Yuk, pelajari rahasia jantungmu!"
            </p>
            <motion.a 
              href="#materi"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-red-500 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-[0_8px_0_#b91c1c] hover:shadow-[0_4px_0_#b91c1c] active:translate-y-2 active:shadow-none transition-all"
            >
              Mulai Petualangan! <ArrowDown size={24} />
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            className="bg-white p-6 rounded-[40px] shadow-2xl border-4 border-yellow-400 relative"
          >
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-8xl mb-4 grayscale-[0.2] drop-shadow-lg">👨‍🏫</div>
              <div className="bg-yellow-400 px-6 py-2 rounded-xl text-slate-900 font-black text-lg">
                PAK KUAT SUTOPO, S.Pd.
              </div>
              <p className="text-slate-500 font-bold mt-4 italic text-sm">Gurumu di SDN 1 Tinggarjaya</p>
            </div>
            
            {/* Small floating hearts */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-4xl"
            >❤️</motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Material Grid */}
      <main id="materi" className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Col: Micro-learning */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <SectionTitle 
            title="Sistem Inti" 
            subtitle="Mengenal 3 pahlawan utama kita" 
          />
          
          <MicroLearningCard 
            icon={Heart}
            title="Si Mesin Jantung"
            desc="Pompa ajaib seukuran kepalan tanganmu yang memompa darah 100.000 kali setiap hari!"
            color="red"
          />
          <MicroLearningCard 
            icon={Activity}
            title="Jalan Tol Darah"
            desc="Arteri (mengantar sari makanan) dan Vena (membawa sisa sampah tubuh)."
            color="blue"
          />
          <MicroLearningCard 
            icon={Droplets}
            title="Pasukan Sel"
            desc="Sel Merah si pengantar oksigen, Sel Putih si penjaga imun, dan Trombosit si penambal luka."
            color="yellow"
          />
          <MicroLearningCard 
            icon={Shield}
            title="Plasma Darah"
            desc="Cairan kuning yang membawa protein dan nutrisi ke seluruh sel-sel tubuhmu."
            color="blue"
          />
          <MicroLearningCard 
            icon={Info}
            title="Paru-paru"
            desc="Tempat pertukaran oksigen dan karbon dioksida. Sahabat sejati sistem darah!"
            color="red"
          />

          {/* Quick Fact Box */}
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden mt-6">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Info size={100} />
            </div>
            <h4 className="font-black text-yellow-400 mb-4 flex items-center gap-2">
              <Zap size={20} /> TAHUKAH KAMU?
            </h4>
            <p className="text-sm font-medium leading-relaxed italic">
              "Jika seluruh pembuluh darahmu direntangkan, panjangnya bisa mencapai 100.000 km—bisa mengelilingi Bumi dua kali!"
            </p>
          </div>
        </div>

        {/* Right Col: Deep Content & Visualization */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-[40px] border-4 border-dashed border-slate-200 p-8 md:p-12 shadow-inner relative">
            <SectionTitle 
              title="Alur Perjalanan" 
              subtitle="Langkah demi langkah sirkulasi" 
              variant="blue"
            />

            {/* Path Visualization SVG */}
            <div className="mb-12 flex justify-center">
              <svg width="240" height="240" viewBox="0 0 240 240" className="opacity-80">
                <motion.circle 
                  cx="120" cy="120" r="100" 
                  fill="none" stroke="#E2E8F0" strokeWidth="12" strokeDasharray="20 10" 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle 
                  cx="120" cy="120" r="100" 
                  fill="none" stroke="#EF4444" strokeWidth="12" strokeDasharray="50 150"
                  animate={{ strokeDashoffset: [0, -200] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M120 40 L120 200 M40 120 L200 120" 
                  stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" 
                />
                <circle cx="120" cy="120" r="40" fill="#EF4444" className="animate-pulse" />
                <text x="120" y="125" textAnchor="middle" fill="white" className="font-black text-xs">JANTUNG</text>
              </svg>
            </div>

            <div className="space-y-8 mb-16">
              <DetailCard 
                icon={Heart}
                title="Bagian Jantung Kita"
                color="red"
                content={[
                  "Serambi Kanan: Menerima darah kotor dari tubuh.",
                  "Bilik Kanan: Memompa darah kotor ke paru-paru.",
                  "Serambi Kiri: Menerima darah bersih dari paru-paru.",
                  "Bilik Kiri: Memompa darah bersih ke seluruh tubuh! (Paling Kuat!)"
                ]}
              />
              <DetailCard 
                icon={Droplets}
                title="Apa Saja Yang Ada di Darah?"
                color="blue"
                content={[
                  "Sel Darah Merah (Eritrosit): Mengikat oksigen & hemoglobin.",
                  "Sel Darah Putih (Leukosit): Pasukan tempur melawan kuman.",
                  "Keping Darah (Trombosit): Membantu menutup luka.",
                  "Plasma Darah: Cairan kuning pengangkut nutrisi."
                ]}
              />
            </div>

            <h3 className="text-center font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Visual Sirkulasi</h3>
            <div className="space-y-12 mb-12">
              {/* Process Step 1 */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-black text-2xl text-blue-600 border-4 border-blue-400 shrink-0">01</div>
                <div className="bg-blue-50 p-6 rounded-3xl flex-grow border-2 border-blue-100 shadow-sm">
                  <p className="text-lg font-black text-blue-800 mb-1">PEREDARAN DARAH KECIL</p>
                  <p className="text-sm font-bold text-blue-600">Jantung (Bilik Kanan) → Paru-paru → Jantung (Serambi Kiri)</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-blue-400">
                    <Shield size={14} /> FUNGSI: Membersihkan Karbondioksida (Udara Kotor)
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              <div className="h-10 border-l-4 border-dashed border-slate-200 ml-8" />

              {/* Process Step 2 */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center font-black text-2xl text-red-600 border-4 border-red-400 shrink-0">02</div>
                <div className="bg-red-50 p-6 rounded-3xl flex-grow border-2 border-red-100 shadow-sm">
                  <p className="text-lg font-black text-red-800 mb-1">PEREDARAN DARAH BESAR</p>
                  <p className="text-sm font-bold text-red-600">Jantung (Bilik Kiri) → Seluruh Tubuh → Jantung (Serambi Kanan)</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-red-400">
                    <Zap size={14} /> FUNGSI: Mengantar Oksigen ke Otak & Seluruh Otot
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player Section */}
            <div id="video-player" className="mt-16 pt-8 border-t-4 border-dashed border-slate-100">
              <h3 className="text-2xl font-black text-red-600 uppercase mb-6 flex items-center gap-3">
                <Play size={24} fill="#EF4444" /> VIDEO PEMBELAJARAN
              </h3>
              <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-900 group relative">
                <iframe 
                  src="https://drive.google.com/file/d/1sd8XW5YVqO6s4lDw6zt33fZFnz2Ac8oC/preview" 
                  width="100%" 
                  height="100%" 
                  allow="autoplay"
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="mt-4 text-center text-sm font-bold text-slate-500 italic">
                Klik tombol "Play" di tengah video untuk mulai menonton, Pak Kuat sudah menyiapkan penjelasan seru! 🎬
              </p>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12 py-8 border-t-4 border-dashed border-slate-100">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#video-player"
                className="bg-red-500 hover:bg-red-600 text-white font-black py-6 rounded-3xl shadow-[0_8px_0_#b91c1c] active:translate-y-2 active:shadow-none flex items-center justify-center gap-4 text-xl transition-all"
              >
                <Play size={32} fill="white" /> <span>TONTON VIDEO</span>
              </motion.a>
              <motion.a 
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
                href="https://wayground.com/join/pre-game/running/U2FsdGVkX1%252FJZZwIQSfGBd5jHQKhzhdfcvjrjbZnweYL5ZXpfI6yBJoFz%252FG%252BD9V4W9p2hTx3wyQ9HmnON%252FznQg%253D%253D/start"
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-6 rounded-3xl shadow-[0_8px_0_#ca8a04] active:translate-y-2 active:shadow-none flex items-center justify-center gap-4 text-xl transition-all"
              >
                <Trophy size={32} /> <span>MAIN KUIS</span>
              </motion.a>
            </div>
          </div>

          {/* Health Tips Section */}
          <section className="mt-12 bg-white rounded-[40px] p-8 md:p-12 shadow-lg border-2 border-slate-100 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30" />
            
            <SectionTitle 
              title="Jaga Jantungmu!" 
              subtitle="Cara agar sirkulasi tetap lancar" 
              variant="yellow"
            />
            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              {[
                { icon: Stethoscope, title: "Makan Sehat", text: "Kurangi lemak jenuh, perbanyak sayur dan buah merah!", color: 'text-red-500' },
                { icon: Activity, title: "Aktif Bergerak", text: "Olahraga 30 menit sehari membuat pompa jantung kuat.", color: 'text-blue-500' },
                { icon: Smile, title: "Istirahat Cukup", text: "Tidur 8-9 jam membantu jantungmu beristirahat.", color: 'text-yellow-500' },
                { icon: Droplets, title: "Minum Air", text: "Air membantu darah tetap lancar mengalir.", color: 'text-blue-400' }
              ].map((tip, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-6 rounded-3xl bg-slate-50 border-2 border-transparent hover:border-yellow-200 transition-all group"
                >
                  <div className={`p-4 rounded-2xl bg-white ${tip.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <tip.icon size={24} />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 text-lg mb-1 uppercase tracking-tight">{tip.title}</h5>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{tip.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Added Gangguan Section */}
            <div className="mt-16 pt-16 border-t-4 border-dashed border-slate-100">
              <h3 className="text-2xl font-black text-red-600 uppercase mb-8 flex items-center gap-3">
                <Activity className="animate-pulse" /> Waspada Gangguan Kesehatan!
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Anemia', info: 'Kurang sel darah merah, bikin lemas & pucat.', icon: '😴' },
                  { name: 'Hipertensi', info: 'Tekanan darah terlalu tinggi, bahaya buat jantung.', icon: '📈' },
                  { name: 'Hipotensi', info: 'Tekanan darah rendah, bisa bikin pusing.', icon: '📉' }
                ].map((item, i) => (
                  <div key={i} className="bg-red-50 p-6 rounded-3xl border-2 border-red-100">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-black text-red-700 uppercase text-xs tracking-widest mb-2">{item.name}</h4>
                    <p className="text-xs font-bold text-red-600/70">{item.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Score Check Placeholder */}
      <section id="skor" className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-white/10 rounded-3xl mb-8">
            <Trophy size={64} className="text-yellow-400" />
          </div>
          <h2 className="text-4xl font-black mb-6 uppercase tracking-wider">CEK SKOR KELAS 5</h2>
          <p className="text-slate-400 font-medium text-lg mb-10 max-w-xl mx-auto italic">
            "Sedang dalam proses sinkronisasi dengan Quizizz. Semangat terus belajarnya!"
          </p>
          <div className="flex justify-center gap-4 opacity-50 pointer-events-none">
            <div className="px-6 py-3 border-2 border-white/20 rounded-xl text-sm font-black italic">RANKING #1</div>
            <div className="px-6 py-3 border-2 border-white/20 rounded-xl text-sm font-black italic">RANKING #2</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white px-4 md:px-8 py-12 border-t-8 border-red-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold">SD</div>
              <span className="text-2xl font-black tracking-tighter">SDN 1 TINGGARJAYA</span>
            </div>
            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">BELAJAR ITU KEREN • 2026 EDITION</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="font-black text-slate-400 text-xs tracking-widest uppercase mb-2">Butuh Bantuan Pak Kuat?</p>
            <div className="flex gap-4">
              {[Mail, Instagram, User].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ scale: 1.1, backgroundColor: '#EF4444' }}
                  href="#" 
                  className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 mt-2 italic">WA: 0812-XXXX-XXXX (Pak Kuat)</p>
          </div>

          <div className="text-center md:text-right">
            <div className="bg-white/5 p-6 rounded-3xl border-l-4 border-red-500">
              <p className="italic text-slate-300 font-medium mb-2 leading-relaxed">
                "Belajar itu seperti aliran darah, harus terus mengalir agar hidup tetap bertenaga!"
              </p>
              <footer className="text-red-500 font-black text-xs">— PAK KUAT SUTOPO</footer>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
