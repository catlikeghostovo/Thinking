
import React from 'react';
import { motion } from 'framer-motion';
import { TOPICS } from '../constants';
import TopicIcon from './TopicIcon';
import { ArrowRight, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';

interface TopicTOCProps {
  completedTopicIds: string[];
  onSelectTopic: (topicId: string) => void;
  onFinish: () => void;
  onExit: () => void;
}

const TopicTOC: React.FC<TopicTOCProps> = ({ completedTopicIds, onSelectTopic, onFinish, onExit }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  const hasAnswers = completedTopicIds.length > 0;

  return (
    <div className="min-h-screen bg-morandi-bg py-12 px-6 flex flex-col items-center relative">
      
      {/* Back Button */}
      <button 
        onClick={onExit}
        className="absolute top-6 left-6 p-2 text-morandi-taupe hover:text-morandi-espresso transition-colors rounded-full hover:bg-morandi-latte/20"
        title="返回模式选择"
      >
        <ArrowLeft size={24} strokeWidth={1.5} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-2 mt-4"
      >
        <h2 className="text-2xl font-serif text-morandi-espresso tracking-widest">旅程目录</h2>
        <p className="text-xs text-morandi-taupe uppercase tracking-widest">Choose Your Path</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl mb-12"
      >
        {TOPICS.map((topic) => {
          const isCompleted = completedTopicIds.includes(topic.id);
          
          return (
            <motion.button
              key={topic.id}
              variants={itemVariant}
              onClick={() => !isCompleted && onSelectTopic(topic.id)}
              disabled={isCompleted}
              className={`flex flex-col items-center p-4 border rounded-lg shadow-sm transition-all duration-300 relative
                ${isCompleted 
                  ? 'bg-morandi-sand/50 border-morandi-latte/20 opacity-60 cursor-default' 
                  : 'bg-white border-morandi-latte/50 hover:border-morandi-espresso hover:shadow-md cursor-pointer transform hover:-translate-y-1'
                }
              `}
            >
              <div className={`w-12 h-12 mb-3 ${isCompleted ? 'text-morandi-taupe' : 'text-morandi-mocha'}`}>
                <TopicIcon topicId={topic.id} />
              </div>
              <h3 className="text-xs font-serif text-morandi-espresso text-center leading-tight">
                {topic.titleCn}
              </h3>
              <span className="text-[8px] text-morandi-taupe mt-1 uppercase opacity-60">
                {topic.number}
              </span>
              
              {isCompleted && (
                <div className="absolute top-2 right-2 text-morandi-espresso opacity-40">
                  <CheckCircle size={14} />
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="flex flex-col items-center space-y-4">
        {hasAnswers ? (
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onFinish}
                className="flex items-center space-x-3 px-8 py-3 bg-morandi-espresso text-white rounded-full shadow-lg hover:bg-morandi-taupe transition-all duration-300 transform hover:scale-105"
            >
                <Sparkles size={16} />
                <span className="font-serif tracking-widest">生成回顾总结</span>
            </motion.button>
        ) : (
            <p className="text-xs text-morandi-taupe font-light tracking-wide">
                请选择一个感兴趣的主题开始回答
            </p>
        )}
      </div>
    </div>
  );
};

export default TopicTOC;
