const Quizz = ({ userAnswer, question, questionIndex }) => {

    return (
        <>
            {
                <div className={`slide ${questionIndex}`} key={questionIndex}>
                    <h4>{questionIndex + 1}) {question.question} ?</h4>
                    {
                        question.answers.map((answer, answerIndex) => {
                            return (
                                <p key={answerIndex}>
                                    <input
                                        id={`${answer.answer}-${answerIndex}`}
                                        type={'radio'}
                                        name={`answer-${questionIndex}`}
                                        value={answerIndex}
                                        onClick={() => { userAnswer(questionIndex, answerIndex) }}
                                    />
                                    <label htmlFor={`${answer.answer}-${answerIndex}`}>{answer.answer}</label>
                                </p>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}
export default Quizz
