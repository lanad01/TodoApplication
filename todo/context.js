import React from "react";

export const AuthContext = React.createContext({
    userLogined : 'init',
    id: '',
    pwd:'',
    name:'',
    job:'',
    email:'',
    regi_date:'',
    image:'',
    
});