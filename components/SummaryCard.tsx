
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Copy, Check, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { UserAnswer } from '../types';
import TopicIcon from './TopicIcon';
import { TOPICS } from '../constants';

interface SummaryCardProps {
  answers: UserAnswer[];
  onRestart: () => void;
  onGoHome: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ answers, onRestart, onGoHome }) => {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getTopicIdByTitle = (title: string) => {
    return TOPICS.find(t => t.titleCn === title)?.id || 't1';
  };
  
  const getTopicEnByTitle = (title: string) => {
    return TOPICS.find(t => t.titleCn === title)?.titleEn || '';
  };

  const currentAnswer = answers[selectedIndex] || { questionText: "...", answer: "暂无回答", topicTitle: "" };
  const currentTopicId = getTopicIdByTitle(currentAnswer.topicTitle);
  const currentTopicEn = getTopicEnByTitle(currentAnswer.topicTitle);

  const handleCopy = () => {
    const textToCopy = `【${currentAnswer.topicTitle}】\nQ: ${currentAnswer.questionText}\nA: ${currentAnswer.answer}\n\n#2024YearEndReflection`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextAnswer = () => {
    setSelectedIndex((prev) => (prev + 1) % answers.length);
  };

  const prevAnswer = () => {
    setSelectedIndex((prev) => (prev - 1 + answers.length) % answers.length);
  };

  if (!answers || answers.length === 0) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-morandi-bg">
              <p className="text-morandi-espresso mb-4">暂无回答记录</p>
              <button onClick={onGoHome} className="px-6 py-2 bg-morandi-espresso text-white rounded-full">返回主页</button>
          </div>
      )
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-morandi-bg">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-serif text-morandi-espresso tracking-widest">回顾完成</h2>
        <p className="text-xs text-morandi-taupe mt-2">YOUR YEAR IN WORDS</p>
      </motion.div>

      {/* Selection Controls */}
      {answers.length > 1 && (
        <div className="flex items-center justify-between w-full max-w-sm px-2 mb-4 text-morandi-taupe">
           <button onClick={prevAnswer} className="p-2 hover:text-morandi-espresso transition-colors">
             <ChevronLeft size={20} strokeWidth={1.5}/>
           </button>
           <span className="text-[10px] tracking-widest uppercase">
             选择分享内容 ({selectedIndex + 1}/{answers.length})
           </span>
           <button onClick={nextAnswer} className="p-2 hover:text-morandi-espresso transition-colors">
             <ChevronRight size={20} strokeWidth={1.5}/>
           </button>
        </div>
      )}

      {/* The Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm bg-white shadow-2xl rounded-sm overflow-hidden border border-morandi-latte relative"
          id="summary-card"
        >
          <div className="h-2 bg-morandi-espresso" />
          
          <div className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 text-morandi-espresso opacity-90">
              <TopicIcon topicId={currentTopicId} />
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-morandi-espresso tracking-wide">{currentAnswer.topicTitle}</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-morandi-taupe">{currentTopicEn}</span>
            </div>

            <div className="w-full h-px bg-morandi-sand my-4" />

            <div className="text-left w-full space-y-4">
              <p className="text-xs text-morandi-mocha font-serif leading-relaxed">Q: {currentAnswer.questionText}</p>
              <div className="min-h-[120px] flex items-center">
                 <p className="text-sm text-slate-600 font-light leading-7 italic font-serif">
                  “{currentAnswer.answer.slice(0, 180)}{currentAnswer.answer.length > 180 ? '...' : ''}”
                </p>
              </div>
            </div>

            <div className="pt-8 w-full flex justify-center opacity-30 text-morandi-espresso">
               <span className="w-1 h-1 rounded-full bg-current mx-1"></span>
               <span className="w-1 h-1 rounded-full bg-current mx-1"></span>
               <span className="w-1 h-1 rounded-full bg-current mx-1"></span>
            </div>
          </div>

          <div className="bg-morandi-sand p-4 text-center border-t border-morandi-latte">
            <p className="text-[10px] text-morandi-taupe tracking-widest uppercase">2024 Year End Reflection</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex space-x-6 md:space-x-8"
      >
        <button 
          onClick={handleCopy}
          className="flex flex-col items-center space-y-2 text-morandi-taupe hover:text-morandi-espresso transition-colors group"
        >
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} strokeWidth={1.5} />}
          </div>
          <span className="text-[10px] tracking-widest">{copied ? '已复制' : '复制文本'}</span>
        </button>

        <button 
          onClick={onRestart}
          className="flex flex-col items-center space-y-2 text-morandi-taupe hover:text-morandi-espresso transition-colors group"
        >
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
            <RefreshCcw size={20} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] tracking-widest">再写一篇</span>
        </button>

         <button 
          onClick={onGoHome}
          className="flex flex-col items-center space-y-2 text-morandi-taupe hover:text-morandi-espresso transition-colors group"
        >
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
            <Home size={20} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] tracking-widest">返回模式</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SummaryCard;
