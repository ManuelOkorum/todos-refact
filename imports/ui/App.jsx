import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../db/TasksCollection';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import LoginForm from './LoginForm';

const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

  const logout = () => Meteor.logout();

  return (
    <div className="container">

      <h1 className="text-center">📝️ To Do List <span className="badge badge-danger">{pendingTasksTitle}</span></h1>
      {user ? (

        <Fragment>

          <div className="d-flex flex-row-reverse" onClick={logout}>
            <span className="badge badge-pill badge-warning"> <i className="fas fa-sign-out-alt"></i> </span> {user.username}
          </div>

          <TaskForm />

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setHideCompleted(!hideCompleted)}
            >
              {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
          </div>

          {isLoading && <div className="loading">loading...</div>}

          <div className="d-flex justify-content-center">
            <TaskList
              tasks={tasks}
            />
          </div>
        </Fragment>
      ) : (
          <LoginForm />
        )}
    </div>
  );
};

export default App;