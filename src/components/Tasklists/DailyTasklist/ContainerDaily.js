import React from 'react';
import AddTask from '../AddTask';
import Progress from '../Progress';
import TableDaily from './TableDaily';

export const ContainerDaily = ({ tasks, strikeTask, deleteTask, addTask, filterPriority, filterEffort, filters, updateTaskText, updateTaskEffort, changeTaskType, changeTaskPriority }) => {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    var today = new Date();
    return (
        <div className="border">
            <div className="border-header">
                <h2 className="border-day">{daysOfWeek[today.getDay() - 1]}</h2>
                <h2 className="border-date">{today.getDate() + " . " + today.getMonth() + " . " + today.getFullYear()}</h2>
            </div>
            <TableDaily tasks={tasks} strikeTask={strikeTask} deleteTask={deleteTask} 
            filterPriority={filterPriority} filterEffort={filterEffort} filters={filters}
            updateTaskText={updateTaskText} updateTaskEffort={updateTaskEffort} changeTaskType={changeTaskType} changeTaskPriority={changeTaskPriority}/>
            <AddTask addTask={addTask} />
            <Progress tasks={tasks}/>
        </div>
    )
}
