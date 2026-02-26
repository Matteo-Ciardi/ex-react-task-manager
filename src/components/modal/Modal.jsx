import { createPortal } from 'react-dom'

import './modal.css'

export default function Modal({
    title = "Confermi l'eliminazione?",
    content = "Premi il pulsante per confermare",
    show = false,
    onClose = () => { },
    onConfirm = () => { },
    confirmText = "ELIMINA"
}) {
    return show && createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p>{content}</p>
                <div className="modal-buttons">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>
                        Annulla
                    </button>
                    <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}