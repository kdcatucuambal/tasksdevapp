import { createContext } from "react";
import { ContextAlertI } from "../../models/task.context";

const alertContext = createContext<ContextAlertI>(null);

export default alertContext;