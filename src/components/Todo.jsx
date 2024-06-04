import React, { useState } from 'react'
import './Todo.css'

const Todo = () => {
    const [list, setlist] = useState( [{
        title: '',
        isDone: ''
    }])

    // 
    return (
        <div className='todo_main container col-lg-10 px-5 py-5 my-5'>
            <h1 className='py-3 text-left'>Things to do : </h1>
            <div className="row col-12">
            <input type="text" className='items-field col-8 px-2 py-2' placeholder='Enter a task'/>
                <button className="btn col-3 add-btn">New Task</button>
            </div>
            {
                list.map((item,index) => (
                    <div key={index}> 
                        {item.title ? ( <h3>{index + 1}. {item.title}</h3>) : ( <h3>No element found</h3>)}
                        <button className="btn btn-danger" onClick={() => removeTodo(index)}>delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Todo
