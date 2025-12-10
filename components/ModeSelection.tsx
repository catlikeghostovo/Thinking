
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen } from 'lucide-react';
import { ModeType } from '../types';

interface ModeSelectionProps {
  onSelect: (mode: ModeType) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelect }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-lg mx-auto bg-morandi-bg text-morandi-espresso">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h2 className="text-2xl font-serif text-morandi-espresso tracking-widest">选择模式</h2>
        <p className="text-xs text-morandi-taupe font-light tracking-wide uppercase">
          Choose Mode
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full space-y-6"
      >
        {/* Quick Mode */}
        <motion.button
          variants={item}
          onClick={() => onSelect('quick')}
          className="w-full group flex items-center p-6 bg-white border border-morandi-latte rounded-lg hover:shadow-md hover:border-morandi-espresso transition-all duration-300"
        >
          <div className="p-3 bg-morandi-sand rounded-full mr-5 text-morandi-taupe group-hover:text-morandi-espresso group-hover:bg-morandi-latte transition-colors">
            <Zap size={20} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-serif text-morandi-espresso mb-1">快速模式</h3>
            <p className="text-xs text-morandi-taupe">随机 1 个主题 • 3-5 道精选问题</p>
          </div>
        </motion.button>

        {/* Deep Mode */}
        <motion.button
          variants={item}
          onClick={() => onSelect('deep')}
          className="w-full group flex items-center p-6 bg-white border border-morandi-latte rounded-lg hover:shadow-md hover:border-morandi-espresso transition-all duration-300"
        >
          <div className="p-3 bg-morandi-sand rounded-full mr-5 text-morandi-taupe group-hover:text-morandi-espresso group-hover:bg-morandi-latte transition-colors">
            <BookOpen size={20} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-serif text-morandi-espresso mb-1">深度模式</h3>
            <p className="text-xs text-morandi-taupe">12 个主题全覆盖 • 60 道完整问题</p>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ModeSelection;
