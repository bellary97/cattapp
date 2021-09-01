import React from 'react'
import {useState} from "react"
import axios  from 'axios'
import {useHistory}  from 'react-router-dom'
import "./cat.css"
export default function Login() {

    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("") 
    const history = useHistory()
   
   const login =(e)=> {
       e.preventDefault()
         const data = 
         {
             email: email,
             password: password,
         }
        
         axios.post("http://localhost:5000/api/auth/login",data).then((response) =>{
             console.log(response.data)
         if(response.data.isAdmin === true || response.data.isAdmin===false)
          {
            history.push("/movie")
           
            localStorage.setItem("isAdmin", response.data.isAdmin)
          }
         }).catch((error) => {alert('you are not allowed')})
        
    }
    
    return (
  <div className="bck">
  <div className="card col-md-5 bg-secondary" style={{margin:"5% auto"}}>
  <div className="card-body">
  <form className="col-md-8 text-light" style={{marginLeft:"100px"}}>
  <h1 className="text-center text-dark">LOGIN</h1>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label><br></br>
    <input type="email" className="form-control" id="exampleInputEmail1" value={email}  onChange={(e)=>setemail(e.target.value)}  aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp">We'll never share your email with anyone else.</small>
  </div> <br></br>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" value={password}  onChange={(e)=>setpassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>  <br></br>
  <div class="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>  <br></br>
  <button type="submit" onClick={login} class="btn btn-primary">Submit</button>
</form>
</div>
  </div>
</div>
    )
}
