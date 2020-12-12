export const isPrevious = (index, currentIndex, amount) => {
    if(currentIndex === 0) {
        return index === amount - 1;
    } else {
        return index === currentIndex - 1;
    }
}

export const isCurrent = (index, currentIndex) => {
    return index === currentIndex;
}

export const isNext = (index, currentIndex, amount) => {
    if(currentIndex === amount - 1) {
        return index === 0;
    } else {
        return index === currentIndex + 1;
    }
}

export const isSecondNext = (index, currentIndex, amount) => {
    if(index === 0) {
        return currentIndex === amount - 2;
    }
    if(index === 1) {
        return currentIndex === amount - 1;
    }
    return index === currentIndex + 2;
}