import React from "react";

export const TodoContext = React.createContext({
    userName : '',
    taskName : 'init task',
    priority : 'init prio',
    expiration : 'init exp',
    taskArray : [],
    priorityArray : [],
    expArray : [],
    addTaskName: () => {},
    addPriority: ()=> {},
    addExp: () => {},
    deleteTask : () => {},
    
});