import React from 'react';
import AddTask from '../AddTask';
import Progress from '../Progress';
import TableMonthly from './TableMonthly';

export const Container = ({ tasks, setTasks, strikeTask, deleteTask, addTask, filterPriority, filterEffort, filters, updateTaskText, changeTaskType, changeTaskProgress, subtasksBtnState, shownSubtasksState, showSubtasks, addSubtask }) => {
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    var today = new Date();
    return (
        <div className="border">
            <div className="border-header">
                <h2 className="border-day">{months[today.getMonth()]}</h2>
            </div>
            <TableMonthly tasks={tasks} setTasks={setTasks} strikeTask={strikeTask} deleteTask={deleteTask} 
            filterPriority={filterPriority} filterEffort={filterEffort} filters={filters}
            updateTaskText={updateTaskText} changeTaskType={changeTaskType} changeTaskProgress={changeTaskProgress}
            subtasksBtnState={subtasksBtnState} shownSubtasksState={shownSubtasksState} showSubtasks={showSubtasks} addSubtask={addSubtask} />            
            <AddTask addTask={addTask} />
            <Progress tasks={tasks}/>
        </div>
    )
}
