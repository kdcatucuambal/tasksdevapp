export interface LoginUserI {
  email: string;
  password: string;
}

export interface NewUserI {
  name: string;
  email: string;
  password: string;
  confirm?: string;
}

export interface UserLog {
  user: string;
  email: string;
  token: string
}

export interface ProjectI {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
}

export interface TaskI {
  _id: string;
  name: string;
  state: boolean;
  project: string;
  createdAt: string;
}

export interface TaskNewI{
  name: string;
  project: string;
}
