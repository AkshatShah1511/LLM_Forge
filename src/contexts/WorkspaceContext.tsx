import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from '@/types/workspace';
import { Project } from '@/types/project';
import { toast } from 'sonner';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  projects: Project[];
  workspaceProjects: Project[];
  createWorkspace: (name: string, description?: string) => void;
  renameWorkspace: (id: string, name: string) => void;
  deleteWorkspace: (id: string) => void;
  setCurrentWorkspace: (id: string) => void;
  createProject: (name: string, description?: string) => Workspace | null;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const savedWorkspaces = localStorage.getItem('workspaces');
    const savedCurrentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    const savedProjects = localStorage.getItem('projects');
    
    if (savedWorkspaces) {
      const parsedWorkspaces = JSON.parse(savedWorkspaces);
      setWorkspaces(parsedWorkspaces);
      
      if (savedCurrentWorkspaceId) {
        const current = parsedWorkspaces.find((w: Workspace) => w.id === savedCurrentWorkspaceId);
        if (current) {
          setCurrentWorkspace(current);
        }
      }
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    if (workspaces.length > 0) {
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    }
    
    if (currentWorkspace) {
      localStorage.setItem('currentWorkspaceId', currentWorkspace.id);
    }
    
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [workspaces, currentWorkspace, projects]);

  const workspaceProjects = currentWorkspace 
    ? projects.filter(project => project.workspaceId === currentWorkspace.id)
    : [];

  const createWorkspace = (name: string, description?: string) => {
    const newWorkspace: Workspace = {
      id: uuidv4(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setWorkspaces([...workspaces, newWorkspace]);
    setCurrentWorkspace(newWorkspace);
    
    toast.success("Workspace created successfully");
  };

  const renameWorkspace = (id: string, name: string) => {
    const updatedWorkspaces = workspaces.map(workspace => 
      workspace.id === id 
        ? { ...workspace, name, updatedAt: new Date() } 
        : workspace
    );
    
    setWorkspaces(updatedWorkspaces);
    
    if (currentWorkspace?.id === id) {
      const updated = updatedWorkspaces.find(w => w.id === id);
      if (updated) {
        setCurrentWorkspace(updated);
      }
    }
    
    toast.success("Workspace renamed successfully");
  };

  const deleteWorkspace = (id: string) => {
    const filteredWorkspaces = workspaces.filter(workspace => workspace.id !== id);
    setWorkspaces(filteredWorkspaces);
    
    const filteredProjects = projects.filter(project => project.workspaceId !== id);
    setProjects(filteredProjects);
    
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(filteredWorkspaces[0] || null);
    }
    
    toast.success("Workspace deleted successfully");
  };

  const selectWorkspace = (id: string) => {
    const selected = workspaces.find(workspace => workspace.id === id);
    if (selected) {
      setCurrentWorkspace(selected);
    }
  };

  const createProject = (name: string, description?: string) => {
    if (!currentWorkspace) {
      toast.error("Please select a workspace first");
      return null;
    }

    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      workspaceId: currentWorkspace.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProjects([...projects, newProject]);
    toast.success("Project created successfully");
    
    return currentWorkspace;
  };

  return (
    <WorkspaceContext.Provider 
      value={{
        workspaces,
        currentWorkspace,
        projects,
        workspaceProjects,
        createWorkspace,
        renameWorkspace,
        deleteWorkspace,
        setCurrentWorkspace: selectWorkspace,
        createProject
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
