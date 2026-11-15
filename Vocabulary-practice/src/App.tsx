import { useState, useEffect } from "react";
import { SwitchContext } from './SwitchContext'
import Main from './Main.tsx'
import './App.css';

function App() {
    const [mode, setMode] = useState<'test' | 'practice'>('test')     
    const [canSwitch, setCanSwitch] = useState(true);

    useEffect(() => {
        async function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "ArrowRight" && canSwitch) {
                canSwitch && setMode('test')
            } else if (e.key === 'ArrowLeft' && canSwitch) {
                canSwitch && setMode('practice')
            }

        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [canSwitch]);

    return (
        <>

        <header className="page-header">
                <h2>Vocabulary Quiz</h2>
            </header>

            <div className="mode-switch">
                
                <button onClick={() => setMode("practice")} aria-pressed={mode === 'practice'}>
                    Practice
                </button>

                <button onClick={() => setMode("test")} aria-pressed={mode === 'test'}>
                    Test
                </button>
            </div>
            <SwitchContext.Provider value={{setCanSwitch, mode}}>
            <Main />
            </SwitchContext.Provider>
        </>
    );
}

export default App;
