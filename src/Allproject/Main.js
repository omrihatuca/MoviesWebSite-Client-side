import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import '../App.css'
import Addmember from './Addmember'
import Addmovie from './Addmovie'
import Editmovie from './Editmovie'
import Login from './Login'
import Movies from './Movies'
import Onlymember from './Onlymember'
import Subscription from './Subscription'

const Main = () => {
    const navigate = useNavigate()
    const [color,setcolor] = useState(true)
    const [showbuttons,setshowbuttons] = useState(false)
    const dispatch = useDispatch()    
  let info = sessionStorage.getItem("enter");
  

  const [users,setusers] = useState([])
  const [user,setuser] = useState({username : "" , password : ""})
  const [error,seterror] = useState("")
  const [showerror,setshowerror] = useState(false)
  const [showlogin, setshowlogin] = useState(true)

  useEffect(()=>
  {
    setshowbuttons(false)
    setshowlogin(true)
    setshowerror(false)
    sessionStorage["info"]="false"


    if (info == "true")
     {
      setshowlogin(false)
      setshowbuttons(true)
    }


  },[])
  
  
  
  useEffect(()=>
  {
      const getdata = async () =>
      {
     let resp = await axios.get(" http://localhost:8000/api/users")
         setusers(resp.data)
         
     }
  
  getdata()
  
  
  },[])
   
  
     const step = () =>
     {
     for (let i = 0; i < users.length; i++) 
     {
     if (users[i].username===user.username&&users[i].password===user.password)
      {
          sessionStorage["name"]=users[i].name
          sessionStorage["role"]=users[i].role
          navigate("/movies")
          setshowbuttons(true)
          setshowlogin(false)
     }
     else
     {
      seterror("one of the filed is incorrectly , please try again")
      setshowerror(true)
     }
      
     }
     }


    const next = () =>
    {
        navigate("/movies")
        setcolor(true)
        sessionStorage["info"]="false"
    }
    
    const next2 = () =>
    {
        navigate("/subs")
        setcolor(false)
    }

    const next3 = () =>
    {
        navigate("")
        sessionStorage["enter"] = "false"
        setshowbuttons(false)
        setshowlogin(true)
        sessionStorage.setItem("name","")
        window.location.reload()
    }


  return (
    <div>
   <div className='App'>
   <h1>Movies - Subscriptions Web Site</h1>
<h3>  {sessionStorage["name"]}</h3>
{
  showbuttons && 
  <div>
  <button className={color? 'yellow' : 'white' } onClick={next} >Movies</button> &nbsp;&nbsp;  
  <button className={color? 'white' : 'yellow' } onClick={next2} >Subscription</button>  
  &nbsp;&nbsp;  <button onClick={next3}>Log out</button>
  </div>
   
}

{
  showlogin && 
  <div className='App'>
  <h2>Log-In</h2>
UserName : <input type={'text'} onChange={(e)=> setuser({...user, username : e.target.value})} /> <br/>
password : <input type={'text'} onChange={(e)=> setuser({...user, password : e.target.value})} /> <br/>
<button onClick={step}>Login</button> <br/> <br/>

{
  showerror && error
}

</div>
}

   </div>

<Routes>
  <Route path="/" element={<Login/>} /> 
  <Route path="movies" element={<Movies/>}>
  <Route path='addmovie' element={<Addmovie/>} />
  </Route>
  
  <Route path="movie/:id" element={<Editmovie/>} /> 
  <Route path="member/:id" element={<Onlymember/>} /> 
  <Route path="subs" element={<Subscription/>}>
  <Route path='addmember' element={<Addmember/>} />
    </Route>  
</Routes>


    </div>
  )
}

export default Main