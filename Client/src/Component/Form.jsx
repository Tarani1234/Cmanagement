import { IoMdClose } from "react-icons/io";
import './Form.css'
const Form = ({handleSubmit, handleonChange, handleClose}) => {
  return (
    <>
     <div className='addContainer'>
       
       <form onSubmit={handleSubmit}>
       <div className='close-btn' onClick={handleClose}> <IoMdClose /></div>
     
     
         <label htmlFor='name'>Name :</label>
         <input type='text' id='name' name='name' onChange={ handleonChange}/>

         <label htmlFor='email'>Email :</label>
         <input type='text' id='email' name='email' onChange={ handleonChange} />

         <label htmlFor='mobile'>Mobile :</label>
         <input type='text' id='mobile' name='mobile' onChange={ handleonChange} />

         <button className='btn'>Submit</button>
          
       </form>
     </div>
    </>
  )
}

export default Form