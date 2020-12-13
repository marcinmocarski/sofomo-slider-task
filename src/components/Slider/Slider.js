import { useState, useEffect } from "react";
import Slide from "./Slide/Slide";
import Button from "../Button/Button";
import SliderNavigation from "./SliderNavigation/SliderNavigation";
import "./Slider.scss";
import iconNext from "../../svg/icon-next.svg";

const AUTOMATIC_SLIDE_INTERVAL = 1500;
const SLIDE_TRANSITION_DURATION = 400; // that's maximum transition time according to UX designers
const SWIPE_EVENT_MIN_TOUCH_DISTANCE = 100;

// TODO stop automatic slide transition on tab change

const Slider = ({ slidesData, title, subtitle }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isDuringTransition, setIsDuringTransition] = useState(false);

  let blockEventsTimeout;
  let touchStartClientX;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isMouseOver) {
        sliderControlsNextClickHandler();
      }
    }, AUTOMATIC_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  });

  if (slidesData.length < 5) {
    slidesData = [
      ...slidesData,
      ...slidesData,
      ...slidesData,
      ...slidesData,
      ...slidesData,
    ]; //nasty hack, i know
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
  };

  const sliderControlsPreviousClickHandler = () => {
    if (isDuringTransition) return;
    blockEventsWhileTransition();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(slidesData.length - 1);
    }
  };
  const sliderControlsNextClickHandler = () => {
    if (isDuringTransition) return;
    blockEventsWhileTransition();
    if (currentSlideIndex < slidesData.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };
  const mouseOverHandler = () => {
    setIsMouseOver(true);
  };
  const mouseOutHandler = () => {
    setIsMouseOver(false);
  };
  const touchStartHandler = event => {
    touchStartClientX = event.changedTouches[0].clientX;
  }
  const touchEndHandler = event => {
    const touchEndClientX = event.changedTouches[0].clientX;
    if(!touchStartClientX) return;
    const distanceBetweenTouches = touchEndClientX - touchStartClientX;
    if(Math.abs(distanceBetweenTouches) > SWIPE_EVENT_MIN_TOUCH_DISTANCE) {
        if(distanceBetweenTouches > 0) {
            sliderControlsPreviousClickHandler();
        } else {
            sliderControlsNextClickHandler();
        }
    }
  }
  const navItemClickHandler = (slideIndex) => {
      // #ASKCLIENT: That's not in requirements but I'm sure it's nice to have
    if (slideIndex === currentSlideIndex) return;
    const isAfterCurrent = slideIndex > currentSlideIndex;
    if (isAfterCurrent) {
        // move right to chosen slide
    } else {
        // move left to chosen slide
    }
  };

  return (
    <div
      className="slider"
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseOutHandler}
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
    >
      <div
        className="slider__controls slider__controls--previous"
        onClick={sliderControlsPreviousClickHandler}
      >
        <img src={iconNext} alt="Go to previous slide" />
      </div>
      <div
        className="slider__controls slider__controls--next"
        onClick={sliderControlsNextClickHandler}
      >
        <img src={iconNext} alt="Go to next slide" />
      </div>
      <div className="slider__text-layer">
        <div className="slider__title">{title}</div>
        <div className="slider__subtitle">{subtitle}</div>
        <div className="slider__buttons-wrapper">
          <div className="slider__button">
            <Button value="SHOP WOMENS" color={"#FFFFFF"} />
          </div>
          <div className="slider__button">
            <Button value="SHOP MENS" color={"#FFFFFF"} />
          </div>
        </div>
      </div>
      <div className="slider__navigation-layer">
        <SliderNavigation
          slidesData={slidesData}
          currentSlideIndex={currentSlideIndex}
          navItemClickHandler={() => {}}
        />
      </div>
      <div className="slider--content">{slides}</div>
    </div>
  );
};

export default Slider;
