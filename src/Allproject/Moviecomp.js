import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
   <div>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.mov.imageurl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.mov.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Premierd : {props.mov.premierd}<br/>
          Ganers : {props.mov.ganers}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
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
&nbsp;&nbsp;<Button variant="contained" color="success"onClick={update}>Edit</Button>
&nbsp; 
<Button variant="outlined" color="error" onClick={deletemovie} >Delete</Button>
   </div>
   <br/>

    </div>
  )
}

export default Moviecomp