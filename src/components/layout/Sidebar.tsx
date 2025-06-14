
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
  Plus
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
    { id: 'settings', icon: Settings, label: 'Settings', tooltip: 'Settings' },
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-12" : "w-64"
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
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                  isCollapsed && "px-2 justify-center",
                  currentView === item.id && "bg-sidebar-accent"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>{item.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>

      {/* New Project Button */}
      <div className="p-2 border-t border-sidebar-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "w-full bg-blue-600 hover:bg-blue-700 text-white",
                isCollapsed && "px-2 justify-center"
              )}
              onClick={() => onViewChange('new-project')}
            >
              <Plus className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">New Project</span>}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>Create New Project</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );
};
