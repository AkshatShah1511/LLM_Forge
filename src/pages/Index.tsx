
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderKanban, PlusSquare, Calendar, Activity } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { useProfile } from '@/contexts/ProfileContext';

const Index = () => {
  const navigate = useNavigate();
  const { workspaces, createWorkspace } = useWorkspace();
  const { user } = useProfile();
  
  const handleCreateWorkspace = () => {
    const name = `Workspace ${workspaces.length + 1}`;
    createWorkspace(name);
  };

  const goToWorkspace = (id: string) => {
    navigate('/workspace');
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Workspaces</h3>
                <div className="h-8 w-8 rounded-full bg-purple-600/10 flex items-center justify-center">
                  <FolderKanban className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">{workspaces.length}</p>
              <p className="text-muted-foreground text-sm mt-1">Total workspaces</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Projects</h3>
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <PlusSquare className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-muted-foreground text-sm mt-1">Active projects</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Activity</h3>
                <div className="h-8 w-8 rounded-full bg-green-600/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-muted-foreground text-sm mt-1">Updates this week</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Upcoming</h3>
                <div className="h-8 w-8 rounded-full bg-amber-600/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-muted-foreground text-sm mt-1">Tasks due soon</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Workspaces</h2>
              <button 
                onClick={handleCreateWorkspace}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Workspace
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.map((workspace) => (
                <div 
                  key={workspace.id}
                  onClick={() => goToWorkspace(workspace.id)}
                  className="bg-card p-6 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-medium text-lg">
                      {workspace.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{workspace.name}</h3>
                      {workspace.description && (
                        <p className="text-muted-foreground text-sm mt-1">{workspace.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-3">
                        Created {new Date(workspace.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {workspaces.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center bg-card/50 border border-dashed rounded-lg p-8">
                  <div className="h-16 w-16 rounded-full bg-purple-600/10 flex items-center justify-center mb-4">
                    <FolderKanban className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No workspaces yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first workspace to organize your projects
                  </p>
                  <button 
                    onClick={handleCreateWorkspace}
                    className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Create Workspace
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-2">
              <div className="flex items-center py-2 border-b">
                <div className="h-8 w-8 rounded-full bg-purple-600/10 flex items-center justify-center mr-3">
                  <Plus className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p>You created a new workspace</p>
                  <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-center py-2">
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center mr-3">
                  <FolderKanban className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p>You updated your profile information</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
