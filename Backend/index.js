const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 8080

// schema 
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile:  String,
},{
    timestamps: true        //timestamp is mainly used for whenever data is created or updated  all the data will be available
})

const userModel = mongoose.model("user", schemaData)

//read data
// ​http://localhost:8080/
app.get('/', async(req,res)=>{   
   
    const data = await userModel.find({})  
                   //get method is mainly used for read        
  res.json({success : true, data : data})
})

// create data or save the date in mongodb
// ​http://localhost:8080/create
app.post("/create", async(req, res)=>{
  console.log(req.body)
   const data = new userModel(req.body)
   await data.save()
    res.send({success : true, message : "data save successfully", data : data})
})

// update data
// ​http://localhost:8080/update
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const { _id, ...rest} = req.body
    console.log(rest);
    
  const data =  await userModel.updateOne({_id : id}, rest)
    res.send({sucess : true, message :"data update successfully", data :data})
})

// Delete data
// ​http://localhost:8080/Delete/id
app.delete("/delete/:id", async(req, res)=>{
  const id = req.params.id
  console.log(id);
  const data = await userModel.deleteOne({_id : id})
  res.send({sucess : true, message :"data deleted successfully", data :data})
})

mongoose.connect("mongodb://localhost:27017/crud")
.then(()=>{
    console.log("connected to db")
app.listen(PORT, ()=>console.log("server is running"));
})
.catch((err)=>console.log(err))