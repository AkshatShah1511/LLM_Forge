
import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Folder, Plus, X, Search, Filter, Pencil, CheckCircle, ColorSwatch } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { toast } from 'sonner';

const WorkspacePage = () => {
  const { currentWorkspace, createProject, workspaceProjects, renameWorkspace } = useWorkspace();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  
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
  
  const handleRenameWorkspace = () => {
    if (!currentWorkspace) return;
    if (!newWorkspaceName.trim()) {
      toast.error("Workspace name is required");
      return;
    }
    
    renameWorkspace(currentWorkspace.id, newWorkspaceName);
    setIsRenaming(false);
  };
  
  const startRenaming = () => {
    if (!currentWorkspace) return;
    setNewWorkspaceName(currentWorkspace.name);
    setIsRenaming(true);
  };
  
  const workspaceColors = [
    "from-purple-500 to-purple-700",
    "from-blue-500 to-indigo-700",
    "from-green-500 to-emerald-700",
    "from-rose-500 to-pink-700",
    "from-amber-500 to-orange-700",
  ];
  
  // Get a consistent color based on workspace ID
  const getWorkspaceColor = (id: string) => {
    if (!id) return workspaceColors[0];
    const sumChars = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return workspaceColors[sumChars % workspaceColors.length];
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {currentWorkspace ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getWorkspaceColor(currentWorkspace.id)} flex items-center justify-center text-white font-medium text-lg mr-4`}>
                    {currentWorkspace.name.charAt(0)}
                  </div>
                  
                  {isRenaming ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newWorkspaceName}
                        onChange={(e) => setNewWorkspaceName(e.target.value)}
                        className="text-3xl font-bold bg-background border-b border-purple-500 focus:outline-none px-2 py-1"
                        autoFocus
                      />
                      <button
                        onClick={handleRenameWorkspace}
                        className="ml-2 p-1 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setIsRenaming(false)}
                        className="ml-1 p-1 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center">
                        <h1 className="text-3xl font-bold">{currentWorkspace.name}</h1>
                        <button
                          onClick={startRenaming}
                          className="ml-2 p-1 rounded-full hover:bg-purple-500/10 text-muted-foreground hover:text-purple-500"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                      {currentWorkspace.description && (
                        <p className="text-muted-foreground mt-1">{currentWorkspace.description}</p>
                      )}
                    </div>
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
                  <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-300">
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
                    className="bg-card rounded-lg border p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all duration-300 min-h-[200px]"
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
                  <div key={project.id} className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${getWorkspaceColor(currentWorkspace.id)} flex items-center justify-center text-white`}>
                        <Folder className="h-5 w-5" />
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
