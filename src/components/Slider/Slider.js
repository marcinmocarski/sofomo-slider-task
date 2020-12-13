import { useState, useEffect } from 'react';
import Slide from './Slide/Slide';
import './Slider.scss';

const AUTOMATIC_SLIDE_INTERVAL = 1500;
const SLIDE_TRANSITION_DURATION = 500;

// TODO: problem with touch events - touchEnd works 50% of times
const Slider = ({ slidesData }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isDuringTransition, setIsDuringTransition] = useState(false);

    let blockEventsTimeout;

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(isMouseOver);
            if (!isMouseOver) {
                sliderControlsNextClickHandler();
            }
        }, AUTOMATIC_SLIDE_INTERVAL);
        return () => clearInterval(timer);
    });

    if (slidesData.length < 5) {
        slidesData = [...slidesData, ...slidesData, ...slidesData, ...slidesData, ...slidesData]; //nasty hack, i know
    }

    const slides = slidesData.map((slideDataPoint, slideIndex) => (
        <Slide
            key={slideIndex}
            imageSrc={slideDataPoint.imageSrc}
            index={slideIndex}
            currentIndex={currentSlideIndex}
            amount={slidesData.length}
            transitionDuration={SLIDE_TRANSITION_DURATION}
        />
    ));

    const blockEventsWhileTransition = () => {
        setIsDuringTransition(true);
        blockEventsTimeout = setTimeout(() => {
            setIsDuringTransition(false);
            clearTimeout(blockEventsTimeout);
        }, SLIDE_TRANSITION_DURATION);
    }

    const sliderControlsPreviousClickHandler = () => {
        if (isDuringTransition) return;
        blockEventsWhileTransition();
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        } else {
            setCurrentSlideIndex(slidesData.length - 1);
        }
    }
    const sliderControlsNextClickHandler = () => {
        if (isDuringTransition) return;
        blockEventsWhileTransition();
        if (currentSlideIndex < slidesData.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
            setCurrentSlideIndex(0);
        }
    }
    const mouseOverHandler = () => {
        setIsMouseOver(true);
    }
    const mouseOutHandler = () => {
        setIsMouseOver(false);
    }

    return (
        <div className="slider"
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
            onTouchStart={mouseOverHandler}
            onTouchEnd={mouseOutHandler}
        >
            <div className="slider--controls slider--controls__previous" onClick={sliderControlsPreviousClickHandler}>
                PREVIOUS
            </div>
            <div className="slider--controls slider--controls__next" onClick={sliderControlsNextClickHandler}>
                NEXT
            </div>
            <div className="slider--content">
                {slides}
            </div>
        </div>
    )
}

export default Slider;