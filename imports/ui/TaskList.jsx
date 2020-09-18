import React from 'react'
import Task from './Task'

const TaskList = ({ tasks }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-dark">
          <th scope="col">Type</th>
          <th scope="col">Column heading</th>
          <th scope="col">Column heading</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => <Task key={tasks._id} task={task} />)}
      </tbody>
    </table>
  );
};

export default TaskList;