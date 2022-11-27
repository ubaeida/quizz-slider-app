import './slider.css'
import { useRef, useState, useEffect } from 'react';
import questions from '../../data/questions.js'
import Quizz from '../quizz/Quizz';
const Slider = () => {
    const show = useRef()
    const slider = useRef()
    const startBtn = useRef()
    const showResult = useRef()
    const slidesNo_box = useRef()
    const navigation_box = useRef()
    const checkBox = useRef()

    const [userAnswers, setUserAnswer] = useState({})
    const [activeSlide, setActiveSlide] = useState(0)
    const [questionsNumberList, setQuestionsNumberList] = useState([])
    const [slides, setSlides] = useState([])
    const [showNavigation, setShowNavigation] = useState(false)

    const showSlider = () => {
        show.current.style.display = 'block'
        show.current.style.opacity = 1
        checkBox.current.style.display = 'none'
        startBtn.current.style.opacity = 0
        startBtn.current.style.display = 'none'
    }

    const goNextSlide = () => {
        if (activeSlide < (slides.length - 1)) setActiveSlide(activeSlide + 1)
        else setActiveSlide(0)
    }

    const goPreviousSlide = () => {
        if (activeSlide > 0) setActiveSlide(activeSlide - 1)
        else setActiveSlide(slides.length - 1)
    }

    useEffect(() => {
        setSlides(slider.current.querySelectorAll('.slide'))
        setQuestionsNumberList(slidesNo_box.current.querySelectorAll('.slideNo'))
    }, [])

    useEffect(() => {
        const divWidth = 500
        const distaceToMove = divWidth * activeSlide * -1
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${distaceToMove}px)`
        })
    }, [activeSlide])

    const userAnswer = (questionNumber, ansewrNumber) => {
        const currentAnswers = { ...userAnswers }
        currentAnswers[questionNumber] = ansewrNumber
        setUserAnswer(currentAnswers)
        if (activeSlide < (slides.length - 1)) {
            setActiveSlide(activeSlide + 1)
        }
        questionsNumberList[questionNumber].style.backgroundColor = 'green'
    }

    const getResult = () => {
        const markPerQuestion = 100 / questions.length
        var score = 0
        const answerdQuestions = Object.keys(userAnswers)
        answerdQuestions.forEach((qIndex, i) => {
            if (questions[qIndex].answers[userAnswers[qIndex]].isCorrect) {
                score = score + markPerQuestion
            }
        })
        alert(Math.round(score))
    }
    
    const goToSlide = (slidNo) => {
        if (showNavigation == true) setActiveSlide(slidNo)
        else return
    }
    const handleNavigateStatues = () => {
        if (showNavigation == false)  setShowNavigation(true)
        navigation_box.current.style.display = 'block'
    }

    return (
        <>
            <div className='slide-container'>
                <h1>Welcome to our Quizz</h1>
                <button className='btn' ref={startBtn} onClick={showSlider}>Start</button>
                <div className='checkbox' ref={checkBox}>
                    <input type='checkbox' id='checkbox' onClick={handleNavigateStatues} />
                    <label htmlFor='checkbox'>Do you want to have the option to navigate between questions ? </label>
                </div>
                <div className="out-slider" ref={show}>
                    <div className='slider' ref={slider}>
                        {
                            questions.map((question, questionIndex) => {
                                return (
                                    <Quizz
                                        key={questionIndex}
                                        userAnswer={userAnswer}
                                        question={question}
                                        questionIndex={questionIndex} />
                                )
                            })
                        }
                        <div className='navigation-box' ref={navigation_box}>
                            {
                                (activeSlide < (slides.length - 1)) &&
                                <div className='navigation next' onClick={goNextSlide}>
                                    <div className='arrow'></div>
                                </div>
                            }
                            {
                                (activeSlide > 0) && <div className='navigation previous'
                                    onClick={goPreviousSlide}>
                                    <div className='arrow'></div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='slidesNo-box' ref={slidesNo_box}>
                        {
                            questions.map((slide, i) => {
                                return (
                                    <div key={i}
                                        onClick={() => goToSlide(i)}
                                        className={`slideNo ${i}`}
                                    >{i + 1}</div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    (questionsNumberList.length == Object.keys(userAnswers).length) &&
                    <button className='btn'
                        onClick={getResult}
                        ref={showResult}>Get Result</button>
                }
            </div>
        </>
    )
}
export default Slider