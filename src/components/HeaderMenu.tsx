import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { MoreVertical, BookOpen, RotateCcw, X } from 'lucide-react';

interface HeaderMenuProps {
  onGuideClick: () => void;
  onRestartClick: () => void;
  onNewGameClick: () => void;
}

export function HeaderMenu({ onGuideClick, onRestartClick, onNewGameClick }: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleGuide = () => {
    setIsOpen(false);
    onGuideClick();
  };

  const handleRestart = () => {
    setIsOpen(false);
    onRestartClick();
  };

  const handleNewGame = () => {
    setIsOpen(false);
    onNewGameClick();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Mobile More Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 shadow-lg font-semibold h-11 w-11 p-0 flex items-center justify-center"
        size="sm"
        aria-label="More actions"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MoreVertical className="w-5 h-5" />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] border-2 border-gray-200 overflow-hidden z-[210]">
          <div className="py-2">
            <button
              onClick={handleGuide}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              <BookOpen className="w-5 h-5 text-gray-700 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">Guide</span>
            </button>
            <button
              onClick={handleRestart}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors min-h-[44px] border-t border-gray-100"
            >
              <RotateCcw className="w-5 h-5 text-gray-700 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">Restart</span>
            </button>
            <button
              onClick={handleNewGame}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors min-h-[44px] border-t border-gray-100"
            >
              <span className="text-sm font-semibold text-gray-900">New Game</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}