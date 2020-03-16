import React from 'react'

export default function QuestionRemove({ quiz, question, questionIndex, removeQuestion }) {
    function handleRemoveClick() {
        removeQuestion(quiz.id, questionIndex)
    }

    return (
        <div>
            <p> {question.name} = {question.answer} <button onClick={handleRemoveClick}>Remove Question</button> </p>
        </div>
    )
}
