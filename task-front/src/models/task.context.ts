import { NewUserI, ProjectI, TaskI } from "./task.model";

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

export interface ContextTaskI {
  tasks: TaskI[];
  projectTasks: TaskI[];
  errorTask: boolean;
  taskSelected: TaskI;
  getTaskByProjectFn(id: string): void;
  addNewTaskFn(task: TaskI): void;
  showErrorTaskFn(): void;
  deleteTaskFn(taskId: string): void;
  changeTaskStateFn(task: TaskI): void;
  selectTaskFn(task: TaskI): void;
  updateTaskFn(task: TaskI): void;
}

export interface ContextAlertI {
  alert: { message: string, category: string },
  showAlert(message: string, category: string): void

}

export interface ContextAuthI {
  token: string,
  authenticated: boolean,
  user: any,
  alert: { message: string, category: string },
  registerUser(newUser: NewUserI): void
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
