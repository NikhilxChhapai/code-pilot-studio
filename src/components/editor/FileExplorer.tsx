
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, Search, Plus, Folder as FolderIcon, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FileExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const mockFileTree = {
    name: 'my-project',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          { name: 'components', type: 'folder', children: [
            { name: 'Header.tsx', type: 'file' },
            { name: 'Footer.tsx', type: 'file' },
          ]},
          { name: 'pages', type: 'folder', children: [
            { name: 'Home.tsx', type: 'file' },
            { name: 'About.tsx', type: 'file' },
          ]},
          { name: 'App.tsx', type: 'file' },
          { name: 'index.tsx', type: 'file' },
        ]
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          { name: 'index.html', type: 'file' },
          { name: 'favicon.ico', type: 'file' },
        ]
      },
      { name: 'package.json', type: 'file' },
      { name: 'README.md', type: 'file' },
    ]
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (node: any, path = '', level = 0) => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);

    return (
      <div key={currentPath}>
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-accent rounded cursor-pointer",
            level > 0 && "ml-4"
          )}
          onClick={() => node.type === 'folder' && toggleFolder(currentPath)}
          style={{
            paddingLeft: `${8 + level * 16}px`
          }}
        >
          {node.type === 'folder' ? (
            <FolderIcon className="h-4 w-4 mr-2 text-blue-500" />
          ) : (
            <div className="w-4 h-4 mr-2" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child: any) => 
              renderFileTree(child, currentPath, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex">
      {/* File Explorer Sidebar */}
      <div className="w-80 border-r border-border bg-background">
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Explorer</h3>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-2">
            {renderFileTree(mockFileTree)}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center space-x-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">my-project</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <Folder className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No file selected</h3>
            <p className="text-muted-foreground">Click on a file in the explorer to open it</p>
          </div>
        </div>
      </div>
    </div>
  );
};
