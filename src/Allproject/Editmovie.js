import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const Editmovie = () => {
const params = useParams()
const [film,setfilm] = useState({name : "",snumber : "" , premierd : "" , ganers : "" , imageurl : ""})
const dispatch = useDispatch()
const navigate = useNavigate()
const stordata = useSelector(state => state)

useEffect(()=>
{
const getdata = async () =>
{
    let resp = await axios.get(" http://localhost:8000/api/films/"+params.id)
   
for (let i = 0; i < resp.data.length; i++) 
{
  setfilm(resp.data[i]);
}

}

getdata()

},[])


const update = async () =>
{
  
 dispatch({type : "UPDATE" + "UPDATE3" , payload : film})
   await axios.put(" http://localhost:8000/api/films/"+film.id,film)
 
navigate('/movies')
}


const cancel = () =>
{
  navigate('/movies')
}

  return (
    <div>
      <br/>
 <div className='black'>
 Name : <input type={'text'} onChange={(e)=> setfilm({...film, name: e.target.value})}  value={film.name} /> <br/>
 Serial Number : <input type={'text'} onChange={(e)=> setfilm({...film, snumber: e.target.value})}  value={film.snumber} /> <br/>
 Premierd : <input type={'text'} onChange={(e)=> setfilm({...film, premierd: e.target.value})}  value={film.premierd} /> <br/>
 Ganers : <input type={'text'} onChange={(e)=> setfilm({...film, ganers: e.target.value})}  value={film.ganers} /> <br/>
 <br/>
 Image Url : <input type={'text'} onChange={(e)=> setfilm({...film, imageurl: e.target.value})}  value={film.imageurl} /> <br/>

 <button onClick={update}>Update</button> &nbsp;&nbsp;<button onClick={cancel}>Cancel</button>
 </div>
    </div>
  )
}

export default Editmovie