import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface FortuneShakeProps {
  onDrawComplete: () => void;
}

const FortuneShake: React.FC<FortuneShakeProps> = ({ onDrawComplete }) => {
  const [isRinging, setIsRinging] = useState(false);
  const [echoReceived, setEchoReceived] = useState(false);

  const handleClick = () => {
    if (isRinging || echoReceived) return;
    setIsRinging(true);

    // 1. Cat swipes (handled by animation prop)
    // 2. Chime swings after swipe delay
    // 3. Reveal and navigate
    
    setTimeout(() => {
      // Chime ringing duration 2s
      setIsRinging(false);
      setEchoReceived(true);
      
      // Wait for reveal animation then complete
      setTimeout(() => {
        onDrawComplete();
      }, 1500);
    }, 2500);
  };

  // The Chime swings when triggered
  const chimeVariants: Variants = {
    idle: { rotate: 0 },
    ringing: {
      rotate: [0, 5, -5, 3, -3, 1, -1, 0],
      transition: {
        delay: 0.3, // Wait for cat paw
        duration: 2.2,
        ease: "easeInOut"
      }
    }
  };

  // The Cat's Paw interaction
  const pawVariants: Variants = {
    idle: { rotate: 0, x: 0, y: 0 },
    ringing: {
      rotate: [0, -15, 10, 0], // Pull back, swipe, return
      x: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const echoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-12 px-6 h-full min-h-[600px] w-full max-w-md mx-auto bg-morandi-bg">
      {/* Header Section */}
      <div className="text-center space-y-4 relative z-10 mt-4 md:mt-8">
        <h1 className="text-3xl md:text-4xl font-serif text-morandi-espresso tracking-[0.2em]">
          年终回顾
        </h1>
        <p className="text-xs md:text-sm text-morandi-taupe uppercase tracking-widest font-light">
          Year End Reflection
        </p>
      </div>

      {/* Animation Section */}
      <div className="relative flex-grow flex flex-col justify-center items-center w-full py-10">
        
        {/* Interaction Area */}
        <div 
          className="relative cursor-pointer group w-64 h-80"
          onClick={handleClick}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 240 320" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-morandi-espresso"
          >
            {/* --- WIND CHIME --- */}
            <motion.g 
              variants={chimeVariants} 
              animate={isRinging ? "ringing" : "idle"} 
              style={{ originX: "140px", originY: "10px" }}
            >
              {/* String from Ceiling */}
              <line x1="140" y1="0" x2="140" y2="40" strokeWidth="1" />
              
              {/* Top Support Bar */}
              <path d="M110 40 H 170" strokeWidth="1.5" />
              
              {/* Tubes */}
              {/* Left Tube */}
              <line x1="120" y1="40" x2="120" y2="60" strokeOpacity="0.5" />
              <rect x="115" y="60" width="10" height="70" rx="1" fill="#FDFBF8" />
              
              {/* Right Tube */}
              <line x1="160" y1="40" x2="160" y2="65" strokeOpacity="0.5" />
              <rect x="155" y="65" width="10" height="65" rx="1" fill="#FDFBF8" />

              {/* Middle Tube */}
              <line x1="140" y1="40" x2="140" y2="70" strokeOpacity="0.5" />
              <rect x="135" y="70" width="10" height="75" rx="1" fill="#FDFBF8" />

              {/* Center Striker Line */}
              <line x1="140" y1="40" x2="140" y2="160" strokeWidth="0.8" />
              
              {/* Striker Bead */}
              <circle cx="140" cy="140" r="3" fill="#A6988D" />

              {/* Wind Catcher (Paper) */}
              <motion.g 
                 style={{ originX: "140px", originY: "160px" }}
                 animate={isRinging ? { rotate: [0, 10, -10, 5, -5, 0] } : { rotate: 0 }}
                 transition={{ duration: 3, delay: 0.4 }}
              >
                <path d="M140 160 V 210" strokeOpacity="0.8" />
                <rect x="130" y="210" width="20" height="50" fill="#FDFBF8" rx="1" />
                
                {/* Reveal Symbol */}
                {echoReceived && (
                  <motion.text 
                    x="140" 
                    y="240" 
                    fontSize="14" 
                    textAnchor="middle" 
                    fill="#5E5046" 
                    fontFamily="serif"
                    variants={echoVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ✦
                  </motion.text>
                )}
              </motion.g>
            </motion.g>

            {/* --- THE CAT --- */}
            {/* Body */}
            <g transform="translate(40, 180) scale(0.8)">
               {/* Tail */}
               <path d="M20 100 Q -10 90, 5 70 Q 20 60, 25 80" strokeWidth="1.5" strokeLinecap="round" />
               
               {/* Body Shape - Simple Sitting Cat */}
               <path d="M30 110 Q 30 50, 70 50 Q 100 50, 100 110" strokeWidth="1.5" fill="#FDFBF8" />
               <path d="M30 110 H 100" strokeWidth="1.5" />
               
               {/* Head */}
               <path d="M50 50 Q 40 30, 55 20 L 60 30 L 70 30 L 75 20 Q 90 30, 80 50" strokeWidth="1.5" fill="#FDFBF8" />
               
               {/* Ears */}
               {/* (Implicit in head path above) */}

               {/* Paw (Animated) - Reaching for chime */}
               <motion.g
                 variants={pawVariants}
                 animate={isRinging ? "ringing" : "idle"}
                 style={{ originX: "85px", originY: "80px" }}
               >
                 <path d="M85 80 Q 100 60, 120 70" strokeWidth="1.5" strokeLinecap="round" /> 
                 {/* Paw pad */}
                 <path d="M118 68 L 122 72" strokeWidth="1.5" strokeLinecap="round" />
               </motion.g>
            </g>

          </svg>

          {/* Hover Hint */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
             {!isRinging && !echoReceived && (
               <div className="w-20 h-20 rounded-full bg-morandi-latte/20 blur-xl animate-pulse"></div>
             )}
          </div>
        </div>
      </div>

      {/* Status Text Section */}
      <div className="h-24 w-full flex flex-col items-center justify-start space-y-3 z-20">
        {isRinging ? (
           <motion.p 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             className="text-sm font-serif text-morandi-espresso tracking-widest animate-pulse"
           >
             猫咪轻扰，风铃回响...
           </motion.p>
        ) : echoReceived ? (
          <motion.p 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             className="text-sm font-serif text-morandi-espresso tracking-widest"
           >
             回响已至
           </motion.p>
        ) : (
          <>
            <p className="text-morandi-espresso text-xs font-serif tracking-[0.2em] mb-1">
               轻触唤醒 • WAKE THE CHIME
            </p>
            <p className="text-[10px] text-morandi-taupe font-light tracking-wide opacity-60">
              让小猫为您抽取话题
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FortuneShake;