import getDbData from "./route.ts";
import { useState, useEffect } from "react";

function PracticeMode() {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [currentStreak, setCurrentStreak] = useState(0);
    const [highestStreak, setHighestStreak] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)


    useEffect(() => {
        async function getData() {
            const data: PracticeQuestion[] = await getDbData();
            setQuestions(data);

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

        return question;
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedAnswer) {
            setMessage("Please select an option first!");
            return;
        }

        setIsAnswered(true)

        if (selectedAnswer === correctanswer) {
            setMessage("Correct! 🎉");
            const nextStreak = currentStreak + 1
            setCurrentStreak(nextStreak)
            if (nextStreak > highestStreak) {
                setHighestStreak(nextStreak)
            }
        } else {
            setMessage(`Wrong! The correct answer was: ${correctanswer}`);
            setCurrentStreak(0)
        }
    }

    if (!currentQuestion) return <h1 className='loader'>Loading questions</h1>;

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
 
            <header className='page-header'>
                <h2>Vocabulary Quiz</h2>
                <h2>Current streak: {currentStreak}</h2>
                <h2>Highest streak: {highestStreak}</h2>
            </header>

            <h3>{word}</h3>
            <h4>Choose the correct option for the word</h4>
            <form onSubmit={!isAnswered ? handleSubmit : () => {}} className='quiz-card'>
                <div className='answers'>
                    {options.map((option: any, index: number) => (
                        <div key={index} className="answer">
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
                </div>
                <p className='card-footer'>{message}</p>
                <button type='submit'>Submit</button>
                <button
                    type='button'
                    onClick={() => generateQuestion(questions)}
                    disabled={!isAnswered}
                >
                    Next Question
                </button>
                <footer className='card-footer'>
                    <p>Example: {example}</p>
                    <p>Difficulty: {difficulty}</p>
                </footer>
            </form>
            <br />
            
            <br />

        </div>
    );
}

export default PracticeMode;
