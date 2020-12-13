import classnames from "classnames";
import "./SliderNavigation.scss";

const SliderNavigation = ({slidesData, currentSlideIndex, navItemClickHandler}) => {
    const navigationPoints = slidesData.map((slideDataPoint, slideIndex) => {
        const classess = classnames("slider-navigation__item", {
            "slider-navigation__item--current": slideIndex === currentSlideIndex
        });
        return (<div key={`slider-navigation-${slideIndex}`} className={classess} onClick={() => {navItemClickHandler(slideIndex)}} />);
    });

    return (
        <div className="slider-navigation">
            {navigationPoints}
        </div>
    )
}

export default SliderNavigation;