import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

import './taskdetail.css'

export default function TaskDetail() {
    const { taskList } = useContext(GlobalContext)
    const { id } = useParams();

    const task = useMemo(() =>
        taskList?.find(t => t.id === parseInt(id)),
        [taskList, id]
    );

    if (!task) return <div>Caricamento...</div>;

    return (
        <>
            <div>
                <span>{task.title}</span>
                <span>{task.description}</span>
                <span>{task.status}</span>
                <span>{task.createdAt}</span>
            </div>
            <button onClick={() => console.log("Elimino task")}>ELIMINA TASK</button>
        </>
    )
}