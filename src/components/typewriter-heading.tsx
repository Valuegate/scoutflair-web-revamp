// src/components/typewriter-heading.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterHeadingProps {
  text: string[];
  className?: string;
}

const Underline = () => (
    <svg className="w-full h-auto" viewBox="0 0 212 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12.3958C36.1647 3.20501 128.617 -4.2333 209.667 8.2391" stroke="#F2A725" strokeWidth="4" strokeLinecap="round"/>
    </svg>
)

export function TypewriterHeading({ text, className }: TypewriterHeadingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % text.length;
      const fullText = text[i];

      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && displayedText === fullText) {
        // Pauses for 3 seconds, then starts deleting. Total time so far ~7.5s + 3s = 10.5s
        setTimeout(() => setIsDeleting(true), 3000); 
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        // loopNum update will trigger re-typing
        setLoopNum(loopNum + 1);
      }
    };

    const ticker = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayedText, isDeleting, loopNum, text, typingSpeed]);

  const renderTextWithScouting = () => {
    const parts = displayedText.split(/(Scouting)/);
    return parts.map((part, index) => {
      if (part === 'Scouting') {
        return (
          <span key={index} className="relative inline-block text-[#F2A725]">
            Scouting
            <span className="absolute -bottom-2 left-0 w-full">
              <Underline />
            </span>
          </span>
        );
      }
      return part.replace(/ /g, "\u00A0");
    });
  };

  return (
    <h1 className={cn(className)}>
      {renderTextWithScouting()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="inline-block w-1 h-[40px] sm:h-[50px] md:h-[56px] bg-[#1B1B1B] ml-1 -mb-1"
      />
    </h1>
  );
}
