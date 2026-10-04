import { useEffect, useState } from "react";
import getDbData from "./route.ts";

function TestMode() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        async function getData() {
            const data = await getDbData();
            setQuestions(data);

            if (data && data.length > 0) generateQuestion(data);
        }
        getData();
    }, []);

    function generateQuestion(availableQuestions: any[]) {
        setMessage("");

        if (!availableQuestions) return;

        const question = availableQuestions[index];

        setIndex((prev) => prev + 1);

        setCurrentQuestion(question);
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedAnswer) {
            setMessage("Please select an option first!");
            return;
        }

        if (selectedAnswer === correctanswer) {
            setMessage("Correct! 🎉");
            setRightAnswers((prev) => prev + 1);
        } else {
            setMessage(`Wrong! The correct answer was: ${correctanswer}`);
            setWrongAnswers((prev) => prev + 1);
        }
    }

    if (!currentQuestion) return <h1>Loading questions</h1>;

    const {
        word,
        option1,
        option2,
        option3,
        option4,
        correctanswer,
        difficulty,
    } = currentQuestion;

    const options = [option1, option2, option3, option4];

    return (
        <div>
            <h1>Test mode</h1>

            <h3>
                Right answers: {rightAnswers} <br />
                Wrong answers: {wrongAnswers}
            </h3>

            <h3>{word}</h3>
            <h4>Choose the correct meaning for the word</h4>
            <form onSubmit={handleSubmit}>
                {options.map((option: any, index: number) => (
                    <div key={index}>
                        <input
                            type='radio'
                            name='option'
                            value={option}
                            id={`m${index}`}
                            checked={selectedAnswer === option}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                        <label htmlFor={`m${index}`}>{option}</label>
                        <br />
                        <br />
                    </div>
                ))}
                <button type='submit'>Submit</button>
                <button
                    type='button'
                    onClick={() => generateQuestion(questions)}
                >
                    Next Question
                </button>
            </form>
            <p>{message}</p>
            <br />
            <p>Difficulty: {difficulty}</p>
        </div>
    );
}

export default TestMode;
