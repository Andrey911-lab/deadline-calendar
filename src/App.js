import React, { useState } from 'react';

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
        <div>
            <h1>Календарь дедлайнов</h1>

            <div>
                <strong>Сегодня: {currentDate}</strong>
            </div>

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

            <div>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('week')}>Текущая неделя</button>
                <button onClick={() => setFilter('overdue')}>Просроченные</button>
            </div>

            {filteredAndSorted.length === 0 ? (
                <p>Нет заданий</p>
            ) : (
                <ul>
                    {filteredAndSorted.map(task => (
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