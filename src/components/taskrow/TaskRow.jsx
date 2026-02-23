import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

import React from 'react';

import './taskrow.css'

export default React.memo(function TaskRow({ taskList }) {
    const { taskList } = useContext(GlobalContext);

    console.log('TaskRow render, taskList length:', taskList.length);

    return (
        <>
            <div>
                {taskList.map(task => (
                    <div key={task.id} className="task-row">
                        <span className="task-title">{task.title}</span>
                        <span className={`task-status ${task.status === 'To do'
                            ? 'status-todo'
                            : task.status === 'Doing'
                                ? 'status-doing'
                                : task.status === 'Done'
                                    ? 'status-done'
                                    : ''
                            }`}
                        >
                            {task.status}
                        </span>
                        <span className="task-date">
                            {new Date(task.createdAt).toLocaleDateString('it-IT')}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
})