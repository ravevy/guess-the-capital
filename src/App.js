import {useState } from "react";
import { useList } from "./context/ListContext";

import Game from "./components/Game";

function App(){
  const { loading, start, setStart} = useList()
  
  return (
    <div className="">
    {loading && <div className="load">Game is loading...</div>}
    {start && <Game />}
    { !loading && (start === true 
    ? <><button className="menu-button" onClick={()=>{setStart(false)}}>Back to Start</button></>
    : <>
        <div className="quiz top"><p>Guess the Capital</p></div>
        <div className="quiz bottom">
          <button className="start menu-button" onClick={()=>{setStart(true)}}>Start Game</button>
        </div></>)
    }


    </div>
  )


}

export default App;

