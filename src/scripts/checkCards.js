// compares custom attributes and returns true if matched
const checkCards = (first, second) => {
    const id1 = first.getAttribute('image-id')
    const id2 = second.getAttribute('image-id')
    return id1 === id2;
}

export default checkCards;