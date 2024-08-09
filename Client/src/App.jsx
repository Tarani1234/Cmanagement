// import { IoMdClose } from "react-icons/io";
import './App.css'
import Form from "./Component/Form";
import { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
axios.defaults.baseURL= "http://localhost:8080/"

const [addSection, setAddsection] = useState(false);
const[editSection, setEditsection] = useState(false)

const[formData, setFormData] = useState({
   name :"",
   email : "",
   mobile :"",
})
const[formEditData, setFormEditData] = useState({
   name :"",
   email : "",
   mobile :"",
   _id : ""
})


const[dataList, setDataList] = useState([]);
const handleonChange = (e) =>{
  const {value, name} = e.target
  setFormData((prev)=>{
     return{
      ...prev,
      [name] : value
     }
  })
}
const handleSubmit = async(e)=>{
  e.preventDefault();
  const data =  await axios.post("/create", formData)
  console.log(data);
  if(data.data.success){
    setAddsection(false)
    alert(data.data.message)
    getfetchData()
  
  }
}
const getfetchData = async() =>{
    const data = await axios.get("/")
    console.log(data);
    if(data.data.success){
      setDataList(data.data.data)
    }
}


useEffect(()=>{
  getfetchData()
}, [])

// console.log(dataList);

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)

 if(data.data.success){
  getfetchData()
  alert(data.data.message)
 }
  
}
// handle update
const handleupdate = async(e)=>{
 e.preventDefault()
 const data = await axios.put("/update/",formEditData)
if(data.data.success){
  getfetchData()
  alert(data.data.message)
}
 
}



const handleEditonChange = async(e) =>{
  const {value, name} = e.target
  setFormEditData((prev)=>{
     return{
      ...prev,
      [name] : value
     }
  })
    
}
const handleEdit =(event)=>{
  setFormEditData(event)
  setEditsection(true)
}



  return (
    <div className='container'>
      <button className='btn btn-add' onClick={()=>setAddsection(true)}>Add</button>
      {
        addSection &&(
        //   <div className='addContainer'>
       
        //   <form onSubmit={handleSubmit}>
        //   <div className='close-btn' onClick={()=>setAddsection(false)}> <IoMdClose /></div>
        
        
        //     <label htmlFor='name'>Name :</label>
        //     <input type='text' id='name' name='name' onChange={ handleonChange}/>
 
        //     <label htmlFor='email'>Email :</label>
        //     <input type='text' id='email' name='email' onChange={ handleonChange}/>
 
        //     <label htmlFor='mobile'>Mobile :</label>
        //     <input type='text' id='mobile' name='mobile' onChange={ handleonChange}/>
 
        //     <button className='btn'>Submit</button>
             
        //   </form>
        // </div>
        <Form 
        handleSubmit={handleSubmit}
        handleonChange={handleonChange}
        handleClose={()=>setAddsection(false)}
       
        />
        )
      }
      {
        editSection &&(
          <Form 
        handleSubmit={handleupdate}
        handleonChange={handleEditonChange}
        handleClose={()=>setEditsection(false)}
      
        />
        )
      }
      <div className>
   <div className="main-container" >
           <h1>Name</h1>
          <h1>Email</h1>
          <h1>Phone Number</h1>
   </div>
    
     <div className="event-items-container">
     {dataList.length > 0 ? (
                    dataList.map((event, idex) => (
                      
                      
                        <div key={idex} className='event-item'>
                          
                            
                          <h3>{event.name}</h3>
                            <h3 >{event.email}</h3>
                            <h3 >{event. mobile }</h3>
                        
                            <button className="btn btn-edit" onClick={()=>{
                              handleEdit(event)
                              }} >edit</button>    
                            <button className="btn btn-delete" onClick={()=> handleDelete (event._id)}>Delete</button>
                            </div>
                     
                        
                    ))
                ) : (
                    <p>No events available.</p>
                )}
     </div>

  
      </div>
    </div>
  )
}

export default App
