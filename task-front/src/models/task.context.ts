import { ProjectI } from "./task.model";

export interface ContextProjectI {
  form: boolean;
  errorForm: boolean;
  projects: ProjectI[];
  project: ProjectI | null;
  showFormFn(): void;
  getProjectsFn(): void;
  addProjectFn(project: ProjectI): void;
  showErrorFn(): void;
  currentProjectFn(projectId: string): void;
  deleteProjectFn(projectId: string): void;
}

export interface PropsInitState {
  form: boolean;
  errorForm: boolean;
  projects: ProjectI[];
  project: ProjectI;
}

export interface ReducerAction {
  type: string;
  payload?: any;
}
