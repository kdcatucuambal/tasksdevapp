import { LoginUserI, NewUserI, ProjectI, TaskI, TaskNewI } from "./task.model";

export interface ContextProjectI {
  form: boolean;
  errorForm: boolean;
  projects: ProjectI[];
  project: ProjectI | null;
  alert: { message: string, category: string };
  showFormFn(): void;
  getProjectsFn(): void;
  addProjectFn(project: { name: string }): void;
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
  addNewTaskFn(task: TaskNewI): void;
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
  loading: boolean,
  registerUserFn(newUser: NewUserI): void,
  loginUserFn(user: LoginUserI): void
  userLoggedFn(): void;
  logoutFn(): void,

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
