import { useState } from 'react'
import './App.css'
function MyComponent(props) {
    const [oranges, setOranges] = useState(0);

    function handleClick() {
        setOranges(oranges => oranges + 1);
    };
    return (
        <div>
            <h1>Our Cool Component</h1>
            <p>
                There are {oranges} oranges & we are feeling {props.mood} and we have {props.energy} energy
            </p>
            <button onClick={handleClick}>Increase oranges</button>
        </div>
    );
};

export default MyComponent;