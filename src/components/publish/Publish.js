import React from 'react';
import style from './Publish.module.css';
import {useNavigate,useLocation} from 'react-router-dom';
import {toast} from 'react-hot-toast';
const Publish = () => {
    const location=useLocation();
    const {quizId} = location.state;
    const navigate=useNavigate();
    const handleShare=()=>{
        const shareLink=   `http://localhost:3000/quizgiving/${quizId}`;
        navigator.clipboard.writeText(shareLink);
        toast.success('Link copied to clipboard',{
            duration:3000,
            position:'top-right',
            style:{
                zIndex:4,
                height:'50px',
            }
        });
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
             <div className={style.btn} onClick={()=>navigate('/home')}>X</div>
             <div className={style.mains}>
             <h2>Congratulations Your Quiz is Published!!</h2>
             <div className={style.input}> {`http://localhost:3000/quizgiving/${quizId}`}</div>
             <button className={style.share} onClick={handleShare}>share</button>
             </div>
        </div>
        <div className={style.blur}></div>
        </div>
    );
};

export default Publish;