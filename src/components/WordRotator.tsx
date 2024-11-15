import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordRotatorProps {
  words: string[];
}

export default function WordRotator({ words }: WordRotatorProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 250;
    const pauseDuration = 8000;

    const typeWriter = () => {
      const currentFullWord = words[currentIndex];
      
      if (!isDeleting) {
        // Typing
        if (currentWord.length < currentFullWord.length) {
          setCurrentWord(currentFullWord.slice(0, currentWord.length + 1));
          return typingSpeed;
        } else {
          // Word complete, pause before deleting
          setIsDeleting(true);
          return pauseDuration;
        }
      } else {
        // Deleting
        if (currentWord.length > 0) {
          setCurrentWord(currentWord.slice(0, currentWord.length - 1));
          return deletingSpeed;
        } else {
          // Word deleted, move to next word
          setIsDeleting(false);
          setCurrentIndex((current) => (current + 1) % words.length);
          return typingSpeed;
        }
      }
    };

    const timeout = setTimeout(() => {
      const delay = typeWriter();
      clearTimeout(timeout);
      setTimeout(typeWriter, delay);
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentWord, currentIndex, isDeleting, words]);

  return (
    <span className="inline-block min-w-[140px]">
      <motion.span
        key={currentWord}
        className="inline-block text-[#4D3E78]"
      >
        {currentWord}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1.1em] bg-[#4D3E78] ml-[2px] align-middle"
        />
      </motion.span>
    </span>
  );
}