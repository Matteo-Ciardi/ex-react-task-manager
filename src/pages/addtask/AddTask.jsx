import { useContext } from 'react';
import { useState, useRef } from 'react'
import { GlobalContext } from '../../context/GlobalContext';

import './addtask.css'

export default function AddTask() {
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";
    const { addTask } = useContext(GlobalContext)

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState('');

    const descriptionRef = useRef();
    const statusRef = useRef();

    const validateTitle = (value) => {
        if (!value.trim()) {
            return "Il titolo non puo' essere vuoto";
        }
        if (value.split('').some(char => symbols.includes(char))) {
            return "Non puo' contenere simboli"
        }
        return '';
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError(validateTitle(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateTitle(title);
        if (error) {
            setTitleError(error);
            return;
        }

        const newTask = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }
        try {
            await addTask(newTask)

            setTitle('');
            descriptionRef.current.value = '';
            statusRef.current.value = 'To do';
            setTitleError('');

            console.log({
                title,
                descriptiion: descriptionRef.current.value,
                status: statusRef.current.value
            })
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <div className="add-task-container">  {/* ← Wrapper */}
                <div className="add-task-header">
                    <h1>ADD TASK</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Titolo</label>
                            <input
                                className="form-input"
                                type='text'
                                placeholder='Inserisci il titolo'
                                value={title}
                                onChange={handleTitleChange}
                            />
                            {titleError && <span className="error-message">{titleError}</span>}
                        </div>

                        <div className="form-group">
                            <label>Descrizione</label>
                            <textarea
                                className="form-textarea"
                                ref={descriptionRef}
                                placeholder='Descrizione della task...'
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-select" ref={statusRef} defaultValue="To do">
                                <option>To do</option>
                                <option>Doing</option>
                                <option>Done</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn">
                            AGGIUNGI TASK
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}