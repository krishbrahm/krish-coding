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
    function successSound() {
        success.currentTime = 0;
        success.play().catch(err => console.error('Playback error: ', err));
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
                    successSound()
                }
            })
        })
    }

    function switchTurn(position) {
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
    }

    return (
        <div>
            <div className='board'>
                <div className='board-row'>
                    <Tile position='1' content={turn} onClick={() => switchTurn(1)} />
                    <Tile position='2' content={turn} onClick={() => switchTurn(2)} />
                    <Tile position='3' content={turn} onClick={() => switchTurn(3)} />
                </div>
                <div className='board-row'>
                    <Tile position='4' content={turn} onClick={() => switchTurn(4)} />
                    <Tile position='5' content={turn} onClick={() => switchTurn(5)} />
                    <Tile position='6' content={turn} onClick={() => switchTurn(6)} />
                </div>
                <div className='board-row'>
                    <Tile position='7' content={turn} onClick={() => switchTurn(7)} />
                    <Tile position='8' content={turn} onClick={() => switchTurn(8)} />
                    <Tile position='9' content={turn} onClick={() => switchTurn(9)} />
                </div>
            </div>
            <div>
                {winner === 'X' ? <h1>X Won!</h1> : winner === 0 ? <h1>O Won!</h1> : <p></p>}
            </div>
        </div>
    );
}

export default Board;
