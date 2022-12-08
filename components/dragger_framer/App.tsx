
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { Item } from './Item';
import axios from 'axios';
// const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

export default function DraggerFramer() {
  // const [items, setItems] = useState(initialItems);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [rawData, setRawData] = useState([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  useEffect(() => {
    axios.get('https://the-trivia-api.com/api/questions').then((res) => {
      setRawData(res.data);
      const incorrectAnswers = res.data[index].incorrectAnswers;
      const correctAnswer = res.data[index].correctAnswer;
      const question  = res.data[index].question
      let totalAnswers = [...incorrectAnswers, correctAnswer];
      totalAnswers = shuffleArray(totalAnswers);
      setCorrectAnswer(correctAnswer);
      setQuestion(question)
      setAnswers(totalAnswers);
    });
  }, []);

  const makeQuestion = (array) => {
    const incorrectAnswers = array.incorrectAnswers;
    const correctAnswer = array.correctAnswer;
    const question = array.question
    let totalAnswers = [...incorrectAnswers, correctAnswer];
    totalAnswers = shuffleArray(totalAnswers);
    setCorrectAnswer(correctAnswer);
    setQuestion(question)
    setAnswers(totalAnswers);
  };

  const nextQuestion = () => {
    setIndex(() => index + 1);
    makeQuestion(rawData[index + 1]);
  };

  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerText = `
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
}

ul {
  position: relative;
  width: 370px;
}

li {
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 18px;
  position: relative;
  background: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

li svg {
  width: 18px;
  height: 18px;
  cursor: grab;
}

`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }, []);

  return (
    <Reorder.Group axis="y" onReorder={setAnswers} values={answers}>
      <p>{index+1}. {' '} {question}</p>
      {answers.map((item) => (
        <Item key={item} item={item} />
      ))}
      <p>{JSON.stringify(answers[0])}</p>
      <button onClick={nextQuestion}>next</button>
    </Reorder.Group>
  );
}
