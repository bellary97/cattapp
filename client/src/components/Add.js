import React from 'react'
import {useHistory}  from 'react-router-dom'
import {useState}  from 'react'
import axios from 'axios'
  
export default function Add(props) {
    const [title, settitle] = useState("")
    const [img, setimg] = useState("")
    const [year, setyear] = useState("")
    let history = useHistory()

    
    const Adding = (e) => {
      e.preventDefault()
      const admin = localStorage.getItem("isAdmin")
      if(admin === "true")
      {
        axios.post('http://localhost:5000/api/movies/addcat',{title:title,img:img,year:year})
        history.push('/movie')
      }
      else
      {
        alert('you are not allowed')
      }
      
      }
   

 return(
 <div>
 <div className="card col-md-5 bg-secondary" style={{margin:"5% auto"}}>
 <div className="card-body">
 <form className="col-md-8 text-center text-light"style={{marginLeft:"90px"}}>
 <div className="form-group">
 <label for="exampleInputEmail1">Title</label>
 <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title"/>
 </div>
 <div className="form-group">
 <label for="exampleInputEmail1">Img</label>
 <input type="text" value={img}  onChange={(e)=>setimg(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="img source"/>
 </div>
 <div className="form-group">
 <label for="exampleInputEmail1">Link</label>
 <input type="text" value={year}  onChange={(e)=>setyear(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="card-link"/>
 </div>
 <button type="submit" onClick={Adding} className="btn btn-primary">Submit</button>
</form>
</div>
</div>
</div>
)
}
