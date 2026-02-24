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

    const addTask = async ({ title, description, status }) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                body: JSON.stringify({ title, description, status }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data)

            if (data.success) {
                setTaskList(prev => [...prev, data.task])
                console.log({ success: data.success, task: data.task })
                alert("Task aggiunta correttamente")
            } else {
                throw new Error(data.message)
            }

        } catch (err) {
            console.error(err)
        }
    }


    const removeTask = () => { }

    const updateTask = () => { }

    return { taskList, addTask, removeTask, updateTask }

}
