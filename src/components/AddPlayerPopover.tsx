import { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface AddPlayerPopoverProps {
  onAddPlayer: (name: string) => void;
  isVisible: boolean;
}

export function AddPlayerPopover({ onAddPlayer, isVisible }: AddPlayerPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  if (!isVisible) return null;

  const handleAdd = () => {
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-full transition-colors border-2 border-white/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Player</span>
        </button>
      ) : (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[210]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[220] bg-[#FAFAF7] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] border-2 border-gray-200 p-5 w-80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold text-gray-900">Add Player</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Player name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                className="h-10 text-sm border-2 border-gray-300 bg-white rounded-xl font-semibold"
                autoFocus
              />
              <Button onClick={handleAdd} size="sm" className="h-10 px-4 font-bold">
                Add
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}