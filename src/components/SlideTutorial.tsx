import { useState } from 'react';
import { Button } from './ui/button';
import { X, ChevronLeft, ChevronRight, Target, CreditCard, Sparkles, Play, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { CardDeckIcon } from './CardDeckIcon';

interface SlideTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SlideTutorial({ isOpen, onClose }: SlideTutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Your Goal (Merge Welcome + Objective + Winning)
    {
      title: 'Your Goal',
      label: 'Goal',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <Target className="w-10 h-10 mx-auto mb-3 text-[#2E7D32]" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Your Goal</h3>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-[#2E7D32] rounded-2xl p-6 sm:p-8 shadow-lg text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#2E7D32] mb-4">
              Keep your total score the lowest
            </p>
            <div className="h-px bg-[#2E7D32]/30 my-4"></div>
            <p className="text-lg text-gray-700 font-semibold">
              Reach 100 points and you're eliminated
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-5 shadow-md text-center">
            <p className="text-xl font-bold text-yellow-800">
              Last player under 100 wins 🎉
            </p>
          </div>
          
          <div className="bg-gray-50/80 border border-gray-300 rounded-lg p-4 mt-1">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              This is a real-world card game played using a physical deck of playing cards.
            </p>
          </div>
        </div>
      ),
    },
    
    // Slide 2: Cards & Scoring (Merge Card Values + Zero Card)
    {
      title: 'Cards & Scoring',
      label: 'Cards',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <CreditCard className="w-10 h-10 mx-auto mb-3 text-purple-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Card Values & Scoring</h3>
          </div>
          
          {/* Card Values */}
          <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-12 bg-white rounded shadow-md flex items-center justify-center border-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">A</span>
                  </div>
                  <span className="font-semibold text-gray-800">Ace</span>
                </div>
                <span className="text-2xl font-bold text-[#2E7D32]">1 pt</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-12 bg-white rounded shadow-md flex items-center justify-center border-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">7</span>
                  </div>
                  <span className="font-semibold text-gray-800">2–10</span>
                </div>
                <span className="text-lg font-bold text-gray-700">Face value</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-12 bg-white rounded shadow-md flex items-center justify-center border-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">K</span>
                  </div>
                  <span className="font-semibold text-gray-800">J / Q / K</span>
                </div>
                <span className="text-2xl font-bold text-[#c62828]">10 pts</span>
              </div>
            </div>
          </div>
          
          {/* Zero-Value Rule */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-3 border-[#D4AF37] rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <p className="text-base font-bold text-gray-900">⭐ Special Rule</p>
            </div>
            <p className="text-lg leading-relaxed text-gray-800 mb-3">
              One card (6–K) becomes <strong>0 points</strong> each round
            </p>
            <p className="text-sm text-gray-600 font-semibold text-center bg-white/70 rounded-lg p-2">
              🔄 This card changes every round
            </p>
          </div>
        </div>
      ),
    },
    
    // Slide 3: Game Setup
    {
      title: 'Game Setup',
      label: 'Setup',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <CreditCard className="w-10 h-10 mx-auto mb-3 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Game Setup</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3 text-lg">Before the game starts</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Shuffle the deck thoroughly.</p>
                <p>• Deal cards face down to each player (3, 5, or 7 cards as selected).</p>
                <p>• Do not reveal card values to any player.</p>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3 text-lg">Draw Deck</p>
              <p className="text-sm text-gray-700 mb-3">
                Place all remaining cards face down in the center to form the draw deck.
              </p>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                <p className="font-bold text-blue-900 text-sm mb-2">Important</p>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>• All cards remain face down at all times.</p>
                  <p>• Card values stay hidden during play.</p>
                  <p>• Players draw cards from the draw deck one by one during their turns.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 mb-3 text-lg">Play Direction</p>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">↻</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">Clockwise</p>
                </div>
                <div className="text-gray-400 font-bold">or</div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">↺</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">Anti-clockwise</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-4 shadow-sm text-center">
            <p className="text-sm text-blue-800 font-bold">💡 More cards = more strategy</p>
          </div>
        </div>
      ),
    },
    
    // Slide 4: Playing a Round
    {
      title: 'How a Round Works',
      label: 'Round',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <Play className="w-10 h-10 mx-auto mb-3 text-indigo-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">How a Round Works</h3>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 font-bold text-lg">1</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Discard first</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Discard at least 1 card from your hand.</p>
                    <p>You may discard multiple cards together only if they are the same value (example: 2×7, 3×7, or 4×7).</p>
                    <p>Place discarded card(s) face up in the center, showing their values.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 font-bold text-lg">2</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Then draw a card</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>After discarding, you must draw exactly 1 card.</p>
                    <p className="mt-2">On the first player's turn, draw from the top of the deck.</p>
                    <p className="mt-2">On later turns, you may choose to draw:</p>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>The top card from the deck (face down, value hidden), or</li>
                      <li>The top face-up card discarded by the previous player.</li>
                    </ul>
                    <p className="mt-2">(You cannot skip drawing.)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 font-bold text-lg">3</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Continue turns</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Each next player repeats the same flow:</p>
                    <ul className="list-disc ml-5 space-y-1 mt-1">
                      <li>Discard 1 or more same-value cards</li>
                      <li>Then draw 1 card (deck or previous discard)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-700 font-bold text-lg">4</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 text-lg">Call "Show" if confident</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Only after turn 3, a player may call "Show" if they believe they have the lowest total score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-[#2E7D32] rounded-xl p-4 shadow-sm">
            <p className="text-sm text-[#2E7D32] font-bold mb-2">💡 Lower cards = better outcome</p>
            <div className="text-xs text-gray-700 space-y-1.5">
              <p className="font-semibold">Example strategy:</p>
              <p>If you have a 7 and the player before you discards a 7, you can discard a card you don't need and pick the revealed 7. This helps you build a set of same-value cards to discard together in later turns. How and when you build sets depends on your strategy.</p>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic text-center">Drawing always happens after discarding.</p>
          </div>
        </div>
      ),
    },
    
    // Slide 5: The Show Rule (Merge Show + Tie-Breaker)
    {
      title: 'Calling "Show"',
      label: 'Show',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <Award className="w-10 h-10 mx-auto mb-3 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Calling "Show"</h3>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-3 border-blue-500 rounded-xl p-5 shadow-lg text-center">
            <p className="text-xl font-bold text-blue-800">
              Calling Show is risk vs reward
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-[#2E7D32] rounded-xl p-5 shadow-md">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-7 h-7 text-[#2E7D32] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#2E7D32] text-xl mb-2">✅ Success</p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    If you have the lowest score → <strong>0 points</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-3 border-[#c62828] rounded-xl p-5 shadow-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-7 h-7 text-[#c62828] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#c62828] text-xl mb-2">❌ Fail</p>
                  <p className="text-base text-gray-700 leading-relaxed">
                    If not lowest → <strong>+50 points</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border-2 border-orange-300 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Tie-breaker:</strong> If tied for lowest, the next player in turn order wins
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-4 shadow-sm text-center">
            <p className="text-base text-yellow-800 font-bold">⚠️ Only one winner per round</p>
          </div>
        </div>
      ),
    },
    
    // Slide 6: Quick Recap & CTA
    {
      title: "That's It!",
      label: 'Recap',
      content: (
        <div className="space-y-5 sm:space-y-6">
          <div className="text-center mb-3">
            <CardDeckIcon className="w-16 h-16 mx-auto mb-3 text-[#D4AF37]" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">That's It!</h3>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-6 shadow-md">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800 font-semibold">Lowest total score wins</p>
              </div>
              
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800 font-semibold">One zero-value card each round</p>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800 font-semibold">Wrong Show = +50 penalty</p>
              </div>
              
              <div className="flex items-start gap-3">
                <X className="w-6 h-6 text-[#c62828] flex-shrink-0 mt-0.5" />
                <p className="text-base text-gray-800 font-semibold">100+ points = eliminated</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-[#2E7D32] rounded-xl p-6 shadow-lg text-center">
            <p className="text-xl font-bold text-[#2E7D32] mb-2">
              Got it, let's play!
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              You'll learn the rest as you play
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setCurrentSlide(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[250] flex items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAFAF7] h-full w-full sm:rounded-2xl sm:shadow-[0_12px_48px_rgba(0,0,0,0.3)] sm:w-full sm:max-w-2xl sm:max-h-[90vh] flex flex-col sm:border-4 sm:border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100 sticky top-0 z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">How to Play</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="text-sm text-gray-600 hover:text-gray-900 font-semibold hidden sm:block"
            >
              Skip tutorial
            </button>
            <button
              onClick={handleClose}
              className="p-3 sm:p-2 hover:bg-white rounded-xl transition-colors min-h-[48px] min-w-[48px] sm:min-h-0 sm:min-w-0 flex items-center justify-center"
              aria-label="Close tutorial"
            >
              <X className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 pb-safe sm:p-8 bg-gradient-to-b from-gray-50 to-white">
          {slides[currentSlide].content}
        </div>

        {/* Footer - Navigation */}
        <div className="border-t-2 border-gray-300 p-4 sm:p-6 bg-gradient-to-t from-gray-50 to-gray-100 sticky bottom-0 safe-area-bottom">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[#1F7A4D] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={goToPrev}
              disabled={currentSlide === 0}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 h-12 sm:h-11 text-base font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </Button>
            
            {currentSlide === slides.length - 1 ? (
              <Button
                onClick={handleClose}
                className="flex-1 bg-gradient-to-b from-[#1F7A4D] to-[#0E5A3A] hover:from-[#2A8D5E] hover:to-[#1F7A4D] text-white h-12 sm:h-11 text-base font-bold rounded-xl shadow-[0_4px_0_#0a4429] active:translate-y-0.5 active:shadow-[0_2px_0_#0a4429] transition-all"
              >
                Got it!
              </Button>
            ) : (
              <Button
                onClick={goToNext}
                className="flex-1 bg-gradient-to-b from-[#1F7A4D] to-[#0E5A3A] hover:from-[#2A8D5E] hover:to-[#1F7A4D] text-white h-12 sm:h-11 text-base font-bold rounded-xl shadow-[0_4px_0_#0a4429] active:translate-y-0.5 active:shadow-[0_2px_0_#0a4429] transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}