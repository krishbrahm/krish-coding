import { useEffect, useState } from "react";
import { QuestionContext, SettingsContext } from './Contexts.ts'
import { Question } from './index.ts'
import Qcard from './Qcard.tsx'
import getDbData from "./route.ts";
import TestSettings from "./TestSettings.tsx";
import "./App.css";

export default function Main() {
    const [mode, setMode] = useState<'test' | 'practice'>('test')
    const [canSwitch, setCanSwitch] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([]);
    const [quizquestions, setQuizQuestions] = useState<Question[]>([]);
    const [index, setIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [quizIsOver, setQuisIsOver] = useState(false);
    const [quizlength, setQuizLength] = useState(5);
    const [data, setData] = useState(5);


    // Getting the data
    useEffect(() => {
        async function getData() {
            const data: Question[] = await getDbData();
            setQuestions(data);
        }

        getData();
    }, []);


    // Getting the questions
    useEffect(() => {
        if (questions.length === 0) return;

        const shuffled = [...questions].sort(() => Math.random() - 0.5);

        setQuizQuestions(shuffled.slice(0, quizlength));
    }, [questions, quizlength]);


    // Starting and ending the quiz 
    useEffect(() => {
        if (quizquestions.length > 0) {
            setIndex(0);
            setCurrentQuestion(quizquestions[0]);
            return;
        }
        if (quizIsOver)
            setMessage(`You got ${score / 2}/${quizlength} correct!`);
    }, [quizquestions]);

    function generateQuestion(nextIndex: number) {
        if (nextIndex >= quizlength) {
            setQuisIsOver(true);
            return;
        }
        if (!quizIsOver && nextIndex > 0) {
            setCanSwitch(false);
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
        setIsAnswered(false);
        setScore(0);
        setSelectedAnswer("");
        setMessage("");
        setQuisIsOver(false);

        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        const freshTen = shuffled.slice(0, quizlength);
        setQuizQuestions(freshTen);
        setCurrentQuestion(freshTen[0]);
    }

    function checkAnswer(selectedAnswer: string, correctanswer: string) {
        if (selectedAnswer === correctanswer) {
            setMessage("Correct! 🎉");
            setScore((prev) => prev + 1);
        } else {
            setMessage(`Wrong! The correct answer was '${correctanswer}'`);
        }
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!selectedAnswer) {
            setMessage("Please select an option first!");
            return;
        }
        setIsAnswered(true);
        checkAnswer(selectedAnswer, correctanswer);
        generateQuestion(index + 1);
    }
    if (mode === "test" && quizIsOver) {
        return (
            <div>
                <h2>You have finished the quiz</h2>
                <h3>
                    You got {score / 2} / {quizquestions.length} correct! 🎉
                </h3>
                <button onClick={handleRestart} className='restart-btn'>
                    Restart Quiz
                </button>
            </div>
        );
    }
    if (!currentQuestion) return <h1 className='loader'>Loading questions</h1>;

    const {
        word,
        option1,
        option2,
        option3,
        option4,
        correctanswer,
        difficulty,
        example,
    } = currentQuestion;

    const options = {option1, option2, option3, option4};

    return (
        <div>
            <header className='page-header'>
                <h2 style={{ flex: 1, color: "olive" }}> Score: {score}</h2>
            </header>
            <SettingsContext value={{
                data, 
                setData, 
                quizIsOver, 
                canSwitch, 
                quizlength, 
                setQuizLength, 
                mode,
                setMode
            }}>
                <TestSettings/>
            </SettingsContext>

            <h3 className='question-word'>{word}</h3>

            <h4 className='question-prompt'>
                Choose the correct meaning for the word <br />
            </h4>

            <form onSubmit={handleSubmit} className='quiz-card'>
                <div className='answers'>
                    <QuestionContext value={{
                        selectedAnswer, 
                        setSelectedAnswer, 
                        checkAnswer, 
                        correctanswer
                    }}>
                        <Qcard options={options} />
                    </QuestionContext>
                </div>

                <p
                    className='card-footer'
                    style={{
                        color:
                            selectedAnswer === correctanswer ? "green" : "red",
                    }}
                >
                    {message}
                </p>

                <button
                    className='primary-button'
                    type='submit'
                    disabled={isAnswered}
                >
                    Next
                </button>

                <footer className='card-footer'>
                    <p>Difficulty: {difficulty} <br/>
                        {mode === "practice" && <>Example: {example}</>}
                    </p>
                </footer>
            </form>
        </div>
    );
} 
