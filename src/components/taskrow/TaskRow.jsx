import { Link } from 'react-router-dom';

import React from 'react';

import './taskrow.css'

export default React.memo(function TaskRow({ taskList, id }) {
    console.log('TaskRow render, taskList length:', taskList.length);

    return (
        <>
            <div>
                {taskList.map(task => (
                    <div key={task.id} className="task-row">
                        <Link className="task-title" to={`/task/${task.id}`} >{task.title}</Link>
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