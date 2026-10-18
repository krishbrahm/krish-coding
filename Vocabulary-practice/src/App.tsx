import { useState, useEffect } from "react";
import PracticeMode from "./PracticeMode";
import TestMode from "./TestMode";
import './App.css'

function App() {
    const [mode, setMode] = useState<'test' | 'practice'>('test')     
    const [canSwitch, setCanSwitch] = useState(true);

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && canSwitch) {
                setCanSwitch(false);

                setMode('test')

                await sleep(250);
                setCanSwitch(true);
            } else if (e.key === 'ArrowLeft' && canSwitch) {
                setCanSwitch(false);
                 
                setMode('practice')

                await sleep(250)
                setCanSwitch(true)
            }

        };

        const sleep = (ms: number) => {
            return new Promise(r => setTimeout(r, ms));
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [canSwitch]);

    return (
        <>
            <br />
            <br />

            <div className="mode-switch">

                <button onClick={() => setMode("practice")} aria-pressed={mode === 'practice'}>
                    Practice
                </button>

                <button onClick={() => setMode("test")} aria-pressed={mode === 'test'}>
                    Test
                </button>
            </div>
            <br/><br/>
            {mode === 'test' ? <TestMode /> : <PracticeMode />}
        </>
    );
}

export default App;
