import { useState, useRef, useEffect, useContext } from 'react';

import Modal from '../modal/Modal';

import './edittaskmodal.css'

export default function EdittaskModal({
    show = false,
    onClose = () => { },
    task = {},
    onSave = () => { }
}) {
    const editFormRef = useRef(null)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To do');

    useEffect(() => {
        if (show && task) {
            setTitle(task.title || '')
            setDescription(task.description || '')
            setStatus(task.status || 'To do')
        }
    }, [show, task])

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("🔍 TASK ricevuto:", task);           // 1. task ha id?
        console.log("📝 Form values:", { title, description, status });  // 2. State ok?

        const updatedTask = { ...task, title, description, status };
        console.log("🚀 UPDATEDTASK:", updatedTask);      // 3. Creato?

        onSave(updatedTask);
        onClose();
    };

    return (
        <Modal
            show={show}
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nome</label>
                        <input
                            className="form-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Descrizione</label>
                        <textarea
                            className="form-textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Inserisci descrizione..."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Stato</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>To do</option>
                            <option>Doing</option>
                            <option>Done</option>
                        </select>
                    </div>
                </form>
            }
            confirmText="Salva"
            onConfirm={() => editFormRef.current?.requestSubmit()}
            onClose={onClose}
        />
    )
}