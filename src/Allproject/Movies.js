import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../App.css'
import Moviecomp from './Moviecomp'
const Movies = () => {

const [showmovies , setshowmovies] = useState(true)
const [movies,setmovies] = useState([])
const [name , setname] = useState("")
const [result, setresult] = useState([])
const dispatch = useDispatch()    
const stordata = useSelector(state => state)
const navigate = useNavigate()
 let onemovie = sessionStorage["info"]

  useEffect(()=>
  {
    if (onemovie=="false") 
    {
                const getdata = async () =>
           {
         let resp = await axios.get("http://localhost:8000/api/films")
             setmovies(resp.data)
              setresult(resp.data)
            
             dispatch({type : "LOAD" , payload : resp.data})
           }
    
           getdata()
      

      sessionStorage["enter"] = "true"
      setshowmovies(true)
        }
        else
        {
         const getone = async () =>
         {
          let resp = await axios.get("http://localhost:8000/api/films/"+sessionStorage["movieid"])
          setmovies(resp.data)
         }

         getone()
        
        }
       
      },[sessionStorage.getItem("info"),stordata.films.length])

    
    const addmovie = () =>
    {
      setshowmovies(false)
        navigate('addmovie')
        
    }

    const tomovies = () =>
    {
      setshowmovies(true)
      sessionStorage["info"]="false"
        navigate('/movies')
     

    }


    const getmoviebyname = () =>
    {
   let arr =  stordata.films.filter(x=>x.name.includes(name))
   setmovies(arr)
      if (name.length == 0)
       {
        setmovies(result)
      }

    }

  return (
    <div>
        <br/>
   <div className='black'>
    <h3>Movies</h3>
    <button className={showmovies? 'yellow' : 'white' } onClick={tomovies}>All movies</button>&nbsp;&nbsp;  
    <button className={showmovies? 'white' : 'yellow'} onClick={addmovie}>Add movie</button> 
    &nbsp;&nbsp; Find Movie : <input type={'text'} onChange={(e)=>setname(e.target.value)}  />&nbsp;&nbsp; <button onClick={getmoviebyname}>Find</button>  
    <Outlet/> 
 

{
  showmovies &&  movies.map((x,index)=>
    {
        return <Moviecomp mov={x} key={index}  />
    })
}

   </div>
 
   <br/>
    </div>
  )
}

export default Movies