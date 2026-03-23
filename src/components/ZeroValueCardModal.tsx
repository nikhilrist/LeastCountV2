import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles, AlertCircle } from 'lucide-react';

interface ZeroValueCardModalProps {
  isOpen: boolean;
  round: number;
  onConfirm: (cardValue: number) => void;
}

export function ZeroValueCardModal({ isOpen, round, onConfirm }: ZeroValueCardModalProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  // Valid zero-value cards: 6, 7, 8, 9, 10, J(11), Q(12), K(13)
  const validCards = [6, 7, 8, 9, 10, 11, 12, 13];

  const getCardDisplay = (cardValue: number): string => {
    if (cardValue === 11) return 'J';
    if (cardValue === 12) return 'Q';
    if (cardValue === 13) return 'K';
    return cardValue.toString();
  };

  const handleConfirm = () => {
    if (selectedCard === null) {
      setError('Please select a zero-value card');
      return;
    }

    setError('');
    onConfirm(selectedCard);
    setSelectedCard(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="max-w-lg w-full shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-4 border-green-400">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-2xl">Select Zero-Value Card</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Round {round}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-6">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-gray-700">
                Choose which <strong>number card</strong> will count as <strong>0 points</strong> for this round.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Only cards from 6 to 10 and J, Q, K are allowed.
              </p>
            </div>

            {/* Card Selection Grid */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Select Card Value
              </label>
              <div className="grid grid-cols-3 gap-3">
                {validCards.map((cardValue) => (
                  <button
                    key={cardValue}
                    onClick={() => {
                      setSelectedCard(cardValue);
                      setError('');
                    }}
                    className={`h-32 rounded-lg border-4 font-bold text-4xl transition-all shadow-lg ${
                      selectedCard === cardValue
                        ? 'bg-green-100 border-green-500 text-green-700 scale-105'
                        : 'bg-white border-gray-300 hover:border-green-300 hover:scale-105'
                    }`}
                  >
                    {getCardDisplay(cardValue)}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border-2 border-red-300">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              disabled={selectedCard === null}
              className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedCard !== null ? `Confirm ${getCardDisplay(selectedCard)} as Zero-Value Card` : 'Select a Card'}
            </Button>

            {selectedCard !== null && (
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <p className="text-sm text-center text-gray-700">
                  All <strong className="text-green-700 text-lg">{getCardDisplay(selectedCard)}</strong>s will count as <strong className="text-green-700 text-lg">0 points</strong> this round
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}