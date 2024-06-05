import React, { useState, useEffect } from 'react';
import './Todo.css'; // Make sure you have a CSS class for strikethrough
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoList';

const Todo = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedList) setList(storedList);
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
    setList(newList);
    alert("Todo element deleted");
  };

  const addTodo = () => {
    if (title !== '') {
      setList([...list, { id: uuidv4(), title: title, isDone: false }]);
      setTitle('');
      alert("Todo element added");
    } else {
      alert('Please enter some todo element...');
    }
  };

  const handleCheckbox = (index) => {
    const newList = [...list];
    newList[index].isDone = !newList[index].isDone;
    setList(newList);
  };

  const [title, setTitle] = useState('');

  return (
    <div className='todo_main container col-lg-10 px-5 py-5 my-5'>
      <h1 className='py-3 text-left'>Things to do : </h1>
      <div className="row col-12">
        <input
          type="text"
          className='items-field col-md-8 col-sm-12 px-2 py-2'
          placeholder='Enter a task'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="btn col-md-3 col-sm-12 add-btn mx-md-2 " onClick={addTodo}>
          New Task
        </button>
      </div>
      {list.map((item, index) => (
        <div key={index} className='row my-4 container col-12'>
          <input
            type="checkbox"
            checked={item.isDone} // Directly set checkbox state
            onChange={() => handleCheckbox(index)}
          />
          <h3 className={`col-md-9 col-sm-12 overflow-auto ${item.isDone ? 'strikethrough' : ''}`}>
            {item.title}
          </h3>
          <button className="btn btn-danger col-sm-2" onClick={() => removeTodo(index)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
