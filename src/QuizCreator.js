import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function QuizCreator({ quiz, addQuestion, toggleShowCreator }) {
    const questionText = useRef();
    const answerText = useRef();

    function handleAddClick() {
        if (questionText.current.value === '' || answerText.current.value === '') return
        addQuestion(quiz.id, {
            'key': uuidv4(),
            'name': questionText.current.value,
            'answer': answerText.current.value.toUpperCase()
        })
        toggleShowCreator(false)
    }

    return (
        <div>
            <label>
                Enter new question:
                <br />
                <input type="text" ref={questionText} />
            </label>
            <hr />
            <label>
                Enter answer text:
                <br />
                <input type="text" ref={answerText} />
            </label>
            <button onClick={handleAddClick}>Add</button>
        </div>
    )
}
