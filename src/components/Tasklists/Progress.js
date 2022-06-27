import React from 'react'

function Progress({ tasks }) {
    return (
        <div className="progressContainer">
            <progress id="tasksCompletionBar" value={tasks.reduce((x, y) => y.striked ? x + 1 : x, 0)} max={tasks.reduce((x, y) => x + 1, 0)}></progress>
            <div className="progressTextContainer">
                <div className="progressRate">{tasks.reduce((x, y) => y.striked ? x + 1 : x, 0) + " / " + tasks.reduce((x, y) =>x + 1, 0)}</div>
                <div className="progressText">Completed</div>
            </div>
        </div>
    )
}

export default Progress
