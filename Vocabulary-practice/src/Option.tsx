import { useContext } from 'react'
import { QuestionContext } from './Contexts';

export default function Option({ option }: any) {
    const {selectedAnswer, setSelectedAnswer, checkAnswer, correctanswer} = useContext(QuestionContext)
    return (  
        <>
            <div className='answer-card'>
                <input
                    type='radio'
                    name='option'
                    value={option}
                    checked={selectedAnswer === option}
                    aria-checked={selectedAnswer === option}
                    onChange={(e) => {
                        const selAns = e.target.value;
                        setSelectedAnswer(selAns);
                        checkAnswer(selAns, correctanswer);
                    }}
                />
                <label
                    style={{ marginLeft: "10px" }}
                >
                    {option}
                </label>
            </div>
        </>
    );
}

