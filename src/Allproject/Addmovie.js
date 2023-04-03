import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
import '../App.css'
const Addmovie = () => {

    const [film,setfilm] = useState({name : "",snumber : "" , premierd : "" , ganers : "" , imageurl : ""})
    const navigate = useNavigate()
    const dispatch = useDispatch()

const adddata = async () =>
{
  dispatch({type : "ADD" , payload : film})
    let resp = await axios.post("http://localhost:8000/api/films",film)
    alert(resp.data)
    navigate('/movies')
}

const sendback = () =>
{
    navigate('/movies')
  
}

  return (
    <div >
        <br/>
<div className='black'>
<h4>Add movie</h4>
Name : <input type={'text'} onChange={(e)=> setfilm({...film, name: e.target.value})}  /> <br/>
 Serial Number : <input type={'text'} onChange={(e)=> setfilm({...film, snumber: e.target.value})} /> <br/>
 Premierd : <input type={'text'} onChange={(e)=> setfilm({...film, premierd: e.target.value})} /> <br/>
 Ganers : <input type={'text'} onChange={(e)=> setfilm({...film, ganers: e.target.value})}  value={film.ganers} /> <br/>
 <br/> 
 Image Url : <input type={'text'} onChange={(e)=> setfilm({...film, imageurl: e.target.value})}  value={film.imageurl} /> <br/>
 <Button variant="outlined" onClick={adddata}>Save</Button>&nbsp;&nbsp;<Button variant="outlined" onClick={sendback}>
 Cancel
</Button>
</div>
    </div>
  )
}

export default Addmovie