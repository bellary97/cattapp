import React from 'react'
import { useEffect,useState} from 'react'
import axios from 'axios'
import {Card,ListGroup,Button,Modal} from "react-bootstrap"
import "./cat.css"
export default function Cats() {

    

    let [post, setpost] = useState([])
    let [show, setShow] = useState(false);
    let [id, setid] = useState("")
    let [title, settitle] = useState("")
    let [img, setimg] = useState("")
    let [year, setyear] = useState("")
    // let [likes, setlikes] = useState("")
    let [cat,setcat]=useState('Boots')
    let [catimg,setcatimg]=useState('https://tse1.mm.bing.net/th?id=OIP.ZEH8eq4a1Pd_AGD0EUTklwHaE8&pid=Api&P=0&w=225&h=151')

    useEffect(() => {

           axios.get('http://localhost:5000/api/movies/cats').then((response)=>
           {
               console.log(response.data)
               setpost(response.data)
           }).catch((error) => {alert(error)})
        
    }, [])

    const handleClose = () => setShow(false);

    const update = (post) => {

       setShow(true)    
       id=post._id;
        setid(id)
       title=post.title;
       settitle(title)
       img=post.img;
       setimg(img)
       year=post.year;
       setyear(year)
      //  likes=post.likes.length;
      //  setlikes(likes)
      
       dis() 
    }
     const display=(info)=>{
         setcatimg(info.img)
         setcat(info.title)
     }
    const dis=()=>{
        setcatimg(img)
        setcat(title)
    }
    const updatedmodel = (e)=>{
      let data ={
        title:title,
        img:img,
        year:year,
        // likes:likes
    }
      axios.put(`http://localhost:5000/api/movies/cat/${id}`,data)
        e.preventDefault()
        const result = post.find((ele)=>ele._id===id)
        result.title=title;
        result.img=img;
        result.year=year;
        // result.likes.length=likes.length
        // setpost()
        setShow(false)   
    }
     
   const handleDelete =(id)=> {

        const admin = localStorage.getItem("isAdmin")
        if(admin === "true")
        {
          return axios.delete(`http://localhost:5000/api/movies/delete/${id}`)
        }
        else
        {
            alert('you are not allowed')
        }
   }
        
   const likepost=(id)=>{
     axios.put(`http://localhost:5000/api/movies/like/${id}`)
   }
   
 return (
 <div>         
 <div style={{marginTop:"80px"}}>
 <div className="row">  
 <div className="col-md-3">
 {post.map(e=>{
     return (
        <ListGroup>
        <ListGroup.Item className="clr"><button className="btn btn-success mx-5" onClick={()=>display(e)}>{e.title} </button>{e.likes.length}</ListGroup.Item>
        </ListGroup>
        )
 })}
 </div>

 <div className="mx-5 col-md-4"> 
 <Card className="text-center">
  <Card.Header as="h5">Container</Card.Header>
  <Card.Body>
    <Card.Title>{cat}</Card.Title>
    <Card.Text>
    <img className="mx-4" src={catimg} ml-5 height="210px" width="300px"/>
    </Card.Text>
    <Button variant="primary">Card-link</Button>
  </Card.Body>
  </Card>
  </div>
 </div> 
             <div style={{marginTop:"50px"}}>
                <h1>Cats image gallery</h1>
                 {
                   post.map((ele,index)=>{
                        return (
                            <div key={index} className="col-md-3 mt-3 text-light" style={{display:"inline-block"}}>
                            <Card style={{ width: '18rem'},{textAlign: 'center',backgroundColor:'black',marginLeft:"5px"}}>
                            <Card.Body>
                              <Card.Title style={{textAlign: 'center'}}>{ele.title}</Card.Title>
                              <Card.Text>
                                  <img src={ele.img} ml-3 height="210px" width="250px"/>
                              </Card.Text>
                            <a href=""><Card.Text>
                                  {ele.year}
                              </Card.Text></a>
                               <Button className="btn btn-primary"onClick={()=>likepost(ele._id)}>clicked:{ele.likes.length}</Button> <br></br>
                               <Button variant="primary" className="my-2 mx-2" onClick={()=>{update(ele)}}>Update</Button>
                               <Button variant="primary" onClick={()=>handleDelete(ele._id)}>Delete</Button> 
                            </Card.Body>
                          </Card>
                          </div>
                        )
                    })
                }
            </div>
            </div>
        )
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <div className="container">
       <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Cats</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              value={title} onChange={(e)=>settitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your image"
              value={img}  onChange={(e)=>setimg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter link"
              value={year}  onChange={(e)=>setyear(e.target.value)}
            />
          </div> 
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="no of likes"
              value={likes}  onChange={(e)=>setlikes(e.target.value)}
            />
          </div>  */}
        </form>
      </div>
    </div>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updatedmodel} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
        </div>
    )
}

