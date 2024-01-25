import React from "react";
import Header from "../components/Header";
import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

const Home = () =>{
    return(
        <div>
            <Header/>
            <AddUser/>
            <UserList/>
        </div>
    )
}
export default Home;