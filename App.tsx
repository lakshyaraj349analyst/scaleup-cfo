import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { 
  BentoCard, 
  Button, 
  GlassIcon, 
  GlassCard,
  ScaleBot,
  cn 
} from "./components/UI";
import { 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  BarChart3, 
  Layers, 
  Users, 
  ArrowRight,
  Database,
  Cpu,
  Target,
  Globe,
  Lock,
  MessageSquare,
  Star,
  Quote
} from "lucide-react";
import { useRef, useEffect, ReactNode } from "react";

import { Scene } from "./components/Scene";

const CursorSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-20"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(212, 175, 55, 0.05), transparent 80%)`
        ),
      }}
    />
  );
};

const BackgroundLayers = () => (
  <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
    {/* Layer 1: Base Depth Gradient */}
    <div className="absolute inset-0 bg-[#020408]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0A0F1E_0%,#050505_100%)]" />
    
    {/* Layer 2: Animated Blobs with more intensity and variety */}
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 30, 0],
        y: [0, -20, 0]
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-liquid-gold/5 rounded-full blur-[150px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.1, 1, 1.1],
        opacity: [0.05, 0.15, 0.05],
        x: [0, -30, 0],
        y: [0, 40, 0]
      }}
      transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-accent/5 rounded-full blur-[130px]" 
    />
    
    {/* Additional Mid-section Glows to fill "black gaps" */}
    <motion.div 
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-liquid-gold/5 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        opacity: [0.1, 0.2, 0.1],
        scale: [1.2, 1, 1.2]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[60%] right-[30%] w-[40%] h-[40%] bg-teal-accent/5 rounded-full blur-[120px]" 
    />

    {/* Layer 3: Texture & Grid */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
    
    {/* Scanning Line Effect */}
    <motion.div 
      animate={{ y: ["-100%", "200%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-liquid-gold/10 to-transparent opacity-20"
    />
  </div>
);

const DataStreams = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden -z-15">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "200%", opacity: [0, 0.2, 0] }}
        transition={{ 
          duration: Math.random() * 10 + 15, 
          repeat: Infinity, 
          delay: Math.random() * 10,
          ease: "linear"
        }}
        className="absolute w-px h-60 bg-gradient-to-b from-transparent via-liquid-gold/20 to-transparent"
        style={{ left: `${10 + i * 12}%` }}
      />
    ))}
  </div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden selection:bg-liquid-gold selection:text-rich-black">
      <BackgroundLayers />
      <DataStreams />
      <CursorSpotlight />
      <ScaleBot />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-8 backdrop-blur-2xl border-b border-white/5 bg-rich-black/10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-liquid-gold rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-rich-black rotate-45" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase group-hover:text-liquid-gold transition-colors">ScaleUp CFO</span>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
          <a href="#" className="hover:text-liquid-gold transition-colors relative group">
            Solutions
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-liquid-gold transition-all group-hover:w-full" />
          </a>
          <a href="#" className="hover:text-liquid-gold transition-colors relative group">
            Intelligence
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-liquid-gold transition-all group-hover:w-full" />
          </a>
          <a href="#" className="hover:text-liquid-gold transition-colors relative group">
            Case Studies
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-liquid-gold transition-all group-hover:w-full" />
          </a>
          <Button variant="outline" className="py-3 px-8">Client Portal</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <Scene />
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-liquid-gold/20 bg-liquid-gold/5 text-[10px] uppercase tracking-[0.4em] text-liquid-gold mb-12 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-liquid-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-liquid-gold"></span>
              </span>
              Intelligence-Driven Finance
            </div>
            <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.85] mb-12">
              AI-POWERED <br />
              <span className="gold-gradient-text italic">SCALE</span> MASTERY
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-16 font-light leading-relaxed tracking-tight">
              The financial operating system for founders who refuse to settle. 
              Predictive intelligence meets high-stakes strategic wisdom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button className="py-6 px-14 text-base shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)]">Book Strategy Call</Button>
              <Button variant="secondary" className="py-6 px-14 text-base">View Products</Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-12 bg-gradient-to-b from-liquid-gold to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Scroll to Explore</span>
        </motion.div>
      </section>

      {/* Floating Dashboard Preview */}
      <section className="py-32 px-4 relative overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-full max-w-6xl mx-auto"
        >
          <GlassCard className="p-4 md:p-8 shadow-2xl shadow-liquid-gold/10">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4" style={{ transform: "translateZ(20px)" }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Live Financial Intelligence Dashboard</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ transformStyle: "preserve-3d" }}>
              <div className="space-y-4" style={{ transform: "translateZ(30px)" }}>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 glass-panel">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Projected Runway</div>
                  <div className="text-3xl font-bold text-liquid-gold">18.4 Months</div>
                  <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-liquid-gold" 
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 glass-panel">
                  <div className="text-[10px] uppercase text-white/40 mb-1">Burn Rate (Monthly)</div>
                  <div className="text-2xl font-semibold">₹12.4L</div>
                  <div className="text-[10px] text-green-400 mt-1">↓ 4.2% from last month</div>
                </div>
              </div>
              <div className="md:col-span-2 p-6 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden glass-panel" style={{ transform: "translateZ(40px)" }}>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[10px] uppercase text-white/40">Cash Flow Projection</div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-liquid-gold" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[40, 60, 45, 70, 85, 65, 90, 100, 80, 95, 110, 120].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.5 + i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-liquid-gold/20 to-liquid-gold/60 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Trust Marquee */}
      <section className="py-24 border-y border-white/5 bg-obsidian/50 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Trusted by the next generation of unicorns</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {["SEQUOIA", "ACCEL", "Y COMBINATOR", "TIGER GLOBAL", "SOFTBANK"].map((logo) => (
              <span key={logo} className="text-2xl font-black tracking-tighter hover:text-liquid-gold transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/5 pt-16">
            <GlassCard tilt={false} className="p-4 border-none bg-transparent">
              <div className="text-4xl font-bold text-liquid-gold mb-2">₹100Cr+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Capital Managed</div>
            </GlassCard>
            <GlassCard tilt={false} className="p-4 border-none bg-transparent">
              <div className="text-4xl font-bold text-liquid-gold mb-2">50+</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Series A-C Clients</div>
            </GlassCard>
            <GlassCard tilt={false} className="p-4 border-none bg-transparent">
              <div className="text-4xl font-bold text-liquid-gold mb-2">98%</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Retention Rate</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section className="py-32 px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Strategic Financial <br /><span className="gold-gradient-text">Infrastructure</span></h2>
          <p className="text-white/40 max-w-xl font-light">Precision-engineered modules designed to give founders total clarity over their financial destiny.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
          <BentoCard 
            className="md:col-span-8"
            title="AI CFO Modules"
            description="Real-time burn rate detection and predictive runway modeling powered by deep-learning algorithms."
            accent="gold"
          >
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="relative w-full h-40 glass-panel border-white/5 overflow-hidden flex items-center justify-center">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-liquid-gold/10 to-transparent"
                />
                <TrendingUp className="w-16 h-16 text-liquid-gold/30" />
              </div>
            </div>
          </BentoCard>
          
          <BentoCard 
            className="md:col-span-4"
            title="Fundraising Support"
            description="Get pitch-ready in days, not months. Automated data-room preparation."
            accent="teal"
          >
            <div className="flex flex-col gap-3 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 glass-panel border-white/5 bg-white/[0.02]">
                  <ShieldCheck className="w-5 h-5 text-teal-accent" />
                  <div className="h-2 w-32 bg-white/5 rounded-full" />
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard 
            className="md:col-span-4"
            title="Tax & Compliance"
            description="Automated regulatory filings and tax optimization strategies."
            accent="teal"
          >
            <div style={{ transform: "translateZ(60px)" }}>
              <GlassIcon icon={Layers} accent="teal" />
            </div>
          </BentoCard>

          <BentoCard 
            className="md:col-span-8"
            title="Strategic Forecasting"
            description="Dynamic 'What-if' scenario toggles to visualize the impact of every strategic hire or pivot."
            accent="gold"
          >
             <div className="flex items-end gap-4 h-40 w-full px-12">
                {[40, 60, 90, 70, 100, 120, 80, 110].map((h, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ height: h + 20, backgroundColor: "rgba(212, 175, 55, 0.4)" }}
                    className="flex-1 glass-panel border-liquid-gold/10 bg-liquid-gold/5 rounded-t-xl transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
             </div>
          </BentoCard>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold mb-4">The Founder's <span className="teal-gradient-text">Verdict</span></h2>
          <p className="text-white/40 font-light">Join the elite circle of founders scaling with intelligence.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Anish Gupta", role: "CEO @ NeoTech", text: "ScaleUp CFO didn't just fix our books; they gave us a strategic roadmap that helped us close our Series B 3 months early.", accent: "gold" },
            { name: "Sarah Chen", role: "Founder @ Lumina AI", text: "The AI forecasting is eerily accurate. It's like having a crystal ball for your cash flow. Absolute game changer.", accent: "teal" },
            { name: "Vikram Malhotra", role: "CTO @ Flux Systems", text: "Finally, a finance platform that speaks the language of tech founders. The integration was seamless and the insights are profound.", accent: "gold" }
          ].map((t, idx) => (
            <GlassCard 
              key={idx} 
              accent={t.accent as any}
              className="min-h-[320px] flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className="relative mb-8" style={{ transformStyle: "preserve-3d" }}>
                  <Quote className="w-10 h-10 text-white/5 absolute -top-4 -left-4" />
                  <motion.div 
                    whileHover={{ translateZ: 60, scale: 1.1 }}
                    className={cn(
                      "w-20 h-20 rounded-full glass-panel p-1 relative z-10",
                      t.accent === "gold" ? "border-liquid-gold/30" : "border-teal-accent/30"
                    )}
                  >
                    <img src={`https://i.pravatar.cc/150?u=${t.name}`} className="w-full h-full rounded-full object-cover grayscale" referrerPolicy="no-referrer" />
                    <div className={cn(
                      "absolute inset-0 rounded-full animate-pulse opacity-50",
                      t.accent === "gold" ? "shadow-[0_0_20px_var(--color-liquid-gold)]" : "shadow-[0_0_20px_var(--color-teal-accent)]"
                    )} />
                  </motion.div>
                </div>
                <div style={{ transform: "translateZ(30px)" }}>
                  <div className="flex gap-1 justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-liquid-gold text-liquid-gold" />
                    ))}
                  </div>
                  <p className="text-base italic text-white/70 leading-relaxed mb-6">"{t.text}"</p>
                  <div className="mt-auto">
                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                    <p className={cn(
                      "text-[10px] uppercase tracking-widest font-bold",
                      t.accent === "gold" ? "text-liquid-gold" : "text-teal-accent"
                    )}>{t.role}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* AI + Human Edge */}
      <section className="py-40 bg-rich-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-liquid-gold/10 rounded-full blur-[120px]" />
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-liquid-gold/20 bg-liquid-gold/5 text-[10px] uppercase tracking-[0.3em] text-liquid-gold mb-8 backdrop-blur-md">
              The Hybrid Advantage
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.9]">
              THE FUSION OF <br />
              <span className="gold-gradient-text italic">INTELLIGENCE</span> <br />
              & <span className="text-white/40">WISDOM</span>
            </h2>
            <div className="space-y-10">
              {[
                { icon: Cpu, title: "Deep-Data Analysis", desc: "Our AI scans millions of data points to identify inefficiencies that human eyes miss.", accent: "gold" },
                { icon: Users, title: "High-Stakes Wisdom", desc: "Veteran CFOs provide the strategic context and emotional intelligence required for board-level decisions.", accent: "teal" }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="shrink-0">
                    <GlassIcon icon={item.icon} accent={item.accent as any} />
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-xl font-bold mb-3 transition-colors",
                      item.accent === "gold" ? "group-hover:text-liquid-gold" : "group-hover:text-teal-accent"
                    )}>{item.title}</h4>
                    <p className="text-white/40 text-base leading-relaxed font-light max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <GlassCard className="h-full p-0 border-white/5 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/finance-wisdom/1200/1200?grayscale" 
                alt="Strategic Mastery" 
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110 group-hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/40 to-transparent" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-8 glass-panel border-liquid-gold/20 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-liquid-gold animate-pulse" />
                    <div className="text-[10px] uppercase tracking-[0.4em] text-liquid-gold">AI Output Analysis</div>
                  </div>
                  <div className="text-lg italic text-white/80 font-light leading-relaxed">
                    "Runway optimized by 4.2 months through dynamic vendor renegotiation protocols and predictive tax harvesting."
                  </div>
                </motion.div>
              </div>
            </GlassCard>
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 border border-liquid-gold/10 rounded-full border-dashed"
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-accent/10 rounded-full blur-[80px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Path to Scale */}
      <section className="py-40 max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-32">
          <div className="inline-block text-[10px] uppercase tracking-[0.5em] text-white/20 mb-6 font-bold">The Methodology</div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">THE PATH TO <span className="gold-gradient-text">SCALE</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto font-light text-lg">A systematic, intelligence-driven approach to financial dominance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-liquid-gold/20 to-transparent -translate-y-1/2 z-0" />
          
          {[
            { step: "01", title: "Data Ingestion", icon: Database, desc: "Seamless integration with your existing stack (ERP, Bank, HRIS) via secure API protocols.", accent: "gold" },
            { step: "02", title: "Intelligence Layer", icon: Cpu, desc: "Proprietary AI models process raw data to surface predictive insights, risks, and growth levers.", accent: "teal" },
            { step: "03", title: "Strategic Execution", icon: Target, desc: "Your dedicated CFO executes high-impact strategies to maximize enterprise value and runway.", accent: "gold" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative z-10 flex flex-col items-center group"
            >
              <div className="relative mb-10">
                <div className={cn(
                  "absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full",
                  item.accent === "gold" ? "bg-liquid-gold" : "bg-teal-accent"
                )} />
                <GlassIcon icon={item.icon} accent={item.accent as any} />
              </div>
              
              <div className={cn(
                "font-mono text-xs mb-4 tracking-[0.3em] font-bold",
                item.accent === "gold" ? "text-liquid-gold" : "text-teal-accent"
              )}>{item.step}</div>
              
              <h3 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
              
              <GlassCard className="text-center p-6 border-white/5 bg-white/[0.02] group-hover:bg-white/[0.05]">
                <p className="text-white/40 text-sm leading-relaxed font-light">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-liquid-gold/5 to-liquid-gold/10" />
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-liquid-gold/20 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-accent/20 rounded-full blur-[150px]"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-block text-[10px] uppercase tracking-[0.6em] text-liquid-gold mb-10 font-black">Ready to Ascend?</div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85]">
              STOP GUESSING. <br />
              <span className="gold-gradient-text italic">START SCALING.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/40 mb-16 max-w-2xl mx-auto font-light leading-relaxed tracking-tight">
              Join 50+ high-growth startups who have replaced traditional accounting with a Financial Operating System designed for the future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Button className="py-8 px-16 text-lg group shadow-[0_0_50px_-10px_rgba(212,175,55,0.4)]">
                Schedule Strategy Call
                <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="outline" className="py-8 px-16 text-lg">
                Explore Platform
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 px-8 relative z-10 bg-rich-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10 group cursor-pointer">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-liquid-gold rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-rich-black rotate-45" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">ScaleUp CFO</span>
            </div>
            <p className="text-white/30 text-base max-w-sm mb-12 leading-relaxed font-light">
              The AI-powered financial operating system for the next generation of global leaders. Precision, intelligence, and strategic mastery.
            </p>
            <div className="flex gap-8">
              {["Twitter", "LinkedIn", "Crunchbase", "Instagram"].map(s => (
                <a key={s} href="#" className="text-xs uppercase tracking-widest text-white/20 hover:text-liquid-gold transition-all font-bold">{s}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60 mb-10">Platform</h5>
            <ul className="space-y-6 text-sm">
              {[
                { name: "AI Modules", icon: Cpu },
                { name: "Strategic CFO", icon: Users },
                { name: "Fundraising", icon: TrendingUp },
                { name: "Compliance", icon: ShieldCheck }
              ].map((link) => (
                <li key={link.name}>
                  <a href="#" className="flex items-center gap-3 text-white/40 hover:text-liquid-gold transition-colors group">
                    <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60 mb-10">Company</h5>
            <ul className="space-y-6 text-sm">
              {[
                { name: "About Us", icon: Globe },
                { name: "Careers", icon: Zap },
                { name: "Press Kit", icon: MessageSquare },
                { name: "Security", icon: Lock }
              ].map((link) => (
                <li key={link.name}>
                  <a href="#" className="flex items-center gap-3 text-white/40 hover:text-liquid-gold transition-colors group">
                    <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.5em] text-white/10 font-bold">
          <div>© 2026 ScaleUp CFO Intelligence Inc. All rights reserved.</div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
