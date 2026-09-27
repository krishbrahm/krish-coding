import Board from "./Board";
import { useState, useRef } from "react";
import TurnContext from "./TurnContext";

export function startAudioPlay(audio, volume) {
    audio.current.currentTime = 0;
    audio.current.volume = volume;
    audio.current.play().catch((err) => console.error("Playback error: ", err));
}

function TicTacToe() {
    const [turn, setTurn] = useState("X");
    const wcombs = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 5, 9],
        [3, 5, 7],
    ];
    const [x_list, setXList] = useState([]);
    const [o_list, setOList] = useState([]);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const success = useRef(new Audio("/successSound.mp3"));
    const [tilesTaken, setTilesTaken] = useState(0);
    const [wc, setWc] = useState(null);
    // Checking winners
    function checkWin(curList) {
        wcombs.forEach((wcomb) => {
            let i = 0;
            wcomb.forEach((tl) => {
                if (curList.includes(tl)) {
                    i++;
                }
                if (i === 3) {
                    setWc(wcomb);
                    setWinner(turn);
                    startAudioPlay(success, 0.4);
                }
            });
        });
        if (tilesTaken === 8) {
            setIsDraw(true);
            setGameOver(true);
        }
    }

    // Switching the turn
    function switchTurn(position) {
        if (winner) {
            setGameOver(true);
            return;
        }
        let newTilesTaken = tilesTaken + 1;
        setTilesTaken(newTilesTaken);
        if (turn === "X") {
            const nextX = [...x_list, position];
            setXList(nextX);
            checkWin(nextX);
        } else {
            const nextO = [...o_list, position];
            setOList(nextO);
            checkWin(nextO);
        }

        setTurn((prev) => (prev === "X" ? "O" : "X"));
    }

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <TurnContext
                value={{
                    turn,
                    winner,
                    isDraw,
                    switchTurn,
                    checkWin,
                    gameOver,
                    wcombs,
                    wc,
                }}
            >
                <Board />
            </TurnContext>
            {winner || tilesTaken === 9 ? (
                <button
                    onClick={() => window.location.reload()}
                    className='restart-btn'
                >
                    Restart Game
                </button>
            ) : null}
        </div>
    );
}

export default TicTacToe;
