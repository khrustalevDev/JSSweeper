document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10,
        squares = [],
        bombAmount = 20,
        isGameOver = false;



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
            square.addEventListener('click', function (e) {
                click(square);
            });
        }


        //Adding numbers
        for (let i = 0; i < squares.length; i++) {
            const isLeftEdge = (i % width === 0),
                isRightEdge = (i === width - 1);
            let total = 0;

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) {
                    total++;
                }
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) {
                    total++;
                }
                if (i > 10 && squares[i - width].classList.contains('bomb')) {
                    total++;
                }
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) {
                    total++;
                }
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) {
                    total++;
                }
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) {
                    total++;
                }
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) {
                    total++;
                }
                if (i < 89 && squares[i + width].classList.contains('bomb')) {
                    total++;
                }
                squares[i].setAttribute('data', total);
            }
        }

    }

    createBoard();

    //Click square handling
    function click(square) {
        let currentId = square.id;
        if (isGameOver) {
            return;
        }
        if (square.classList.contains('checked') || square.classList.contains('flag')) {
            return;
        }
        if (square.classList.contains('bomb')) {
            console.log('You lost!');
        } else {
            let total = square.getAttribute('data');
            if (total != 0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
    }

    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0),
            isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id,
                    newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id,
                    newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }





});