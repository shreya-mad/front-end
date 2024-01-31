import React, { useState } from 'react';
import style from './Home.module.css';
import Dashboard from '../../components/dashboard/Dashboard';
import Analytics from '../../components/analytics/Analytics';
import Createquiz from '../../components/createquiz/Createquiz';
import {useNavigate} from 'react-router-dom';
const Navbar = ({ setPage}) =>{
    const navigate=useNavigate();
    const[hover,setHover]=useState('');
    return (
        <nav className={style.main}>
            <h1 className={style.head}>QUIZZIE</h1>
            <div className={style.option}>
                <button className={hover==='Dashboard'?style.btn1hover:style.btn1} onClick={()=>{
                    setPage('Dashboard')
                    setHover('Dashboard')
                    }}>Dashboard</button>
                <button className={hover==='Analytics'?style.btn1hover:style.btn1}  onClick={()=>{
                    setPage('Analytics')
                    setHover('Analytics')
                    }}>Analytics</button>
                <button className={hover==='Createquiz'?style.btn1hover:style.btn1}  onClick={()=>{
                    navigate('/createquiz')
                    setPage('Createquiz')
                    setHover('Createquiz')

                    }}>Create Quiz</button>
            </div>
            <button className={style.btn} style={{cursor:'pointer'}} onClick={()=>navigate('/')}>LOGOUT</button>
        </nav>
    );
};
const Home = () => {
    const [page, setPage] = useState('Dashboard');
    return (
        <div style={{display:'flex'}}>
            <Navbar setPage={setPage}  />
            <div className={style.home}>
                {page === 'Dashboard' && <Dashboard/>}
                {page === 'Analytics' && <Analytics/>}
                {page === 'Createquiz' && <Createquiz/>}
            </div>
        </div>
    );
};
export default Home;
        