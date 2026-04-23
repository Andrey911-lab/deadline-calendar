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
        </div>
    );
}

export default App;