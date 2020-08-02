document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10,
        squares = [],
        bombAmount = 20;



    //Board create
    function createBoard() {
        //Board and bombs randomizer
        const bombsArray = Array(bombAmount).fill('bomb'),
            emptyArray = Array(width * width - bombAmount).fill('valid'),
            gameArray = emptyArray.concat(bombsArray),
            shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        console.log(shuffledArray);


        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }


        //Adding numbers
        

    }

    createBoard();
});