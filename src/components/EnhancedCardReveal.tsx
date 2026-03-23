import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EnhancedCardRevealProps {
  isOpen: boolean;
  cardValue: number | null;
  onComplete: () => void;
}

interface VirtualCard {
  id: number;
  value: number;
  pile: 'left' | 'right';
  originalIndex: number;
  recombineIndex: number;
}

// Realistic card back component
function CardBack({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-[#c62828] to-[#B71C1C] rounded-lg overflow-hidden shadow-md ${className}`}>
      {/* Border */}
      <div className="absolute inset-0 border-3 border-white/90 rounded-lg" />
      
      {/* Inner border */}
      <div className="absolute inset-2 border-2 border-white/60 rounded-md" />
      
      {/* Diamond pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="diamond" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="8" y="0" width="4" height="4" fill="white" transform="rotate(45 10 2)" />
            <rect x="8" y="10" width="4" height="4" fill="white" transform="rotate(45 10 12)" />
            <rect x="18" y="5" width="4" height="4" fill="white" transform="rotate(45 20 7)" />
            <rect x="-2" y="5" width="4" height="4" fill="white" transform="rotate(45 0 7)" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#diamond)" />
      </svg>
      
      {/* Center ornament */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/20 rounded-full border-2 border-white/40" />
      </div>
    </div>
  );
}

// Card face component
function CardFace({ value, className = '' }: { value: number; className?: string }) {
  const getCardDisplay = (val: number): string => {
    if (val === 11) return 'J';
    if (val === 12) return 'Q';
    if (val === 13) return 'K';
    return val.toString();
  };

  const getSuit = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    return suits[Math.floor(Math.random() * suits.length)];
  };

  const suit = getSuit();
  const isRed = suit === '♥' || suit === '♦';

  return (
    <div className={`relative w-full h-full bg-white rounded-lg border-2 border-gray-300 shadow-md ${className}`}>
      {/* Top-left corner */}
      <div className={`absolute top-1 left-1.5 text-left leading-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        <div className="text-sm font-bold">{getCardDisplay(value)}</div>
        <div className="text-xs -mt-0.5">{suit}</div>
      </div>
      
      {/* Center value */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-5xl font-bold ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
          {getCardDisplay(value)}
        </div>
      </div>
      
      {/* Bottom-right corner (rotated) */}
      <div className={`absolute bottom-1 right-1.5 text-right leading-none transform rotate-180 ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
        <div className="text-sm font-bold">{getCardDisplay(value)}</div>
        <div className="text-xs -mt-0.5">{suit}</div>
      </div>
    </div>
  );
}

export function EnhancedCardReveal({ isOpen, cardValue, onComplete }: EnhancedCardRevealProps) {
  const [phase, setPhase] = useState<'split' | 'recombine' | 'flip' | 'reveal' | 'transition'>('split');
  const [virtualCards, setVirtualCards] = useState<VirtualCard[]>([]);

  useEffect(() => {
    if (isOpen && cardValue !== null) {
      // Create virtual deck of 20 cards
      const validCards = [6, 7, 8, 9, 10, 11, 12, 13];
      const deckSize = 20;
      
      // Generate deck with random cards
      const deck: VirtualCard[] = Array.from({ length: deckSize }, (_, index) => ({
        id: index,
        value: validCards[Math.floor(Math.random() * validCards.length)],
        pile: Math.random() > 0.5 ? 'left' : 'right', // Randomly assign to left or right pile
        originalIndex: index,
        recombineIndex: 0,
      }));

      // Separate into left and right piles
      const leftPile = deck.filter(card => card.pile === 'left');
      const rightPile = deck.filter(card => card.pile === 'right');

      // Riffle recombine: interleave cards from left and right piles randomly
      const recombined: VirtualCard[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < leftPile.length || rightIndex < rightPile.length) {
        // Randomly pick from left or right pile (if available)
        const pickFromLeft = Math.random() > 0.5;
        
        if (pickFromLeft && leftIndex < leftPile.length) {
          recombined.push({ ...leftPile[leftIndex], recombineIndex: recombined.length });
          leftIndex++;
        } else if (rightIndex < rightPile.length) {
          recombined.push({ ...rightPile[rightIndex], recombineIndex: recombined.length });
          rightIndex++;
        } else if (leftIndex < leftPile.length) {
          recombined.push({ ...leftPile[leftIndex], recombineIndex: recombined.length });
          leftIndex++;
        }
      }

      setVirtualCards(recombined);
      setPhase('split');

      // Animation timeline
      const splitTimer = setTimeout(() => setPhase('recombine'), 1200);
      const recombineTimer = setTimeout(() => setPhase('flip'), 2600);
      const flipTimer = setTimeout(() => setPhase('reveal'), 3400);
      const revealTimer = setTimeout(() => setPhase('transition'), 5000);
      const completeTimer = setTimeout(() => {
        onComplete();
        setPhase('split');
      }, 6000);

      return () => {
        clearTimeout(splitTimer);
        clearTimeout(recombineTimer);
        clearTimeout(flipTimer);
        clearTimeout(revealTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isOpen, cardValue, onComplete]);

  const getCardDisplay = (value: number): string => {
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value.toString();
  };

  if (!isOpen || cardValue === null) return null;

  return (
    <AnimatePresence>
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-b border-green-200 py-8 relative overflow-hidden">
        {/* Casino glow effect */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-green-400/20"
        />

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Card Animation Container */}
          <div className="flex items-center justify-center min-h-[220px] relative">
            
            {/* Split, Recombine & Flip Phases - Card Backs */}
            {(phase === 'split' || phase === 'recombine' || phase === 'flip') && (
              <div className="relative w-full max-w-xl h-48">
                {virtualCards.map((card, index) => {
                  // Calculate split position
                  const pileIndex = card.pile === 'left' 
                    ? virtualCards.filter((c, i) => c.pile === 'left' && i <= index).length - 1
                    : virtualCards.filter((c, i) => c.pile === 'right' && i <= index).length - 1;

                  const splitX = card.pile === 'left' ? -140 : 140;
                  const splitY = pileIndex * 0.8; // Slight vertical offset for stacking
                  const splitRotate = card.pile === 'left' ? -8 : 8;

                  // Calculate recombine position (stacked deck)
                  const recombineX = 0;
                  const recombineY = card.recombineIndex * 0.4;
                  const recombineRotate = card.recombineIndex * 0.3;

                  // Top card flips during flip phase
                  const isTopCard = card.recombineIndex === virtualCards.length - 1;
                  
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ x: 0, y: 0, rotate: 0, opacity: 0.95, scale: 1 }}
                      animate={
                        phase === 'split'
                          ? {
                              x: splitX,
                              y: splitY,
                              rotate: splitRotate,
                              opacity: 0.98,
                              scale: 0.85,
                            }
                          : phase === 'recombine'
                          ? {
                              x: recombineX,
                              y: recombineY,
                              rotate: recombineRotate,
                              opacity: isTopCard ? 1 : 0.95,
                              scale: isTopCard ? 0.9 : 0.85,
                            }
                          : { // flip phase
                              x: recombineX,
                              y: recombineY,
                              rotate: recombineRotate,
                              opacity: isTopCard ? 0 : 0.95, // Hide top card during flip
                              scale: isTopCard ? 0.9 : 0.85,
                            }
                      }
                      transition={{
                        duration: phase === 'split' ? 1.0 : phase === 'recombine' ? 1.2 : 0.3,
                        delay: phase === 'split' 
                          ? index * 0.02 
                          : phase === 'recombine' 
                          ? card.recombineIndex * 0.018
                          : 0,
                        ease: [0.45, 0, 0.55, 1],
                      }}
                      className="absolute shadow-lg"
                      style={{
                        width: '56px',
                        height: '80px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-28px',
                        marginTop: '-40px',
                        zIndex: phase === 'split' ? index : card.recombineIndex,
                      }}
                    >
                      <CardBack />
                    </motion.div>
                  );
                })}

                {/* Top card flipping animation during flip phase */}
                {phase === 'flip' && (
                  <motion.div
                    initial={{ rotateY: 0, scale: 0.9 }}
                    animate={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      position: 'absolute',
                      width: '56px',
                      height: '80px',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-28px',
                      marginTop: '-40px',
                      zIndex: 1000,
                    }}
                  >
                    <div style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}>
                      <CardBack />
                    </div>
                    <div 
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        position: 'absolute', 
                        width: '100%', 
                        height: '100%',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <CardFace value={cardValue} />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Reveal Phase - Enlarged revealed card */}
            {phase === 'reveal' && (
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                className="relative"
              >
                <div className="w-40 h-56 bg-white rounded-2xl shadow-2xl border-4 border-green-400 flex items-center justify-center relative overflow-hidden">
                  {/* Animated glow */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-green-400/30 rounded-2xl"
                  />
                  
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
                    className="text-8xl font-bold text-green-600 z-10 relative"
                  >
                    {getCardDisplay(cardValue)}
                  </motion.span>

                  {/* Sparkle effects */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1.5, 0],
                        x: Math.cos(i * 45 * Math.PI / 180) * 80,
                        y: Math.sin(i * 45 * Math.PI / 180) * 80
                      }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: "easeOut" }}
                      className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
                      style={{ left: '50%', top: '50%', marginLeft: '-6px', marginTop: '-6px' }}
                    />
                  ))}
                </div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <div className="text-sm font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-full shadow-md">
                    Zero-Value Card!
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Transition Phase - Shrink to banner */}
            {phase === 'transition' && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                className="relative"
              >
                <div className="w-40 h-56 bg-white rounded-2xl shadow-2xl border-4 border-green-500 flex items-center justify-center">
                  <span className="text-8xl font-bold text-green-600">
                    {getCardDisplay(cardValue)}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            >
              <div className="text-sm font-medium text-purple-700 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-md">
                {phase === 'split' && '🎴 Splitting deck...'}
                {phase === 'recombine' && '🎲 Riffle shuffling...'}
                {phase === 'flip' && '🃏 Drawing card...'}
                {phase === 'reveal' && '✨ Zero-value card revealed!'}
                {phase === 'transition' && '✓ Ready to play'}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}