const generateGrid = (cards, rows, cols) => {
    const gridBox = document.getElementById('grid');

    // set grid variables based on user input
    gridBox.style.setProperty('--grid-rows', rows);
    gridBox.style.setProperty('--grid-cols', cols);

    // Create a card with a front and backface with a custom id attribute for 
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        const front = document.createElement('img');

        front.className = 'flip';
        const back = document.createElement('img');

        card.className = `card`;

        // custom attribute to compare the cards later
        card.setAttribute('image-id', `${cards[i]}`);

        card.appendChild(back);
        card.appendChild(front);

        front.src = `http://localhost:8111/svg/${cards[i]}/60`;

        // Probably not the best way to get the image, but the fastest
        back.src = 'https://www.svgrepo.com/show/30066/heart.svg';

        gridBox.appendChild(card);
    }
}

export default generateGrid;