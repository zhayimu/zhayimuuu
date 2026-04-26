/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ArrowRight, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Photo, Category } from './types';
import { PHOTOS } from './data';

function HorizontalScrollRow({ photos, onPhotoClick, direction = 1 }: { photos: Photo[], onPhotoClick: (photo: Photo) => void, direction?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Vertical scroll influences the horizontal offset (parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxX = useTransform(scrollYProgress, [0, 1], [direction * 100, direction * -100]);

  if (photos.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center border border-white/5 bg-white/5 rounded-3xl mx-8">
        <p className="text-white/20 uppercase tracking-widest text-xs">No photos found in this category</p>
      </div>
    );
  }

  // Double the photos for a seamless infinite marquee
  const marqueePhotos = [...photos, ...photos, ...photos];

  return (
    <div ref={containerRef} className="relative group/row overflow-hidden">
      <div className="flex py-4 md:py-8 overflow-hidden pointer-events-none md:pointer-events-auto">
        <motion.div 
          style={{ x: parallaxX }}
          animate={{ 
            x: direction > 0 ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
          }}
          transition={{ 
            duration: 30 + photos.length * 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-4 md:gap-8 flex-nowrap"
        >
          {marqueePhotos.map((photo, idx) => (
            <motion.div 
              key={`${photo.id}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => onPhotoClick(photo)}
              className="flex-shrink-0 w-[75vw] md:w-[450px] aspect-[4/5] md:aspect-[2/3] relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl bg-zinc-900 cursor-pointer pointer-events-auto"
            >
              <img 
                src={photo.url} 
                alt={photo.category}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 scale-0 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const categories: Category[] = ["All", "Weddings", "Official Events", "Convocation"];
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="bg-bento-bg text-white font-sans overflow-x-hidden">
      {/* Lightbox / Full Photo View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.category}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-[-4rem] right-0 md:top-4 md:right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-[-4rem] left-0 right-0 flex flex-col items-center">
                <span className="tag mb-2">View Full Image</span>
                <p className="text-white font-serif italic text-xl">{selectedPhoto.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-8 py-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 text-white font-bold tracking-[4px] text-sm uppercase"
        >
          {/* Logo text updated per user request */}
          zhayimuuu.
        </motion.div>
        
        <div className="flex gap-8 text-[10px] items-center tracking-[3px] uppercase font-bold text-white/60">
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.ibb.co/Y4kPfjZR/Untitled-design-10.png" 
            alt="Hero Background"
            className="w-full h-full object-cover blur-[8px] scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-7xl md:text-[12vw] cinematic-text drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              Capturing <br />
              The <span className="text-white/20">Legacy.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Categories Grid (Interactive) */}
      <section className="section-container bg-zinc-950/20">
        <div className="text-center mb-24">
          <div className="tag">Our Pillars</div>
          <h2 className="text-4xl font-serif italic mb-4">Service Disciplines</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/5 bg-white/5 rounded-[2rem] overflow-hidden">
          {categories.slice(1).map((cat, i) => (
            <motion.div
              key={cat}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="p-10 md:p-14 flex flex-col group cursor-pointer relative bg-zinc-950 border-white/5 border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0"
            >
              <div className="text-stroke text-6xl md:text-7xl font-serif italic absolute top-8 right-8 group-hover:text-white/20 transition-all opacity-30">0{i+1}</div>
              <div className="relative z-10">
                <h4 className="text-3xl font-serif italic mb-6">{cat}</h4>
                <p className="text-bento-text-dim text-sm md:text-base leading-relaxed max-w-[320px]">
                  {cat === "Weddings" && "Capturing the heart of your traditional or modern ceremony with a genuine emotion. I provide full documentation of your special day, delivering high-quality digital visuals that preserve your memories without the need for an overwhelming production crew."}
                  {cat === "Official Events" && "Dignified and professional documentation for galas, inaugurations, and diplomatic events. I provide excellent service to capture key moments and VIPs with precision and a fast turnaround."}
                  {cat === "Convocation" && "Personalized outdoor and on-location sessions for the graduating class. I specialize in capturing your \"last stroll\" around campus and celebratory moments with friends and family. Professionally edited shots that celebrate your milestone in the real world."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Selected Portfolios */}
      <section id="gallery" className="py-32 overflow-hidden bg-black/40">
        <div className="px-8 mb-20">
          <div className="tag">Selected Portfolios</div>
          <h2 className="text-5xl md:text-8xl font-serif italic cinematic-text">The Gallery.</h2>
        </div>

        <div className="space-y-24">
          {categories.slice(1).map((cat, i) => {
            const categoryPhotos = PHOTOS.filter(p => p.category === cat);
            return (
              <div key={cat} className="space-y-6">
                <div className="px-8 flex items-center justify-between">
                  <h3 className="text-2xl md:text-4xl font-serif italic opacity-40">{cat}</h3>
                  <div className="h-[1px] flex-grow mx-8 bg-white/5" />
                </div>
                <HorizontalScrollRow 
                  photos={categoryPhotos} 
                  onPhotoClick={setSelectedPhoto} 
                  direction={i % 2 === 0 ? 1 : -1} 
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-20 border-y border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-4xl md:text-6xl font-serif italic mb-2">200+</p>
            <p className="tag">Events Captured</p>
          </div>
          <div>
            <p className="text-4xl md:text-6xl font-serif italic mb-2">10k+</p>
            <p className="tag">Portraits Delivered</p>
          </div>
          <div>
            <p className="text-4xl md:text-6xl font-serif italic mb-2">100%</p>
            <p className="tag">Milestone Success</p>
          </div>
        </div>
      </section>

      {/* Intro / Manifesto */}
      <section id="about" className="section-container relative">
        <div className="absolute top-0 right-0 w-1/3 aspect-square bg-white/[0.02] rounded-full blur-3xl opacity-20" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] order-2 lg:order-1"
          >
            <img 
              src="https://i.ibb.co/R436ZH2B/IMG-7734-2.jpg" 
              alt="Zaim - Photographer"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <div className="tag mb-8">Personal</div>
            <h2 className="text-5xl md:text-7xl cinematic-text mb-12">
              About <br />
              <span className="text-white/20">Me.</span>
            </h2>
            <div className="space-y-6 text-bento-text-dim text-lg md:text-xl leading-relaxed font-light">
              <p>
                Hi, I’m Zaim, a freelance photographer and videographer based in Kuala Lumpur. Currently, I’m pursuing my Bachelor’s in Information Technology at the International Islamic University Malaysia (IIUM).
              </p>
              <p>
                My background in IT gives me a unique perspective on the digital arts—I don’t just capture images; I understand the technical precision behind high-quality digital production. Whether I’m documenting a university event or shooting a cinematic brand video, I focus on telling a story that is both visually stunning and technically polished.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Big Contact Footer */}
      <footer id="contact" className="py-60 px-8 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02]">
           <span className="text-[30vw] font-serif italic select-none">Contact.</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-[10vw] font-serif italic leading-[0.8] mb-12">
              Let's craft <br />
              <span className="text-white/20">your legacy.</span>
            </h2>
            
            <div className="flex flex-col items-center gap-16 mt-24">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/601161992639"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-12 py-8 bg-white text-black rounded-full font-bold tracking-[3px] uppercase text-sm flex items-center gap-4 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden"
              >
                <MessageCircle className="w-5 h-5 fill-black" />
                <span>WhatsApp Me</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform group-hover:translate-x-[100%] duration-1000" />
              </motion.a>

              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 pt-24 border-t border-white/10 text-bento-text-dim text-[10px] tracking-[2px] uppercase font-bold">
                <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                  <span>Location</span>
                  <span className="text-white">Kuala Lumpur, Malaysia</span>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <span>Follow Us</span>
                  <div className="flex gap-6 text-white/40">
                    <a href="https://www.instagram.com/zhayimuuu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                    <a href="https://www.linkedin.com/in/zaimmudin-zaidi-44b680284/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
                  <span>Email</span>
                  <a href="mailto:zaimzaidi04@gmail.com" className="text-white hover:opacity-75 transition-opacity">zaimzaidi04@gmail.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
}
