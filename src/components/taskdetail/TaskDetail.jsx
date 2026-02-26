import { useContext, useMemo, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Modal from '../modal/Modal'
import EdittaskModal from '../edittaskmodal/EditTaskModal'

import './taskdetail.css'

export default function TaskDetail() {
    const { taskList, removeTask, updateTask } = useContext(GlobalContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

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

                <button
                    className="edit-btn"
                    onClick={() => setEditModal(true)}
                >
                    MODIFICA
                </button>
            </div>

            <div className="delete-section">
                <button className="delete-btn"
                    onClick={() => {
                        console.log("Bottone cliccato");
                        setShowModal(true)
                    }}
                >
                    ELIMINA TASK
                </button>
            </div>

            <EdittaskModal
                show={editModal}
                task={task}
                onClose={() => setEditModal(false)}
                onSave={async (updatedTask) => {
                    try {
                        await updateTask(updatedTask);
                        alert('Task modificata correttamente');
                        setEditModal(false);
                        navigate('/');
                    } catch (err) {
                        alert(err.message);
                    }
                }}
            />

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={async () => {
                    try {
                        await removeTask({ id: task.id });
                        alert("Task eliminata correttamente");
                        navigate('/');
                    } catch (err) {
                        alert(err.message);
                    }
                }}
                title="Confermi?"
                content={`Eliminare "${task.title}"?`}
                confirmText="ELIMINA"
            />
        </div >
    )
}