import React, { useState } from 'react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

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

    const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));

    const isOverdue = (taskDate) => {
        const taskDateObj = new Date(taskDate);
        taskDateObj.setHours(0, 0, 0, 0);
        const todayObj = new Date();
        todayObj.setHours(0, 0, 0, 0);
        return taskDateObj < todayObj;
    };

    return (
        <div>
            <h1>Календарь дедлайнов</h1>

            <div>
                <input
                    type="text"
                    placeholder="Название задания"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={addTask}>Добавить</button>
            </div>

            {sortedTasks.length === 0 ? (
                <p>Нет заданий</p>
            ) : (
                <ul>
                    {sortedTasks.map(task => (
                        <li key={task.id}>
                            {task.name} - {task.date}
                            {isOverdue(task.date) && <span>Просрочено</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;