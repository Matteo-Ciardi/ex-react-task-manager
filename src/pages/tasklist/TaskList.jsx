import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'

import './tasklist.css'

export default function TaskList() {
    const { taskList } = useContext(GlobalContext);

    return (
        <>
            <h1>TASK LIST ({taskList.length})</h1>
            <div>
                {taskList.map(task => {
                    return (
                        <div key={task.id}>
                            <span>{task.title}</span>
                            <span>{task.createdAt}</span>
                            <p>{task.description}</p>
                            <span>{task.status}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}