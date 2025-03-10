
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, FolderKanban } from 'lucide-react';
import { WorkspaceSelector } from '@/components/workspace/WorkspaceSelector';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const Index = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would handle your logout logic
    navigate('/');
  };

  const goToWorkspace = () => {
    navigate('/workspace');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
              Elevation
            </h1>
            <div className="h-5 border-l border-white/10 ml-2"></div>
            <WorkspaceSelector />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p className="text-muted-foreground mb-6">
              You have successfully signed in to your account. This is where you would see your personalized content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-purple-600/5 transition-colors cursor-pointer"
                onClick={goToWorkspace}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FolderKanban className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium">Workspaces</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your projects and collaborate with your team.
                </p>
              </div>
              
              {[2, 3].map((item) => (
                <div 
                  key={item}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-purple-600/5 transition-colors"
                >
                  <h3 className="font-medium mb-2">Feature {item}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a placeholder for your amazing content or dashboard features.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
