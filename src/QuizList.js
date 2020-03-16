import React from 'react'
import Quiz from './Quiz'

export default function QuizList({ quizList, addQuestion, removeQuestion, removeQuiz }) {
    return (
        quizList.map(quiz => {
            return (
                <>
                    <Quiz key={quiz.id} quiz={quiz} addQuestion={addQuestion} removeQuestion={removeQuestion} removeQuiz={removeQuiz} />
                </>
            )
        })
    )
}
