import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'

import TaskRow from '../../components/taskrow/TaskRow';

import './tasklist.css'

export default function TaskList() {
    const { taskList } = useContext(GlobalContext);

    console.log('TaskList render, items:', taskList.length);

    // if (taskList.length === 0) {
    //     return (
    //         <div className="task-container">
    //             <h1 className="task-header">TASK LIST (0)</h1>
    //             <div className="no-tasks">
    //                 <h3>Nessun task trovato</h3>
    //                 <p>Aggiungi il primo task!</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="task-container">
            <h1 className="task-header">TASK LIST ({taskList.length})</h1>
            <div className='table-head'>
                <span>Nome</span>
                <span className='task-status-head'>Stato</span>
                <span>Data di creazione</span>
            </div>
            <TaskRow taskList={taskList} />
        </div>
    );
}
