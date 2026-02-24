import { useContext } from 'react';
import { useState, useRef } from 'react'

import './addtask.css'
import { GlobalContext } from '../../context/GlobalContext';

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
            <h1>ADD TASK</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        placeholder='Titolo'
                        value={title}
                        onChange={handleTitleChange}
                    />
                    {titleError && <span>{titleError}</span>}
                </div>

                <textarea
                    ref={descriptionRef}
                    placeholder='Descrizione'
                />
                <select
                    ref={statusRef}
                    defaultValue="To do"
                >
                    <option>To do</option>
                    <option>Doing</option>
                    <option>Done</option>
                </select>
                <button>AGGIUNGI TASK</button>
            </form>
        </>
    )
}