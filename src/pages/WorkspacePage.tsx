
import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { WorkspaceSelector } from '@/components/workspace/WorkspaceSelector';
import { useToast } from '@/hooks/use-toast';
import { Folder, Plus, Settings, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkspacePage = () => {
  const { currentWorkspace } = useWorkspace();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCreateProject = () => {
    toast({
      title: "Project creation",
      description: "This is where you would create a new project in this workspace",
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <div className="h-5 border-l border-white/10"></div>
            <WorkspaceSelector />
          </div>
          
          <button 
            onClick={() => {}}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {currentWorkspace ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">{currentWorkspace.name}</h1>
                {currentWorkspace.description && (
                  <p className="text-muted-foreground mt-2">{currentWorkspace.description}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-600/5 transition-colors min-h-[200px]"
                     onClick={handleCreateProject}>
                  <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-lg">Create New Project</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Start a new project in this workspace
                  </p>
                </div>
                
                {/* Placeholder for recent projects */}
                {[1, 2].map((item) => (
                  <div key={item} className="glass-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-md bg-purple-600/20 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Project {item}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Last updated 2 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center max-w-md mx-auto glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">No workspace selected</h2>
              <p className="text-muted-foreground mb-6">
                Create a new workspace to get started with your projects.
              </p>
              
              <WorkspaceSelector />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkspacePage;
