import React,{useState} from 'react';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const navigate=useNavigate();
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSignup=async()=>{
        if( !data.email || !data.password){
            return alert("All fields are required");
        }
        try {
            const response = await fetch("https://quiz-creating.onrender.com/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
        
            if (!response.ok) {
              alert("User Not Found,login with registred email id and password or Please Sign Up ");
            }
            else
            navigate('/home');
            const responseData = await response.json();
            console.log(responseData);
        
          } catch (error) {
            console.log(error)
            alert("There was a problem with the request, please try again");
          }
    }
    return(
        <div className={style.main} >
        <form className={style.form}>
         <div  className={style.input}>
             <label>Email: </label>
             <input className={style.in} name='email' value={data.email} onChange={handleChange} type='email'/>
          </div>
          <div className={style.input}>
             <label>Password: </label>
             <input className={style.in} name='password' value={data.password}  onChange={handleChange} type='password'/>
          </div>
        </form>
        <button className={style.btn} onClick={handleSignup}>Sign-In</button>
        </div>
    )
}
export default Login;