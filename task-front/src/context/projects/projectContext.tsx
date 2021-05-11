import { createContext } from "react";
import { ContextProjectI } from "../../models/task.context";

//createContex(default): Create a new context object

const projectContext = createContext<ContextProjectI>(undefined!);

export default projectContext;
