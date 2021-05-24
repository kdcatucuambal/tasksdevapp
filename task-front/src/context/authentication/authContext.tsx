import { createContext } from "react";
import { ContextAuthI } from "../../models/task.context";

const authContext = createContext<ContextAuthI>(null);

export default authContext;