import getDbData from "./route.ts";
import { useState, useEffect } from "react";

function PracticeMode() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [newQuestions, setNewQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        async function getData() {
            const data = await getDbData();
            setQuestions(data);
            setNewQuestions(data);

            if (data && data.length > 0) generateQuestion(data);
        }
        getData();
    }, []);

    function generateQuestion(availableQuestions?: any[]) {
        setMessage("");
        if (!availableQuestions || availableQuestions.length === 0) return;

        const randomIndex = Math.floor(
            Math.random() * availableQuestions.length,
        );
        const question = availableQuestions[randomIndex];

        setCurrentQuestion(question);

        setNewQuestions((prev) =>
            prev.filter((_, index) => index !== randomIndex),
        );
        return question;
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedAnswer) {
            setMessage("Please select an option first!");
            return;
        }

        if (selectedAnswer === correctanswer) {
            setMessage("Correct! 🎉");
        } else {
            setMessage(`Wrong! The correct answer was: ${correctanswer}`);
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
        example,
        difficulty,
    } = currentQuestion;

    const options = [option1, option2, option3, option4];

    return (
        <div>
            <h1>Practice mode</h1>
            <h3>{word}</h3>
            <h4>Choose the correct option for the word</h4>
            <form onSubmit={handleSubmit}>
                {options.map((option: any, index: number) => (
                    <div key={index}>
                        <input
                            type='radio'
                            name='option'
                            id={`m${index}`}
                            value={option}
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
            <br />
            <p>{message}</p>
            <br />
            <p>Example: {example}</p>
            <p>Difficulty: {difficulty}</p>
        </div>
    );
}

export default PracticeMode;
