import React from 'react'
import {useState} from "react"
import axios  from 'axios'
import {useHistory}  from 'react-router-dom'
import "./cat.css"
export default function Register() {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let history = useHistory()
   
   const register=(e) => {
       e.preventDefault()
         const data = {
             username: username,
             email: email,
             password: password
         }
         axios.post("http://localhost:5000/api/auth/register",data).then((response) =>{
             console.log(response.data)
         }).catch((error) => {console.log(error)})
         history.push("/login")
    }

    return (
      <div className="bck">
      <div className="card col-md-5 bg-secondary" style={{margin:"5% auto"}}>
      <div className="card-body">
 <form className="col-md-8 text-center text-light"style={{marginLeft:"90px"}}>
   <h1 className="text-dark">REGISTRATION</h1>
 <div className="form-group">
    <label for="exampleInputEmail1" >Username</label>
    <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" value={email}  onChange={(e)=>setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label style={{marginRight:"180px"}}>Check me out</label>
  </div> <br></br>
  <button type="submit" onClick={register} class="btn btn-primary">Submit</button>
</form>
        </div>
        </div>
        </div>
    )
}
