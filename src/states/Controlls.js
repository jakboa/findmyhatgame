import React from "react";





function Controlls( { generateField, movePlayer, isPlaying } ) {

    const move = (directions) => {
        movePlayer(directions)
    };


    return (
        <div className='PlayButtons'>
            {isPlaying &&
            <div>
                <button className='up' onClick={() => move([-1, 0]) }>UP</button>
                <button className='down' onClick={() => move([1, 0]) }>DOWN</button>
                <button className='left' onClick={() => move([0, -1]) }>LEFT</button>
                <button className='right' onClick={() => move([0, 1]) }>RIGHT</button>
            </div>
            }
            <br/>
            <button className='newGameButton' onClick={generateField}>NEW MAP!</button>
            <button className='stop'>STOPP GAME</button>
        </div>
    )
}

export default Controlls;