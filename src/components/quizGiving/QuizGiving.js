import React, { useEffect, useState } from "react";
import style from './QuizGiving.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const QuizGiving = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState('');
  const [time, setTime] = useState('off');
  const [quizData, setQuizData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizType, setQuizType] = useState('');
  const [score, setScore] = useState(0);
  const [optionType, setOptionType] = useState('');
  const [displayTimer, setDisplayTimer] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quiz-creating.onrender.com/api/quiz/quiz/${id}`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (quizData.questions && quizData.questions.length > 0) {
      setQuestionCount(quizData.questions.length);
      setTime(quizData.questions[currentQuestionIndex].timer);
      setQuizType(quizData.quizType);
      setOptionType(quizData.questions[currentQuestionIndex].optionType);
      
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setDisplayTimer(false); 
            return 'off';
          }
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [quizData, currentQuestionIndex]);

  const winner = () => {
    if (quizType === 'poll_type') {
      navigate('/pollwinner');
    } else {
      navigate('/quizwinner', { state: { score, questionCount } });
    }
  };

  return (
    <div className={style.main}>
      <div className={style.question}>
      <div className={style.timer}>
  <p>{`${currentQuestionIndex + 1}/${questionCount}`}</p>
  {time === 'off' || !displayTimer ? <></> : (
    <div style={{ color: 'red', fontWeight: '600' }}>
      <span>00:</span>
      <span>{time}</span>
      <span>s</span>
    </div>
  )}
</div>
        {quizData.questions && (
          <div style={{ height: '100%', width: '100%' }}>
            <h2 style={{ textAlign: 'center', marginTop: '0px' }}>{quizData.questions[currentQuestionIndex].question}</h2>
            <div className={style.options}>
              {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    setClicked(`opt${index + 1}`);
                    quizData.questions[currentQuestionIndex].correctAnswer === index ? setScore(score + 1) : setScore(score);
                  }} 
                  className={clicked === `opt${index + 1}` ? style.opthover : style.opt}
                >
                  {quizData.questions[currentQuestionIndex].optionType === 'text' && (typeof option === 'object' ? option.value1 : option)}
                  {quizData.questions[currentQuestionIndex].optionType === 'image' && <img src={typeof option === 'object' ? option.value2 : option} alt="option" style={{ height: '100%', width: '100%', borderRadius: '7px' }} />}
                  {quizData.questions[currentQuestionIndex].optionType === 'textImage' && 
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                      <p className={style.text}>{option.value1}</p>
                      <img src={typeof option === 'object' ? option.value2 : option} alt="option" className={style.image} />
                  </div>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

{currentQuestionIndex === questionCount - 1 ? (
  <button onClick={winner} className={style.next}>SUBMIT</button>
) : (
  <button onClick={() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    
  }} className={style.next}>NEXT</button>
)}
      </div>
    </div>
  );
};

export default QuizGiving;
