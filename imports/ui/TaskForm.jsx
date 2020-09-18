import React, { useState } from 'react'
import { TasksCollection } from '../api/TasksCollection';

const TaskForm = () => {

  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });

    setText("");
  };

  return (
    <form
      className="form-row my-3 pl-5 d-flex justify-content-center"
      onSubmit={handleSubmit}
    >
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to add new tasks"
        />
      </div>

      <div className="col-2">
        <button type="submit" className="btn btn-primary mt-1">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;