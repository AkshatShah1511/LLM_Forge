
import { Workspace } from "./workspace";

export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  workspace?: Workspace;
  createdAt: Date;
  updatedAt: Date;
}
