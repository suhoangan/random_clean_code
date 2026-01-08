import React from 'react';

// A simple, lightweight highlighter to avoid heavy dependencies in some environments.
// Colors based on a typical One Dark / Dracula theme.

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code }) => {
  const keywords = /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|interface|type|extends|implements|new|this|async|await|try|catch|throw)\b/g;
  const types = /\b(string|number|boolean|any|void|Promise|Date|Array|Object)\b/g;
  const strings = /(['"`])(.*?)\1/g;
  const comments = /(\/\/.*)/g;
  const functions = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\()/g;
  const numbers = /\b(\d+)\b/g;

  // We process line by line
  const lines = code.split('\n');

  return (
    <pre className="font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar">
      {lines.map((line, i) => {
        // Very basic tokenization for display purposes
        // Note: strict regex parsing of code in HTML is complex; this is a visual approximation
        // designed to look good without 500kb dependencies.
        
        // Order matters for simple replacements. 
        // We actually can't easily do reliable regex replace on a string without destroying HTML tags 
        // if we do it sequentially.
        // A safer way for a simple component is to just render the text, 
        // but for "Senior" level aesthetics, let's try a simple tokenization split or just return text 
        // if we don't want to use a heavy library. 
        
        // HOWEVER, since I can't guarantee `react-syntax-highlighter` installs in the user's environment
        // without a package.json, I will leave it as plain text but styled nicely, 
        // OR use a very clever split method. 
        
        // Let's stick to styling the container well.
        return (
          <div key={i} className="table-row">
            <span className="table-cell select-none text-slate-600 text-right pr-4 w-8 border-r border-slate-700/50 mr-4">
              {i + 1}
            </span>
            <span className="table-cell pl-4 text-slate-300 whitespace-pre">
               {/* 
                  To implement actual highlighting without a library is 100+ lines of tokenizer code.
                  I will use a simple heuristic for keywords to make it pop slightly.
               */}
               {line.split(' ').map((token, j) => {
                 let className = "";
                 if (token.match(keywords)) className = "text-purple-400 font-medium";
                 else if (token.match(types)) className = "text-yellow-300";
                 else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) className = "text-green-400";
                 else if (token.match(functions)) className = "text-blue-400";
                 else if (token.match(numbers)) className = "text-orange-400";
                 else if (token.startsWith('//')) className = "text-slate-500 italic";
                 
                 // Fix comment heuristic which breaks on split(' ')
                 if (line.trim().startsWith('//')) return <span key={j} className="text-slate-500 italic">{token} </span>;

                 return <span key={j} className={className}>{token} </span>;
               })}
            </span>
          </div>
        );
      })}
    </pre>
  );
};

export default SyntaxHighlighter;