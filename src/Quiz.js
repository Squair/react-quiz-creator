import React, { useState } from 'react'
import QuizCreator from './QuizCreator'
import Question from './Question'
import QuestionRemove from './QuestionRemove'

export default function Quiz({ quiz, addQuestion, removeQuestion, removeQuiz }) {
    const [showCreator, toggleShowCreator] = useState(false)
    const [showTakeQuiz, toggleTakeQuiz] = useState(false)
    const [showRemoveList, toggleRemoveQuestion] = useState(false)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [points, setPoints] = useState(0)

    function resetQuizMenu() {
        setPoints(0)
        setCurrentQuestion(0)
        toggleTakeQuiz(false);
        toggleShowCreator(false)
        toggleRemoveQuestion(false)
    }

    function handleTakeQuiz() {
        resetQuizMenu()
        toggleTakeQuiz(!showTakeQuiz);
    }

    function handleAddQuestion() {
        resetQuizMenu()
        toggleShowCreator(!showCreator)
    }

    function handleRemoveQuestion() {
        resetQuizMenu()
        toggleRemoveQuestion(!showRemoveList)
    }

    function showNextQuestion() {
        if (currentQuestion >= quiz.questions.length) return
        return <Question
            key={quiz.questions[currentQuestion].key}
            question={quiz.questions[currentQuestion]}
            points={points}
            setPoints={setPoints}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            showNextQuestion={showNextQuestion}
        />
    }

    function handleRemoveQuiz() {
        removeQuiz(quiz.id)
    }

    return (
        <div className="quizBox">
            <button onClick={handleRemoveQuiz}>Remove quiz</button>
            <p>Quiz Name: <b>{quiz.name}</b></p>
            <p>Number of questions: <b>{quiz.questions.length}</b></p>
            <button id='creator' onClick={handleAddQuestion}>Add question</button>
            <button id='removeQuestion' onClick={handleRemoveQuestion}>Remove question</button>
            <button id='takeQuiz' onClick={handleTakeQuiz}>Take quiz!</button>

            {showTakeQuiz && (
                showNextQuestion()
            )}

            <p>Total points: {points}/{quiz.questions.length} </p>

            {showCreator && (
                <QuizCreator quiz={quiz} addQuestion={addQuestion} toggleShowCreator={toggleShowCreator} />
            )}

            {showRemoveList && (
                quiz.questions.map((question, index) => {
                    return <QuestionRemove key={question.key} quiz={quiz} question={question} questionIndex={index} removeQuestion={removeQuestion} />
                })
            )}
        </div>
    )
}
