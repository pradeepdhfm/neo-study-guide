import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Sparkles, 
  Brain, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  MessageSquare,
  UserPlus,
  Upload,
  Bot,
  Quote
} from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Personalized AI for Students",
      description: "AI adapts explanations based on your branch, semester, and learning level.",
    },
    {
      icon: FileText,
      title: "Learn from Your Own Materials",
      description: "Upload PDFs, PPTs, and notes. The AI learns from your files and teaches you.",
    },
    {
      icon: MessageSquare,
      title: "AI Chat Tutor",
      description: "Ask doubts anytime. Get clear explanations, summaries, and revisions.",
    },
    {
      icon: TrendingUp,
      title: "Track Your Learning Progress",
      description: "Visual dashboards to see what you've learned and where to improve.",
    },
  ];

  const quotes = [
    "Every student learns differently. AI makes sure you're understood.",
    "Your syllabus. Your pace. Your AI tutor.",
    "Turn confusion into clarity with personalized learning.",
    "Not just learning faster — learning smarter.",
    "AI that learns how you learn.",
  ];

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Add Your Academic Details",
      description: "Create your account and tell us about your course and semester.",
    },
    {
      icon: Upload,
      title: "Upload Study Materials",
      description: "Add your PDFs, PPTs, and notes for personalized learning.",
    },
    {
      icon: Bot,
      title: "Chat with Your Personal AI Tutor",
      description: "Ask questions and get explanations tailored just for you.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundOrbs />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2 md:p-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div 
              className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-display font-bold text-sm md:text-xl gradient-text">AI Learning</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-3">
            <Link to="/login">
              <GlowButton variant="ghost" size="sm" className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 h-7 md:h-9">
                Login
              </GlowButton>
            </Link>
            <Link to="/signup">
              <GlowButton variant="primary" size="sm" className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 h-7 md:h-9">
                Sign Up
              </GlowButton>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-3 md:px-6 pt-20 md:pt-40 pb-12 md:pb-20 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 md:mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary mb-3 md:mb-6"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.4)",
                  "0 0 40px hsl(var(--primary) / 0.6)",
                  "0 0 20px hsl(var(--primary) / 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-6 h-6 md:w-10 md:h-10 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-6xl lg:text-7xl font-display font-bold mb-3 md:mb-6 leading-tight"
          >
            Personalized AI Learning,
            <br />
            <span className="gradient-text">Designed for Every Student</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed px-2"
          >
            Learn smarter, not harder.
            <br />
            <span className="text-foreground/80">Your personal AI tutor that understands your syllabus, your pace, and your goals.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4"
          >
            <Link to="/signup">
              <GlowButton variant="primary" size="lg" className="min-w-[140px] md:min-w-[200px] text-sm md:text-base h-9 md:h-11 px-4 md:px-6">
                Get Started
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </GlowButton>
            </Link>
            <Link to="/login">
              <GlowButton variant="ghost" size="lg" className="min-w-[140px] md:min-w-[200px] text-sm md:text-base h-9 md:h-11 px-4 md:px-6">
                Login
              </GlowButton>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-3 md:px-6 py-10 md:py-20">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-8 md:mb-16">
            <h2 className="text-xl md:text-5xl font-display font-bold mb-2 md:mb-4">
              What This Platform <span className="gradient-text">Includes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xs md:text-lg px-2">
              Everything you need for a smarter, more personalized learning experience
            </p>
          </AnimatedSection>

          {/* Mobile: Compact tabs in a row */}
          <div className="flex flex-wrap justify-center gap-2 md:hidden">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <GlassCard className="px-3 py-2 flex items-center gap-2 hover:scale-[1.02] transition-all duration-300">
                  <feature.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium">{feature.title.split(' ').slice(0, 2).join(' ')}</span>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Desktop: Full cards */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <GlassCard className="p-8 h-full group hover:scale-[1.02] transition-all duration-300">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary mb-5 flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="relative z-10 px-3 md:px-6 py-10 md:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-4xl font-display font-bold mb-2 md:mb-4">
              Why Students <span className="gradient-text">Love Us</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {quotes.map((quote, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <GlassCard className="p-3 md:p-6 h-full flex items-start gap-2 md:gap-4 hover:scale-[1.02] transition-transform duration-300">
                  <Quote className="w-5 h-5 md:w-8 md:h-8 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/90 italic leading-relaxed text-xs md:text-base">{quote}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-3 md:px-6 py-10 md:py-20">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-8 md:mb-16">
            <h2 className="text-xl md:text-5xl font-display font-bold mb-2 md:mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-xs md:text-lg">
              Get started in just three simple steps
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.2}>
                <div className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-14 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                  
                  <GlassCard className="p-4 md:p-8 text-center relative z-10 hover:scale-105 transition-transform duration-300">
                    {/* Step number */}
                    <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-xs md:text-sm">
                      {index + 1}
                    </div>
                    
                    <motion.div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mx-auto mb-3 md:mb-5 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-sm md:text-lg font-display font-semibold mb-1.5 md:mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{step.description}</p>
                  </GlassCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-3 md:px-6 py-10 md:py-20">
        <AnimatedSection className="max-w-3xl mx-auto">
          <GlassCard glow className="p-6 md:p-14 text-center">
            <motion.div 
              className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 md:mb-6 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-lg md:text-4xl font-display font-bold mb-2 md:mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-muted-foreground mb-4 md:mb-8 max-w-lg mx-auto text-xs md:text-lg">
              Join thousands of students already using AI to master their subjects faster and more effectively.
            </p>
            <Link to="/signup">
              <GlowButton variant="primary" size="lg" className="text-sm md:text-base h-9 md:h-11 px-4 md:px-6">
                Get Started for Free
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </GlowButton>
            </Link>
          </GlassCard>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold gradient-text">AI Personalized Learning</span>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Empowering students with AI-driven personalized education.
            </p>
            <p className="text-muted-foreground text-sm">
              © 2024 AI Personalized Learning. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
