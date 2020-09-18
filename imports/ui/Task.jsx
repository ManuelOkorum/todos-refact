import React from 'react';

const Task = ({ task }) => {
  return (
    <tr className="table-dark">
      <td> {task.text} </td>
    </tr>
  );
};

export default Task;
