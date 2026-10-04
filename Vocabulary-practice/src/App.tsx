import { useState } from "react";
import PracticeMode from "./PracticeMode";
import TestMode from "./TestMode";
import "./App.css";

function App() {
    const [isOn, setIsOn] = useState(false);

    return (
        <>
            <h1>Welcome! Choose an option to start the vocab test:</h1>
            <br />
            <br />
            <form>
                <input
                    type='radio'
                    name='mode'
                    onChange={() => setIsOn(true)}
                    style={{ margin: "5px" }}
                />
                <label>Test mode</label>
                <br />
                <br />
                <input
                    type='radio'
                    name='mode'
                    onChange={() => setIsOn(false)}
                    style={{ margin: "5px" }}
                />
                <label>Practice mode</label>
            </form>

            {isOn ? <TestMode /> : <PracticeMode />}
        </>
    );
}

export default App;
