import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from './components/Todo';
import './App.css';
function App() {
    const [todos, setTodos] = useState([
        'Create Blockchain App',
        'Create a Youtube Tutorial'
    ]);
    const [input, setInput] = useState('');
    const addTodo = (e) => {
        e.preventDefault();
        setTodos([...todos, input]);
        setInput('')
    };
    return (
        <div className="App">
            <h2> TODO List App</h2>
            <form>
                <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                    onChange={e => setInput(e.target.value)} />
                <Button variant="contained" color="primary" onClick={addTodo}  >Add Todo</Button>
            </form>
            <ul>
                {todos.map(todo => <Todo todo={todo} />)}
            </ul>
        </div>
    );
}
export default App;