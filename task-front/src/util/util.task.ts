import { NewUserI } from "../models/task.model";

export class UtilTask {
  static arePasswordsValidated = (password: string, confirm: string) => {
    password = password.trim();
    confirm = confirm.trim();
    if (password === confirm && password.length >= 6) {
      return true;
    }
    return false;
  };

  static isFieldsValidated = (user: NewUserI) => {
    if (
      user.confirm === "" ||
      user.email === "" ||
      user.name === "" ||
      user.password === ""
    ) {
      return false;
    }
    return true;
  };
}
