//import logo from './logo.svg';
import startcards from './assests/cardimages/startcards.png'
import './App.css';
import { useState } from 'react';
import CardBack from './components/cardback';
import CardFace from './components/cardface';

function App() {
  const [start, setStart] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [cpuCards, setCpuCards] = useState([]);
  const [standState, setStandState] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  let cpuSum = getSum(cpuCards);
  let userSum = getSum(userCards);

  const winScreenOpen = () => {
    var win = document.getElementById('winScreen');
    win.style.display = "flex";
  }
  const winScreenClose = () => {
    var win = document.getElementById('winScreen');
    win.style.display = "none";
  }

  if(winMessage === '') {
    if(userSum === 21) {
      setWinMessage("Black Jack!");
      setStandState(true);
      winScreenOpen();
    }
    else if(userSum > 21) {
      setWinMessage("Bust");
      setStandState(true);
      winScreenOpen();
    }
  } 

  //get random number for card draw
  function getRandomNum() {
    return Math.floor((Math.random() * 12) + 1); //random number from 1-13
  }

  function getSum(arr) {
    var aceFound = false;
    var sum = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] === 1 && !aceFound) {
        sum += 1;
        aceFound = true;
      }
      else if(arr[i] >= 10) {
        sum += 10;
      }
      else {
        sum += arr[i];
      }
    }
    if(aceFound) {
      if(sum <= 11) {
        sum += 10;
      }
    }

    return sum;
  }

  const handleStart = () => {
    setStart(true);

    //get initial cards
    let initialUserCards = [];
    let initialCpuCards = [];

    var userCard1 = getRandomNum();
    initialUserCards.push(userCard1)

    var cpuCard1 = getRandomNum();
    initialCpuCards.push(cpuCard1);

    var userCard2 = getRandomNum();
    initialUserCards.push(userCard2);

    var cpuCard2 = getRandomNum();
    initialCpuCards.push(cpuCard2);

    //set player's cards to the intial cards
    setCpuCards(initialCpuCards);
    setUserCards(initialUserCards);
  }

  const handleQuit = () => {
    setStart(false);
    setCpuCards([]);
    setUserCards([]);
    setStandState(false);
    setWinMessage('');
    winScreenClose();
  }

  const handleHit = () => {
    var newCard = getRandomNum();
    setUserCards(cur => [...cur, newCard]);
  }

  const handleStand = () => {
    setStandState(true);

    let tempCpuCards = cpuCards;
    while(getSum(tempCpuCards) < 17) {
      var newCard = getRandomNum();
      tempCpuCards.push(newCard);
    }
    setCpuCards(tempCpuCards);
    cpuSum = getSum(tempCpuCards);
    handleWinState();
  }

  const handleWinState = () => {

    if(userSum > cpuSum) {
      console.log(cpuSum);
      setWinMessage("You Win!");
    }
    if(cpuSum > userSum) {
      if(cpuSum <= 21) {
        setWinMessage("You Lost");
      }
      else {
        setWinMessage("You Win!");
      }
    }
    if(cpuSum === userSum) {
      setWinMessage("Tie!")
    }
    winScreenOpen();
  }

  if(!start) {
    return (
      <div className="App">
        <header className="App-header-start">
          <div className='space-y-7'>

            <div className='flex justify-center'>
              <img className='w-96 h-80' src={startcards} alt='logo'/>
            </div>

            <h1 className='text-6xl font-medium text-stone-300'>Black Jack</h1>

            <button className='bg-stone-700 hover:bg-blue-500 w-60 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={handleStart}>
              <span className='text-4xl'>Play!</span>
            </button>

          </div>
        </header>
      </div>
    );
  }
  else if(start) {
    return(
      <div>
        <div id='winScreen' className='winScreen'>
          <div className='space-y-4'>
            <h1 className='text-8xl text-amber-500 font-bold'>{winMessage}</h1>
            <div className='text-3xl'>Dealer's Score: {cpuSum > 21 ? "Bust" : cpuSum}</div>
            <div className='text-3xl'>Your Score: {userSum}</div>
            <div id='buttons' className='flex space-x-4 justify-center'>
              <button id='playAgainButton' className='bg-stone-700 hover:bg-blue-500 w-48 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={() => {handleQuit(); handleStart();}}>
                <span className='text-4xl'>Play Again</span>
              </button>
              <button id='quitButton' className='bg-stone-700 hover:bg-blue-500 w-48 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={handleQuit}>
                <span className='text-4xl'>Quit</span>
              </button>
            </div>
          </div>
        </div>
        <header className='App-header-game'>
          <h1>Dealer's Cards: </h1>
          <div className='flex grid-cols-1 gap-4'>
            {standState ? cpuCards.map((card) => (
              <CardFace
                cardNum={card}
              />
            )) : (
                <div className='flex grid-cols-1 gap-4'>
                  <CardFace
                    cardNum={cpuCards[0]}
                  />
                  <CardBack/>
                </div>
            )}
          </div>

          <h1>Your Cards:</h1>
          
          <div className='flex grid-cols-1 gap-4'>
              {userCards.map((card) => (
                <CardFace
                  cardNum={card}
                />
              ))}
          </div>

          <div className='flex justify-center text-4xl font-medium'>Current Score: {userSum}</div>
          <div id='buttons' className='flex space-x-4 justify-center'>
            <button id='hitButton' className='bg-stone-700 hover:bg-blue-500 w-48 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={handleHit}>
              <span className='text-4xl'>Hit</span>
            </button>
            <button id='standButton' className='bg-stone-700 hover:bg-blue-500 w-48 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={handleStand}>
              <span className='text-4xl'>Stand</span>
            </button>
            <button id='quitButton' className='bg-stone-700 hover:bg-blue-500 w-48 h-16 rounded-3xl hover:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50' onClick={handleQuit}>
                <span className='text-4xl'>Quit</span>
              </button>
          </div>
        </header>
      </div>
    );
  }  
}

export default App;
