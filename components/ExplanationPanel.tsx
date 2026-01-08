import React from 'react';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';

interface ExplanationPanelProps {
  isLoading: boolean;
  content: string | null;
  error: string | null;
  onClose: () => void;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ isLoading, content, error, onClose }) => {
  if (!isLoading && !content && !error) return null;

  return (
    <div className="mt-6 rounded-xl bg-slate-800/50 border border-indigo-500/30 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="px-4 py-3 bg-indigo-950/30 border-b border-indigo-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="text-indigo-200 font-medium text-sm">Gemini AI Analysis</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white text-xs hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
        >
          Close
        </button>
      </div>
      
      <div className="p-5">
        {isLoading ? (
          <div className="flex items-center gap-3 text-slate-400">
             <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
             <span className="text-sm">Generating explanation...</span>
          </div>
        ) : error ? (
           <div className="flex items-start gap-3 text-rose-300 text-sm bg-rose-950/30 p-3 rounded-lg border border-rose-500/20">
             <AlertCircle className="w-5 h-5 shrink-0" />
             <p>{error}</p>
           </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
            <div className="flex gap-3">
              <Bot className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
              <div className="whitespace-pre-line">{content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;