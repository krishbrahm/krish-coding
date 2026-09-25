import { useState, useContext } from 'react'
import { TurnContext } from './Board.jsx'
import './App.css'

function Tile(props) {
    const [content, setContent] = useState('')
    const [clicked, setClicked] = useState(false);
    const { turn, gameOver } = useContext(TurnContext)

    function handleClick() {
        if (clicked || gameOver) return;
        setContent(turn);
        setClicked(true);
        props.onClick();
    }

    return (
        <div className='tile' onClick={handleClick}>
            <h1 id="content">{content}</h1>
        </div>
    );
}

export default Tile;