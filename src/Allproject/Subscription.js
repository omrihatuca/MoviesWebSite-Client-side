import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import Membercomp from './Membercomp'
const Subscription = () => {
  const stordata = useSelector(state=>state)
  const [members,setmembers] = useState([])
  const dispatch = useDispatch()    
const [showmembers,setshowmembers] = useState(true)
const [showaddmember, setshowaddmember] = useState(false)
const navigate = useNavigate()

useEffect(()=>
{

  let role = sessionStorage["role"]

if (role == "manager")
 {
  setshowaddmember(true)
}

setshowmembers(true)

},[])

  useEffect(()=>
  {
            const getdata = async () =>
          {
         let resp = await axios.get("http://localhost:8000/api/members")
              setmembers(resp.data)
              dispatch({type : "LOAD2" , payload : resp.data})
            

               let resp2 = await axios.get("http://localhost:8000/api/subs")
               dispatch({type : "LOAD3" , payload : resp2.data})
        
        }
    
        getdata()
        
        setshowmembers(true)
     
 
      },[stordata.members.length])

      const addmemeber = () =>
      {
        setshowmembers(false)
          navigate('addmember')
          
      }
  
      const tomembers = () =>
      {
        setshowmembers(true)
          navigate('/subs')
          
      }


  return (
    <div>
      <br/>
  <div className='black'>
    <h4>Subscription</h4>

    <button className={showmembers? 'yellow' : 'white' } onClick={tomembers}>All Members</button>&nbsp;&nbsp;  
   {
    showaddmember &&  <button className={showmembers? 'white' : 'yellow'} onClick={addmemeber}>Add Member</button> 
   } 

    <br/>
    <Outlet/>

{
  showmembers &&  members.map((x,index)=>
  {
    return <Membercomp mem={x} key={index} />
  })
}

  </div>
  <br/>
    </div>
  )
}

export default Subscription