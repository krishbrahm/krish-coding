interface Question {
    word: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    correctanswer: string,
    difficulty: string,
    id: number
}

interface PracticeQuestion extends Question  {
    example: string
}
