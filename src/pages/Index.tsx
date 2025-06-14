
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

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="bg-background text-foreground w-full h-screen flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VibeCode IDE
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-Powered Development Environment
              </p>
            </div>
          </div>
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex w-full bg-background text-foreground">
        {/* Mobile-first responsive sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            currentView={currentView} 
            onViewChange={handleViewChange}
          />
        </div>
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header 
            user={user}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
          
          <main className="flex-1 overflow-hidden">
            {currentView === 'projects' ? (
              <ProjectSelector />
            ) : (
              <MainContent currentView={currentView} />
            )}
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        <div className="lg:hidden">
          {/* This will be handled by a mobile menu toggle in the header */}
        </div>
      </div>
    </div>
  );
};

export default Index;
