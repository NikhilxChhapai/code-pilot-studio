
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Code, Check, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  changes?: {
    file: string;
    action: string;
    description: string;
  }[];
}

export const AIAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hello! I\'m your AI coding assistant. I can help you write code, debug issues, and make changes to your project. What would you like me to help you with?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'I understand you want me to help with that. Let me analyze your request and suggest some changes.',
        timestamp: new Date(),
        changes: [
          {
            file: 'src/components/Header.tsx',
            action: 'modify',
            description: 'Add responsive navigation menu'
          },
          {
            file: 'src/styles/globals.css',
            action: 'create',
            description: 'Add custom CSS for mobile responsiveness'
          }
        ]
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleAcceptChanges = (messageId: string) => {
    console.log('Accepting changes for message:', messageId);
    // Implement change acceptance logic
  };

  const handleRejectChanges = (messageId: string) => {
    console.log('Rejecting changes for message:', messageId);
    // Implement change rejection logic
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI Agent</h2>
            <p className="text-sm text-muted-foreground">Your intelligent coding assistant</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {message.type === 'agent' ? (
                    <Bot className="h-4 w-4 text-green-500" />
                  ) : (
                    <User className="h-4 w-4 text-blue-500" />
                  )}
                  <span className="text-sm font-medium">
                    {message.type === 'agent' ? 'AI Agent' : 'You'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                <Card className={message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}>
                  <CardContent className="p-4">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.changes && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Code className="h-4 w-4" />
                          <span className="text-sm font-medium">Proposed Changes:</span>
                        </div>
                        
                        {message.changes.map((change, index) => (
                          <div key={index} className="bg-muted/50 rounded p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-mono">{change.file}</span>
                              <Badge variant={change.action === 'create' ? 'default' : 'secondary'}>
                                {change.action}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{change.description}</p>
                          </div>
                        ))}
                        
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
                <Bot className="h-4 w-4 text-green-500" />
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex space-x-2">
          <Input
            placeholder="Ask me to help with your code..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
