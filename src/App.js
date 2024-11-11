
import './App.css';
import { useState, useEffect } from 'react';


import GameBoard from './states/GameBoard';
import Controlls from './states/Controlls';
import { GameEngine, Field, SYMBOLS } from './GameLogic';


const images = require.context('./pictures', false, /\.(png|jpe?g|svg)$/);


function App() {
  const [playingGame, setPlayingGame] = useState(true);
  const [playField, setPlayField] = useState(Field.generateField(5, 5).arena);
  const [playerPosition, setPlayerPosition] = useState([0,0]);
  const [feedback, setFeedback] = useState('GoodLuck!')

  useEffect(() => {
    // This will run after playerPosition has been updated
    updateGameState(); 
 }, [playerPosition]); 



  const onChangeGameMap = () => {
    setPlayField(Field.generateField(6, 20).arena);
    setPlayerPosition([0,0]);
    setFeedback('newgame good luck!');
  }; 

  const playerControlls = (move) => {
    const [dy, dx] = move;    
    const [nextY, nextX] = [playerPosition[0] + dy, playerPosition[1] + dx];

    if (nextY >= 0 && nextY < playField.length && nextX >= 0 && nextX < playField[nextY].length) {
        setPlayerPosition([playerPosition[0] + dy, playerPosition[1] + dx]);
        console.log(playerPosition);
        updateGameState();
    } else {
      setFeedback('Out of Bounds! not valid!');
    }
  }
 
 const updateGameState = () => {
    const symbol = playField[playerPosition[0]][playerPosition[1]];
    if (symbol === SYMBOLS.HOLE) {
      setFeedback('Oh no! You fell into a hole! Game over.')
      setPlayingGame(false);
    } else if (symbol === SYMBOLS.HAT) {
      setFeedback('Congratulations! You found the hat!');
      setPlayingGame(false);
    } else {
      setFeedback('Still Good!')
        

      setPlayField(prevField => {
        const newField = [...prevField];  
        newField[playerPosition[0]][playerPosition[1]] = SYMBOLS.PATH; 
        return newField;  
      });


    }

}



  return (
    <div className="App">
      <GameBoard playingField={playField} />
      <p>{feedback}!</p>
      <Controlls isPlaying={ playingGame } generateField={ onChangeGameMap } movePlayer={ playerControlls }  />
      <img src={images('./Grass.png')} alt='GrassPicture' />
      <img src={images('./Player.png')} alt='GrassPicture' /><br />
      <img src={images('./Road.png')} alt='GrassPicture' />
      <img src={images('./Hat.png')} alt='GrassPicture' />
      <img src={images('./Pit.png')} alt='GrassPicture' />
    </div>
  );
}

export default App;
