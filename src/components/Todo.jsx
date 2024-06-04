import React, { useState, useEffect } from 'react';
import './Todo.css';

const LOCAL_STORAGE_KEY = 'todoList';

const Todo = () => {
  const [list, setlist] = useState([]);

  useEffect(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedList) setlist(storedList);
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      // Optionally, set a default state here if localStorage access fails
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Error storing data to localStorage:', error);
    }
  }, [list]);

  const removeTodo = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setlist(newList);
  };

  const addTodo = () => {
    if (title) {
      setlist([...list, { title: title, isDone: false }]); // Set isDone to false by default
      setTitle('');
    }
  };

  const [title, setTitle] = useState('');

  return (
    <div className='todo_main container col-lg-10 px-5 py-5 my-5'>
      <h1 className='py-3 text-left'>Things to do : </h1>
      <div className="row col-12">
        <input
          type="text"
          className='items-field col-8 px-2 py-2'
          placeholder='Enter a task'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="btn col-3 add-btn" onClick={addTodo}>New Task</button>
      </div>
      {list.map((item, index) => (
        <div key={index}>
          {item.title ? (
            <h3>{index + 1}. {item.title}</h3>
          ) : (
            <h3>No element found</h3>
          )}
          <button className="btn btn-danger" onClick={() => removeTodo(index)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
