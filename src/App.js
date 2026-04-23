import React, { useState } from 'react';

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        textAlign: 'center',
        color: '#333'
    },
    dateBlock: {
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px'
    },
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    input: {
        flex: 2,
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    dateInput: {
        flex: 1,
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    filterBlock: {
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
    },
    filterButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px'
    },
    filterBtn: {
        padding: '6px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: 'white',
        color: 'black'
    },
    filterBtnActive: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none'
    },
    emptyText: {
        textAlign: 'center',
        color: '#999'
    },
    list: {
        listStyle: 'none',
        padding: 0
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    listItemOverdue: {
        backgroundColor: '#ffebee'
    },
    listItemNormal: {
        backgroundColor: 'white'
    },
    taskName: {
        fontWeight: 'bold'
    },
    taskDate: {
        marginLeft: '10px',
        fontSize: '14px',
        color: '#666'
    },
    overdueWarning: {
        marginLeft: '10px',
        fontSize: '12px',
        color: '#f44336'
    },
    deleteButton: {
        padding: '4px 8px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

function App() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [filter, setFilter] = useState('all');

    const addTask = () => {
        if (name === '' || date === '') return;
        const newTask = {
            id: Date.now(),
            name: name,
            date: date
        };
        setTasks([...tasks, newTask]);
        setName('');
        setDate('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const isOverdue = (taskDate) => {
        const taskDateObj = new Date(taskDate);
        taskDateObj.setHours(0, 0, 0, 0);
        const todayObj = new Date();
        todayObj.setHours(0, 0, 0, 0);
        return taskDateObj < todayObj;
    };

    const isThisWeek = (taskDate) => {
        const taskDateObj = new Date(taskDate);
        const todayObj = new Date();
        const startOfWeek = new Date(todayObj);
        startOfWeek.setDate(todayObj.getDate() - todayObj.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return taskDateObj >= startOfWeek && taskDateObj <= endOfWeek;
    };

    const today = new Date();
    const currentDate = today.toLocaleDateString('ru-RU');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'overdue') return isOverdue(task.date);
        if (filter === 'week') return isThisWeek(task.date);
        return true;
    });

    const filteredAndSorted = [...filteredTasks].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Календарь дедлайнов</h1>

            <div style={styles.dateBlock}>
                <strong>Сегодня: {currentDate}</strong>
            </div>

            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Название задания"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.dateInput}
                />
                <button onClick={addTask} style={styles.addButton}>
                    Добавить
                </button>
            </div>

            <div style={styles.filterBlock}>
                <label>Фильтр: </label>
                <div style={styles.filterButtons}>
                    <button
                        onClick={() => setFilter('all')}
                        style={{
                            ...styles.filterBtn,
                            ...(filter === 'all' ? styles.filterBtnActive : {})
                        }}
                    >
                        Все
                    </button>
                    <button
                        onClick={() => setFilter('week')}
                        style={{
                            ...styles.filterBtn,
                            ...(filter === 'week' ? styles.filterBtnActive : {})
                        }}
                    >
                        Текущая неделя
                    </button>
                    <button
                        onClick={() => setFilter('overdue')}
                        style={{
                            ...styles.filterBtn,
                            ...(filter === 'overdue' ? styles.filterBtnActive : {})
                        }}
                    >
                        Просроченные
                    </button>
                </div>
            </div>

            {filteredAndSorted.length === 0 ? (
                <p style={styles.emptyText}>Нет заданий</p>
            ) : (
                <ul style={styles.list}>
                    {filteredAndSorted.map(task => (
                        <li
                            key={task.id}
                            style={{
                                ...styles.listItem,
                                ...(isOverdue(task.date) ? styles.listItemOverdue : styles.listItemNormal)
                            }}
                        >
                            <div>
                                <span style={styles.taskName}>{task.name}</span>
                                <span style={styles.taskDate}>
                                    {new Date(task.date).toLocaleDateString('ru-RU')}
                                </span>
                                {isOverdue(task.date) && (
                                    <span style={styles.overdueWarning}>Просрочено</span>
                                )}
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={styles.deleteButton}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;