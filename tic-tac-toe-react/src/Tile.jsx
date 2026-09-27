import { useState, useContext, useRef } from "react";
import TurnContext from "./TurnContext.jsx";
import { startAudioPlay } from "./TicTacToe.jsx";
import "./App.css";

function Tile(props) {
    const [content, setContent] = useState("");
    const [clicked, setClicked] = useState(false);
    const { turn, gameOver } = useContext(TurnContext);
    const beep = useRef(new Audio("/beepSound.mp3"));

    function handleClick() {
        if (clicked || gameOver) return;
        startAudioPlay(beep, 0.3);
        setContent(turn);
        setClicked(true);
        props.onClick();
    }

    return (
        <div className='tile' onClick={handleClick}>
            <h1 id='content'>{content}</h1>
        </div>
    );
}

export default Tile;
