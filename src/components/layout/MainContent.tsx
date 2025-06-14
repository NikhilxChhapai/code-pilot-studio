
import { FileExplorer } from '@/components/editor/FileExplorer';
import { AIAgent } from '@/components/ai/AIAgent';
import { SettingsPanel } from '@/components/settings/SettingsPanel';
import { IDELayout } from '@/components/ide/IDELayout';

interface MainContentProps {
  currentView: string;
}

export const MainContent = ({ currentView }: MainContentProps) => {
  const renderContent = () => {
    switch (currentView) {
      case 'explorer':
        return <IDELayout projectName="my-vibe-project" />;
      case 'ai-agent':
        return <AIAgent />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to VibeCode IDE</h2>
              <p className="text-muted-foreground">Select a project or open a file to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-background">
      {renderContent()}
    </div>
  );
};
