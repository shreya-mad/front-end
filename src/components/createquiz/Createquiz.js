

import React,{useState} from 'react';
import style from './Createquiz.module.css';
import {useNavigate} from 'react-router-dom';   

const Createquiz = () => {
    const navigate=useNavigate();
    const[quizName,setQuizName]=useState('');
    const[quizType,setQuizType]=useState('');
    const handleContinue=async()=>{
        if(!quizName || !quizType){
            alert('quiz name and type of quiz is required');
            return;
        }
            navigate('/quiz/',{state:{quizType,quizName}})

    }
    return (
     <div>
           <div className={style.ma}>
            <h1 className={style.head}>QUIZZIE</h1>
            <div className={style.options}>
                <button className={style.btns1}>Dashboard</button>
                <button className={style.btns1}>Analytics</button>
                <button className={style.btnshover1}>Create Quiz</button>
            </div>
            <button className={style.btns}>LOGOUT</button>
        </div> 
             <div className={style.main}>
            <input className={style.input} type="text" value={quizName} onChange={(e)=>setQuizName(e.target.value)} placeholder="Quiz Name" />
            <div className={style.option}>
                <p style={{marginRight: '10px'}}>Quiz Type:</p>
                <button onClick={()=>{
                    setQuizType('quiz_type')
                    }} className={quizType==='quiz_type'? style.typehover: style.type}>Q&A</button>
                <button onClick={()=>
                    {setQuizType('poll_type')
                    
                }} className={quizType==='poll_type' ? style.typehover : style.type} >Poll Type</button>
            </div>
            <div className={style.continue}>
            <button className={style.btn} onClick={()=>{
                navigate('/home')
            }
            }>Cancel</button>
            <button className={style.btn} onClick={handleContinue}>Continue</button>
            </div>
        </div>
        <div className={style.blur}></div>
        
    </div>
    );
};

export default Createquiz;