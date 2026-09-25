import Tile from "./Tile";
import './App.css'
import { useState, useRef } from 'react'

function Board() {
    const [turn, setTurn] = useState('X')
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
    const success = useRef(new Audio('/successSound.mp3')).current;
    const beep = useRef(new Audio('/beepSound.mp3')).current;
    function startAudioPlay(audio) {
        audio.currentTime = 0;
        if (audio === beep) { audio.volume = 0.3 } else { audio.volume = 0.4 }
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
    }

    function switchTurn(position) {
        if (winner) return;

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
        <div>
            <div className='board'>
                <div className='board-row'>
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(1)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(2)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(3)} />
                </div>
                <div className='board-row'>
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(4)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(5)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(6)} />
                </div>
                <div className='board-row'>
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(7)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(8)} />
                    <Tile content={turn} gameOver={winner ? true : false} onClick={() => switchTurn(9)} />
                </div>
            </div>
            {winner && (
                <div className="winMessage">
                    {winner && <h1>{winner} Won!</h1>}
                </div>
            )
            }
            {winner && <button onClick={() => window.location.reload()} className='restart-btn'>Restart Game</button>}
        </div>
    );
}

export default Board;