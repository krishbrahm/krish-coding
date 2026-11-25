import { useEffect, useContext } from 'react'
import { SettingsContext } from './Contexts';

export default function TestSettings() {
   
    const {
        data, 
        setData, 
        quizIsOver, 
        canSwitch, 
        quizlength, 
        setQuizLength, 
        mode,
        setMode
    } = useContext(SettingsContext)     

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
            <div className="mode-switch">
                <button onClick={() => setMode("practice")} aria-pressed={mode === 'practice'}>
                    Practice
                </button>
                <button onClick={() => setMode("test")} aria-pressed={mode === 'test'}>
                    Test
                </button>
            </div>

            <br/><br/>

            <label>Enter quiz length... </label>
            <input
                type='number'
                defaultValue={quizlength}
                min={1}
                onChange={(e) => setData(e.target.valueAsNumber)}
                disabled={!quizIsOver}
            />
            <button onClick={() => setQuizLength(data)}>Set</button>
            <br/>
        </>
    )
}