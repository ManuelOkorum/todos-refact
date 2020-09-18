import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection';
import Task from './Task';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {

  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  //contador de tareas pendientes
  const [pending, setPending] = useState(0);

  return (
    <div className="container">
      <h1 className="text-center">To do List <span className="badge badge-danger">({pending})</span></h1>

      <TaskForm />

      <TaskList
        tasks={tasks}
      />
    </div>
  );
};

export default App;