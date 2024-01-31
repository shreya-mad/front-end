import React from "react";
import style from './QuizWinner.module.css';
import winner from "../../assets/winner.png";
import { useLocation } from "react-router-dom";
const QuizWinner = () => {
    const location = useLocation();
    const score = location.state?.score;
    const questionCount = location.state?.questionCount;
    return(
        <div className={style.main}>
           <div className={style.question}>
                <h1>Congratulations Quiz is Completed</h1> 
                <img src={winner} className={style.text} style={{height:'70%'}} alt="winner" />
                <div style={{ display: 'flex',fontSize:'1.7rem',fontWeight:'700', alignItems: 'center' }}>
                        <span>Your Score is  </span>
                        <span style={{color:'rgb(25 196 56)',fontSize:'2rem',marginLeft:'10px'}}>{`${score}/${questionCount}`}</span>
                </div>
           </div>
        </div>
    )
}
export default QuizWinner;