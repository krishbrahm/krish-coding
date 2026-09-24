import { useState } from 'react'
import './App.css'

function Tile(props) {
    const [content, setContent] = useState('')
    const [clicked, setClicked] = useState(false);


    function handleClick() {
        if (clicked) return;

        setContent(props.content);
        setClicked(true);
        props.onClick();
    }

    return (
        <div className='tile' onClick={handleClick}>
            {content}
        </div>
    );
}

export default Tile;