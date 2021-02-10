const flipCard = (target) => {
    const card = target.parentNode;

    // toggles flip animation/transition for back and frontface
    for (let i = 0; i < card.childNodes.length; i++) {
        const element = card.childNodes[i];
        element.classList.contains('flip') ? element.classList.remove('flip') : element.classList.add('flip')
    }
}

export default flipCard;