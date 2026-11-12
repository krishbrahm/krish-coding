import { useEffect, useState } from "react";
import getDbData from "./route.ts";
import './App.css'

export default function TestMode() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizquestions, setQuizQuestions] = useState<Question[]>([])
    const [index, setIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [quizIsOver, setQuisIsOver] = useState(false)

    const [currentStreak, setCurrentStreak] = useState(0);
    const [highestStreak, setHighestStreak] = useState(0)

    useEffect(() => {
        async function getData() {
            const data: Question[] = await getDbData();
            setQuestions(data);
        }

        getData();
    }, []);

    useEffect(() => {
        if (questions.length === 0) return;

        const shuffled = [...questions]
            .sort(() => Math.random() - 0.5);

        setQuizQuestions(shuffled.slice(0, 10));
    }, [questions]);
    
    useEffect(() => {
        if (quizquestions.length > 0) {
            setIndex(0);
            setCurrentQuestion(quizquestions[0]);
            return
        } 
        if (quizIsOver) setMessage(`You got ${score}/10 correct!`)
    }, [quizquestions]);

    function generateQuestion(nextIndex: number) {
        if (nextIndex >= quizquestions.length) {
            setQuisIsOver(true);
            return;
        }
        setIsAnswered(false);
        setMessage("");
        setSelectedAnswer("");

        const question = quizquestions[nextIndex];

        if (!question) return;

        setIndex(nextIndex);
        setCurrentQuestion(question);
    }

    function handleRestart() {
        setIndex(0);
        setIsAnswered(false);
        setScore(0);
        setSelectedAnswer("");
        setMessage("");
        setQuisIsOver(false);
        
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        const freshTen = shuffled.slice(0, 10);
        setQuizQuestions(freshTen);
        setCurrentQuestion(freshTen[0]); 
    }


    function checkAnswer(selectedAnswer: string, correctanswer: string) {
        if (selectedAnswer === correctanswer) {
            setMessage('Correct! 🎉')
            setScore((prev) => prev + 1);
        } else {
            setMessage(`Wrong! The correct answer was '${correctanswer}'`)
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
    if (quizIsOver) return (
        <div>
            <h2>You have finished the quiz</h2>
            <h3>You got {score} / {quizquestions.length} correct! 🎉</h3>
            <button onClick={handleRestart} className='restart-btn'>Restart Quiz</button>
        </div>
    )
    if (!currentQuestion) return <h1 className="loader">Loading questions</h1>;

    const {
        word,
        option1,
        option2,
        option3,
        option4,
        correctanswer,
        difficulty
    } = currentQuestion;

    const options = [option1, option2, option3, option4];

    return (
        <div>
            <header className="page-header">
               <h2 style={{flex: 1, color: "olive"}}> Score: {score}</h2>
            </header>
            <h3 className="question-word">{word}</h3>
            <h4 className="question-prompt">Choose the correct meaning for the word <br/></h4>

            <form onSubmit={handleSubmit} className='quiz-card'>
                <div className='answers'>
                    {options.map((option: string, index: number) => (
                        <div key={index}  className='answer-card'>
                            <input
                                type='radio'
                                name='option'
                                value={option}
                                id={`m${index}`}
                                checked={selectedAnswer === option}
                                aria-checked={selectedAnswer === option}
                                onChange={(e) => {
                                    const selAns = e.target.value
                                    setSelectedAnswer(selAns);
                                    checkAnswer(selAns, correctanswer)
                                }}
                            />
                            <label htmlFor={`m${index}`} style={{marginLeft: '10px'}}>{option}</label>
                           
                        </div>
                    ))}
                </div>
                <p className='card-footer' style={{color: selectedAnswer === correctanswer ? 'green' : 'red'}}>{message}</p>
                <button className='primary-button' type='submit' disabled={isAnswered}>Next</button>
                <footer className='card-footer'>
                    <p>Difficulty: {difficulty}</p>
                </footer>
            </form>

        </div>
    );
}
