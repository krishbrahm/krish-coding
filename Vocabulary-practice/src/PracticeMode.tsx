import getDbData from "./route.ts";
import { useState, useEffect } from "react";

export default function PracticeMode() {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [currentStreak, setCurrentStreak] = useState(0);
    const [highestStreak, setHighestStreak] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [index, setIndex] = useState(0)


    useEffect(() => {
        async function getData() {
            const data: PracticeQuestion[] = await getDbData();
            setQuestions(data);

            if (data && data.length > 0) generateQuestion(index + 1);
        }
        getData();
    }, []);

    function generateQuestion(nextIndex: number) {

        setIsAnswered(false);
        setMessage("");
        setSelectedAnswer("");

        const question = questions[nextIndex];

        if (!question) return;

        setIndex(nextIndex);
        setCurrentQuestion(question);
    }

    function checkAnswer(selectedAnswer: string, correctanswer: string) {
        if (selectedAnswer === correctanswer) {
            setMessage('Correct! 🎉');
            const nextStreak = currentStreak + 1;
            setCurrentStreak(nextStreak);
            if (nextStreak > highestStreak) {
                setHighestStreak(nextStreak)
            } else {
                setMessage(`Wrong! The correct answer was :${correctanswer}`);
                setCurrentStreak(0)
            }
        }
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedAnswer) {
            setMessage("Please select an option first!");
            return;
        }

        setIsAnswered(true)
        
        checkAnswer(selectedAnswer, correctanswer)
        generateQuestion(index + 1)
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
                <h2>Vocabulary Quiz <br/> 
                    Current streak: {currentStreak} <br/> 
                    Highest streak: {highestStreak}
                </h2>

            </header>

            <h3 className='question-word'>{word}</h3>
            <h4 className='question-prompt'>Choose the correct option for the word</h4>
            <form onSubmit={handleSubmit} className='quiz-card'>
                <div className='answers'>
                    {options.map((option: any, index: number) => (
                        <div key={index} className="answer">
                            <input
                                type='radio'
                                name='option'
                                id={`m${index}`}
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={(e) => {
                                    const selAns = e.target.value
                                    setSelectedAnswer(selAns)
                                    checkAnswer(selAns, correctanswer)
                                }}
                            />
                            <label htmlFor={`m${index}`}>{option}</label>
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
                <p className='card-footer'>{message}</p>
                <button type='submit' disabled={isAnswered} >Submit</button>

                <footer className='card-footer'>
                    <p>Example: {example}</p>
                    <p>Difficulty: {difficulty}</p>
                </footer>
            </form>
            <br />
            
            <br />

        </div>
    );
};