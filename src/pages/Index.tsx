
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MainContent } from '@/components/layout/MainContent';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProjectSelector } from '@/components/project/ProjectSelector';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('projects');
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated]);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex w-full bg-background text-foreground">
        {isAuthenticated && (
          <Sidebar 
            currentView={currentView} 
            onViewChange={handleViewChange}
          />
        )}
        
        <div className="flex-1 flex flex-col">
          {isAuthenticated && (
            <Header 
              user={user}
              theme={theme}
              onThemeToggle={toggleTheme}
            />
          )}
          
          <main className="flex-1 overflow-hidden">
            {!isAuthenticated ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    VibeCode IDE
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    AI-Powered Development Environment
                  </p>
                </div>
              </div>
            ) : currentView === 'projects' ? (
              <ProjectSelector />
            ) : (
              <MainContent currentView={currentView} />
            )}
          </main>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
