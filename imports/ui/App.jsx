import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection';
import Task from './Task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

  return (
    <div className="container">
      <h1 className="text-center">📝️ To Do List <span className="badge badge-danger">{pendingTasksTitle}</span></h1>

      <TaskForm />

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setHideCompleted(!hideCompleted)}
        >
          {hideCompleted ? 'Show All' : 'Hide Completed'}
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <TaskList
          tasks={tasks}
        />
      </div>

    </div>
  );
};

export default App;