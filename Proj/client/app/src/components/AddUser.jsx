import React, { useContext, useState } from 'react';
import UserFinder from '../apis/UserFinder';
import { UserContext } from '../context/UserContext';

const AddUser = () => {
  const {addUsers} = useContext(UserContext)
  const [name,setName]=  useState("")
  const [age,setAge]=  useState("")
  const [email,setEmail]=  useState("")
  const [phoneno,setPhoneno]=  useState("")
  const [org_id,setOrgid]=  useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const response = await UserFinder.post("/", {
        name,
        age,
        email,
        phoneno,
        org_id
      });
      addUsers(response.data.user);
      console.log(response);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='mb-4'>
      <form action=''>
        <div className="form-row">
            <div className="col">
                <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
            </div>
            <div className="col">
                <input value={age} onChange={e => setAge(e.target.value)} type="text" className='form-control' placeholder='age'/>
            </div>
            <div className="col">
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" className='form-control' placeholder='email'/>
            </div>
            <div className="col">
                <input value={phoneno} onChange={e => setPhoneno(e.target.value)} type="text" className='form-control' placeholder='phoneno'/>
            </div>
            <div className="col">
                <input value={org_id} onChange={e => setOrgid(e.target.value)} type="text" className='form-control' placeholder='org_id'/>
            </div>
            <button onClick={handleSubmit} type='submit' className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
