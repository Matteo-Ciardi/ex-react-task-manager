import { useContext, useState, useMemo, useCallback } from 'react'

import { GlobalContext } from '../../context/GlobalContext'
import TaskRow from '../../components/taskrow/TaskRow';

import './tasklist.css'

export default function TaskList() {
    const { taskList } = useContext(GlobalContext);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const sortedTasks = useMemo(() => {
        const filteredTask = taskList.filter(task =>
            task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )

        return [...filteredTask].sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];

            if (sortBy === 'title') {
                [aVal, bVal] = [a.title, b.title];
                return aVal.localeCompare(bVal) * sortOrder;
            }

            if (sortBy === 'status') {
                const statusOrder = { 'To do': 0, 'Doing': 1, 'Done': 2 };
                return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
            }

            const aTime = new Date(a.createdAt).getTime();
            const bTime = new Date(b.createdAt).getTime();
            return (aTime - bTime) * sortOrder;
        });
    }, [taskList, debouncedQuery, sortBy, sortOrder]);

    const debounce = (delay, callback) => {
        let timeoutId

        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => callback(...args), delay)
        }
    }

    const debouncedSearch = useCallback(
        debounce(300, (value) => {
            setDebouncedQuery(value)
        }), []
    )

    console.log('TaskList render, items:', taskList.length);

    return (
        <div className="task-container">
            <h1 className="task-header">TASK LIST ({sortedTasks.length})</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    type='text'
                    placeholder='Cerca task per nome...'
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
            <div className='table-head'>
                <span className='th-pointer'
                    onClick={(e) => {
                        console.log("CLICCATO NOME")
                        if (sortBy === "title") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                        } else {
                            setSortBy("title");
                            setSortOrder(1);
                        }
                    }}
                >
                    Nome
                </span>
                <span className='task-status-head th-pointer'
                    onClick={(e) => {
                        if (sortBy === "status") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                        } else {
                            setSortBy("status");
                            setSortOrder(1);
                        }
                    }}
                >
                    Stato
                </span>
                <span className='th-pointer'
                    onClick={(e) => {
                        if (sortBy === "createdAt") {
                            setSortOrder(sortOrder === 1 ? -1 : 1);
                        } else {
                            setSortBy("createdAt");
                            setSortOrder(1);
                        }
                    }}
                >
                    Data di creazione
                </span>
            </div>
            <TaskRow
                taskList={sortedTasks}
            />
        </div>
    );
}
