import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
                const data = await res.json();
                setTaskList(data)
                console.log(data);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchTasks();

    }, [])

    return (
        <>
            <GlobalContext.Provider
                value={{
                    taskList,
                    setTaskList
                }}
            >
                {children}
            </GlobalContext.Provider>
        </>
    )
}