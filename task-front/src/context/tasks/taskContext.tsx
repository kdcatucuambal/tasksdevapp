import { createContext } from "react";
import { ContextTaskI } from "../../models/task.context";

const TaskContext = createContext<ContextTaskI>(undefined!);

export default TaskContext;
