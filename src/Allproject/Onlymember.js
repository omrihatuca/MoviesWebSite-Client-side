import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
const Onlymember = () => {
    const params = useParams()
  const [member,setmember] = useState({name : "" , keynumber : "" , city : "" , email : ""})  
  const navigate = useNavigate()
  const dispatch = useDispatch()

useEffect(()=>
{

    const getdata = async () =>
{
    let resp = await axios.get(" http://localhost:8000/api/members/"+params.id)
   
for (let i = 0; i < resp.data.length; i++) 
{
  setmember(resp.data[i]);
}

}

getdata()


},[])


const update = async () =>
{
  dispatch({type : "UPDATE2" + "UPDATE3" , payload : member})
  let resp = await axios.put(" http://localhost:8000/api/members/"+member.id,member)
alert(resp.data);
navigate('/subs')
}

const cancel = () =>
{
  navigate('/subs')
}

  return (
    <div>
        <br/>
   <div className='black'>

    <h3>Edit Member</h3>

    <br/>
   Name : <input type={'text'} onChange={(e)=> setmember({...member, name: e.target.value})}  value={member.name} /> <br/>
   Serial Number : <input type={'text'} onChange={(e)=> setmember({...member, keynumber: e.target.value})}  value={member.keynumber} /> <br/>
   City : <input type={'text'} onChange={(e)=> setmember({...member, city: e.target.value})}  value={member.city} /> <br/>
   Email : <input type={'text'} onChange={(e)=> setmember({...member, email: e.target.value})}  value={member.email} /> <br/>
<br/>
   <button onClick={update}>Update</button> &nbsp;&nbsp;<button onClick={cancel}>Cancel</button>

   </div>
    </div>
  )
}

export default Onlymember