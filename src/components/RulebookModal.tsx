import { Book, X, Trophy, Target, AlertCircle, Crown, CheckCircle2, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface RulebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulebookModal({ isOpen, onClose }: RulebookModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="max-w-4xl w-full my-8 shadow-2xl border-2 border-blue-300">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Least Count - Complete Rulebook</h2>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto bg-white">
          {/* Game Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-800">Game Overview</h3>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <p className="text-gray-700">
                <strong>Least Count</strong> is a card game where players aim to achieve the <strong>lowest total score</strong> across multiple rounds. 
                Players strategically manage their hands, utilize the zero-value card, and call "Show" at the right moment to minimize points.
              </p>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Players:</strong> 2 or more</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Rounds:</strong> Up to 15</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Cards per player:</strong> 3, 5, or 7</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Elimination at:</strong> 100+ points</span>
                </div>
              </div>
            </div>
          </section>

          {/* Zero Value Card */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Zero-Value Card Rule</h3>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200 space-y-3">
              <p className="text-gray-700">
                Each round has a <strong>special card that counts as 0 points</strong>. This is the most powerful card in the round!
              </p>
              <div className="bg-white p-3 rounded border border-green-300">
                <div className="font-semibold text-green-800 mb-2">How it works:</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">1.</span>
                    <span>Round 1: <strong>Ace (A)</strong> is worth 0 points</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    <span>Round 2: <strong>2</strong> is worth 0 points</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">3.</span>
                    <span>Continues cycling: 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, then back to A</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded border border-yellow-300">
                <div className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Important
                </div>
                <p className="text-sm text-gray-700">
                  The zero-value card is <strong>only worth 0 for that specific round</strong>. In other rounds, it has its normal value.
                </p>
              </div>
            </div>
          </section>

          {/* Gameplay & Turns */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Play className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Gameplay & Turn Order</h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 space-y-3">
              <div>
                <div className="font-semibold text-blue-800 mb-2">Starting Player</div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Round 1:</strong> Any player can start</li>
                  <li>• <strong>Subsequent rounds:</strong> Player next to the previous round's winner</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border border-blue-300">
                <div className="font-semibold text-blue-800 mb-2">On Your Turn (choose one action):</div>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span><strong>Put down one card</strong> (or multiple cards of the same rank)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span><strong>Pick the last placed card</strong> from the discard pile</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span><strong>Pick a card from the deck</strong></span>
                  </li>
                </ol>
              </div>
              <div>
                <div className="font-semibold text-blue-800 mb-2">Turn Direction</div>
                <p className="text-sm text-gray-700">
                  Play proceeds either <strong>clockwise</strong> or <strong>anticlockwise</strong> based on game settings.
                </p>
              </div>
            </div>
          </section>

          {/* Show Action */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Show Action & Round End</h3>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 space-y-3">
              <p className="text-gray-700">
                Any player can call <strong>"Show"</strong> to end the round and reveal all hands.
              </p>
              <div className="bg-red-50 p-3 rounded border border-red-300">
                <div className="font-semibold text-red-800 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Show Restriction
                </div>
                <p className="text-sm text-gray-700">
                  Show can <strong>only be called after Turn 4</strong>. The first 3 turns are locked.
                </p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-300">
                <div className="font-semibold text-purple-800 mb-2">Show Outcomes:</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 bg-green-50 rounded border border-green-200">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-green-800">Successful Show</div>
                      <p className="text-sm text-gray-700">
                        You have the <strong>lowest total card value</strong> → You score <strong className="text-green-700">0 points</strong>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Others score their card totals (zero-value card counts as 0)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-red-50 rounded border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-800">Failed Show</div>
                      <p className="text-sm text-gray-700">
                        Another player has <strong>equal or lower card value</strong> → You score <strong className="text-red-700">50 points penalty</strong>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">The actual winner scores 0, others score their card totals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scoring */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">Scoring System</h3>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200 space-y-3">
              <div className="bg-white p-3 rounded border border-orange-300">
                <div className="font-semibold text-orange-800 mb-2">Card Values:</div>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-xs font-bold text-green-700">0</div>
                    <span>Zero-value card for that round</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-700">1</div>
                    <span>Ace (A)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-700">2-10</div>
                    <span>Number cards (face value)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-700">10</div>
                    <span>Jack, Queen, King (J, Q, K)</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-orange-300">
                <div className="font-semibold text-orange-800 mb-2">Round Scoring:</div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong className="text-green-700">Winner: 0 points</strong> (lowest hand or successful show)</li>
                  <li>• <strong className="text-red-700">Failed Show: 50 points</strong> (penalty for incorrect show)</li>
                  <li>• <strong>Others:</strong> Sum of their card values</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Elimination & Winning */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-800">Elimination & Victory</h3>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-300 space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded border-2 border-red-300">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-red-800 mb-1">Elimination Rule</div>
                  <p className="text-sm text-gray-700">
                    When a player's <strong>total score reaches 100 or more points</strong>, they are <strong>eliminated</strong> from the game.
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 space-y-1">
                    <li>• Eliminated players cannot take turns</li>
                    <li>• Their scores are locked</li>
                    <li>• Elimination order is tracked and displayed</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded border-2 border-yellow-400">
                <Crown className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-yellow-800 mb-1">Winning Conditions</div>
                  <p className="text-sm text-gray-700 mb-2">
                    The game ends when:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Only one player remains active</strong> (all others eliminated)</li>
                    <li>• <strong>All 15 rounds are completed</strong></li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-2">
                    The <strong>winner</strong> is the last active player with the <strong>lowest total score</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strategy Tips */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-800">Strategy Tips</h3>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Prioritize the zero-value card</strong> - It's your best friend each round</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Time your Show carefully</strong> - Wait until you're confident you have the lowest hand</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Watch other players</strong> - Track their discards to guess their hand strength</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Avoid the 50-point penalty</strong> - A failed show can quickly lead to elimination</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Play conservatively near 100 points</strong> - One bad round can eliminate you</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 border-t rounded-b-lg">
          <Button onClick={onClose} className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Close Rulebook
          </Button>
        </div>
      </Card>
    </div>
  );
}
