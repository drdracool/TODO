import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.checked,
  Completed: (task) => task.checked
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => 
    <Todo 
      id={task.id} 
      name={task.name} 
      checked={task.checked} 
      key={task.id} 
      toggleTaskChecked={toggleTaskChecked}
      editTask={editTask}
      deleteTask={deleteTask}
      />);
  
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}/>))
  
    function addTask(name) {
      const newTask = {id: `todo-${nanoid()}`, name, checked: false};
      setTasks([...tasks, newTask]);
    }  
    
    function toggleTaskChecked(id) {
      const updatedTasks = tasks.map((task) => {
        if (id === task.id) {
          return {...task, checked: !task.checked}
        }
        return task;
      })
      setTasks(updatedTasks);
    }

    function editTask (id, newName) {
      const editedTaskList = tasks.map((task) => {
        if (id === task.id) {
          return {...task, name: newName}
        }
        return task;
      });
      setTasks(editedTaskList)
    }

    function deleteTask(id) {
      const remainingTasks = tasks.filter((task) => id !== task.id);
      setTasks(remainingTasks);
    }
      
    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const taskCount = `${taskList.length} ${tasksNoun} left`;

    const listHeadingRef = useRef(null);

    const PrevTaskLength = usePrevious(tasks.length);
    useEffect(() => {
      if (tasks.length - PrevTaskLength === -1) {
        listHeadingRef.current.focus();
      }
    }, [tasks.length, PrevTaskLength])
  
  return (
    <div className='todoapp stack-large'>
      <h1>TODO</h1>
      <Form addTask={addTask} />

      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
        {taskList}      
      </ul>

      <h2 id='list-heading' tabIndex='-1' ref={listHeadingRef}>{taskCount}</h2>

      <div className='filters btn-group stack-exception'>
        {filterList}
      </div>

    </div>
  )
}

export default App;
