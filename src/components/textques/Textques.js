import React,{useState} from 'react';
import style from './Textques.module.css';

const Textques = ({ questionIndex,option,setQuestions, questions }) => {
    const[clickCoreect,setClickCorrect]=useState('');
    const handleInputChange = (index, event) => {
        const updatedQuestions = [...questions];
        if (
          questionIndex >= 0 &&
          questionIndex < updatedQuestions.length &&
          index >= 0 &&
          index < updatedQuestions[questionIndex].options.length &&
          typeof updatedQuestions[questionIndex].options[index] === 'object'
        ) {
          updatedQuestions[questionIndex].options[index].value1 = event.target.value;
          setQuestions(updatedQuestions);
        }
      };
     const handleCorrectAnswer= (index,event)=>{
        const updatedQuestions=[...questions];
        updatedQuestions[questionIndex].correctAnswer=index;
        setClickCorrect(index);
     }
    return (
        <div>
            <div>
                {option==='quiz_type' ? <input
                    type="radio"
                    onClick={(event)=>handleCorrectAnswer(0,event)}
                    name={`option_${questionIndex}`}
                />:<></>}
                <input
                    type="text"
                    placeholder='Text'
                    value={questions[questionIndex].options[0].value1}
                    onChange={(event) => handleInputChange(0, event)}
                    className={`${style.input} ${clickCoreect===0 ? style.correct : ''}`}
                />
            </div>
            <div>
                {option==='quiz_type' ? <input
                    type="radio"
                    onClick={(event)=>handleCorrectAnswer(1,event)}
                    name={`option_${questionIndex}`}
                />:<></>}
                <input
                    type="text"
                    placeholder='Text'
                    value={questions[questionIndex].options[1].value1}
                    onChange={(event) => handleInputChange(1, event)}
                    className={`${style.input} ${clickCoreect===1 ? style.correct : ''}`}
                />
            </div>
            <div>
                {option==='quiz_type' ? <input
                    type="radio"
                    onClick={(event)=>handleCorrectAnswer(2,event)}
                    name={`option_${questionIndex}`}
                />:<></>}
                <input
                    type="text"
                    placeholder='Text'
                    value={questions[questionIndex].options[2].value1}
                    onChange={(event) => handleInputChange(2, event)}
                    className={`${style.input} ${clickCoreect===2 ? style.correct : ''}`}
                />
            </div>
            <div>
                {option==='quiz_type' ? <input
                    type="radio"
                    onClick={(event)=>handleCorrectAnswer(3,event)}
                    name={`option_${questionIndex}`}
                />:<></>}
                <input
                    type="text"
                    placeholder='Text'
                    value={questions[questionIndex].options[3].value1}
                    onChange={(event) => handleInputChange(3, event)}
                    className={`${style.input} ${clickCoreect===3 ? style.correct : ''}`}
                />
            </div>
        </div>
    );
}

export default Textques;