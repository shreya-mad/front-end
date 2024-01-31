import React from "react";
import style from './PollWinner.module.css';
const PollWinner = () => {
    return(
        <div className={style.main}>
            <div className={style.question}>
            <h1 style={{fontSize:"3rem",boxSizing:'border-box',overflow:'hidden'}}>Thank  You for Participating in the Poll</h1>
            </div>
        </div>
    )
}
export default PollWinner;