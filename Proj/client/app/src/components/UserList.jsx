import React,{useContext, useEffect} from 'react';
import UserFinder from '../apis/UserFinder';
import { UserContext } from '../context/UserContext';

const UserList = (props) => {
    const {users,setUsers} = useContext(UserContext)
    useEffect(()=>{

        const fetchData = async() =>{
            try{
                const response = await UserFinder.get("/");
                setUsers(response.data.data.users);
            }catch(err){
                
            }
        };
        fetchData();
    },[]);

    const handleDelete =async(userid) =>{
        try{
          const response = await UserFinder.delete(`/${userid}`);
          setUsers(users.filter(user => {
            return user.userid !== userid
          }))
          console.log(response);
        }catch(err){

        }
    }

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope='col'>User_id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Age</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Phone-no</th>
                    <th scope='col'>Org-id</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map(user =>{
                    return(
                    <tr key = {user.id}>
                        <td>{user.userid}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneno}</td>
                        <td>{user.org_id}</td>
                        <td>
                            <button className="btn btn-danger">Update</button>
                        </td>
                        <td>
                            <button onClick={ () => handleDelete(user.userid)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default UserList
