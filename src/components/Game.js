import {useState} from "react";
import { useList } from "../context/ListContext";

function Game(){
  const [question, setQuestion] = useState(0);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected ] = useState(false)

  const {countryList} = useList()

  const handleClick = (e) => {
    //Scoring
    setSelected(true)
    if(e.target.innerHTML === countryList[question].correct){
      e.target.classList.add("correct")
      setTimeout(()=>{
        e.target.classList.remove("correct")
      }, 900)
      setScore(score+1)
    }
    else{
      e.target.classList.add("incorrect")
      setTimeout(()=>{
        e.target.classList.remove("incorrect")
      }, 900)
    }

    //Next Question
    setTimeout(() => {
      question === 9 ? setFinish(true) : setQuestion(question+1)
      setSelected(false)
    }, 900);   

  }

  return <div>
    {finish 
    ? (<>
        <div className="score"><p>You've tested {score} out of 10!</p></div>
      </>)
    : (<>
        <div className="quiz top"><p>Guess the Capital</p></div>
        <div className="quiz bottom">
          <div className="count"><span>{question+1}</span>/10:</div>
          <h2 className="country">{countryList[question].name}</h2>
          {countryList[question].capitals.map((answer, index)=>(
            <button className="quiz-button" key={index} onClick={(e)=>{handleClick(e)}} disabled={selected}>{answer}</button>
          ))}
        </div>
      </>)

    }
  </div>

}

export default Game;