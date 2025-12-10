import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-20 md:py-28 text-center px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif text-morandi-dark tracking-wider leading-tight">
          Year End Reflection
        </h1>
        <div className="w-12 h-px bg-morandi-dark mx-auto opacity-30"></div>
        <p className="text-sm md:text-base font-sans text-slate-500 tracking-widest uppercase opacity-80">
          Introspection & Dialogue
        </p>
      </div>
    </header>
  );
};

export default Header;