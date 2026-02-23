import { useState, useRef } from 'react'

import './addtask.css'

export default function AddTask() {
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const error = validateTitle(title);

        if (error) {
            setTitleError(error);
            return
        }
        console.log({
            title,
            descriptiion: descriptionRef.current.value,
            status: statusRef.current.value
        })
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