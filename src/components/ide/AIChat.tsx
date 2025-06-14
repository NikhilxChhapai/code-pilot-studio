
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Code, Check, X, FileEdit, Plus, RefreshCw } from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeChanges?: {
    action: 'create' | 'modify' | 'delete';
    file: string;
    description: string;
    code?: string;
  }[];
  status?: 'pending' | 'accepted' | 'rejected';
}

export const AIChat = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI coding assistant. I can help you write code, debug issues, create files, and modify your codebase. What would you like me to help you with?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = processUserQuery(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const processUserQuery = (query: string): AIMessage => {
    const lowerQuery = query.toLowerCase();
    
    // Determine response based on query content
    if (lowerQuery.includes('create') && (lowerQuery.includes('component') || lowerQuery.includes('file'))) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'ll help you create a new component. Based on your request, I\'m suggesting the following changes:',
        timestamp: new Date(),
        codeChanges: [
          {
            action: 'create',
            file: 'src/components/NewComponent.tsx',
            description: 'Create a new React functional component with TypeScript',
            code: `import React from 'react';

interface NewComponentProps {
  title?: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title = 'Hello World' }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>This is a new component created by AI!</p>
    </div>
  );
};

export default NewComponent;`
          }
        ],
        status: 'pending'
      };
    } else if (lowerQuery.includes('fix') || lowerQuery.includes('error') || lowerQuery.includes('bug')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'ll help you fix the issues in your code. Here are the suggested changes:',
        timestamp: new Date(),
        codeChanges: [
          {
            action: 'modify',
            file: 'src/App.tsx',
            description: 'Fix TypeScript errors and improve component structure',
            code: `// Fixed version with proper TypeScript types and error handling`
          }
        ],
        status: 'pending'
      };
    } else if (lowerQuery.includes('style') || lowerQuery.includes('css') || lowerQuery.includes('design')) {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'ll help you improve the styling. Let me suggest some CSS improvements:',
        timestamp: new Date(),
        codeChanges: [
          {
            action: 'modify',
            file: 'src/index.css',
            description: 'Add modern styling with improved colors and typography',
          }
        ],
        status: 'pending'
      };
    } else {
      return {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you want help with: "${query}". I can assist you with:

• Creating new components and files
• Fixing bugs and errors in your code
• Improving code structure and performance
• Adding styling and UI improvements
• Setting up new features
• Code refactoring and optimization

Please be more specific about what you'd like me to help you with, and I'll provide detailed code suggestions!`,
        timestamp: new Date(),
      };
    }
  };

  const handleAcceptChanges = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'accepted' as const }
        : msg
    ));
    
    // Simulate applying changes
    const message = messages.find(m => m.id === messageId);
    if (message?.codeChanges) {
      message.codeChanges.forEach(change => {
        console.log(`Applied ${change.action} to ${change.file}`);
        // Here you would actually apply the changes to the codebase
      });
    }
  };

  const handleRejectChanges = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'rejected' as const }
        : msg
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-full">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {message.type === 'ai' ? (
                    <Bot className="h-4 w-4 text-blue-500" />
                  ) : (
                    <User className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm font-medium">
                    {message.type === 'ai' ? 'AI Assistant' : 'You'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <Card className={message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.codeChanges && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Code className="h-4 w-4" />
                          <span className="text-sm font-medium">Code Changes:</span>
                        </div>
                        
                        {message.codeChanges.map((change, index) => (
                          <div key={index} className="bg-muted/50 rounded p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-mono">{change.file}</span>
                              <Badge variant={
                                change.action === 'create' ? 'default' : 
                                change.action === 'modify' ? 'secondary' : 'destructive'
                              }>
                                <div className="flex items-center space-x-1">
                                  {change.action === 'create' && <Plus className="h-3 w-3" />}
                                  {change.action === 'modify' && <FileEdit className="h-3 w-3" />}
                                  {change.action === 'delete' && <X className="h-3 w-3" />}
                                  <span>{change.action}</span>
                                </div>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{change.description}</p>
                            {change.code && (
                              <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
                                <code>{change.code}</code>
                              </pre>
                            )}
                          </div>
                        ))}
                        
                        {message.status === 'pending' && (
                          <div className="flex space-x-2 pt-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptChanges(message.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept Changes
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectChanges(message.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        
                        {message.status === 'accepted' && (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="h-3 w-3 mr-1" />
                            Changes Applied
                          </Badge>
                        )}
                        
                        {message.status === 'rejected' && (
                          <Badge variant="destructive">
                            <X className="h-3 w-3 mr-1" />
                            Changes Rejected
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-blue-500" />
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask AI to help with your code... (Shift+Enter for new line)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-h-[60px] max-h-[120px]"
            rows={2}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          AI can help you create files, fix bugs, add features, and improve your code.
        </p>
      </div>
    </div>
  );
};
