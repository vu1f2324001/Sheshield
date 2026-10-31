import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#241A24] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-xs">
      <CheckCircle2 className="w-4 h-4 text-[#137333]" />
      <span>{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">×</button>
    </div>
  );
}
