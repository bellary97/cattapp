const router = require('express').Router();
const Catt = require('../models/Catdat');


router.post('/addcat',async (req, res)=>{
 
    let {title,img,year} = req.body
   
    const catt = new Catt ({title:title,img:img,year:year});
    
    const result = await catt.save()
    console.log(result)
    res.send("cat data send successfully")
    })


   router.delete('/delete/:id',async (req, res)=>{
 
    const id = req.params.id;
   
    await Catt.findByIdAndRemove(id).exec()
    res.send("Deleted");
    })

//update
router.put('/cat/:id', function(req, res,next){
    Catt.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Catt.findOne({_id:req.params.id}).then(function(data){
            res.send(data);
        })
    })
})
   
//get
   router.get('/cats',async (req, res) => {
    
       try{
            const movie = await Catt.find()
            res.status(200).json(movie)
       }
       catch(err){
           res.status(403).json(err)
       }
       
   })

//likes update
   router.put("/like/:id",(req,res)=>{
       Catt.findByIdAndUpdate(req.params.id,{
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