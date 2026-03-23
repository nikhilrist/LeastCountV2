import { useState, useEffect, useRef, useMemo } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { RotateCcw, AlertCircle, BookOpen, Sparkles, Crown, TrendingDown, Spade, Heart, Club, Diamond, Info, X } from 'lucide-react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { GameOverModal } from './components/GameOverModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { SlideTutorial } from './components/SlideTutorial';
import { EnhancedCardReveal } from './components/EnhancedCardReveal';
import { AddPlayerPopover } from './components/AddPlayerPopover';
import { HeaderMenu } from './components/HeaderMenu';
import { CardDeckIcon } from './components/CardDeckIcon';

interface PlayerScore {
  [round: number]: number | null;
}

interface Player {
  name: string;
  scores: PlayerScore;
  total: number;
  position: number | null;
  isEliminated: boolean;
}

interface GameSettings {
  cardsPerPlayer: 3 | 5 | 7;
  direction: 'clockwise' | 'anticlockwise';
}

type GameState = 'onboarding' | 'playing' | 'gameOver';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('onboarding');
  const [players, setPlayers] = useState<Player[]>([]);
  const [settings, setSettings] = useState<GameSettings>({
    cardsPerPlayer: 3,
    direction: 'clockwise',
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [zeroValueCards, setZeroValueCards] = useState<{ [round: number]: number }>({});
  const [showResetModal, setShowResetModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [editingScores, setEditingScores] = useState<{ [key: string]: string }>({});
  const [editingCell, setEditingCell] = useState<{ round: number; playerIndex: number } | null>(null);
  const totalRounds = 15;
  const celebrationPlayedRef = useRef(false);
  const booedPlayersRef = useRef<Set<string>>(new Set());
  const [showCardReveal, setShowCardReveal] = useState(false);
  const [revealingCard, setRevealingCard] = useState<number | null>(null);
  const [showRevealButton, setShowRevealButton] = useState(true);
  const [editingPlayerName, setEditingPlayerName] = useState<number | null>(null);
  const [editingPlayerNameValue, setEditingPlayerNameValue] = useState('');
  const [playerToRemove, setPlayerToRemove] = useState<number | null>(null);

  // Sound functions
  const playRoundCompleteTune = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * 0.15);
      const endTime = startTime + 0.3;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  };

  const playBooSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [
      { freq: 200, start: 0, duration: 0.3 },
      { freq: 180, start: 0.25, duration: 0.3 },
      { freq: 160, start: 0.5, duration: 0.5 },
    ];
    
    notes.forEach(({ freq, start, duration }) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + start);
      oscillator.frequency.exponentialRampToValueAtTime(freq * 0.7, audioContext.currentTime + start + duration);
      oscillator.type = 'sawtooth';
      
      const startTime = audioContext.currentTime + start;
      const endTime = startTime + duration;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  };

  const playCelebrationTune = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const melody = [
      { freq: 523.25, start: 0, duration: 0.2 },
      { freq: 659.25, start: 0.2, duration: 0.2 },
      { freq: 783.99, start: 0.4, duration: 0.2 },
      { freq: 1046.50, start: 0.6, duration: 0.3 },
      { freq: 783.99, start: 0.9, duration: 0.15 },
      { freq: 659.25, start: 1.05, duration: 0.15 },
      { freq: 1046.50, start: 1.2, duration: 0.2 },
      { freq: 783.99, start: 1.4, duration: 0.2 },
      { freq: 1046.50, start: 1.6, duration: 0.5 },
    ];
    
    melody.forEach(({ freq, start, duration }) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'triangle';
      
      const startTime = audioContext.currentTime + start;
      const endTime = startTime + duration;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  };

  // Auto-select random zero-value card for new round (now manual trigger)
  const selectRandomZeroCard = () => {
    const validCards = [6, 7, 8, 9, 10, 11, 12, 13];
    const randomCard = validCards[Math.floor(Math.random() * validCards.length)];
    
    // Trigger card reveal animation
    setRevealingCard(randomCard);
    setShowCardReveal(true);
    setShowRevealButton(false); // Hide button after clicked
  };

  const handleCardRevealComplete = () => {
    if (revealingCard !== null) {
      setZeroValueCards(prev => ({ ...prev, [currentRound]: revealingCard }));
    }
    setShowCardReveal(false);
    setRevealingCard(null);
  };

  // Add player functionality (before Round 1 starts) - REMOVED, now handled by AddPlayerPopover component

  // Check if add player option should be visible
  const hasCompletedCurrentRound = players.length > 0 && players[0].scores[currentRound] !== undefined;
  const canAddPlayer = currentRound === 1 && !hasCompletedCurrentRound && Object.values(editingScores).every(s => s === '');

  // Check for game end
  useEffect(() => {
    if (players.length === 0) return;

    const activePlayers = players.filter(p => !p.isEliminated);

    if (activePlayers.length <= 1 && gameState === 'playing') {
      if (!celebrationPlayedRef.current) {
        celebrationPlayedRef.current = true;
        playCelebrationTune();
        setTimeout(() => {
          setGameState('gameOver');
        }, 1500);
      }
    }
  }, [players, gameState]);

  const startGame = (initialPlayers: string[], gameSettings: GameSettings) => {
    setPlayers(
      initialPlayers.map(name => ({
        name,
        scores: {},
        total: 0,
        position: null,
        isEliminated: false,
      }))
    );
    setSettings(gameSettings);
    setGameState('playing');
    setCurrentRound(1);
    setZeroValueCards({});
    // Show reveal button for Round 1 - NO AUTO-REVEAL
    setShowRevealButton(true);
  };

  const confirmReset = () => {
    setShowResetModal(true);
  };

  const resetGame = () => {
    setPlayers(prev => {
      return prev.map((player) => ({
        ...player,
        scores: {},
        total: 0,
        position: null,
        isEliminated: false,
      }));
    });
    setCurrentRound(1);
    setZeroValueCards({});
    setEditingScores({});
    celebrationPlayedRef.current = false;
    booedPlayersRef.current.clear();
    setShowResetModal(false);
    setGameState('playing');
    // Show reveal button for first round
    setShowRevealButton(true);
  };

  const newGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setZeroValueCards({});
    setEditingScores({});
    celebrationPlayedRef.current = false;
    booedPlayersRef.current.clear();
    setGameState('onboarding');
  };

  const handleScoreChange = (round: number, playerIndex: number, value: string) => {
    // Allow only numbers, max 3 digits, and restrict to 0-100 range
    if (value === '' || (/^\d{1,3}$/.test(value) && parseInt(value) <= 100)) {
      const key = `${round}-${playerIndex}`;
      setEditingScores(prev => ({ ...prev, [key]: value }));
      setEditingCell({ round, playerIndex });
    }
  };

  const commitScore = (round: number, playerIndex: number) => {
    const key = `${round}-${playerIndex}`;
    const scoreValue = editingScores[key];
    
    if (scoreValue === undefined || scoreValue === '') {
      // Clear editing state
      setEditingScores(prev => {
        const newScores = { ...prev };
        delete newScores[key];
        return newScores;
      });
      setEditingCell(null);
      return;
    }

    const numericScore = parseInt(scoreValue) || 0;
    
    // Update player score and recalculate totals
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map((player, index) => {
        if (index === playerIndex) {
          const newScores = { ...player.scores, [round]: numericScore };
          const total = Object.values(newScores).reduce((sum, s) => sum + (s || 0), 0);
          const isEliminated = total >= 100;
          
          // If player was eliminated but now total is below 100, bring them back
          const position = isEliminated ? player.position : null;
          
          return { ...player, scores: newScores, total, isEliminated, position };
        }
        return player;
      });

      // Check for newly eliminated players
      const playersOver100 = updatedPlayers
        .map((player, index) => ({ ...player, originalIndex: index }))
        .filter((player) => player.isEliminated && player.position === null);

      if (playersOver100.length > 0) {
        playersOver100.forEach((player) => {
          let crossedAtRound = -1;
          let runningTotal = 0;
          for (let r = 1; r <= totalRounds; r++) {
            runningTotal += player.scores[r] || 0;
            if (runningTotal >= 100) {
              crossedAtRound = r;
              break;
            }
          }
          (player as any).crossedAtRound = crossedAtRound;
        });

        playersOver100.sort((a, b) => {
          if ((a as any).crossedAtRound !== (b as any).crossedAtRound) {
            return (b as any).crossedAtRound - (a as any).crossedAtRound;
          }
          return b.total - a.total;
        });

        const existingPositions = updatedPlayers
          .filter((p) => p.position !== null)
          .map((p) => p.position as number);
        const nextPosition = existingPositions.length > 0 ? Math.min(...existingPositions) - 1 : playersOver100.length;

        playersOver100.forEach((player, idx) => {
          updatedPlayers[player.originalIndex].position = nextPosition - idx;
          if (!booedPlayersRef.current.has(player.name)) {
            booedPlayersRef.current.add(player.name);
            playBooSound();
          }
        });
      }

      // Check if round is complete and advance to next round
      const activePlayers = updatedPlayers.filter(p => !p.isEliminated);
      const allScoresForRound = activePlayers.every(p => p.scores[round] !== undefined);
      
      if (allScoresForRound && round === currentRound && activePlayers.length > 1 && currentRound < totalRounds) {
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          playRoundCompleteTune();
        }, 300);
      }

      return updatedPlayers;
    });

    // Clear editing state for this cell
    setEditingScores(prev => {
      const newScores = { ...prev };
      delete newScores[key];
      return newScores;
    });
    setEditingCell(null);
  };

  const startEditingCell = (round: number, playerIndex: number, currentValue: number | null | undefined) => {
    const key = `${round}-${playerIndex}`;
    setEditingCell({ round, playerIndex });
    setEditingScores(prev => ({
      ...prev,
      [key]: currentValue !== null && currentValue !== undefined ? currentValue.toString() : ''
    }));
  };

  const handleQuickFill = (round: number, playerIndex: number, value: number) => {
    // Directly update player score and recalculate totals
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map((player, index) => {
        if (index === playerIndex) {
          const newScores = { ...player.scores, [round]: value };
          const total = Object.values(newScores).reduce((sum, s) => sum + (s || 0), 0);
          const isEliminated = total >= 100;
          
          // If player was eliminated but now total is below 100, bring them back
          const position = isEliminated ? player.position : null;
          
          return { ...player, scores: newScores, total, isEliminated, position };
        }
        return player;
      });

      // Check for newly eliminated players
      const playersOver100 = updatedPlayers
        .map((player, index) => ({ ...player, originalIndex: index }))
        .filter((player) => player.isEliminated && player.position === null);

      if (playersOver100.length > 0) {
        playersOver100.forEach((player) => {
          let crossedAtRound = -1;
          let runningTotal = 0;
          for (let r = 1; r <= totalRounds; r++) {
            runningTotal += player.scores[r] || 0;
            if (runningTotal >= 100) {
              crossedAtRound = r;
              break;
            }
          }
          (player as any).crossedAtRound = crossedAtRound;
        });

        playersOver100.sort((a, b) => {
          if ((a as any).crossedAtRound !== (b as any).crossedAtRound) {
            return (b as any).crossedAtRound - (a as any).crossedAtRound;
          }
          return b.total - a.total;
        });

        const existingPositions = updatedPlayers
          .filter((p) => p.position !== null)
          .map((p) => p.position as number);
        const nextPosition = existingPositions.length > 0 ? Math.min(...existingPositions) - 1 : playersOver100.length;

        playersOver100.forEach((player, idx) => {
          updatedPlayers[player.originalIndex].position = nextPosition - idx;
          if (!booedPlayersRef.current.has(player.name)) {
            booedPlayersRef.current.add(player.name);
            playBooSound();
          }
        });
      }

      // Check if round is complete and advance to next round
      const activePlayers = updatedPlayers.filter(p => !p.isEliminated);
      const allScoresForRound = activePlayers.every(p => p.scores[round] !== undefined);
      
      if (allScoresForRound && round === currentRound && activePlayers.length > 1 && currentRound < totalRounds) {
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          playRoundCompleteTune();
        }, 300);
      }

      return updatedPlayers;
    });

    // Clear editing state
    const key = `${round}-${playerIndex}`;
    setEditingScores(prev => {
      const newScores = { ...prev };
      delete newScores[key];
      return newScores;
    });
    setEditingCell(null);
  };

  // Auto-select zero card when round changes (DISABLED - now manual trigger only)
  useEffect(() => {
    if (gameState === 'playing' && currentRound > 0 && !zeroValueCards[currentRound]) {
      const hasCompletedPrevRound = currentRound === 1 || (players.length > 0 && players[0].scores[currentRound - 1] !== undefined);
      if (hasCompletedPrevRound) {
        // Show reveal button instead of auto-triggering
        setShowRevealButton(true);
      }
    }
  }, [currentRound, gameState, zeroValueCards, players]);

  const getCellColor = (score: number | null) => {
    if (score === null) return '';
    if (score === 0) return 'text-green-600 font-semibold';
    if (score === 50) return 'text-red-600 font-semibold';
    return '';
  };

  const getPlayerColumnColor = (player: Player) => {
    if (player.isEliminated) return 'bg-gray-100 opacity-50';
    return '';
  };

  // Real-time leaderboard with typed scores
  const realtimeLeaderboard = useMemo(() => {
    const playersWithTempScores = players.map((player, index) => {
      let tempTotal = player.total;
      
      // Add current round score if being typed
      const currentScore = editingScores[`${currentRound}-${index}`];
      if (currentScore && currentScore !== '' && !isNaN(parseInt(currentScore))) {
        const isCurrentRoundComplete = player.scores[currentRound] !== undefined;
        if (!isCurrentRoundComplete) {
          tempTotal += parseInt(currentScore);
        }
      }
      
      return {
        ...player,
        tempTotal,
        isCurrentlyTyping: currentScore !== undefined && currentScore !== '',
      };
    });

    return playersWithTempScores
      .sort((a, b) => {
        if (a.isEliminated !== b.isEliminated) {
          return a.isEliminated ? 1 : -1;
        }
        return a.tempTotal - b.tempTotal;
      })
      .map((player, index) => ({
        ...player,
        rank: player.isEliminated ? null : index + 1,
      }));
  }, [players, editingScores, currentRound]);

  const winner = players.filter(p => !p.isEliminated)[0];
  const activePlayers = players.filter(p => !p.isEliminated);
  const currentZeroCard = zeroValueCards[currentRound];

  // Determine who won/lost the current round for icon indicators
  const getCurrentRoundWinnerAndLoser = () => {
    // Only show indicators if the round is complete and not a future round
    if (currentRound > 0 && players.length > 0) {
      const roundScores = players.map((player, index) => ({
        player,
        score: player.scores[currentRound - 1], // Use previous round since current might not be complete
        index
      })).filter(item => item.score !== null && item.score !== undefined);

      if (roundScores.length > 0) {
        const winner = roundScores.find(item => item.score === 0);
        const loser = roundScores.find(item => item.score === 50);
        return {
          winnerName: winner?.player.name,
          loserName: loser?.player.name
        };
      }
    }
    return { winnerName: null, loserName: null };
  };

  const { winnerName, loserName } = getCurrentRoundWinnerAndLoser();

  const getCardDisplay = (cardValue: number): string => {
    if (cardValue === 11) return 'J';
    if (cardValue === 12) return 'Q';
    if (cardValue === 13) return 'K';
    return cardValue.toString();
  };

  // Player name editing handlers
  const startEditingPlayerName = (playerIndex: number) => {
    setEditingPlayerName(playerIndex);
    setEditingPlayerNameValue(players[playerIndex].name);
  };

  const commitPlayerName = () => {
    if (editingPlayerName !== null && editingPlayerNameValue.trim() !== '') {
      setPlayers(prev => prev.map((player, index) => 
        index === editingPlayerName ? { ...player, name: editingPlayerNameValue.trim() } : player
      ));
    }
    setEditingPlayerName(null);
    setEditingPlayerNameValue('');
  };

  const cancelEditingPlayerName = () => {
    setEditingPlayerName(null);
    setEditingPlayerNameValue('');
  };

  // Player removal handlers
  const confirmRemovePlayer = (playerIndex: number) => {
    setPlayerToRemove(playerIndex);
  };

  const removePlayer = () => {
    if (playerToRemove !== null) {
      setPlayers(prev => prev.filter((_, index) => index !== playerToRemove));
      // Clear any editing scores for this player
      setEditingScores(prev => {
        const newScores = { ...prev };
        Object.keys(newScores).forEach(key => {
          const [_, playerIdx] = key.split('-');
          if (parseInt(playerIdx) === playerToRemove) {
            delete newScores[key];
          } else if (parseInt(playerIdx) > playerToRemove) {
            // Shift down scores for players after the removed one
            const [round] = key.split('-');
            const newKey = `${round}-${parseInt(playerIdx) - 1}`;
            newScores[newKey] = newScores[key];
            delete newScores[key];
          }
        });
        return newScores;
      });
      // Update editingCell if needed
      if (editingCell) {
        if (editingCell.playerIndex === playerToRemove) {
          setEditingCell(null);
        } else if (editingCell.playerIndex > playerToRemove) {
          setEditingCell(prev => prev ? { ...prev, playerIndex: prev.playerIndex - 1 } : null);
        }
      }
    }
    setPlayerToRemove(null);
  };

  if (gameState === 'onboarding') {
    return <OnboardingScreen onStart={startGame} />;
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Wood-Tone Header Bar - Enhanced - TOPMOST LAYER */}
      <div className="bg-gradient-to-b from-[#8B6F5E] to-[#6D4C41] border-b-4 border-[#5d3a2e] px-4 md:px-6 py-4 md:py-5 shadow-[0_4px_16px_rgba(0,0,0,0.4)] relative z-[200]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            {/* Card Deck Icon */}
            <CardDeckIcon className="w-8 h-8 md:w-9 md:h-9 text-[#D4AF37] flex-shrink-0" />
            <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] truncate">Least Count</h1>
          </div>
          
          {/* Desktop Actions - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2.5">
            <AddPlayerPopover onAddPlayer={(name) => {
              if (!players.find(p => p.name === name)) {
                setPlayers(prev => [...prev, {
                  name,
                  scores: {},
                  total: 0,
                  position: null,
                  isEliminated: false,
                }]);
                if (currentRound === 1 && !hasCompletedCurrentRound && Object.values(editingScores).every(s => s === '')) {
                  setEditingScores(prev => ({
                    ...prev,
                    [players.length]: '',
                  }));
                }
              }
            }} isVisible={canAddPlayer} />
            <Button
              onClick={() => setShowTutorial(true)}
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 shadow-lg font-semibold px-4 py-2 h-10"
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Guide
            </Button>
            <Button 
              onClick={confirmReset} 
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 shadow-lg font-semibold px-4 py-2 h-10"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Restart
            </Button>
            <Button 
              onClick={newGame} 
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 shadow-lg font-semibold px-4 py-2 h-10"
              size="sm"
            >
              New Game
            </Button>
          </div>

          {/* Mobile Actions - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-2">
            <AddPlayerPopover onAddPlayer={(name) => {
              if (!players.find(p => p.name === name)) {
                setPlayers(prev => [...prev, {
                  name,
                  scores: {},
                  total: 0,
                  position: null,
                  isEliminated: false,
                }]);
                if (currentRound === 1 && !hasCompletedCurrentRound && Object.values(editingScores).every(s => s === '')) {
                  setEditingScores(prev => ({
                    ...prev,
                    [players.length]: '',
                  }));
                }
              }
            }} isVisible={canAddPlayer} />
            <HeaderMenu
              onGuideClick={() => setShowTutorial(true)}
              onRestartClick={confirmReset}
              onNewGameClick={newGame}
            />
          </div>
        </div>
      </div>

      {/* Playing Card Zero-Value Banner */}
      {currentZeroCard && (
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] border-b-4 border-[#145214] px-4 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.2)] relative z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              {/* Simple Playing Card */}
              <div className="relative flex-shrink-0 w-10 h-14 bg-white rounded-md border border-gray-300 shadow-md flex items-center justify-center">
                <div className="relative">
                  <span className="text-xl font-bold text-gray-900">{getCardDisplay(currentZeroCard)}</span>
                  <Spade className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 text-gray-900 opacity-20" />
                </div>
              </div>
              
              <div className="text-white">
                <span className="font-bold text-base">Zero-value card:</span> <span className="font-semibold text-base">{getCardDisplay(currentZeroCard)} counts as 0 this round</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reveal Zero-Value Card Button */}
      {showRevealButton && !currentZeroCard && !showCardReveal && (
        <div className="bg-gradient-to-r from-[#0E5A3A]/80 to-[#0a4429]/80 border-b-2 border-white/10 px-4 py-5 shadow-lg relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-5">
            <Button
              onClick={selectRandomZeroCard}
              className="bg-gradient-to-b from-[#E6C36A] to-[#C9A24D] hover:from-[#EDD084] hover:to-[#D4AF37] text-[#2B210F] font-bold shadow-[0_6px_0_#B8935F,0_8px_20px_rgba(201,162,77,0.5),0_0_30px_rgba(230,195,106,0.3)] border-b-4 border-[#B8935F] transition-all"
              size="lg"
              style={{ fontSize: '1.05rem', height: '3.25rem', paddingLeft: '2rem', paddingRight: '2rem' }}
              aria-describedby="reveal-card-tooltip"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Reveal Zero-Value Card
            </Button>
            <div 
              id="reveal-card-tooltip"
              className="flex items-center gap-1.5 text-white/70 text-xs"
              role="note"
              aria-live="polite"
            >
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reveal the zero-value card to start the round</span>
            </div>
          </div>
        </div>
      )}

      {/* Card Reveal Animation - Inline */}
      <EnhancedCardReveal
        isOpen={showCardReveal}
        cardValue={revealingCard}
        onComplete={handleCardRevealComplete}
      />

      {/* Main Content with Sticky Leaderboard */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 flex gap-6 relative z-[1] overflow-hidden">
        {/* Score Table - Card Surface */}
        <div className="flex-1 w-full md:w-auto bg-[#FAFAF7] rounded-2xl border-2 border-gray-200 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col h-full">
          {/* Fixed Header */}
          <div className="flex-shrink-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-b from-gray-50 to-gray-100">
                  <tr className="border-b-2 border-gray-300">
                    <th className="sticky left-0 z-30 px-3 py-2 md:py-3 text-left text-xs md:text-sm font-bold text-gray-900 w-16 min-w-[4rem] max-w-[4rem] bg-gradient-to-b from-gray-50 to-gray-100 border-r-2 border-gray-300">Round</th>
                    {players.map((player, index) => (
                      <th
                        key={index}
                        className={`px-2 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold transition-all min-w-[80px] md:min-w-0 relative group ${
                          player.isEliminated ? 'text-gray-400' : 'text-gray-900'
                        } ${getPlayerColumnColor(player)}`}
                      >
                        {editingPlayerName === index ? (
                          <div className="flex flex-col gap-1 items-center">
                            <Input
                              type="text"
                              value={editingPlayerNameValue}
                              onChange={(e) => setEditingPlayerNameValue(e.target.value)}
                              onBlur={commitPlayerName}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  commitPlayerName();
                                } else if (e.key === 'Escape') {
                                  cancelEditingPlayerName();
                                }
                              }}
                              className="text-center h-7 text-xs border-2 border-blue-400 rounded px-1 bg-white font-bold w-full max-w-[100px]"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => startEditingPlayerName(index)}
                                className="truncate hover:text-blue-600 transition-colors"
                                title="Click to edit name"
                              >
                                {player.name}
                              </button>
                              <button
                                onClick={() => confirmRemovePlayer(index)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:bg-red-100 rounded p-0.5"
                                title="Remove player"
                              >
                                <X className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-600" />
                              </button>
                            </div>
                            {player.isEliminated && (
                              <div className="text-[10px] md:text-xs text-[#c62828] font-semibold">OUT</div>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Scrollable Rounds Section */}
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <table className="w-full border-collapse">
              <tbody>
                {Array.from({ length: totalRounds }, (_, roundIndex) => {
                  const round = roundIndex + 1;
                  const isCurrentRound = round === currentRound;
                  const isFutureRound = round > currentRound;
                  const isCompletedRound = players[0]?.scores[round] !== undefined;
                  const isEvenRow = roundIndex % 2 === 0;
                  
                  return (
                    <tr
                      key={round}
                      className={`border-b border-gray-200 transition-all ${
                        isCurrentRound && !isCompletedRound 
                          ? 'bg-blue-50/50 border-l-4 md:border-l-4 border-l-[#1F7A4D]' 
                          : isEvenRow 
                          ? 'bg-[#FAF9F6]' 
                          : 'bg-[#F4F1EA]'
                      } ${isFutureRound ? 'opacity-40' : ''}`}
                    >
                      <td className="sticky left-0 z-10 px-3 py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-800 bg-inherit border-r-2 border-gray-200 w-16 min-w-[4rem] max-w-[4rem]">
                        {round}
                      </td>
                      {players.map((player, playerIndex) => {
                        const score = player.scores[round];
                        const key = `${round}-${playerIndex}`;
                        const isBeingEdited = editingCell?.round === round && editingCell?.playerIndex === playerIndex;
                        const roundCardRevealed = zeroValueCards[round] !== undefined;
                        // Allow editing for all players (including eliminated) if card is revealed and not a future round
                        const canEdit = roundCardRevealed && !isFutureRound;
                        const isLockedWaitingForReveal = isCurrentRound && !roundCardRevealed && !isFutureRound;
                        
                        return (
                          <td
                            key={playerIndex}
                            className={`px-1.5 md:px-2 py-2 text-center ${getCellColor(score)} ${getPlayerColumnColor(player)}`}
                          >
                            {isBeingEdited ? (
                              <div className="flex flex-col gap-2">
                                <Input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="-"
                                  value={editingScores[key] || ''}
                                  onChange={(e) => handleScoreChange(round, playerIndex, e.target.value)}
                                  onBlur={() => commitScore(round, playerIndex)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      commitScore(round, playerIndex);
                                    }
                                  }}
                                  className="text-center h-9 md:h-10 text-xs md:text-sm border-2 border-blue-400 rounded-xl mx-auto shadow-md bg-white font-bold"
                                  style={{ width: '50px' }}
                                  autoFocus
                                />
                                <div className="flex gap-1.5 justify-center">
                                  <button
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleQuickFill(round, playerIndex, 0);
                                    }}
                                    className="px-2 md:px-3 py-1 text-[10px] md:text-xs bg-gradient-to-b from-[#66BB6A] to-[#43A047] hover:from-[#81C784] hover:to-[#66BB6A] text-white rounded-full font-bold shadow-[0_2px_0_#2E7D32] active:translate-y-0.5 transition-all"
                                  >
                                    0
                                  </button>
                                  <button
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleQuickFill(round, playerIndex, 50);
                                    }}
                                    className="px-2 md:px-3 py-1 text-[10px] md:text-xs bg-gradient-to-b from-[#EF5350] to-[#E53935] hover:from-[#F44336] hover:to-[#EF5350] text-white rounded-full font-bold shadow-[0_2px_0_#c62828] active:translate-y-0.5 transition-all"
                                  >
                                    50
                                  </button>
                                </div>
                              </div>
                            ) : isLockedWaitingForReveal ? (
                              <div className="text-[10px] md:text-xs text-gray-400 italic py-1 font-medium">
                                Locked
                              </div>
                            ) : canEdit ? (
                              <button
                                onClick={() => startEditingCell(round, playerIndex, score)}
                                className="text-xs md:text-sm font-semibold hover:bg-gray-100 w-full py-1.5 rounded-lg transition-all"
                              >
                                {score !== null && score !== undefined ? score : '-'}
                              </button>
                            ) : (
                              <div className="text-xs md:text-sm font-semibold">
                                {score !== null && score !== undefined ? score : '-'}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Fixed Total Footer */}
          <div className="flex-shrink-0 border-t-4 border-gray-300 bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="font-bold">
                    <td className="sticky left-0 z-20 px-3 py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900 bg-gradient-to-b from-gray-100 to-gray-200 border-r-2 border-gray-300 w-16 min-w-[4rem] max-w-[4rem]">Total</td>
                    {players.map((player, index) => (
                      <td
                        key={index}
                        className={`px-2 md:px-4 py-2 md:py-3 text-center text-xs md:text-sm font-bold min-w-[80px] md:min-w-0 ${
                          player.isEliminated ? 'text-[#c62828]' : 'text-gray-900'
                        }`}
                      >
                        {player.total}
                        {player.total >= 100 && <AlertCircle className="w-3 h-3 md:w-3.5 md:h-3.5 inline ml-1 text-[#c62828]" />}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sticky Leaderboard Panel - Card Surface - Hidden on mobile */}
        <div className="hidden md:flex w-80 flex-shrink-0 h-full">
          <div className="bg-[#FAFAF7] rounded-2xl border-2 border-gray-200 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col w-full">
            {/* Fixed Leaderboard Header */}
            <div className="flex-shrink-0 bg-gradient-to-b from-gray-50 to-gray-100 px-5 py-4 border-b-2 border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CardDeckIcon className="w-6 h-6 text-[#D4AF37]" />
                Leaderboard
              </h3>
              <p className="text-xs text-gray-600 mt-1 font-semibold">Live rankings</p>
            </div>
            
            {/* Scrollable Leaderboard Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {realtimeLeaderboard.map((player) => {
                const isLeader = player.rank === 1;
                const displayTotal = player.tempTotal;
                const isWinner = player.name === winnerName;
                
                // Show TrendingDown icon only on the last-ranked player (highest rank number among non-eliminated)
                const activePlayersWithRanks = realtimeLeaderboard.filter(p => !p.isEliminated && p.rank !== null);
                const highestRank = activePlayersWithRanks.length > 0 
                  ? Math.max(...activePlayersWithRanks.map(p => p.rank!))
                  : 0;
                const isLastRanked = !player.isEliminated && player.rank === highestRank && activePlayersWithRanks.length > 1;
                
                return (
                  <div
                    key={player.name}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      player.isEliminated
                        ? 'bg-gray-50 opacity-60 border-2 border-gray-200 shadow-sm'
                        : isLeader
                        ? 'bg-gradient-to-r from-[#FFF5DC] to-[#FFEEB8] border-2 border-[#C9A24D] shadow-[0_4px_16px_rgba(201,162,77,0.35)]'
                        : 'bg-[#FAF9F6] border-2 border-[#D6D1C4] shadow-sm'
                    } ${player.isCurrentlyTyping ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {player.rank && (
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                            player.rank === 1
                              ? 'bg-gradient-to-b from-[#E6C36A] to-[#C9A24D] text-[#2B210F] border-2 border-[#A6894A]'
                              : player.rank === 2
                              ? 'bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 border-2 border-gray-400'
                              : player.rank === 3
                              ? 'bg-gradient-to-b from-orange-200 to-orange-300 text-orange-900 border-2 border-orange-400'
                              : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 border-2 border-gray-300'
                          }`}
                        >
                          {player.rank}
                        </div>
                      )}
                      {player.isEliminated && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-b from-red-100 to-red-200 border-2 border-[#c62828] flex items-center justify-center text-[#c62828] text-sm font-bold shadow-md">
                          ✕
                        </div>
                      )}
                      <div>
                        <div className={`flex items-center gap-1.5 text-sm font-bold truncate max-w-[140px] ${
                          isLeader ? 'text-gray-900' : 'text-gray-800'
                        }`}>
                          {player.name}
                          {isWinner && !player.isEliminated && (
                            <Crown className="w-4 h-4 text-[#C9A24D] flex-shrink-0" title="Round winner" />
                          )}
                          {isLastRanked && (
                            <TrendingDown className="w-4 h-4 text-red-600 flex-shrink-0" title="Last place" />
                          )}
                        </div>
                        {player.position !== null && (
                          <div className="text-xs text-[#c62828] font-bold">OUT #{player.position}</div>
                        )}
                      </div>
                    </div>
                    <div className={`text-base font-bold tabular-nums ${
                      player.isEliminated ? 'text-[#c62828]' : isLeader ? 'text-[#A6894A]' : 'text-gray-900'
                    }`}>
                      {displayTotal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={resetGame}
        title="Reset Game?"
        message="This will clear all scores and start fresh. Players will remain but all progress will be lost."
      />

      <ConfirmationModal
        isOpen={playerToRemove !== null}
        onClose={() => setPlayerToRemove(null)}
        onConfirm={removePlayer}
        title="Remove Player?"
        message={`Are you sure you want to remove ${playerToRemove !== null ? players[playerToRemove]?.name : ''}? All their scores will be deleted.`}
      />

      <SlideTutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />

      <GameOverModal
        isOpen={gameState === 'gameOver'}
        winner={winner}
        players={realtimeLeaderboard}
        onNewGame={newGame}
        onRestart={resetGame}
      />
    </div>
  );
}