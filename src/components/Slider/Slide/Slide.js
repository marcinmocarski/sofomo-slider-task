import classnames from 'classnames';
import {isPrevious, isCurrent, isNext, isSecondNext} from './Slide.utils';
import './Slide.scss';

const Slide = ({ imageSrc, index, currentIndex, amount, transitionDuration }) => {
    const classess = classnames("slide", {
        "slide__is-previous": isPrevious(index, currentIndex, amount),
        "slide__is-current": isCurrent(index, currentIndex),
        "slide__is-next": isNext(index, currentIndex, amount) ,
        "slide__is-second-next": isSecondNext(index, currentIndex, amount)
    });

    return (
        <div className={classess} style={{ backgroundImage: `url(${imageSrc})`, transitionDuration: `${transitionDuration}ms` }}>

        </div>
    )
}

export default Slide;