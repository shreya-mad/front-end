import React,{useState} from 'react';
import style from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

const Signup=()=>{
    const navigate=useNavigate();
    const[data,setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmpass:""
    })
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSignup=async()=>{
        if(!data.name || !data.email || !data.password || !data.confirmpass){
            return alert("All fields are required");
        }
        if(data.password!==data.confirmpass){
            return alert("Password and confirm password should be same");
         }
         try {
            const response = await fetch("https://quiz-creating.onrender.com/api/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
        
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
        
            const responseData = await response.json();
            console.log(responseData);
            navigate('/home');
        
          } catch (error) {
            console.log(error)
            alert("There was a problem with the request, please try again");
          }
       
    }

    return(
     <div className={style.main} >
      <form className={style.form}>
       <div  className={style.input}>
          <label >Name: </label>
          <input className={style.in} name='name' onChange={handleChange} type='text'/>
       </div>
       <div  className={style.input}>
           <label>Email: </label>
           <input className={style.in} name='email' onChange={handleChange} type='email'/>
        </div>
        <div className={style.input}>
        <label>Password: </label>
        <input className={style.in} name='password' onChange={handleChange} type='password'/>
        </div>
        <div  className={style.input}>
        <label style={{marginRight:'5px'}}>Confirm Password: </label>
        <input type='password' className={style.in} name='confirmpass' onChange={handleChange} />
        </div>
      </form>
      <button className={style.btn} onClick={handleSignup}>Sign-Up</button>
      </div>
    )
}

export default Signup;