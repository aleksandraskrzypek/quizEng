import React from 'react';
import { useState, useEffect } from 'react';
import "../style/englishQuiz.scss"
import Dictionary from "../data/data.json"

function EnglishQuiz() {
    const [question, setQuestion] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()
    const [choices, setChoices] = useState([])
    const [step, setStep] = useState(3)
    const [score, setScore] = useState(0)
    const[numbers, setNumbers] = useState([])
    const [shuffledChoices, setShuffledChoices] = useState([]);


    async function handleNext() {
        const newNumbers = await randomNumbersFour();
        setNumbers(newNumbers)

        if (Dictionary[numbers[0]]) {
            setQuestion(Dictionary[numbers[0]].meaning);   
            setCorrectAnswer(Dictionary[numbers[0]].word);
            setChoices(() =>[Dictionary[numbers[0]].word, Dictionary[numbers[1]].word, Dictionary[numbers[2]].word, Dictionary[numbers[3]].word])
        }
    }   

    async function randomNumbersFour() {
        const newNumbers = [];
      
        while (newNumbers.length < 4) {
            const randomNumber = Math.floor(Math.random() * 102104);
    
            if (!newNumbers.includes(randomNumber)) {
            newNumbers.push(randomNumber);
            }
        }
        return newNumbers;
      }

    useEffect(() => {
        const shuffled = [...choices];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledChoices(shuffled);
      }, [choices]);

    
    const handleCheck = (item) => {
        if (item === correctAnswer){
            setScore(score + 1);
            handleNext()
        } else {
            setStep(2)
        }
    }

    const handleAgain = () => {
        setScore(0);
        setStep(1)
    }

    const handleStart = () => {
        handleNext()
        setStep(1);
    }

  return (
    <div className='componentHeader'>
        {(() => {
                if (step===1) {
                    return ( 
                        <div className='componentBody'>
            <div className='score'>
                <p>{score}</p>
            </div>
            <div className='meaning'>
                <p>{question}</p> 
            </div>
            <div className='answers'>
                <ul>
                    {shuffledChoices.map((item) => (
                        <li onClick={() => handleCheck(item)}>{item}</li>
                    ))}
                </ul> 
              
            </div> 
            <div className='buttonNextContainer'>
                <button className='buttonNext' onClick={() => handleNext()}>Next</button>
            </div>
            </div>
            )
        } else if (step===2) {
            return (
                <div className='componentBody'>
                    <div className='score'>
                        <p>Your Score: {score}</p>
                    </div>
                    <div className='tryAgain'>
                        <p>One more try?</p>
                        <button className='buttonNext' onClick={() => handleAgain()}>Try Again</button>
                    </div>
                </div>
            )
        } else if (step===3) {
            return (
                <div className='componentBody'>
                    <div className='startComponent'>
                        <p>Let's try your English!</p>
                        <button className='buttonNext' onClick={() => handleStart()}>START</button>
                    </div>
                </div>
            )
        }
        })()}
            <div>
            
        </div>
    </div>
  )
}

export default EnglishQuiz