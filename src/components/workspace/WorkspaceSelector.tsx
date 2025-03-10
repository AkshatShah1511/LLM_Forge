
import React, { useState } from 'react';
import { ChevronDown, Plus, Settings, Edit2, Trash2 } from 'lucide-react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { Workspace } from '@/types/workspace';
import { cn } from '@/lib/utils';

export function WorkspaceSelector() {
  const { workspaces, currentWorkspace, setCurrentWorkspace, deleteWorkspace } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-purple-600/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-white">
          {currentWorkspace?.name.charAt(0) || 'W'}
        </div>
        <span className="font-medium truncate max-w-[120px]">
          {currentWorkspace?.name || 'Select workspace'}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 rounded-md bg-background border border-border shadow-lg z-50">
          <div className="p-2 max-h-60 overflow-y-auto">
            {workspaces.length > 0 ? (
              <div className="space-y-1">
                {workspaces.map(workspace => (
                  <WorkspaceItem 
                    key={workspace.id} 
                    workspace={workspace} 
                    isActive={workspace.id === currentWorkspace?.id}
                    onSelect={() => {
                      setCurrentWorkspace(workspace.id);
                      setIsOpen(false);
                    }}
                    onDelete={() => {
                      deleteWorkspace(workspace.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground p-2">
                No workspaces yet. Create your first one!
              </div>
            )}
          </div>
          
          <div className="border-t border-border p-2">
            <CreateWorkspaceButton onCreateSuccess={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function WorkspaceItem({ 
  workspace, 
  isActive, 
  onSelect, 
  onDelete 
}: { 
  workspace: Workspace; 
  isActive: boolean; 
  onSelect: () => void;
  onDelete: () => void;
}) {
  const [showActions, setShowActions] = useState(false);
  
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-2 rounded-md",
        isActive ? "bg-purple-600/10" : "hover:bg-purple-600/5"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <button 
        className="flex items-center gap-2 flex-1 text-left"
        onClick={onSelect}
      >
        <div className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center text-white",
          isActive ? "bg-purple-600" : "bg-purple-600/70"
        )}>
          {workspace.name.charAt(0)}
        </div>
        <span className="truncate">{workspace.name}</span>
      </button>
      
      {showActions && (
        <div className="flex items-center">
          <button 
            className="p-1 hover:bg-purple-600/10 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}

function CreateWorkspaceButton({ onCreateSuccess }: { onCreateSuccess: () => void }) {
  const { createWorkspace } = useWorkspace();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  
  const handleCreate = () => {
    if (name.trim()) {
      createWorkspace(name.trim());
      setName('');
      setIsCreating(false);
      onCreateSuccess();
    }
  };
  
  if (isCreating) {
    return (
      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace name"
          className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 
                    text-foreground rounded-md outline-none focus:ring-2 
                    focus:ring-purple-600 transition-all"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            className="text-sm px-2 py-1 rounded-md hover:bg-purple-600/10"
            onClick={() => setIsCreating(false)}
          >
            Cancel
          </button>
          <button
            className="text-sm px-2 py-1 rounded-md bg-purple-600 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <button
      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-purple-600/10 transition-colors"
      onClick={() => setIsCreating(true)}
    >
      <Plus className="h-4 w-4 text-purple-600" />
      <span className="text-sm">New workspace</span>
    </button>
  );
}
