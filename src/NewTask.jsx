import styles from './NewTask.module.css'
import { Trash } from 'phosphor-react';

export function NewTasks({ content, identifier, status, countCompletedTasks, onDeleteTask, onCompleteTask }) {

    function handleDeleteTask() {
        onDeleteTask(identifier);
    }

    function handleToogleTaskStatus() {
        onCompleteTask(identifier);
        countCompletedTasks(status);
    }


    return (
        <div className={styles.content}>
            <ol>
                <li className={styles.labels}>
                    <label className={status ? styles.done : styles.noDone}>
                        <input 
                            type="checkbox" 
                            className={styles.check}
                            onClick={handleToogleTaskStatus}
                        />
                        {content}
                    </label >
                    <button
                        title="Delete task"
                        onClick={handleDeleteTask}
                    >
                        <Trash size={18} />
                    </button>
                </li>
            </ol>
        </div>
    );
}