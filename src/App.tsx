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
import { Photo, Category } from './types';
import { PHOTOS } from './data';

function HorizontalScrollRow({ photos, reverse = false }: { photos: Photo[], reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    reverse ? ["0%", "-30%"] : ["-30%", "0%"]
  );

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/row">
      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-4 z-20 flex items-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 z-20 flex items-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex gap-8 py-4 px-4 overflow-x-auto no-scrollbar mask-fade-edges"
      >
        <motion.div 
          style={{ x }}
          className="flex gap-4 md:gap-8 active:cursor-grabbing"
        >
          {photos.map((photo) => (
            <div 
              key={photo.id}
              className="flex-shrink-0 w-[280px] md:w-[400px] aspect-[2/3] relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl bg-zinc-900"
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <p className="text-white text-lg font-serif italic mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.title}</p>
                <p className="text-white/60 text-[10px] tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{photo.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const categories: Category[] = ["All", "Weddings", "Official Events", "Convocation"];

  return (
    <div className="bg-bento-bg text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-8 py-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4"
        >
          <img src="https://static.ais-web.apps.googleusercontent.com/ai-studio/6451a547-5d07-4e00-9286-348f95c4749f.png" alt="Zhayimuuu Logo" className="w-12 h-12 invert" />
        </motion.div>
        
        <div className="flex gap-8 text-[10px] items-center tracking-[3px] uppercase font-bold text-white/60">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2069" 
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-7xl md:text-[12vw] cinematic-text">
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
            <span className="text-[10px] tracking-[5px] uppercase font-bold text-white/40">Scroll to Explore</span>
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
              className="p-12 h-[500px] flex flex-col justify-between group cursor-pointer relative bg-zinc-950 border-white/5 border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0"
            >
              <div className="text-stroke text-7xl font-serif italic absolute top-8 right-8 group-hover:text-white/20 transition-all opacity-50">0{i+1}</div>
              <div className="relative z-10">
                <h4 className="text-3xl font-serif italic mb-6">{cat}</h4>
                <p className="text-bento-text-dim text-sm leading-relaxed max-w-[280px]">
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
      <section id="work" className="py-32 overflow-hidden bg-black/40">
        <div className="px-8 mb-20">
          <div className="tag">Selected Portfolios</div>
          <h2 className="text-5xl md:text-8xl font-serif italic cinematic-text">The Work.</h2>
        </div>

        <div className="space-y-24">
          {categories.slice(1).map((cat, i) => {
            const categoryPhotos = PHOTOS.filter(p => p.category === cat);
            return (
              <div key={cat} className="space-y-6">
                <div className="px-8 flex items-center justify-between">
                  <h3 className="text-2xl md:text-4xl font-serif italic opacity-40">{cat}</h3>
                  <div className="h-[1px] flex-grow mx-8 bg-white/5" />
                  <span className="text-[10px] tracking-[4px] uppercase font-bold text-white/20">Scroll to view</span>
                </div>
                <HorizontalScrollRow photos={categoryPhotos} reverse={i % 2 === 0} />
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
              src="https://static.ais-web.apps.googleusercontent.com/ai-studio/87178873-61fc-408a-b9c7-50361cd35499.png" 
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
    </div>
  );
}
