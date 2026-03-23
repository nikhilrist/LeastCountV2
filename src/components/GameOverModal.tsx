import { Crown, PartyPopper, RotateCcw, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CardDeckIcon } from './CardDeckIcon';

interface Player {
  name: string;
  total: number;
  isEliminated: boolean;
  rank: number | null;
  position: number | null;
}

interface GameOverModalProps {
  isOpen: boolean;
  winner: Player | undefined;
  players: Player[];
  onNewGame: () => void;
  onRestart: () => void;
}

export function GameOverModal({ isOpen, winner, players, onNewGame, onRestart }: GameOverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[250] p-4 animate-in fade-in duration-300">
      <Card className="max-w-2xl w-full max-h-[95vh] flex flex-col shadow-[0_12px_48px_rgba(0,0,0,0.3)] border-4 border-[#D4AF37] animate-in zoom-in duration-500 bg-[#FAFAF7] rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#FFF9E6] via-[#FFF4D6] to-[#FFEFC7] p-4 sm:p-6 md:p-8 border-b-4 border-[#D4AF37] flex-shrink-0">
          {/* Celebration Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#D4AF37] animate-bounce drop-shadow-md" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Game Over!</h2>
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#D4AF37] animate-bounce drop-shadow-md" style={{ animationDelay: '0.2s' }} />
            </div>
            
            {winner && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 md:p-6 bg-gradient-to-b from-[#F4E5B7] to-[#D4AF37] rounded-2xl border-4 border-[#B8935F] shadow-[0_8px_24px_rgba(212,175,55,0.4)]">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-900" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Winner</h3>
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-900" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">{winner.name}</p>
                <div className="flex items-center justify-center gap-2">
                  <CardDeckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-900" />
                  <p className="text-base sm:text-lg md:text-xl text-gray-900 font-bold">
                    Final Score: <strong>{winner.total}</strong> points
                  </p>
                </div>
              </div>
            )}

            {!winner && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 md:p-6 bg-white rounded-2xl border-4 border-gray-300 shadow-lg">
                <p className="text-xl sm:text-2xl font-bold text-gray-700">All players eliminated!</p>
                <p className="text-sm sm:text-base text-gray-600 mt-2 font-semibold">No winner this time</p>
              </div>
            )}
          </div>
        </div>

        {/* Final Rankings */}
        <div className="p-4 sm:p-6 md:p-8 bg-[#FAFAF7] flex-1 overflow-y-auto">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <CardDeckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
            Final Rankings
          </h3>
          
          <div className="space-y-2 mb-4 sm:mb-6">
            {players.map((player, index) => {
              const isWinner = player.name === winner?.name;
              return (
                <div
                  key={player.name}
                  className={`
                    flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all shadow-sm
                    ${isWinner
                      ? 'bg-gradient-to-r from-[#FFF9E6] to-[#FFF4D6] border-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.2)]'
                      : player.isEliminated
                      ? 'bg-red-50 border-red-300'
                      : 'bg-white border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {player.rank && (
                      <div
                        className={`
                          flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold shadow-md border-2 text-sm sm:text-base
                          ${player.rank === 1
                            ? 'bg-gradient-to-b from-[#F4E5B7] to-[#D4AF37] border-[#B8935F] text-gray-900 sm:text-lg'
                            : player.rank === 2
                            ? 'bg-gradient-to-b from-gray-200 to-gray-300 border-gray-400 text-gray-800'
                            : player.rank === 3
                            ? 'bg-gradient-to-b from-orange-200 to-orange-300 border-orange-400 text-orange-900'
                            : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-700'
                          }
                        `}
                      >
                        {player.rank}
                      </div>
                    )}
                    {player.isEliminated && !player.rank && (
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-red-100 to-red-200 border-2 border-[#c62828] text-[#c62828] font-bold shadow-md">
                        ✕
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-sm sm:text-base text-gray-900 flex items-center gap-2">
                        {player.name}
                        {isWinner && <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4AF37]" />}
                      </div>
                      {player.isEliminated && (
                        <p className="text-xs text-[#c62828] font-bold">Eliminated #{player.position}</p>
                      )}
                    </div>
                  </div>
                  <div className={`text-base sm:text-lg font-bold ${isWinner ? 'text-[#B8935F]' : player.isEliminated ? 'text-[#c62828]' : 'text-gray-900'}`}>
                    {player.total} pts
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onRestart}
              className="flex-1 h-14 text-base font-bold"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again (Same Players)
            </Button>
            <Button
              onClick={onNewGame}
              variant="secondary"
              className="flex-1 h-14 text-base font-bold"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}