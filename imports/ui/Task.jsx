import React, { useState } from 'react';
import { TasksCollection } from '../api/TasksCollection';

const Task = ({ task }) => {

  const onCheckboxClick = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    });
    isChecked ? setStatus("Pending") : setStatus("Complete");
  };

  const [status, setStatus] = useState("Pending");

  return (
    <tr className="table-primary">
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
        - {status}
      </td>
      <td> {task.text} </td>
    </tr>
  );
};

export default Task;
