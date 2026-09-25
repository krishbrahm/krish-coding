import { useState } from 'react'
import './App.css'

function Tile(props) {
    const [content, setContent] = useState('')
    const [clicked, setClicked] = useState(false);


    function handleClick() {
        if (clicked || props.gameOver) return;

        setContent(props.content);
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