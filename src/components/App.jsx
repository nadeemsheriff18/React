import React , {useState} from "react";
import {FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa";

const actions = {
   rock: ["scissors"],
   paper: ["rock"],
   scissors: ["paper"],
   
 };


function randomAction(){
   
    const keys =Object.keys(actions); 
    const index=Math.floor(Math.random()* keys.length );
    return keys[index];
}

function ActionIcon({ action, ...props }) {
   const icons = {
     rock: FaHandRock,
     paper: FaHandPaper,
     scissors: FaHandScissors,
     
   };
   const Icon = icons[action];
   return <Icon {...props} />;
 }




 function Player({ name = "Player", score = 0, action = "rock" }) {
   return (
     <div className="player">
       <div className="score">{name}: {score}</div>
       <div className="action">
         {action && <ActionIcon action={action} size={80} />}
       </div>
     </div>
   );
 }

 function ActionButton({ action = "rock", onActionSelected }) {
   return (
     <button className="round-btn" onClick={() => onActionSelected(action)}>
       <ActionIcon action={action} size={50} />
     </button>
   );
 }

 function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You Win!😄",
    0: "It's a Tie😑",
    1: "You Lose!😔",
  };

  return (
    <p>{text[winner]}</p>
  )
}


  
 function calculateWinner(action1, action2) {
   if (action1 === action2) {
     return 0;
   } else if (actions[action1].includes(action2)) {
     return -1;
   } else if (actions[action2].includes(action1)) {
     return 1;
   }
 
   // This should never really happen
   return null;
 }
function App(){
const [PlayerAction, setPlayerAction]=useState("");
const [ComputerAction,setComputerAction] = useState("");

const [PlayerScore, setPlayerScore] = useState(0);
const [ComputerScore, setComputerScore] = useState(0);
const  [winner, setWinner] = useState("");

const onActionSelected= (selectedAction)=>{
 setPlayerAction(selectedAction);
 const newComputerAction=randomAction();
 setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(PlayerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(ComputerScore + 1);
    }
 
 
};

   return(
      <div className="center">
         <h1>Rock Paper Scissors</h1>
         <div className="container">
         <Player name="Player" score={PlayerScore} action={PlayerAction}/>
         <Player name="Computer" score={ComputerScore} action={ComputerAction}/>
         </div>
         <div className="buttons">
         <ActionButton  action="rock" onActionSelected={onActionSelected} />
         <ActionButton  action="paper" onActionSelected={onActionSelected}/>
         <ActionButton  action="scissors" onActionSelected={onActionSelected}/>
         </div>
         <div className="result-display">
            <ShowWinner winner={winner}/>
         </div>
      </div>
      
   );

};

export default App;