import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
const Moviecomp = (props) => {

const navigate = useNavigate()
const dispatch = useDispatch()

const update = () =>
{
  navigate('/movie/'+props.mov.id)
}

const deletemovie = async () =>
{
  dispatch({type : "DELETE" , payload : props.mov.snumber })
  let resp = await axios.delete("http://localhost:8000/api/films/"+props.mov.snumber)
  alert(resp.data)
  
}

  return (
    <div>
      <br/>
   <div className='green'>
Name : {props.mov.name} , Premierd : {props.mov.premierd}<br/>
Ganers : {props.mov.ganers}
<br/>
<img src={props.mov.imageurl} className={'pic'} />
<div className='subborder' >
  <h4>Subscription Watched</h4>  
<ul>

{
    props.mov.subscription.map((x,index)=>
    {
        return <li key={index}>
        <Link to={'/member/'+x.memberid} >{x.membername}</Link>  , {x.date}
        </li>
    })
}
</ul>
</div>
<br/><br/>
&nbsp;&nbsp;<button onClick={update}>Edit</button>&nbsp; <button onClick={deletemovie} >Delete</button>
   </div>
   <br/>
    </div>
  )
}

export default Moviecomp