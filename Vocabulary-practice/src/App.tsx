import { useState, useEffect } from "react";
import { SwitchContext } from './SwitchContext'
import Main from './Main.tsx'
import './App.css';

function App() {
    const [mode, setMode] = useState<'test' | 'practice'>('test')     
    const [canSwitch, setCanSwitch] = useState(true);

    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && canSwitch) {
                setCanSwitch(false);

                setMode('test')

                setCanSwitch(true);
            } else if (e.key === 'ArrowLeft' && canSwitch) {
                setCanSwitch(false);
                 
                setMode('practice')

                setCanSwitch(true)
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
