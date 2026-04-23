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

            {tasks.length === 0 ? (
                <p>Нет заданий</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            {task.name} - {task.date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;