import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, SkipForward, Sparkles, Save } from 'lucide-react';
import { SessionItem, UserAnswer } from '../types';
import TopicIcon from './TopicIcon';

interface QuestionEditorProps {
  sessionItems: SessionItem[];
  onComplete: (answers: UserAnswer[]) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ sessionItems, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [showHint, setShowHint] = useState(false);

  const currentItem = sessionItems[currentIndex];
  const { question, topic } = currentItem;
  
  const progress = ((currentIndex + 1) / sessionItems.length) * 100;

  // Reset text when question changes
  useEffect(() => {
    setCurrentText('');
    setShowHint(false);
  }, [currentIndex]);

  const handleNext = (skipped: boolean = false) => {
    // Prepare current answer object
    const answerObj: UserAnswer = {
      questionId: question.id,
      questionText: question.text,
      topicTitle: topic.titleCn,
      answer: skipped ? "（跳过）" : currentText,
      date: new Date().toISOString()
    };

    const updatedAnswers = [...answers, answerObj];

    if (currentIndex < sessionItems.length - 1) {
      setAnswers(updatedAnswers);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all questions
      onComplete(updatedAnswers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-6 py-8 relative transition-colors duration-700"
         style={{ backgroundColor: topic.color + '20' }}
    >
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200/50 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-morandi-espresso"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header (Topic Info) */}
      <div className="flex items-center space-x-4 mb-12 opacity-90">
        <div className="w-10 h-10 text-morandi-espresso">
          <TopicIcon topicId={topic.id} />
        </div>
        <div>
          <h3 className="font-serif text-morandi-espresso">{topic.titleCn}</h3>
          <p className="text-[10px] tracking-widest text-morandi-taupe uppercase">{topic.titleEn}</p>
        </div>
        <div className="ml-auto text-xs font-serif text-morandi-taupe">
          {currentIndex + 1} / {sessionItems.length}
        </div>
      </div>

      {/* Question Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex flex-col"
        >
          <h2 className="text-xl md:text-2xl font-serif text-morandi-espresso leading-relaxed mb-8">
            {question.text}
          </h2>

          {/* Inspiration Hint */}
          <div className="mb-6">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="flex items-center text-xs text-morandi-taupe hover:text-morandi-espresso transition-colors tracking-wide"
            >
              <Sparkles size={14} className="mr-2" />
              {showHint ? "隐藏灵感" : "给我一点灵感"}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-morandi-taupe font-light italic bg-white/60 p-4 rounded-md mt-2 border-l-2 border-morandi-latte">
                    {question.hint || "试着闭上眼睛，回到那个瞬间..."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Editor */}
          <textarea
            className="w-full flex-grow bg-transparent resize-none outline-none font-sans text-lg text-morandi-espresso placeholder-morandi-latte leading-loose min-h-[300px]"
            placeholder="写下你的想法..."
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            autoFocus
          />
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-morandi-latte/30 pt-6">
        <button 
          onClick={() => handleNext(true)}
          className="flex items-center text-morandi-taupe hover:text-morandi-espresso text-sm font-light transition-colors"
        >
          <SkipForward size={16} className="mr-2" />
          跳过
        </button>

        <button 
          onClick={() => handleNext(false)}
          disabled={!currentText.trim()}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 ${
            currentText.trim() 
              ? 'bg-morandi-espresso text-white shadow-md hover:bg-morandi-taupe' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span className="text-sm tracking-widest">
            {currentIndex === sessionItems.length - 1 ? "完成" : "下一题"}
          </span>
          {currentIndex === sessionItems.length - 1 ? <Save size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;