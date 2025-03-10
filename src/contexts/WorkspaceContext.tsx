
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from '@/types/workspace';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  createWorkspace: (name: string, description?: string) => void;
  renameWorkspace: (id: string, name: string) => void;
  deleteWorkspace: (id: string) => void;
  setCurrentWorkspace: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  // Load workspaces from localStorage on initial render
  useEffect(() => {
    const savedWorkspaces = localStorage.getItem('workspaces');
    const savedCurrentWorkspaceId = localStorage.getItem('currentWorkspaceId');
    
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
  }, []);

  // Save workspaces to localStorage when they change
  useEffect(() => {
    if (workspaces.length > 0) {
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    }
    
    if (currentWorkspace) {
      localStorage.setItem('currentWorkspaceId', currentWorkspace.id);
    }
  }, [workspaces, currentWorkspace]);

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
  };

  const deleteWorkspace = (id: string) => {
    const filteredWorkspaces = workspaces.filter(workspace => workspace.id !== id);
    setWorkspaces(filteredWorkspaces);
    
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(filteredWorkspaces[0] || null);
    }
  };

  const selectWorkspace = (id: string) => {
    const selected = workspaces.find(workspace => workspace.id === id);
    if (selected) {
      setCurrentWorkspace(selected);
    }
  };

  return (
    <WorkspaceContext.Provider 
      value={{
        workspaces,
        currentWorkspace,
        createWorkspace,
        renameWorkspace,
        deleteWorkspace,
        setCurrentWorkspace: selectWorkspace
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
