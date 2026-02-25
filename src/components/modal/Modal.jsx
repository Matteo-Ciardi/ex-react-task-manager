import { createPortal } from 'react-dom'

import './modal.css'

export default function Modal({
    title = "Confermi l'eliminazione?",
    content = "Premi il pulsante per confermare",
    show = false,
    onClose = () => { },
    onConfirm = () => { },
    confirmText = "Conferma"
}) {
    return show && createPortal(

        <div>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={onClose}>Annulla</button>
            <button onClick={{ onConfirm }}>{confirmText}</button>
        </div>,
        document.body
    )
}