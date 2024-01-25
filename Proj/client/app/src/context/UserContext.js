import React,{useState,createContext} from 'react';

export const UserContext = createContext();

export const UserContextProvider = props =>{
    const [users,setUsers] = useState([]);

    const addUsers = (user) => {
        setUsers([...users,user]);
    }

    return(
        <UserContext.Provider value={{users,setUsers,addUsers}}>
            {props.children}
        </UserContext.Provider>
    )
}