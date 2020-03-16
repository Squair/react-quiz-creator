import React, { useRef } from 'react'

export default function Question({ question, points, setPoints, currentQuestion, setCurrentQuestion, showNextQuestion }) {
    const questionRef = useRef()

    function checkAnswer() {
        setCurrentQuestion(currentQuestion + 1)
        showNextQuestion()
        if (questionRef.current.value.toUpperCase() === question.answer) {
            setPoints(points + 1)
        }
    }

    return (
        <div>
            <p> {question.name} </p>
            <input type="text" ref={questionRef} />
            <button onClick={checkAnswer}>Submit</button>
        </div>
    )
}
