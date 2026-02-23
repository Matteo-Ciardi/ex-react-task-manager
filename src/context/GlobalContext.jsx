import { createContext } from "react";

import useTasks from "../components/customhooks/useTasks";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const { taskList, addTask, removeTask, updateTask } = useTasks();

    return (
        <>
            <GlobalContext.Provider
                value={{
                    taskList,
                    addTask,
                    removeTask,
                    updateTask
                }}
            >
                {children}
            </GlobalContext.Provider>
        </>
    )
}