import React,{useState,useEffect} from "react";

const QuiesWiseAnlysis = ({questionWiseAnalysisData}) => {
    const [quizData, setQuizData] = useState({});
    const [questions, setQuestions] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/quiz/quiz/${questionWiseAnalysisData}`);
            const data = await response.json();
            setQuizData(data);
            const questions=data.questions;
            setQuestions(questions);
          } catch (error) {
            console.error("Error fetching quiz data:", error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div style={{padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h1 style={{color:'blue'}}>{`${quizData.quizName} Question Anlysis`}</h1>
            <div style={{color:'red',marginRight:'35px'}}>
                <p style={{marginBottom:'0px'}}>{`Created on: ${quizData.CreatedAt}`}</p>
                <p style={{marginTop:'0px'}}>{`Impressions: ${quizData.impressions}`}</p>
            </div>
            </div>
            <div>
                {Object.values(questions).map((question,index)=>(
                <div>
                    <h2>{question.question}</h2>
                    {quizData.quizType==='quiz_type'?
                     <div style={{display:'flex',justifyContent:'space-evenly'}}>
                       <div style={{backgroundColor:'white',width:'250px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`people Attempted the question `}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>9</p>
                        </div>
                        <div style={{backgroundColor:'white',width:'250px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`people Answered correctly `}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>5</p>
                        </div>
                        <div style={{backgroundColor:'white',width:'250px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`people Asnwered incorecctly`}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>4</p>
                        </div>
                     </div>
                    :
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                       <div style={{backgroundColor:'white',width:'170px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`option1`}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>9</p>
                       </div>
                       <div style={{backgroundColor:'white',width:'170px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`option2`}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>6</p>
                       </div>
                       <div style={{backgroundColor:'white',width:'170px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`option3`}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>7</p>
                       </div>
                       <div style={{backgroundColor:'white',width:'170px',height:'70px',textAlign:'center'}}>
                        <p style={{marginBottom:'0px'}}>{`option4`}</p>
                        <p style={{fontSize:'25px',marginTop:'0px',fontWeight:'700'}}>4</p>
                       </div>
                     </div>
                    }
                </div>
                ))}
            </div>
        </div>
    )
    }
export default QuiesWiseAnlysis;