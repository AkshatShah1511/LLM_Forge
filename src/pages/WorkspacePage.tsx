
import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Folder, Plus, X, Search, Filter } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { toast } from 'sonner';

const WorkspacePage = () => {
  const { currentWorkspace, createProject, workspaceProjects } = useWorkspace();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  const handleCreateProject = () => {
    if (!projectName.trim()) {
      toast.error("Project name is required");
      return;
    }
    
    createProject(projectName, projectDescription);
    setProjectName('');
    setProjectDescription('');
    setShowCreateForm(false);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {currentWorkspace ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">{currentWorkspace.name}</h1>
                  {currentWorkspace.description && (
                    <p className="text-muted-foreground mt-1">{currentWorkspace.description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-64 p-2 pr-8 bg-background border rounded-md"
                    />
                    <span className="absolute right-2 top-2 text-muted-foreground">
                      <Search className="h-4 w-4" />
                    </span>
                  </div>
                  
                  <button className="p-2 bg-card border rounded-md text-muted-foreground hover:text-foreground transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {showCreateForm ? (
                  <div className="bg-card rounded-lg border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-lg">Create New Project</h3>
                      <button 
                        onClick={() => setShowCreateForm(false)}
                        className="p-1 hover:bg-white/10 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="project-name" className="block text-sm font-medium mb-1">
                          Project Name
                        </label>
                        <input
                          id="project-name"
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="w-full p-2 bg-background border rounded-md"
                          placeholder="Enter project name"
                        />
                      </div>
                      <div>
                        <label htmlFor="project-description" className="block text-sm font-medium mb-1">
                          Description (optional)
                        </label>
                        <textarea
                          id="project-description"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className="w-full p-2 bg-background border rounded-md"
                          placeholder="Enter project description"
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={handleCreateProject}
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md font-medium text-white"
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="bg-card rounded-lg border p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-card/80 transition-colors min-h-[200px]"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-lg">Create New Project</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Start a new project in this workspace
                    </p>
                  </div>
                )}
                
                {/* Display workspace projects */}
                {workspaceProjects.map((project) => (
                  <div key={project.id} className="bg-card rounded-lg border p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-md bg-purple-600/20 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        {project.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Created {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Fill with example projects only if no real projects exist */}
                {workspaceProjects.length === 0 && [1, 2].map((item) => (
                  <div key={`example-${item}`} className="bg-card/50 rounded-lg border border-dashed p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-md bg-purple-600/10 flex items-center justify-center">
                        <Folder className="h-5 w-5 text-purple-600/50" />
                      </div>
                      <div>
                        <h3 className="font-medium text-muted-foreground">Example Project {item}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Create your first project to replace these examples
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <div className="bg-card rounded-lg border p-8 max-w-md w-full text-center">
                <div className="h-16 w-16 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                  <Folder className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No workspace selected</h2>
                <p className="text-muted-foreground mb-6">
                  Please select or create a workspace to start working on projects.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkspacePage;
