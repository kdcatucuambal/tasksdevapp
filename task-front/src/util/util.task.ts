import { NewUserI } from "../models/task.model";

export class UtilTask {
  static arePasswordsValidated = (password: string, confirm: string) => {
    password = password.trim();
    confirm = confirm.trim();
    if (password === confirm && password.length >= 8) {
      return true;
    }
    return false;
  };

  static isFieldsValidated = (user: NewUserI) => {
    if (
      user.confirm.trim() === "" ||
      user.email.trim() === "" ||
      user.name.trim() === "" ||
      user.password.trim() === ""
    ) {
      return false;
    }
    return true;
  };
}
