import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CardRevealProps {
  isOpen: boolean;
  cardValue: number | null;
  onComplete: () => void;
}

export function CardReveal({ isOpen, cardValue, onComplete }: CardRevealProps) {
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (isOpen && cardValue !== null) {
      setIsRevealing(true);
      const timer = setTimeout(() => {
        setIsRevealing(false);
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, cardValue, onComplete]);

  const getCardDisplay = (value: number): string => {
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value.toString();
  };

  if (!isRevealing || cardValue === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4"
        >
          <div className="text-sm font-medium text-gray-600">Zero-Value Card</div>
          
          {/* Card Flip Animation */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <div className="w-24 h-36 bg-white rounded-xl shadow-lg border-2 border-green-400 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-6xl font-bold text-green-600"
              >
                {getCardDisplay(cardValue)}
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-xs text-gray-500">This card counts as 0 points this round</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}