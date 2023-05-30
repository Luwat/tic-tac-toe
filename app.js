const Gameboard = (() => {
    const gameboard = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    
    const setField = (index, sign) => {
        if (index > gameboard.length) return;
        gameboard[index] = sign;
    }

    const getField = (index) => {
        if (index > gameboard.length) return;
        return gameboard[index]; 
    }

    const reset = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = '';
        }
    }
    return {
        setField,
        getField,
        reset,
    }
})();

const DisplayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.querySelector('.message');
    const restartButton = document.querySelector('.restart-button')

    fieldElements.forEach((field) => {
        field.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== '') return;
            gameController.playRound(parseInt(e.target.dataset.index))
            updateGameboard();
        })
    });

    restartButton.addEventListener('click', (e) => {
        Gameboard.reset();
        setMessageElement("Player X's turn")
    })

    const updateGameboard = () => {
        for (let i=0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = Gameboard.getField(i)
        }
    }
    return {

    }
})();

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    }
    return {
        getSign,
    }
}

const gameController = (() => {


})();
const playerX = Player('X');
const playerO = Player('O');

console.log(playerO.getSign())
console.log(playerX.getSign())
console.log(Gameboard.setField(7, playerX.getSign()))

const getField = () => {
    return Gameboard.getField(7)
}

console.log(getField());