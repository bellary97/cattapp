const router = require('express').Router();
const Movie = require('../models/Catdat');




router.post('/addcat',async (req, res)=>{
 
    let {title,img,year} = req.body
   
    const movie = new Movie ({title:title,img:img,year:year});
    
    const result = await movie.save()
    console.log(result)
    res.send("Movie data send successfully")
    })


   router.delete('/delete/:id',async (req, res)=>{
 
    const id = req.params.id;
   
    await Movie.findByIdAndRemove(id).exec()
    res.send("Deleted");
    })

//update
router.put('/cat/:id', function(req, res,next){
    Movie.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Movie.findOne({_id:req.params.id}).then(function(data){
            res.send(data);
        })
    })
})
   
   //get
   router.get('/cats',async (req, res) => {
    
       try{
            const movie = await Movie.find()
            res.status(200).json(movie)
       }
       catch(err){
           res.status(403).json(err)
       }
       
   })

   router.put("/like/:id",(req,res)=>{
       Movie.findByIdAndUpdate(req.params.id,{
           $push: {likes:req.body._id}
       },{
           new:true
       }).exec((err,result)=>{if(err){
           return res.status(422).json({error:err})
       }
    else{
        res.json(result)
    }})
   })
   



//GET USER STATS

module.exports = router;