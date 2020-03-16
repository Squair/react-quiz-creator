import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import QuizList from './QuizList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const quizNameRef = useRef()
  const [quizList, setQuizList] = useState([])
  const [filterName, setFilterName] = useState("")

  const LOCAL_STORAGE_KEY = 'quizApp.quizList'

  function handleCreateQuiz() {
    const quizName = quizNameRef.current.value
    if (quizName === '') return
    setQuizList(prevQuiz => {
      return [...prevQuiz, { id: uuidv4(), name: quizName, questions: [] }]
    })
    quizNameRef.current.value = ""
    filterQuiz()
  }

  function filterQuiz() {
    setFilterName(quizNameRef.current.value)
  }

  function addQuestion(id, question) {
    const newQuizList = [...quizList]
    const newQuiz = newQuizList.find(quiz => quiz.id === id)
    newQuiz.questions = [...newQuiz.questions, question]
    setQuizList(newQuizList)
  }

  function removeQuestion(id, questionIndex) {
    const newQuizList = [...quizList]
    const newQuiz = newQuizList.find(quiz => quiz.id === id)
    newQuiz.questions.splice(questionIndex, 1)
    setQuizList(newQuizList)
  }

  function removeQuiz(id) {
    const copyQuizList = [...quizList]
    const newQuizList = copyQuizList.filter(quiz => quiz.id != id)
    setQuizList(newQuizList)
  }

  useEffect(() => {
    const storedQuizes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedQuizes) setQuizList(storedQuizes)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quizList))
  }, [quizList])

  return (
    <>
      <input type="text" ref={quizNameRef} onChange={filterQuiz} />
      <button onClick={handleCreateQuiz}>Create quiz</button>

      {filterName === "" && (
        <QuizList quizList={quizList} addQuestion={addQuestion} removeQuestion={removeQuestion} removeQuiz={removeQuiz} />
      )}
      {filterName != "" && (
        <QuizList quizList={quizList.filter(quiz => quiz.name.includes(filterName))} addQuestion={addQuestion} removeQuestion={removeQuestion} removeQuiz={removeQuiz} />
      )}
    </>
  )
}

export default App;
