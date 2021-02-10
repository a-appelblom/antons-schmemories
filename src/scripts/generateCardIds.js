// This i had to google, from(https://bost.ocks.org/mike/shuffle/)
// Called a Fisher-Yates-shuffle
const shuffle = (array) => {
    let m = array.length, t, i;

    // While there remain elements to shuffle… ()
    while (m) {

        // Pick a remaining element… 
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

const generateCardIds = (gridSize) => {

    // initialize an array and create half the gridsize of unique ids
    let uniqueArray = new Array;
    for (let i = 0; i < gridSize / 2; i++) {
        uniqueArray.push(i);
    }

    // copy the array and join with the new for a combined array with 2 of each id;
    let doubledArray = uniqueArray.map(i => i);
    let combinedArray = uniqueArray.concat(doubledArray);

    // shuffle the array, wouldn't be much fun otherwise
    shuffle(combinedArray);
    return combinedArray;
}

export default generateCardIds;