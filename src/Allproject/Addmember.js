import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
import '../App.css'
const Addmember = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
const [member, setmember] = useState({name : "" , keynumber : 0 , city : "" , email : ""}) 


useEffect(()=>
{
 let role = sessionStorage["role"]
 if (role != "manager")
  {
  navigate('/subs')
 }


},[])

const add = async () =>
{
    dispatch({type : "ADD2" , payload : member})
     await axios.post(" http://localhost:8000/api/members",member)
    navigate('/subs')
}

const sendback = () =>
{
    navigate('/subs')
}


  return (

    <div>
        <br/>
<div className='black'>
<h4>Add Member</h4>
Name : <input type={'text'} onChange={(e)=> setmember({...member , name : e.target.value })} /> <br/>
Serial Number : <input type={'text'} onChange={(e)=> setmember({...member , keynumber : +e.target.value })} /> <br/>
City : <input type={'text'} onChange={(e)=> setmember({...member , city : e.target.value })} /> <br/>
Email : <input type={'text'} onChange={(e)=> setmember({...member , email : e.target.value })} /> <br/>
<br/>
<Button variant="outlined" onClick={add}>Save</Button>&nbsp;&nbsp;<Button variant="outlined" onClick={sendback}>
 Cancel
</Button>
</div>
<br/>
    </div>
  )
}

export default Addmember