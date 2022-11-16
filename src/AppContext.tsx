import { createContext } from "react";
import defaultContext from "./context/defaults";
import { IDefaultContext } from  "./ts/interfaces"

const AppContext = createContext<IDefaultContext>(defaultContext)

export default AppContext;