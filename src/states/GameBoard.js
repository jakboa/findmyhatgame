import React from "react";
import GamePiece from './GamePiece';

import '../styles.css';



export default function GameBoard ( { playingField } ) {


    return (
        <div className='gameBoard'>
            <p>THIS IS GAME BOARD</p>
            {playingField.map((row, rowIndex) => (
                <div key={rowIndex} className="gameBoardRow">
                    {row.map((tile, tileIndex) => (
                        <GamePiece key={tileIndex} picture={tile} />
                    ))}
                </div>
            ))}
            
        </div>
    );
}
