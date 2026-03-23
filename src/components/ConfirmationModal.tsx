import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[250] p-4 animate-in fade-in duration-200">
      <Card className="max-w-md w-full shadow-[0_12px_48px_rgba(0,0,0,0.3)] border-4 border-[#c62828] animate-in zoom-in duration-300 bg-[#FAFAF7] rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-red-100 to-red-200 border-2 border-[#c62828] flex items-center justify-center flex-shrink-0 shadow-md">
              <AlertCircle className="w-6 h-6 text-[#c62828]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700 leading-relaxed font-medium">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1 h-12 font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="destructive"
              className="flex-1 h-12 font-bold"
            >
              Reset Game
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}