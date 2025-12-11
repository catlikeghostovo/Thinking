import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ModeType } from '../types';
import { Sparkles } from 'lucide-react';

interface FortuneShakeProps {
  onDrawComplete: () => void;
  mode: ModeType;
  isDeepModeSelected?: boolean;
}

const FortuneShake: React.FC<FortuneShakeProps> = ({ onDrawComplete, mode, isDeepModeSelected }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);

  const handleClick = () => {
    if (isFalling || hasLanded) return;
    setIsFalling(true);

    // Animation duration ~3.5s
    // Wait for landing, then trigger next phase
    setTimeout(() => {
      setHasLanded(true);
      // Wait a moment after landing before navigating
      setTimeout(() => {
        onDrawComplete();
      }, 1000);
    }, 3500);
  };

  // ------------------------------------------------------------------
  // Animation Variants
  // ------------------------------------------------------------------

  // The Leaf (Falling Physics)
  const leafVariants: Variants = {
    // Floating in air (waiting to fall)
    idle: {
      x: 150,
      y: [50, 70],
      rotate: [-5, 5],
      scale: 1,
      transition: {
        y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
      }
    },
    // The Fall
    falling: {
      // Downward movement to ground (y ~ 320, fits in 400 height)
      y: [60, 120, 190, 260, 320], 
      // Swaying side to side (Air resistance)
      x: [150, 120, 180, 130, 160], 
      // Fluttering rotation
      rotate: [0, 25, -15, 40, 85],
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    }
  };

  const echoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // ------------------------------------------------------------------
  // Aesthetics
  // ------------------------------------------------------------------
  const COLORS = {
    leafStroke: "#A6988D", // Mocha
    leafFill: "rgba(214, 200, 189, 0.4)", // Latte transparent
    vein: "#9C8F85"
  };

  // Text Logic
  let mainText = mode === 'quick' ? '拾起落叶' : '开启章节';
  let subText = mode === 'quick' ? 'Pick a Leaf' : 'Open Chapter';
  if (isDeepModeSelected) {
    mainText = '拾起此篇';
    subText = 'Begin this Chapter';
  }

  return (
    <div className="flex flex-col items-center justify-between py-12 px-6 h-full min-h-[600px] w-full max-w-md mx-auto">
      
      {/* Title Area */}
      <div className="text-center space-y-3 relative z-10 mt-6 select-none">
        <h1 className="text-3xl font-serif text-morandi-espresso tracking-[0.2em] font-light">
          {mainText}
        </h1>
        <p className="text-xs text-morandi-taupe uppercase tracking-widest opacity-80 font-sans">
          {subText}
        </p>
      </div>

      {/* Animation Area */}
      <div className="relative flex-grow flex flex-col justify-start items-center w-full pt-10">
        
        {/* Click Area */}
        <div 
          className="relative w-80 h-[400px] cursor-pointer"
          onClick={handleClick}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* The Falling Leaf */}
            <motion.g
                initial="idle"
                animate={isFalling ? "falling" : "idle"}
                variants={leafVariants}
            >
                {/* The Leaf Shape - Drawn relative to 0,0 (stem top) */}
                <path 
                    d="M 0 0 Q 5 10, 0 20 C -15 30, -20 60, 0 80 C 20 60, 15 30, 0 20 Q -5 10, 0 0" 
                    fill={COLORS.leafFill} 
                    stroke={COLORS.leafStroke} 
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Central Vein */}
                <path 
                    d="M 0 20 L 0 70" 
                    stroke={COLORS.vein} 
                    strokeWidth="0.8" 
                    strokeLinecap="round"
                    opacity="0.6"
                />
            </motion.g>

            {/* Subtle Ground Line/Shadow (Fade in) */}
             <motion.path 
                d="M 120 380 Q 160 385, 200 380" 
                stroke={COLORS.leafStroke} 
                strokeWidth="0.5" 
                opacity="0" 
                animate={{ opacity: isFalling ? 0.3 : 0 }}
                transition={{ duration: 2, delay: 1 }}
                fill="none"
            />

          </svg>

          {/* Hover Glow */}
          <div className="absolute top-[10%] left-[25%] w-40 h-40 bg-morandi-cream/30 rounded-full blur-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
      </div>

      {/* Footer Text */}
      <div className="h-20 w-full flex flex-col items-center justify-start z-20">
        {isFalling && !hasLanded ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center space-x-2 text-morandi-mocha"
          >
            <span className="text-sm font-serif tracking-[0.2em] animate-pulse">
                落叶归根...
            </span>
          </motion.div>
        ) : hasLanded ? (
          <motion.div 
            variants={echoVariants} 
            initial="hidden" 
            animate="visible" 
            className="flex flex-col items-center space-y-2"
          >
            <Sparkles size={16} className="text-morandi-mocha"/>
            <p className="text-sm font-serif text-morandi-espresso tracking-widest">
              {mode === 'quick' ? '心念已达' : '静谧时刻'}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-center group cursor-pointer"
            onClick={handleClick}
          >
            <p className="text-morandi-espresso text-xs font-serif tracking-[0.2em] mb-2 group-hover:scale-105 transition-transform">
              点击落叶 • CATCH THE MOMENT
            </p>
            <div className="w-8 h-px bg-morandi-taupe/30 mx-auto" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FortuneShake;