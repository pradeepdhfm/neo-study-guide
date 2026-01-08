import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

export const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      
      {/* Hero background image with low opacity */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Animated orbs */}
      <motion.div
        className="orb w-96 h-96 -top-48 -left-48"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, hsl(187 94% 50% / 0.3) 0%, transparent 70%)",
        }}
      />
      
      <motion.div
        className="orb w-80 h-80 top-1/4 -right-40"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, hsl(265 89% 66% / 0.25) 0%, transparent 70%)",
        }}
      />
      
      <motion.div
        className="orb w-64 h-64 bottom-1/4 left-1/4"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          background: "radial-gradient(circle, hsl(187 94% 50% / 0.2) 0%, transparent 70%)",
        }}
      />
      
      <motion.div
        className="orb w-72 h-72 -bottom-36 right-1/3"
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{
          background: "radial-gradient(circle, hsl(265 89% 66% / 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};
