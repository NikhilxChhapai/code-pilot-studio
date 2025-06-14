
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Folder, 
  Home, 
  Settings, 
  Search, 
  Menu,
  Github,
  Plus,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'projects', icon: Home, label: 'Projects', tooltip: 'Your Projects' },
    { id: 'explorer', icon: Folder, label: 'Explorer', tooltip: 'File Explorer' },
    { id: 'search', icon: Search, label: 'Search', tooltip: 'Search Files' },
    { id: 'github', icon: Github, label: 'GitHub', tooltip: 'GitHub Integration' },
    { id: 'ai-agent', icon: GitBranch, label: 'AI Agent', tooltip: 'AI Code Assistant' },
    { id: 'settings', icon: Settings, label: 'Settings', tooltip: 'Settings & API Keys' },
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 relative z-10",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">VibeCode</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent p-2"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                  isCollapsed ? "px-3 justify-center" : "px-3",
                  currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="font-medium">
                <p>{item.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-t border-sidebar-border space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg",
                isCollapsed ? "px-3 justify-center" : "px-3 justify-start"
              )}
              onClick={() => onViewChange('new-project')}
            >
              <Plus className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="ml-2">New Project</span>}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="font-medium">
              <p>Create New Project</p>
            </TooltipContent>
          )}
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full border-sidebar-border hover:bg-sidebar-accent",
                isCollapsed ? "px-3 justify-center" : "px-3 justify-start"
              )}
              onClick={() => onViewChange('github-clone')}
            >
              <Github className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="ml-2">Clone Repo</span>}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="font-medium">
              <p>Clone from GitHub</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );
};
