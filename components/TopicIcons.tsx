import React from 'react';

interface TopicIconProps {
  topicId: string;
  className?: string;
}

const TopicIcon: React.FC<TopicIconProps> = ({ topicId, className = "w-full h-full" }) => {
  const getPath = () => {
    switch (topicId) {
      case 't1': // Self & Identity: Mirrored face, shifting contours
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 30C40 30 60 20 70 40C80 60 70 80 50 80C30 80 20 60 30 40" />
            <path d="M60 40C60 40 40 50 30 70" />
            <path d="M50 30C50 30 30 20 20 40" opacity="0.6" />
          </g>
        );
      case 't2': // Desire & Choice: Diverging paths, intertwined
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 85V60C50 45 30 40 20 20" />
            <path d="M50 60C50 45 70 40 80 20" />
            <path d="M35 50C45 40 55 40 65 50" opacity="0.7" />
          </g>
        );
      case 't3': // Time & Memory: Spiral clock, looping stroke
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <path d="M50 50m-30 0a30 30 0 1 0 60 0a30 30 0 1 0 -60 0" opacity="0.3"/>
             <path d="M50 50 L50 25" />
             <path d="M50 50 L65 60" />
             <path d="M25 70 C 15 60, 15 40, 25 30 S 45 10, 65 20" strokeDasharray="4 4" />
          </g>
        );
      case 't4': // Connection & Intimacy: Intersecting curves
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 40 C 30 70, 70 70, 70 40" />
            <path d="M70 60 C 70 30, 30 30, 30 60" />
          </g>
        );
      case 't5': // Vulnerability & Strength: Cracked continuous line
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 20 L 40 40 L 60 50 L 40 60 L 50 80" />
            <circle cx="50" cy="50" r="30" strokeOpacity="0.5"/>
          </g>
        );
      case 't6': // Failure & Adjustment: Zigzag turning smooth
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <path d="M20 80 L 30 60 L 25 50 L 40 40 L 35 30" />
             <path d="M35 30 C 50 20, 70 20, 80 30 C 90 40, 80 60, 70 70" />
          </g>
        );
      case 't7': // Chaos & Discipline: Scribble to clean line
        return (
           <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 50 Q 25 20, 35 50 T 50 50 T 65 50 T 80 50" />
            <path d="M15 45 C 10 30, 30 30, 25 55" opacity="0.6" />
          </g>
        );
      case 't8': // Creativity & Expression: Bursting forms
        return (
          <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 50 L 50 20" />
            <path d="M50 50 L 80 50" />
            <path d="M50 50 L 20 50" />
            <path d="M50 50 L 50 80" />
            <path d="M50 50 Q 70 30, 80 20" />
            <path d="M50 50 Q 30 30, 20 20" />
          </g>
        );
      case 't9': // Body & Sensation: Organic flowing line
        return (
           <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <path d="M30 30 C 40 20, 60 20, 70 30 C 80 40, 80 60, 70 70 C 60 80, 40 80, 30 70 C 20 60, 20 40, 30 30 Z" />
             <path d="M30 50 C 40 55, 60 45, 70 50" />
          </g>
        );
      case 't10': // Values & Beliefs: Pillar vertical lines
        return (
           <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="30" y1="20" x2="30" y2="80" />
            <line x1="50" y1="20" x2="50" y2="80" />
            <line x1="70" y1="20" x2="70" y2="80" />
            <path d="M20 20 H 80" />
            <path d="M20 80 H 80" />
           </g>
        );
      case 't11': // World & Future: Globe, horizon
        return (
           <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="50" cy="50" r="30" />
             <path d="M20 50 H 80" />
             <path d="M50 20 C 60 30, 60 70, 50 80" />
           </g>
        );
      case 't12': // Meaning & Direction: Arrow, purpose
        return (
           <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
             <path d="M30 70 C 40 60, 40 40, 50 30" />
             <path d="M50 30 L 70 30 L 60 40" />
             <path d="M70 30 L 60 20" />
           </g>
        );
      default:
        return <circle cx="50" cy="50" r="20" stroke="currentColor" fill="none" />;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={className}>
      {getPath()}
    </svg>
  );
};

export default TopicIcon;
