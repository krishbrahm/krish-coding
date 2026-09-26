// Imports

import Tile from "./Tile";
import "./App.css";
import { useContext } from "react";
import { TurnContext } from "./TurnContext.jsx";

function Board() {
    const { turn, winner, isDraw } = useContext(TurnContext); // Variables
    const { switchTurn, checkWin } = useContext(TurnContext); // Functions
    return (
        <div>
            {/* turn */}
            {!winner ? <h2>Turn: {turn}</h2> : null}
            <br></br>
            <div className='board'>
                <div className='board-row'>
                    {/* 1st board row */}
                    <Tile onClick={() => switchTurn(1)} />
                    <Tile onClick={() => switchTurn(2)} />
                    <Tile onClick={() => switchTurn(3)} />
                </div>
                <div className='board-row'>
                    {/* 2nd board row */}
                    <Tile onClick={() => switchTurn(4)} />
                    <Tile onClick={() => switchTurn(5)} />
                    <Tile onClick={() => switchTurn(6)} />
                </div>
                <div className='board-row'>
                    {/* 3rd board row */}
                    <Tile onClick={() => switchTurn(7)} />
                    <Tile onClick={() => switchTurn(8)} />
                    <Tile onClick={() => switchTurn(9)} />
                </div>
            </div>
            <div className='winMessage'>
                {/* Win message */}

                {winner ? (
                    <h1>{winner} Won!</h1>
                ) : isDraw ? (
                    <h1>It is a draw!</h1>
                ) : (
                    <h1></h1>
                )}
            </div>
        </div>
    );
}

export default Board;
