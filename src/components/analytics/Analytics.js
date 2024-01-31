import React, { useState, useEffect } from 'react';
import style from './Analytics.module.css';
import edit from '../../assets/edit.png';
import deleteicon from '../../assets/delete.png'; 
import share from '../../assets/share.png';
import {toast} from 'react-hot-toast';
import Modal from 'react-modal';
import QuiesWiseAnlysis from '../questionWiseAnalysis/QuiesWiseAnlysis';

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const [deleteData, setDeleteData] = useState(false);
  const[quizToDelete,setQuizToDelete]=useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionWiseAnalysisData, setQuestionWiseAnalysisData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quiz-creating.onrender.com/api/quiz/quiz`);
        const data = await response.json();
        setTableData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchData();
  }, []); 
  const handleDeleteConfirm = async () => {
    try {
      if (!quizToDelete) {
        console.error('Quiz to delete not set');
        return;
      }
  
      console.log('Deleting quiz with id:', quizToDelete);
  
      const response = await fetch(`https://quiz-creating.onrender.com/api/quiz/quiz/${quizToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Success:', data);
  
      setDeleteData(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShare=(quizId)=>{
   
    const linkToCopy=`https://front-end-1goj.vercel.app/quizgiving/${quizId}`;
    console.log(linkToCopy);
    navigator.clipboard.writeText(linkToCopy);
    toast.success('Link copied to clipboard',{
      duration:3000,
      position:'top-right',
      style:{
          zIndex:4,
          height:'50px',
      }
  });
    };

 
  return (
    <div>
      <h1 className={style.head}>Quiz Analysis</h1>
    <div className={style.table}>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Quiz Name</th>
            <th>Created At</th>
            <th>Impressions</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row,index) => (
            <tr key={row.srNo}>
              <td style={{textAlign:'center',width:'50px'}}>{index+1}</td>
              <td style={{width:'100px',textAlign:'center'}}>{row.quizName}</td>
              <td style={{textAlign:'center'}}>{row.CreatedAt}</td>
              <td style={{textAlign:'center'}}>{row.impressions}</td>
              <td><img src={edit} alt="impression" style={{width:'13px',textAlign:'center',height:'13px',cursor:'pointer'}}/>
              </td>
              <td><img src={deleteicon} onClick={()=>
                {setDeleteData(true)
                  setQuizToDelete(row._id)
               }} alt="impression" style={{width:'13px',textAlign:'center',height:'13px',cursor:'pointer'}}/>
              </td>
              <td>
              <img src={share} onClick={
                ()=>{
                  handleShare(row._id)
                }
              } alt="impression" style={{width:'13px',textAlign:'center',height:'13px',cursor:'pointer'}}/>
              </td>
              <td onClick={()=> 
                {setModalIsOpen(true)
                  setQuestionWiseAnalysisData(row._id)
              }} style={{fontSize:'0.8rem',textDecoration:'underline',cursor:'pointer',textAlign:'center'}}>Question Wise Analysis</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {deleteData && <div className={style.blur}></div>}
      {deleteData &&
      <div className={style.main}>
         <h1 style={{textAlign:'center'}}>Are your confirm you want to delete??</h1>
         <div style={{width:'80%',display:'flex',justifyContent:'space-between'}}>
           <button className={style.btn} onClick={handleDeleteConfirm}>confirm Delete</button>
           <button onClick={()=>setDeleteData(false)} className={style.btn}>cancel</button>
         </div>
      </div> 
      }
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  style={{
    content: {
      width: '82vw',
      height: '100vh', 
      position: 'absolute',
      // border:'2px solid red',
      top: '0px', 
      left: '18vw',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      backgroundColor:'#f2f2fa'
    },
    overlay: {
      backgroundColor: 'transparent' 
    }
  }}
>
  <QuiesWiseAnlysis questionWiseAnalysisData={questionWiseAnalysisData} />
</Modal>
    </div>
  );
};

export default Analytics;