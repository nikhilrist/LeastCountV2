import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, ChevronLeft, ChevronRight, Trophy, Target, Sparkles, Play, CheckCircle2, AlertCircle, Crown } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Welcome to Least Count',
      icon: Trophy,
      iconColor: 'text-yellow-500',
      bgColor: 'from-yellow-50 to-orange-50',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Least Count is a card game where the goal is simple: <strong>keep your total score as low as possible</strong>.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Win Condition:</strong> Be the last player standing with the lowest total score after 15 rounds or when all others are eliminated.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Game Setup',
      icon: Target,
      iconColor: 'text-blue-500',
      bgColor: 'from-blue-50 to-indigo-50',
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Cards Per Player</h4>
            <p className="text-sm text-gray-600 mb-2">
              Each player is dealt <strong>3, 5, or 7 cards</strong> at the start of each round (you choose this before starting the game).
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Card Values</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Number cards:</strong> Worth their face value (2-10)</li>
              <li>• <strong>Jack:</strong> 11 points</li>
              <li>• <strong>Queen:</strong> 12 points</li>
              <li>• <strong>King:</strong> 13 points</li>
              <li>• <strong>Ace:</strong> 1 point</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Zero-Value Card Rule',
      icon: Sparkles,
      iconColor: 'text-green-500',
      bgColor: 'from-green-50 to-emerald-50',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Each round has a <strong>special zero-value card</strong> that counts as 0 points instead of its normal value.
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-green-300">
            <h4 className="font-semibold text-green-800 mb-2">Example</h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-green-500">
                <span className="text-4xl font-bold text-green-700">7</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  If <strong>7</strong> is the zero-value card this round, then all 7s in your hand count as <strong>0 points</strong>.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              The zero-value card changes every round and must be a number card (5-10 only).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'How a Round is Played',
      icon: Play,
      iconColor: 'text-purple-500',
      bgColor: 'from-purple-50 to-pink-50',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            In real life, players take turns performing one action per turn:
          </p>
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Option 1: Put & Pick</h4>
              <p className="text-xs text-gray-600">
                Place card(s) on the discard pile and pick a card from the discard pile or deck
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Option 2: Just Pick</h4>
              <p className="text-xs text-gray-600">
                Pick a card from the deck without discarding
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Option 3: Call "Show"</h4>
              <p className="text-xs text-gray-600">
                End the round (only allowed after 4+ turns)
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300">
            <p className="text-xs text-gray-700">
              <strong>Note:</strong> This app is a <strong>tracking tool</strong> – you play the real game and log scores here.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Show Rule',
      icon: CheckCircle2,
      iconColor: 'text-indigo-500',
      bgColor: 'from-indigo-50 to-blue-50',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Any player can call <strong>"Show"</strong> to end the round after the 4th turn.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Successful Show
            </h4>
            <p className="text-sm text-gray-700">
              If you have the <strong>lowest card total</strong> in hand, you score <strong>0 points</strong> for the round!
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Failed Show
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              If another player has equal or lower cards, you get a <strong>50-point penalty</strong>.
            </p>
            <p className="text-xs text-gray-600">
              The player with the actual lowest cards gets 0 points.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Scoring & Elimination',
      icon: AlertCircle,
      iconColor: 'text-red-500',
      bgColor: 'from-red-50 to-pink-50',
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Round Scoring</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Winner (lowest cards):</strong> 0 points</li>
              <li>• <strong>Failed show:</strong> 50 points</li>
              <li>• <strong>All other players:</strong> Sum of their remaining card values</li>
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Elimination
            </h4>
            <p className="text-sm text-gray-700">
              If your <strong>total score reaches 100 or more</strong>, you're eliminated from the game!
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Game End
            </h4>
            <p className="text-sm text-gray-700">
              The game ends when only one player remains or after 15 rounds. The player with the lowest score wins!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentSlideData = slides[currentSlide];
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const nextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleClose = () => {
    setCurrentSlide(0);
    onClose();
  };

  const IconComponent = currentSlideData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <CardHeader className={`bg-gradient-to-r ${currentSlideData.bgColor} border-b-4 border-gray-200`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                <IconComponent className={`w-7 h-7 ${currentSlideData.iconColor}`} />
              </div>
              <CardTitle className="text-2xl">{currentSlideData.title}</CardTitle>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8 overflow-y-auto max-h-[60vh]">
          {currentSlideData.content}
        </CardContent>

        <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              onClick={prevSlide}
              disabled={isFirstSlide}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <span className="text-sm text-gray-500">
              {currentSlide + 1} / {slides.length}
            </span>

            {isLastSlide ? (
              <Button
                onClick={handleClose}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2"
              >
                Get Started
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={nextSlide}
                size="sm"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
