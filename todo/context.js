import React from "react";

export const AuthContext = React.createContext({
    userName: 'default',
    signIn: () => { },
    signUp: () => { },
    signOut: () => { },
    nameUpdate: (arg) => {
    },
});