import React from "react";

export const TodoContext = React.createContext({
    addTask_name:'',
    addTask_no:'',
    addTask_priority:'',
    addTask_exp:'',
    task_no:[],
    task_name: [],
    task_prior:[],
    task_exp:[],
});