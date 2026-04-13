"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Database, 
  ShieldAlert, 
  Zap, 
  Coffee, 
  X, 
  Play,
  Code2,
  Server,
  GitBranch,
  User,
  Network,
  Cpu,
  Globe,
  Briefcase
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Architecture Diagram Sub-components
const DiagramNode = ({ icon: Icon, title, delay }: { icon: any, title: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center z-10 w-28"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#111] border border-neutral-700 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.1)] relative group">
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon size={28} />
    </div>
    <span className="text-xs font-medium text-neutral-400 text-center leading-tight">{title}</span>
  </motion.div>
);

const AnimatedDataFlow = () => (
  <>
    {/* Desktop Horizontal Line */}
    <div className="hidden md:flex items-center justify-center w-16 shrink-0">
      <div className="relative w-full h-[2px] bg-neutral-800 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
        />
      </div>
    </div>

    {/* Mobile Vertical Line (FIXED) */}
    <div className="flex md:hidden items-stretch justify-center shrink-0">
      <div className="relative w-[2px] h-full min-h-12 bg-neutral-800 overflow-hidden">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
        />
      </div>
    </div>
  </>
);


export default function JobScraperLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans overflow-x-hidden">
      
      {/* --- MODAL (Formspree) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111] border border-neutral-800 rounded-2xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">Request Access</h3>
              <p className="text-sm text-neutral-400 mb-6">
                Tell us why you need access to the enterprise proxy pool.
              </p>

              <form 
                action="https://formspree.io/f/YOUR_FORM_ID" 
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-neutral-300">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-neutral-300">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-neutral-300">Why do you need access?</label>
                  <textarea 
                    name="message" 
                    required
                    rows={4}
                    className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                    placeholder="I am building a talent matching platform..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION 1: HERO & VIDEO --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 w-full">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium text-emerald-400 mb-6">
            <ShieldAlert size={14} />
            <span>Closed API Beta</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Enterprise-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Job Scraping API.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            A private, high-reliability extraction engine powered by premium residential proxy rotation. Access is strictly invite-only to ensure zero downtime and block-free scraping.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Request Access <Zap size={18} />
            </button>
            <a 
              href="https://github.com/rudrakshSoni-dev/job-scraper-engine" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-semibold rounded-full border border-neutral-800 hover:bg-neutral-800 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              View Source <GitBranch size={18} />
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20 border border-neutral-800 bg-[#111] aspect-video relative group flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="text-white ml-2" size={32} />
                </div>
                <p className="text-white font-medium">Watch API Walkthrough</p>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 2: DOCS & WALKTHROUGH --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-neutral-900">
        
        {/* Tools Used Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <Code2 className="text-emerald-500" /> The Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "FastAPI", desc: "High-performance Python backend for blazing fast routing." },
              { title: "Playwright", desc: "Headless browser automation bypassing JS challenges." },
              { title: "Proxy Pool", desc: "10M+ rotating residential IP network to avoid 403s." },
              { title: "Next.js", desc: "React framework for seamless dashboard rendering." }
            ].map((tool, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-4 text-emerald-400">
                  <Database size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-neutral-400">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* API Endpoints Terminal */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <Terminal className="text-cyan-500" /> Seamless Integration
          </h2>
          <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-[#0d0d0d]">
            <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-neutral-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-neutral-500">POST /api/v1/jobs/scrape</div>
            </div>
            <div className="p-6 font-mono text-sm sm:text-base overflow-x-auto">
              <div className="text-emerald-400 mb-2">curl -X POST https://api.yourdomain.com/v1/jobs/scrape \</div>
              <div className="text-emerald-400 mb-2">  -H "Authorization: Bearer YOUR_API_KEY" \</div>
              <div className="text-emerald-400 mb-6">  -d '&#123;"query": "Software Engineer", "location": "Remote"&#125;'</div>
              
              <div className="text-neutral-500 mb-2">{"// Response"}</div>
              <pre className="text-cyan-300">
{`{
  "status": "success",
  "data": {
    "total_results": 142,
    "jobs": [
      {
        "title": "Senior Frontend Engineer",
        "company": "TechCorp",
        "salary_range": "$120k - $160k",
        "apply_url": "https://...",
        "posted_at": "2023-10-24T10:00:00Z"
      }
    ]
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Architecture Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <Server className="text-purple-500" /> System Architecture
          </h2>
          <div className="w-full rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Animated Flow Container */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 relative z-10">
              <DiagramNode icon={User} title="Client App" delay={0.1} />
              <AnimatedDataFlow />
              <DiagramNode icon={Network} title="Load Balancer" delay={0.3} />
              <AnimatedDataFlow />
              <DiagramNode icon={Cpu} title="FastAPI Engine" delay={0.5} />
              <AnimatedDataFlow />
              <DiagramNode icon={Globe} title="Proxy Pool" delay={0.7} />
              <AnimatedDataFlow />
              <DiagramNode icon={Briefcase} title="Target Boards" delay={0.9} />
            </div>

          </div>
        </div>

      </section>

      {/* --- SECTION 3: FOOTER --- */}
      <footer className="bg-[#050505] border-t border-neutral-900 pt-20 pb-10 px-6 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <h2 className="text-2xl font-bold text-white mb-6">Ready to scale your data extraction?</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-neutral-800 text-white font-medium rounded-full hover:bg-neutral-700 transition-colors mb-16"
          >
            Request Beta Access
          </button>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-800 pb-10 mb-10">
            <div className="flex gap-6">
              <a href="mailto:your@email.com" className="text-neutral-400 hover:text-white transition-colors text-sm">Contact Email</a>
              <a href="https://yourportfolio.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio</a>
              <a href="https://github.com/rudrakshSoni-dev/job-scraper-engine" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm">Source Code</a>
            </div>
            
            <a 
              href="https://buymeacoffee.com/yourusername" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full hover:bg-yellow-500/20 transition-colors"
            >
              <Coffee size={16} /> Buy me a coffee
            </a>
          </div>

          <p className="text-neutral-500 text-sm flex items-center justify-center gap-1">
            Made with <span className="text-red-500">❤️</span> by{" "}
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noreferrer"
              className="text-white hover:text-emerald-400 transition-colors font-medium ml-1 underline decoration-neutral-700 underline-offset-4"
            >
              Rudraksh
            </a>
          </p>

        </div>
      </footer>
    </main>
  );
}