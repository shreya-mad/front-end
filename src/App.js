import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Regislog from './pages/Login/Regislog';
import Home from './pages/Home/Home';
import Quiz from './components/quiz/Quiz';
import Publish from './components/publish/Publish';
import Createquiz from './components/createquiz/Createquiz';
import QuizGiving from './components/quizGiving/QuizGiving';
import QuizWinner from './components/quizWinner/QuizWinner';
import PollWinner from './components/pollWinner/PollWinner';
import QuiesWiseAnlysis from './components/questionWiseAnalysis/QuiesWiseAnlysis';
function App() {
  return (
    <div>
      <Toaster/>
      <BrowserRouter>
          <Routes>
               <Route path='/' element={<Regislog/>}/>
               <Route path='/home' element={<Home/>} />
                <Route path='/quiz' element={<Quiz/>} />
                <Route path='/publish' element={<Publish/>} />
                <Route path='/createquiz' element={<Createquiz/>} />
                <Route path='/quizgiving/:id' element={<QuizGiving/>} />
                <Route path='/quizwinner' element={<QuizWinner/>} />
                <Route path='/pollwinner' element={<PollWinner/>} />
                <Route path='/questionwiseanalysis' element={<QuiesWiseAnlysis/>} />
          </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;



