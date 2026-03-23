import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Target, AlertCircle, Crown, Plus, Trash2, Eye, BookOpen, X } from 'lucide-react';
import { SlideTutorial } from './SlideTutorial';
import { CardDeckIcon } from './CardDeckIcon';

interface GameSettings {
  cardsPerPlayer: 3 | 5 | 7;
  direction: 'clockwise' | 'anticlockwise';
}

interface OnboardingScreenProps {
  onStart: (players: string[], settings: GameSettings) => void;
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showRulesDrawer, setShowRulesDrawer] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [settings, setSettings] = useState<GameSettings>({
    cardsPerPlayer: 3,
    direction: 'clockwise',
  });

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    if (players.length >= 2) {
      onStart(players, { cardsPerPlayer: 3, direction: 'clockwise' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Compact Header Bar */}
      <header className="bg-gradient-to-b from-[#8B6F5E] to-[#6D4C41] border-b-4 border-[#5d3a2e] px-6 h-[68px] flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <CardDeckIcon className="w-9 h-9 text-[#D4AF37] flex-shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">Least Count</h1>
            <p className="text-xs text-white/80 font-medium">House Rules Edition</p>
          </div>
        </div>
        
        {/* Mobile Only - Learn How to Play Button */}
        <Button
          onClick={() => setShowTutorial(true)}
          className="md:hidden bg-white/10 hover:bg-white/20 text-white h-9 px-3 text-sm font-bold rounded-lg border border-white/20"
        >
          <BookOpen className="w-4 h-4 mr-1.5" />
          How to Play
        </Button>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Column - Rules (Quick) */}
          <div className="hidden md:flex bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.2)] border-2 border-gray-200 p-8 flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#1F7A4D]" />
              Rules (Quick)
            </h2>
            <div className="space-y-5 flex-1">
              {/* Objective */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-green-400 to-green-500 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Objective:</span> Achieve the lowest total score
                  </p>
                </div>
              </div>

              {/* Zero Card */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">0</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Zero Card:</span> Special card worth 0 pts (changes each round)
                  </p>
                </div>
              </div>

              {/* Show */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Show:</span> Call after turn 3 if you have lowest cards
                  </p>
                </div>
              </div>

              {/* Elimination */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-red-400 to-red-500 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Elimination:</span> Reach 100+ total points and you're out
                  </p>
                </div>
              </div>
            </div>
            
            {/* Disclaimer Text */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed text-center">
                This is a real-world card game played using a physical deck of playing cards.
              </p>
            </div>
            
            {/* Learn How to Play Button */}
            <Button
              onClick={() => setShowTutorial(true)}
              className="w-full mt-5 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white h-11 text-base font-bold rounded-xl shadow-[0_4px_0_#4a5568] active:translate-y-0.5 active:shadow-[0_2px_0_#4a5568] transition-all"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn How to Play
            </Button>
          </div>

          {/* Right Column - Add Players (Primary Focus) */}
          <div className="bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.2)] border-2 border-[#1F7A4D]/20 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#1F7A4D] to-[#0E5A3A] flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add Players</h2>
            </div>

            {/* Input Section */}
            <div className="flex gap-3 mb-5">
              <Input
                type="text"
                placeholder="Enter player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-11 px-4 text-base border-2 border-gray-300 focus:border-[#1F7A4D] rounded-xl"
              />
              <Button
                onClick={addPlayer}
                disabled={!newPlayerName.trim()}
                className="bg-gradient-to-b from-[#1F7A4D] to-[#0E5A3A] hover:from-[#2A8D5E] hover:to-[#1F7A4D] text-white h-11 w-11 p-0 rounded-xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {/* Player List */}
            <div className="space-y-2 flex-1 overflow-y-auto mb-5 max-h-[400px]">
              {players.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No players added yet</p>
                  <p className="text-xs text-gray-400 mt-1">Add at least 2 players to start</p>
                </div>
              ) : (
                players.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <span className="font-semibold text-gray-900 text-base">{player}</span>
                    <button
                      onClick={() => removePlayer(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      aria-label={`Remove ${player}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Start Button */}
            <Button
              onClick={handleStart}
              disabled={players.length < 2}
              className="w-full bg-gradient-to-b from-[#1F7A4D] to-[#0E5A3A] hover:from-[#2A8D5E] hover:to-[#1F7A4D] text-white h-11 text-base font-bold rounded-xl shadow-[0_4px_0_#0a4429] active:translate-y-0.5 active:shadow-[0_2px_0_#0a4429] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0"
            >
              {players.length < 2
                ? `Add ${2 - players.length} more player${2 - players.length === 1 ? '' : 's'} to start`
                : 'Start Game'}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="text-center py-4 text-sm text-white/70 font-medium flex-shrink-0">
        Game continues for 15 rounds or until one player remains
      </footer>

      {/* Rules Drawer (Right Side) */}
      {showRulesDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRulesDrawer(false)}
          />
          
          {/* Drawer */}
          <div className="relative bg-white w-full max-w-lg h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-gradient-to-b from-[#8B6F5E] to-[#6D4C41] px-6 py-5 flex items-center justify-between border-b-4 border-[#5d3a2e] z-10">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="text-xl font-bold text-white">How to Play</h2>
              </div>
              <button
                onClick={() => setShowRulesDrawer(false)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                aria-label="Close rules"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Objective */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Objective</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Achieve the <span className="font-bold">lowest total score</span> across all rounds. Last player standing with the lowest count wins!
                </p>
              </div>

              {/* Zero Value Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">0</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Zero Value Card</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  Each round has a <span className="font-bold">special card worth 0 points</span>. The card changes every round!
                </p>
                <div className="bg-white/70 rounded-lg p-3 text-xs text-gray-600">
                  <p className="font-semibold mb-1">Example:</p>
                  <p>If "7" is the zero-value card this round, all 7s count as 0 points instead of their face value.</p>
                </div>
              </div>

              {/* Show Action */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Show Action</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Call <span className="font-bold">"Show"</span> to end the round (after turn 3):
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700"><span className="font-bold">Success:</span> You have the lowest cards → 0 pts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold flex-shrink-0">✕</span>
                    <span className="text-gray-700"><span className="font-bold">Failed:</span> Someone has equal/lower → +50 pts penalty</span>
                  </li>
                </ul>
              </div>

              {/* Elimination */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-red-500 to-red-600 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Elimination</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Reach <span className="font-bold">100+ total points</span> and you're eliminated! The game continues until only one player remains.
                </p>
              </div>

              {/* Victory */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Victory</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Last player standing with the <span className="font-bold">lowest score wins</span>! The game ends after 15 rounds or when only one player remains.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Slide */}
      {showTutorial && (
        <SlideTutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      )}
    </div>
  );
}