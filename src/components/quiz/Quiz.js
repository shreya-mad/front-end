
import React, { useEffect, useState } from 'react';
import style from './Quiz.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Textques from '../textques/Textques';
import Imageques from '../imageques/Imageques';
import Textimage from '../textimage/Textimage';

const Quiz = () => {
  const CreatedAt=new Date().toLocaleDateString('en-GB');
  const navigate = useNavigate();
  const location = useLocation();
  const option= location.state.quizType;
  const quizName = location.state.quizName;
  const [text, setText] = useState(true);
  const [imageUrl, setImageUrl] = useState(false);
  const [textAndImageUrl, setTextAndImageUrl] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const quizType=option;
  const [questions, setQuestions] = useState([ { 
    question: '',
    optionType: 'text',
    options: [
      {
        value1:"",
        value2:""
      },
      {
        value1:"",
        value2:""
      },
      { value1:"",
        value2:""
      },
      { value1:"",
        value2:""
      }
    ],
    correctAnswer:'',
    timer: '',
  }]);


 
  const handleAddCircle = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: '',
        optionType: 'text',
         options: [
      {
        value1:"",
        value2:""
      },
      {
        value1:"",
        value2:""
      },
      { value1:"",
        value2:""
      },
      { value1:"",
        value2:""
      }
    ],  
        correctOption: '',
        timer: '',
      },
    ]);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  

  const handleRemoveCircle = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    setCurrentQuestion((prevQuestion) => (prevQuestion > 0 ? prevQuestion - 1 : prevQuestion));
  };
  

const inputHandle = (event) => {
    const { name, value } = event.target;
  
    setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestion] = {
          ...updatedQuestions[currentQuestion],
          [name]: value,
        };
        return updatedQuestions;
      });
      
  };
  

  const handleTextOptiontype = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].optionType = 'text';
    setQuestions(updatedQuestions);
    setText(true);
    setImageUrl(false);
    setTextAndImageUrl(false);
  };

  const handleImageOptiontype = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].optionType = 'image';
    setQuestions(updatedQuestions);
    setText(false);
    setImageUrl(true);
    setTextAndImageUrl(false);
  };

  const handleTextImageOptiontype = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].optionType = 'textImage';
    setQuestions(updatedQuestions);
    setText(false);
    setImageUrl(false);
    setTextAndImageUrl(true);
  };
 const handleQuizCreate =async () => {
  
  try{
    const response=await fetch('http://localhost:5000/api/quiz/quiz',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({quizName,quizType,questions,CreatedAt})
  });
  if(!response.ok){
    throw new Error('something went wrong');
  }
    const data = await response.json();
    console.log(data._id); 
  navigate('/publish', 
{
  state:{
    quizId:data._id
  }
}
  )
  }
  catch(error){
    console.log(error);
    alert('something went wrong');
  }
}
useEffect(() => {
  const date = new Date(); 
const options = { day: '2-digit', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
questions.CreatedAt=formattedDate;
},[])
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
      <div>
        <div className={style.main}>
          <div className={style.que}>
            <div className={style.cir}>
              {questions.map((_, index) => (
                <div 
                className={`${style.circle} ${index === selectedCircle ? style.selected : ''}`} 
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedCircle(index);
                }}
              >
                  {index + 1}
                  {index > 0 && (
                    <span className={style.cross} onClick={() => handleRemoveCircle(index)}>
                      x
                    </span>
                  )}
                </div>
              ))}
              {questions.length < 5 && (
                <div className={style.circles} style={{ cursor: 'pointer',fontSize:'27px' }} onClick={handleAddCircle}>
                  +
                </div>
              )}
            </div>
            <p>Max 5 questions</p>
          </div>
          <div className={style.quizi}>
            <input
              type='text'
              value={questions[currentQuestion] ? questions[currentQuestion].question : ''}
              onChange={inputHandle}
              name='question'
              className={style.input}
              placeholder='Write your question here...'
            />
            <div className={style.option}>
              <p>Option Type:</p>
              <div onClick={handleTextOptiontype}>
                <input type='radio' id='text' name='optionType' value='text' checked={text} />
                <label htmlFor='text'>Text</label>
              </div>
              <div onClick={handleImageOptiontype}>
                <input type='radio' id='imageUrl' name='optionType' value='imageUrl' />
                <label htmlFor='imageUrl'>Image URL</label>
              </div>
              <div onClick={handleTextImageOptiontype}>
                <input type='radio' id='textAndImageUrl' name='optionType' value='textAndImageUrl' />
                <label htmlFor='textAndImageUrl'>Text & Image URL</label>
              </div>
            </div>
            <div className={style.opt}>
              <div>
                { text && <Textques option={option} questionIndex={currentQuestion}  setQuestions={setQuestions} questions={questions} />}
                { imageUrl && <Imageques option={option} questionIndex={currentQuestion}  setQuestions={setQuestions} questions={questions}  />}
                { textAndImageUrl && <Textimage option={option} questionIndex={currentQuestion}  setQuestions={setQuestions} questions={questions} />}
              
              </div>
              {option === 'quiz_type' && (
                <div className={style.timer}>
                  <button className={style.tims}>Timer</button>
                  <button
                    className={selectedTimer === 'off' ? style.timhover : style.tim}
                    onClick={() =>
                      { setSelectedTimer('off')
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          updatedQuestions[currentQuestion] = {
                            ...updatedQuestions[currentQuestion],
                            timer: 'off',
                          };
                          return updatedQuestions;
                        });
                      }}
                  >
                    OFF
                  </button>
                  <button
                    className={selectedTimer === '5sec' ? style.timhover : style.tim}
                    onClick={() =>
                      { setSelectedTimer('5sec')
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          updatedQuestions[currentQuestion] = {
                            ...updatedQuestions[currentQuestion],
                            timer: '5',
                          };
                          return updatedQuestions;
                        });
                      }}
                  >
                    5 sec
                  </button>
                  <button
                    className={selectedTimer === '10sec' ? style.timhover : style.tim}
                    onClick={() =>
                      { setSelectedTimer('10sec')
                        setQuestions((prevQuestions) => {
                          const updatedQuestions = [...prevQuestions];
                          updatedQuestions[currentQuestion] = {
                            ...updatedQuestions[currentQuestion],
                            timer: '10',
                          };
                          return updatedQuestions;
                        });
                      }}
                  >
                    10 sec
                  </button>
                </div>
              )}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button className={style.btn} onClick={() => navigate('/home')}>
                Cancel
              </button>
              <button className={style.btn} onClick={handleQuizCreate}>
                Create Quiz
              </button>
            </div>
          </div>
        </div>
        <div className={style.blur}></div>
      </div>
    </div>
  );
};
export default Quiz;

