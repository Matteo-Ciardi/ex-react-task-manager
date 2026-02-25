import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import './taskdetail.css'
import useTasks from '../customhooks/useTasks'

export default function TaskDetail() {
    const { taskList, removeTask } = useContext(GlobalContext)
    const { id } = useParams();
    const navigate = useNavigate();

    const task = useMemo(() =>
        taskList?.find(t => t.id === parseInt(id)),
        [taskList, id]
    );

    if (!task) return <div>Caricamento...</div>;

    return (
        <div className="taskdetail-container">
            <div className="taskdetail-header">
                <h1 className="taskdetail-title">Dettagli Task</h1>
            </div>

            <div className="taskdetail-meta">
                <div className="task-field">
                    <div className="task-label">Titolo</div>
                    <div className="task-value">{task.title}</div>
                </div>

                <div className="task-field">
                    <div className="task-label">Descrizione</div>
                    <div className="task-value">{task.description}</div>
                </div>

                <div className="task-field">
                    <div className="task-label">Stato</div>
                    <div className="task-value">
                        <span className="status-badge">
                            {task.status}
                        </span>
                    </div>
                </div>

                <div className="task-field">
                    <div className="task-label">Creato</div>
                    <div className="task-value date">{new Date(task.createdAt).toLocaleDateString('it-IT')}</div>
                </div>
            </div>

            <div className="delete-section">
                <button className="delete-btn"
                    onClick={async () => {
                        try {
                            await removeTask({ id: task.id });
                            alert("Task eliminata correttamente")
                            navigate('/')
                        } catch (err) {
                            alert(err.message)
                        }
                    }}
                >
                    ELIMINA TASK
                </button>
            </div>
        </div>
    )
}