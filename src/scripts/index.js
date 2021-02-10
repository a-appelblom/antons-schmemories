import '../styles/index.scss';
import flipCard from './flipCard';
import generateCardIds from './generateCardIds.js';
import generateGrid from './generateGrid.js';
import checkCards from './checkCards.js';
import celebration from './celebration.js'

// store elements in variables for easier and more readable code
const grid = document.getElementById('grid');
const gridForm = document.getElementById('gridForm');
const gridInputCol = document.getElementById('gridSizeInputCol');
const gridInputRow = document.getElementById('gridSizeInputRow');


// main function
const start = () => {

    // initialize variables inside main function for easier replayability without reloading
    let firstFlip = true;
    let passedCheck = false;
    let clickDisabled = false; // to prevent clicks before flipping back
    let first, second; // To store the cards for comparison
    let remainingCard; // To know when the game is finished
    let score;

    // named function to be able to remove the eventlistener
    const cardClick = (e) => {
        if (clickDisabled) return;

        flipCard(e.target);

        // if first flip no checks neccessary
        if (firstFlip) {
            first = e.target // store for comparison later
            firstFlip = false;
        } else {
            second = e.target; // store for comparison later
            firstFlip = true;

            // Checks for a custom attribute on card
            // Requires parent because attribute is set on card and not image
            passedCheck = checkCards(first.parentNode, second.parentNode);
            if (!passedCheck) {
                clickDisabled = true; // prevent clicking while flipping back

                // Timeout so you can se the animation of second card
                setTimeout(() => {

                    // flip the card back face down
                    flipCard(first);
                    flipCard(second);
                    clickDisabled = false;
                    score--;

                }, 1000)
            } else {

                // remove eventlistener to prevent flipping back correct cards
                first.parentNode.removeEventListener('click', cardClick);
                second.parentNode.removeEventListener('click', cardClick);

                // probably not neccessary since the will be overwritten but i feel safer
                first = null;
                second = null;

                // since correct cards come in pairs, decrease by 2
                remainingCard -= 2;
                if (remainingCard === 0) {
                    setTimeout(() => {

                        // For your entertainment 
                        celebration(score);
                    }, 1000);
                }
            }
        }
    }

    // get values from user input for the gridsize
    const cols = gridInputCol.value;
    const rows = gridInputRow.value;

    // Make sure the grid is an even number and prevent too massive grids
    if (cols >= 2 && rows >= 2 && cols <= 16 && rows <= 16 && (cols * rows) % 2 === 0) {

        const gridSize = rows * cols;
        remainingCard = gridSize;
        score = gridSize * 2; // Just an arbitrary scoring-system. Seems fair enough

        // Create and shuffle ids for the cards, 2 of each id
        const cardIds = generateCardIds(gridSize);

        // render the grid, and set id attributes
        generateGrid(cardIds, rows, cols);

        // could be set in generation but i wanted too keep all the imports in the main file
        const cards = document.querySelectorAll("div.card");

        cards.forEach(card => {
            card.addEventListener('click', cardClick)
        })
    } else {
        window.alert('rows and columns must be between 2 and 16 and the resulting grid must be an even total')
    }
}

// Start game on user submit and make sure grid is empty before starting
gridForm.addEventListener('submit', (e) => {
    e.preventDefault();
    grid.innerHTML = '';
    start();
})
