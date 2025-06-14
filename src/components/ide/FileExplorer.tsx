
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Folder, 
  FolderOpen, 
  File, 
  Search, 
  Plus, 
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  extension?: string;
}

interface FileExplorerProps {
  projectName: string;
}

export const FileExplorer = ({ projectName }: FileExplorerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'public']));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const mockFileTree: FileNode = {
    name: projectName,
    type: 'folder',
    path: '/',
    children: [
      {
        name: 'src',
        type: 'folder',
        path: '/src',
        children: [
          {
            name: 'components',
            type: 'folder',
            path: '/src/components',
            children: [
              { name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx', extension: 'tsx' },
              { name: 'Footer.tsx', type: 'file', path: '/src/components/Footer.tsx', extension: 'tsx' },
            ]
          },
          {
            name: 'pages',
            type: 'folder',
            path: '/src/pages',
            children: [
              { name: 'Home.tsx', type: 'file', path: '/src/pages/Home.tsx', extension: 'tsx' },
              { name: 'About.tsx', type: 'file', path: '/src/pages/About.tsx', extension: 'tsx' },
            ]
          },
          { name: 'App.tsx', type: 'file', path: '/src/App.tsx', extension: 'tsx' },
          { name: 'main.tsx', type: 'file', path: '/src/main.tsx', extension: 'tsx' },
          { name: 'index.css', type: 'file', path: '/src/index.css', extension: 'css' },
        ]
      },
      {
        name: 'public',
        type: 'folder',
        path: '/public',
        children: [
          { name: 'index.html', type: 'file', path: '/public/index.html', extension: 'html' },
          { name: 'favicon.ico', type: 'file', path: '/public/favicon.ico', extension: 'ico' },
          { name: 'logo.png', type: 'file', path: '/public/logo.png', extension: 'png' },
        ]
      },
      { name: 'package.json', type: 'file', path: '/package.json', extension: 'json' },
      { name: 'README.md', type: 'file', path: '/README.md', extension: 'md' },
      { name: 'tsconfig.json', type: 'file', path: '/tsconfig.json', extension: 'json' },
    ]
  };

  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <Code className="h-4 w-4" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
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

  const handleFileClick = (path: string, type: string) => {
    if (type === 'file') {
      setSelectedFile(path);
      // TODO: Open file in editor
      console.log('Opening file:', path);
    } else {
      toggleFolder(path);
    }
  };

  const renderFileTree = (node: FileNode, level = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex items-center py-1 px-2 hover:bg-accent rounded cursor-pointer text-sm",
                isSelected && "bg-accent",
                level > 0 && "ml-4"
              )}
              onClick={() => handleFileClick(node.path, node.type)}
              style={{ paddingLeft: `${8 + level * 16}px` }}
            >
              {node.type === 'folder' ? (
                isExpanded ? (
                  <FolderOpen className="h-4 w-4 mr-2 text-blue-500" />
                ) : (
                  <Folder className="h-4 w-4 mr-2 text-blue-500" />
                )
              ) : (
                <div className="mr-2 text-muted-foreground">
                  {getFileIcon(node.extension)}
                </div>
              )}
              <span className="truncate">{node.name}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>New File</ContextMenuItem>
            <ContextMenuItem>New Folder</ContextMenuItem>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => 
              renderFileTree(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-background border-r border-border">
      {/* Header */}
      <div className="p-3 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Explorer</h3>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-7 text-sm"
          />
        </div>
      </div>
      
      {/* File Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {renderFileTree(mockFileTree)}
        </div>
      </ScrollArea>
    </div>
  );
};
