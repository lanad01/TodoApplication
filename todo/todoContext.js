import React from "react";

export const TodoContext = React.createContext({
    taskName:'',
    taskPrior:'',
    taskExp:'',
    
    task_no:[],
    task_name: [],
    task_prior:[],
    task_exp:[],
    render:1,
    performed: [],
});