import { useState } from 'react';
import logoToDo from './assets/logo.svg'
import plusImg from './assets/plus.svg';
import './global.css';
import styles from './App.module.css';


import { NewTasks } from './NewTask';

import { v4 as uuidv4 } from 'uuid';

export function App() {

  const [tasks, setTasks] = useState([])

  const [newTasks, setNewTasks] = useState('');

  const [totalComplete, setTotalCompleted] = useState('');

  function handleCreateNewTask(event) {
    event.preventDefault();
    if (!newTasks) {
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: newTasks,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    setNewTasks('');
  }

  function handleNewTaskChange(event) {
    setNewTasks(event.target.value);
  }

  function deleteTask(id) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id);

    setTasks(tasksWithoutDeletedOne);
  }

  function onToggleTask(id) {
    const completedTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);
    setTasks(completedTasks)
  }

  function totalCompletedTasks(isComplete) {
    const totalCompleted = tasks.reduce((acc, task) => {
      if (task.isComplete !== isComplete) {
       acc + 1;
      } else {
       acc;
      }
      return acc;
    }, 0);
    setTotalCompleted(totalCompleted);
  }

  return (
    <>
      <header className={styles.header}>
        <img src={logoToDo} alt="Logo toDo" />
      </header>
      <div className={styles.container}>
        <main>
          <form className={styles.newTask}>
            <input
              placeholder="Add a new task"
              value={newTasks}
              onChange={handleNewTaskChange}
            />

            <button type="submit" onClick={handleCreateNewTask}>
              <span>Create</span>
              <img src={plusImg} alt="Imagem com o simbolo de mais" />
            </button>
          </form>
        </main>
        <div className={styles.title}>
          <span className={styles.tasks}>Tasks <span>{tasks.length}</span></span>
          <span className={styles.done}>Done {totalComplete} <span> of {tasks.length}</span></span>
        </div>


        {tasks.length === 0 ? (<div>There are no tasks yet, enjoy your day, while you can!</div>) :
          (tasks.map(task => {
            return (
              <NewTasks
                content={task.title}
                onDeleteTask={deleteTask}
                key={task.id}
                identifier={task.id}
                onCompleteTask={onToggleTask}
                countCompletedTasks={totalCompletedTasks}
                status={task.isComplete}
              />
            )
          })
          )}

      </div>
    </>
  )
}
