import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import DeleteBtn from './DeleteBtn';

const Task = ({ task }) => {

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
    isChecked ? setStatus("Pending") : setStatus("Complete");
  };

  // const onCheckboxClick = ({ _id, isChecked }) => {
  //   TasksCollection.update(_id, {
  //     $set: {
  //       isChecked: !isChecked
  //     }
  //   });
  //   isChecked ? setStatus("Pending") : setStatus("Complete");
  // };

  const [status, setStatus] = useState("Pending");

  return (
    <tr className="table-primary">
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          checked={!!task.isChecked}
          onClick={() => toggleChecked(task)}
          readOnly
        />
        - {status}
      </td>
      <td> {task.text} </td>
      <td>
        <DeleteBtn task={task} />
      </td>
    </tr>
  );
};

export default Task;
