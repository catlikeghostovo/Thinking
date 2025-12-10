import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FortuneShake from './components/FortuneShake';
import ModeSelection from './components/ModeSelection';
import QuestionEditor from './components/QuestionEditor';
import SummaryCard from './components/SummaryCard';
import { TOPICS } from './constants';
import { AppView, ModeType, UserAnswer, SessionItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [mode, setMode] = useState<ModeType>('quick');
  
  // The queue of questions to ask
  const [activeSessionItems, setActiveSessionItems] = useState<SessionItem[]>([]);
  // The answers collected
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // 1. Welcome -> Mode Select
  const startApp = () => {
    setView('mode_select');
  };

  // 2. Mode Select -> Shake
  const handleModeSelect = (selectedMode: ModeType) => {
    setMode(selectedMode);
    setView('shake');
  };

  // 3. Shake -> Editor
  const handleDrawComplete = () => {
    let items: SessionItem[] = [];

    if (mode === 'quick') {
        // Quick Mode: Pick 1 random topic, select random 3-5 questions
        const randomIndex = Math.floor(Math.random() * TOPICS.length);
        const selectedTopic = TOPICS[randomIndex];
        // Shuffle questions and take 3
        const questions = [...selectedTopic.questions].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        items = questions.map(q => ({
            question: q,
            topic: selectedTopic
        }));
    } else {
        // Deep Mode: All 12 topics, ALL questions (60 total)
        // Order by topic sequence
        TOPICS.forEach(topic => {
            topic.questions.forEach(q => {
                items.push({
                    question: q,
                    topic: topic
                });
            });
        });
    }
    
    setActiveSessionItems(items);
    setView('editor');
  };

  // 4. Editor -> Summary
  const handleReflectionComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setView('summary');
  };

  // 5. Summary -> Restart (Same Mode)
  const handleRestart = () => {
    setUserAnswers([]);
    setActiveSessionItems([]);
    setView('shake'); // Go back to shake to draw another or restart deep mode flow
  };

  // 6. Summary -> Home (Mode Select)
  const handleGoHome = () => {
    setUserAnswers([]);
    setActiveSessionItems([]);
    setView('mode_select');
  };

  return (
    <div className="min-h-screen bg-morandi-bg font-sans text-morandi-espresso selection:bg-morandi-latte selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* Welcome View */}
        {view === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col min-h-screen"
          >
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center px-6 text-center space-y-8">
               <p className="max-w-md text-morandi-taupe font-light leading-relaxed">
                 在这个喧嚣的世界里，留出片刻宁静。<br/>
                 通过猫咪与风铃的指引，开启一场与自我的深度对话。
                 <br/><br/>
                 <span className="text-xs opacity-60">* 您的回答仅保存在本地，隐私安全。</span>
               </p>
               <button 
                 onClick={startApp}
                 className="px-12 py-3 bg-morandi-espresso text-white font-serif tracking-widest rounded-full shadow-lg hover:bg-morandi-taupe transition-all duration-300 transform hover:scale-105"
               >
                 开始回顾
               </button>
            </div>
            <Footer />
          </motion.div>
        )}

        {/* Mode Selection */}
        {view === 'mode_select' && (
          <motion.div
            key="mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <ModeSelection onSelect={handleModeSelect} />
          </motion.div>
        )}

        {/* Shake View */}
        {view === 'shake' && (
          <motion.div
            key="shake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center bg-morandi-bg"
          >
            <FortuneShake onDrawComplete={handleDrawComplete} />
          </motion.div>
        )}

        {/* Editor View */}
        {view === 'editor' && activeSessionItems.length > 0 && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen w-full"
          >
            <QuestionEditor 
              sessionItems={activeSessionItems}
              onComplete={handleReflectionComplete} 
            />
          </motion.div>
        )}

        {/* Summary View */}
        {view === 'summary' && (
           <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-morandi-bg"
          >
            <SummaryCard 
              answers={userAnswers} 
              onRestart={handleRestart}
              onGoHome={handleGoHome}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default App;