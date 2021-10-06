import React from "react";

export const AuthContext = React.createContext({
    userLogined : 'init',
    user_no:'',
    id: '',
    pwd:'',
    name:'',
    job:'',
    email:'',
    regi_date:'',
    image:null,
    emailNull:'이메일은 미등록 상태입니다.',
    jobNull:'직업란은 미등록 상태입니다.'
    
});