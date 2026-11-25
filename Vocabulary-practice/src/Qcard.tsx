import Option from "./Option";
import { useContext } from 'react'
import { OptionContext, QuestionContext } from "./Contexts";

function Qcard( {options}: any ) {
    const { selectedAnswer, setSelectedAnswer, checkAnswer, correctanswer } = useContext(QuestionContext)
    const {
        option1,
        option2, 
        option3,
        option4
    } = options
    return (  
        <>
            <OptionContext value={{
                selectedAnswer, 
                setSelectedAnswer,
                checkAnswer, 
                correctanswer
            }}>
                <Option option={option1}/>
                <Option option={option2}/>
                <Option option={option3}/>
                <Option option={option4}/>
            </OptionContext>
        </>
    );
}

export default Qcard;