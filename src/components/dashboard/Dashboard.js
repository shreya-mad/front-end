import React, {useState, useEffect } from 'react';
import impression from '../../assets/impression.png';
import style from './Dashboard.module.css'; 
const Dashboard = () => {
    const [quizData, setQuizData] = useState({});
    const [quizCount, setQuizCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [impressions, setImpressions] = useState(0);
    console.log(quizData);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://quiz-creating.onrender.com/api/quiz/quiz`);
            const data = await response.json();
            const sortedData = data.sort((a, b) => b.impressions - a.impressions);
            setQuizData(sortedData);
            setQuizCount(data.length);
            let totalQuestion=0;
            let totalImpression=0;
            for(let quiz of data)
            {
              totalQuestion+=quiz.questions.length;
              totalImpression+=quiz.impressions;
            }
            setQuestionCount(totalQuestion);
            setImpressions(totalImpression);
          } catch (error) {
            console.error("Error fetching quiz data:", error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className={style.main}>
            <div className={style.data} >
                <div className={style.box}>
                    <h2 style={{color:'green',
                                textAlign:'center',
                                marginBottom:'0px'
                                }}>
                                {quizCount}
                    </h2>
                    <h2 style={{color:'green',
                                textAlign:'center',
                                marginTop:'0px'}}>
                                     Quiz Created
                    </h2>
                </div>
                <div className={style.box}>
                    <h2 style={{color:'orange',
                                textAlign:'center',
                                marginBottom:'0px',
                               }}>
                                {questionCount}
                    </h2>
                    <h2 style={{color:'orange',
                                textAlign:'center',
                                marginTop:'0px'}}>
                                Question Created
                    </h2>
                </div>
                <div className={style.box}>
                <h2 style={{color:'blue',
                                textAlign:'center',
                                marginBottom:'0px'
                                }}>
                                {impressions}
                    </h2>
                    <h2 style={{color:'blue',
                                textAlign:'center',
                                marginTop:'0px'}}>
                                Impression Created
                    </h2>
                </div>
            </div>
            <div className={style.quizes}>
                <h2 >Trending Quizs</h2>
                <div className={style.collectionQuiz}>
                {Object.values(quizData).map((quiz)=>(
                   <div className={style.quize}>
                     <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0px'}}> 
                        <p style={{marginTop:'0px',fontWeight:'700',fontSize:'1.2rem'}}>{quiz.quizName}</p>
                        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',paddingTop:'0px',height:'20px'}}>
                          <span style={{color:'icon-park-outline:eyes',fontSize:'0.8rem',marginTop:'0px'}}>{quiz.impressions}</span>
                          <img  style={{marginRight:'4px',marginTop:'8px'}} src={impression} alt="impression" />
                        </div>
                     </div>
                       <p style={{marginTop:'0px',color:'green',fontSize:'0.8rem',fontWeight:'700'}}>{`Created On ${quiz.CreatedAt}`}</p>
                   </div>
                ))} 
                </div>
            </div>
        </div>
    );
}

export default Dashboard;