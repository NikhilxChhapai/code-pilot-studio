
import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { Terminal } from './Terminal';
import { AIChat } from './AIChat';
import { Button } from '@/components/ui/button';
import { PanelBottomOpen, PanelBottomClose } from 'lucide-react';

interface IDELayoutProps {
  projectName: string;
}

export const IDELayout = ({ projectName }: IDELayoutProps) => {
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);
  const [activeBottomTab, setActiveBottomTab] = useState<'terminal' | 'ai'>('terminal');

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main IDE Area */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer projectName={projectName} />
        </ResizablePanel>
        
        <ResizableHandle />
        
        {/* Editor Area */}
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            {/* Code Editor */}
            <ResizablePanel defaultSize={isBottomPanelOpen ? 70 : 100}>
              <CodeEditor />
            </ResizablePanel>
            
            {isBottomPanelOpen && (
              <>
                <ResizableHandle />
                {/* Bottom Panel (Terminal + AI Chat) */}
                <ResizablePanel defaultSize={30} minSize={20}>
                  <div className="h-full flex flex-col bg-muted/30">
                    {/* Bottom Panel Header */}
                    <div className="flex items-center justify-between border-b border-border px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant={activeBottomTab === 'terminal' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveBottomTab('terminal')}
                        >
                          Terminal
                        </Button>
                        <Button
                          variant={activeBottomTab === 'ai' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveBottomTab('ai')}
                        >
                          AI Assistant
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsBottomPanelOpen(false)}
                      >
                        <PanelBottomClose className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Bottom Panel Content */}
                    <div className="flex-1 overflow-hidden">
                      {activeBottomTab === 'terminal' ? <Terminal /> : <AIChat />}
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Toggle Bottom Panel Button */}
      {!isBottomPanelOpen && (
        <div className="absolute bottom-4 right-4">
          <Button onClick={() => setIsBottomPanelOpen(true)}>
            <PanelBottomOpen className="h-4 w-4 mr-2" />
            Show Panel
          </Button>
        </div>
      )}
    </div>
  );
};
