import React from 'react'
import Task from './Task'

const TaskList = ({ tasks }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr className="table-dark">
          <th scope="col">Status</th>
          <th scope="col">Task Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => <Task key={tasks._id} task={task} />)}
      </tbody>
    </table>
  );
};

export default TaskList;