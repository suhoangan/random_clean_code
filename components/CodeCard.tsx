import React from 'react';
import SyntaxHighlighter from './SyntaxHighlighter';
import { CheckCircle2, XCircle } from 'lucide-react';

interface CodeCardProps {
  type: 'bad' | 'good';
  code: string;
}

const CodeCard: React.FC<CodeCardProps> = ({ type, code }) => {
  const isGood = type === 'good';
  
  return (
    <div className={`flex flex-col h-full rounded-xl overflow-hidden border ${isGood ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-rose-500/20 bg-rose-950/10'} transition-all duration-300`}>
      {/* Header */}
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${isGood ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-rose-500/20 bg-rose-900/20'}`}>
        {isGood ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-400" />
        )}
        <span className={`font-semibold tracking-wide text-sm ${isGood ? 'text-emerald-100' : 'text-rose-100'}`}>
          {isGood ? 'THE CLEAN WAY' : 'THE DIRTY WAY'}
        </span>
      </div>

      {/* Code Content */}
      <div className="flex-1 p-4 bg-[#0a0e17] overflow-y-auto custom-scrollbar">
        <SyntaxHighlighter code={code} />
      </div>
    </div>
  );
};

export default CodeCard;