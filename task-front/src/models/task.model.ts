export interface LoginUserI {
  email: string;
  password: string;
}

export interface NewUserI {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export interface ProjectI {
  id: string;
  name: string;
}

export interface TaskI {
  id: string;
  name: string;
  state: boolean;
  projectId?: string
}
