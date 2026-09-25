import Tile from "./Tile";
import './App.css'
import { useState, createContext, useRef } from 'react'
export const TurnContext = createContext();
function Board() {
    const [turn, setTurn] = useState('X');
    const winning_combos = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    const [x_list, setXList] = useState([])
    const [o_list, setOList] = useState([])
    const [winner, setWinner] = useState(null)
    const [isDraw, setIsDraw] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const success = useRef(new Audio('/successSound.mp3')).current;
    const beep = useRef(new Audio('/beepSound.mp3')).current;
    const [tilesTaken, setTilesTaken] = useState(0)
    function startAudioPlay(audio) {
        audio.currentTime = 0;
        audio === beep ? audio.volume = 0.3 : audio.volume = 0.4
        audio.play().catch(err => console.error('Playback error: ', err));
    }
    function checkWin(curList) {
        winning_combos.forEach(wcomb => {
            let i = 0
            wcomb.forEach(sq => {
                if (curList.includes(sq)) {
                    i++
                }
                if (i === 3) {
                    setWinner(turn)
                    startAudioPlay(success)
                }
            })
        })
        if (tilesTaken === 8) {
            setIsDraw(true);
            setGameOver(true)
        }
    }

    function switchTurn(position) {
        if (winner) {
            setGameOver(true)
            return
        };
        let newTilesTaken = tilesTaken + 1;
        setTilesTaken(newTilesTaken);
        if (turn === 'X') {
            const nextX = [...x_list, position];
            setXList(nextX);
            checkWin(nextX);
        } else {
            const nextO = [...o_list, position];
            setOList(nextO);
            checkWin(nextO);
        };

        setTurn(prev => prev === 'X' ? 'O' : 'X');
        startAudioPlay(beep)
    }



    return (
        <TurnContext
            value={{
                turn,
                gameOver
            }}
        >
            {!winner ? <h2>Turn: {turn}</h2> : null}
            <br></br>
            <div className='board'>
                <div className='board-row'>
                    <Tile onClick={() => switchTurn(1)} />
                    <Tile onClick={() => switchTurn(2)} />
                    <Tile onClick={() => switchTurn(3)} />
                </div>
                <div className='board-row'>
                    <Tile onClick={() => switchTurn(4)} />
                    <Tile onClick={() => switchTurn(5)} />
                    <Tile onClick={() => switchTurn(6)} />
                </div>
                <div className='board-row'>
                    <Tile onClick={() => switchTurn(7)} />
                    <Tile onClick={() => switchTurn(8)} />
                    <Tile onClick={() => switchTurn(9)} />
                </div>
            </div>
            {(
                <div className="winMessage">
                    {winner ? <h1>{winner} Won!</h1> : isDraw ? <h1>It is a draw!</h1> : <h1></h1>}
                </div>
            )
            }
            {winner || tilesTaken === 9 ? <button onClick={() => window.location.reload()} className='restart-btn'>Restart Game</button> : null}
        </TurnContext>
    );
}

export default Board;