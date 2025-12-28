import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Brain, FileText, TrendingUp, ArrowRight, BookOpen, Users, Zap } from "lucide-react";
import { BackgroundOrbs } from "@/components/ui/BackgroundOrbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized explanations tailored to your curriculum and learning level",
    },
    {
      icon: FileText,
      title: "Upload Study Materials",
      description: "Upload PDFs, docs, and presentations for AI-powered Q&A sessions",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics and insights",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Students" },
    { value: "500K+", label: "Questions Answered" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundOrbs />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 flex items-center justify-between p-4 md:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">LearnAI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <GlowButton variant="ghost" size="sm">
              Sign In
            </GlowButton>
          </Link>
          <Link to="/signup">
            <GlowButton variant="primary" size="sm">
              Get Started
            </GlowButton>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 md:px-6 pt-12 md:pt-20 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
              <Zap className="w-4 h-4" />
              Powered by Advanced AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Your Personal
            <br />
            <span className="gradient-text">AI Study Companion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Upload your study materials and get instant, personalized explanations. 
            Our AI adapts to your curriculum, semester, and learning style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <GlowButton variant="primary" size="lg" className="min-w-[200px]">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
            <Link to="/login">
              <GlowButton variant="ghost" size="lg" className="min-w-[200px]">
                <BookOpen className="w-5 h-5" />
                Explore Demo
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 px-4 md:px-6 pb-20"
      >
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.section>

      {/* Features */}
      <section className="relative z-10 px-4 md:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Students Love <span className="gradient-text">LearnAI</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience a smarter way to study with features designed for modern learners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 md:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-3xl mx-auto"
        >
          <GlassCard glow className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of students already using AI to master their subjects faster and more effectively.
            </p>
            <Link to="/signup">
              <GlowButton variant="primary" size="lg">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
          </GlassCard>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-sm text-muted-foreground">
        <p>© 2024 LearnAI. Empowering students with AI-driven learning.</p>
      </footer>
    </div>
  );
};

export default Index;
