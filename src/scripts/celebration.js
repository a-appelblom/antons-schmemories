const celebration = (score) => {
    const trophy = document.getElementById('trophy');
    const trophyText = document.getElementById('trophyText');

    trophyText.innerHTML = `Congratulations!!! Your score is: ${score}`
    trophy.className = 'trophyAscend';

    setTimeout(() => {
        trophy.className = '';
    }, 5000)

}

export default celebration;