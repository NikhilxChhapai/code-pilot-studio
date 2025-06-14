
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Save, Code, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorTab {
  id: string;
  name: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}

export const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [tabs, setTabs] = useState<EditorTab[]>([
    {
      id: '1',
      name: 'App.tsx',
      path: '/src/App.tsx',
      content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to VibeCode IDE</h1>
        <p>Start editing to see some magic happen!</p>
      </header>
    </div>
  );
}

export default App;`,
      isDirty: false,
      language: 'typescript'
    }
  ]);

  const handleTabClose = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const handleContentChange = (tabId: string, content: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, content, isDirty: true }
        : tab
    ));
  };

  const handleSave = (tabId: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, isDirty: false }
        : tab
    ));
    console.log('Saving file:', tabs.find(t => t.id === tabId)?.path);
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (tabs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No file selected</h3>
          <p className="text-muted-foreground">Click on a file in the explorer to open it</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tab Bar */}
      <div className="flex items-center bg-muted/30 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center px-3 py-2 border-r border-border cursor-pointer hover:bg-accent text-sm min-w-0",
              activeTab === tab.id ? "bg-background" : "bg-muted/50"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <Code className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate">
              {tab.name}
              {tab.isDirty && '*'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleTabClose(tab.id);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Editor Header */}
      {activeTabData && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{activeTabData.path}</span>
            {activeTabData.isDirty && (
              <span className="text-xs text-muted-foreground">(unsaved)</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSave(activeTabData.id)}
              disabled={!activeTabData.isDirty}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      {activeTabData && (
        <div className="flex-1 relative">
          <Textarea
            value={activeTabData.content}
            onChange={(e) => handleContentChange(activeTabData.id, e.target.value)}
            className="h-full w-full resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0 bg-background pl-14"
            placeholder="Start typing your code..."
          />
          
          {/* Line Numbers */}
          <div className="absolute left-0 top-0 w-12 h-full bg-muted/50 border-r border-border pointer-events-none">
            <div className="p-3 text-xs text-muted-foreground font-mono leading-5">
              {activeTabData.content.split('\n').map((_, index) => (
                <div key={index} className="text-right pr-2">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
