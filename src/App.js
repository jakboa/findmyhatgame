
import './App.css';
import { useState, useEffect } from 'react';


import GameBoard from './states/GameBoard';
import Controlls from './states/Controlls';
import { Field, SYMBOLS } from './GameLogic';


const images = require.context('./pictures', false, /\.(png|jpe?g|svg)$/);


function App() {
  const [playingGame, setPlayingGame] = useState(true);
  const [playField, setPlayField] = useState(Field.generateField(5, 5).arena);
  const [playerPosition, setPlayerPosition] = useState([0,0]);
  const [feedback, setFeedback] = useState('GoodLuck!')




  const onChangeGameMap = () => {
    setPlayField(Field.generateField(5, 5).arena);
    setPlayerPosition([0,0]);
    setFeedback('New game! Good luck!');
    setPlayingGame(true);
  }; 

  const playerControlls = (move) => {
    const [dy, dx] = move;    
    const [nextY, nextX] = [playerPosition[0] + dy, playerPosition[1] + dx];

    if (nextY >= 0 && nextY < playField.length && nextX >= 0 && nextX < playField[nextY].length) {
      setPlayField(prevField => {
        const newField = [...prevField];  
        newField[playerPosition[0]][playerPosition[1]] = SYMBOLS.PATH; 
        return newField;  
      });
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
        newField[playerPosition[0]][playerPosition[1]] = SYMBOLS.PLAYER; 
        return newField;  
      });
    }
  };

  useEffect(() => {
    console.log('Player Position Updated:', playerPosition);
    updateGameState(playerPosition);
  }, [playerPosition]);


  return (
    <div className="App">
      <GameBoard playingField={playField} />
      <p>{feedback}</p>
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
