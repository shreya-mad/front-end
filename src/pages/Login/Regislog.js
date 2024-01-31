import React,{useState} from 'react';
import Login from '../../components/login/Login';
import Signup from '../../components/signup/Signup';
import style from './Regislog.module.css';
const Regislog=()=>{
    const [selectedTimer, setSelectedTimer] = useState('5sec')
    const[sign,setSign]=useState(true);
    return(
      <div className={style.main}>
        <div className={style.quiz}>
              <h1 id={style.head}>QUIZZIE</h1>
              <div className={style.siglog}>
                 <button onClick={()=>{
                 setSign(true)
                 setSelectedTimer('signup')
                 }
                 } className={selectedTimer === 'signup' ? style.btn1hover :style.btn1} 
                   >Sign Up</button>
                 <button 
                 onClick={()=>{
                  setSign(false)
                  setSelectedTimer('login')
                 }} className={selectedTimer === 'login' ? style.btn1hover : style.btn1}>Log In</button>
              </div>
              {sign?<Signup/>:<Login/>}
        </div>
      </div>
    )
}
export default Regislog;
