import { useState, useEffect } from 'react'

export default function useTasks() {
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

    const addTask = () => { }
    const removeTask = () => { }
    const updateTask = () => { }

    return { taskList, addTask, removeTask, updateTask }
}