
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Terminal as TerminalIcon, Trash2, Square } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'VibeCode IDE Terminal v1.0.0',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [lines]);

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);
    
    // Add command line
    const commandLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${trimmedCommand}`,
      timestamp: new Date()
    };
    
    setLines(prev => [...prev, commandLine]);

    // Process command
    let output = '';
    let type: 'output' | 'error' = 'output';

    switch (trimmedCommand.toLowerCase()) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  ls       - List files and directories
  pwd      - Show current directory
  npm run dev - Start development server
  npm install - Install dependencies
  git status - Show git status`;
        break;
      case 'clear':
        setLines([]);
        setCurrentCommand('');
        return;
      case 'ls':
        output = `src/  public/  package.json  README.md  tsconfig.json`;
        break;
      case 'pwd':
        output = '/workspace/vibe-code-ide';
        break;
      case 'npm run dev':
        output = `> vite

  VITE v5.0.0  ready in 328ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`;
        break;
      case 'npm install':
        output = `npm WARN deprecated package@1.0.0
added 1337 packages in 2.5s`;
        break;
      case 'git status':
        output = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   src/App.tsx
  modified:   src/components/Header.tsx

no changes added to commit`;
        break;
      default:
        output = `Command '${trimmedCommand}' not found. Type 'help' for available commands.`;
        type = 'error';
    }

    // Add output
    const outputLine: TerminalLine = {
      id: (Date.now() + 1).toString(),
      type,
      content: output,
      timestamp: new Date()
    };
    
    setLines(prev => [...prev, outputLine]);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  const clearTerminal = () => {
    setLines([]);
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm">Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={clearTerminal}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="p-3 space-y-1">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`text-sm leading-relaxed ${
                line.type === 'command'
                  ? 'text-yellow-400'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono">{line.content}</pre>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Command Input */}
      <div className="flex items-center p-3 bg-gray-900 border-t border-gray-700">
        <span className="text-yellow-400 mr-2">$</span>
        <Input
          ref={inputRef}
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-0 text-green-400 focus-visible:ring-0 font-mono p-0 h-auto"
          placeholder="Enter command..."
          autoFocus
        />
      </div>
    </div>
  );
};
