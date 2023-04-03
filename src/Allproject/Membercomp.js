import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
const Membercomp = (props) => {
const stordata = useSelector(state=>state)
  const [films , setfilms] = useState([])
    const [showdiv,setshowdiv] = useState(false)
   const [sendsubs, setsendsubs] = useState({moviekey : "" , memberkey : props.mem.keynumber, date : "" })
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>
    {
      
      let findfilm = stordata.subs.filter(x=>x.memberkey==props.mem.keynumber)
     
      const notwatch = stordata.films.filter((x)=>
      {
        return !findfilm.find((y)=>y.moviekey==x.snumber)
      })

      setfilms(notwatch)
       
    },[stordata.films.length,stordata.subs.length,stordata.members.length])


    const update = () =>
    {
      navigate('/member/'+props.mem.id)
    }

    const deletemember = async () =>
{
  dispatch({type : "DELETE2" , payload : props.mem.keynumber })
  let resp = await axios.delete("http://localhost:8000/api/members/"+props.mem.keynumber)
  alert(resp.data)
}

const show = () =>
{
    setshowdiv(!showdiv)
     
}

const addsub = async () =>
{
  dispatch({type : "ADD3" , payload : sendsubs })
  let resp = await axios.post(" http://localhost:8000/api/subs",sendsubs)
  alert(resp.data)
}





  return (
    <div>
        <br/>
<div className='green'>

<h3>{props.mem.name}</h3>

Email : {props.mem.email} <br/>
City : {props.mem.city} <br/>
&nbsp;&nbsp;<Button variant="contained" color="success"onClick={update}>Edit</Button>
&nbsp; 
<Button variant="outlined" color="error" onClick={deletemember} >Delete</Button>
<br/><br/>
<div className='subborder' >
  <h4>Movies Watched</h4> 
  <button onClick={show}>Subscribe To New Movie</button>
  <br/>
 {
    showdiv &&  <div className='red'>
                <h3>Add New Movie</h3>
  &nbsp;&nbsp; Date : <input type={'text'} onChange={(e)=> setsendsubs({...sendsubs,date : e.target.value})} />
  &nbsp;&nbsp;
     <select onChange={(e)=>setsendsubs({...sendsubs, moviekey : e.target.value})}>   
        <option>--select</option>   
      {
          films.map((x,index)=>
          {
              return <option key={index} value={x.snumber}> 
                    {x.name}            
              </option>
          })
      }
         </select> 
         <br/>
         <button onClick={addsub}>Subscribe</button>    
                 </div> 
 }
 <br/>
<ul>

{
    props.mem.subscription.map((x,index)=>
    {
        return <li key={index}>
        <Link to={'/movies'} onClick={()=>[sessionStorage["movieid"]=x.movieid,sessionStorage["info"]=true]}>{x.moviename}</Link>  , {x.date}
        </li>
    })
}
</ul>
</div>
<br/>
</div>
<br/>
    </div>
  )
}

export default Membercomp