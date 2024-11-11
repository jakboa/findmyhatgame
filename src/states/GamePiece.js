import React from "react";
import '../styles.css';


function GamePiece( { picture, key } ) {

    return (
        <img src={picture} alt={picture} className="gameBoardTile"/>    
    )
}


export default GamePiece;