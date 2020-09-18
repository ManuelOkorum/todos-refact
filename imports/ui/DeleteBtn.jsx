import React from 'react';
import { TasksCollection } from '../api/TasksCollection';

const DeleteBtn = ({ task }) => {

  const onDeleteClick = (task) => {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        deleteTask(task);
        swal(
          'Deleted!',
          `${task.text} was deleated`,
          'success'
        )
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your task is safe :)',
          'error'
        )
      }
    })
  };

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  return (
    <button
      className="btn btn-outline-danger"
      onClick={() => onDeleteClick(task)}
    ><i className="fas fa-trash"></i></button>
  );
};

export default DeleteBtn;
