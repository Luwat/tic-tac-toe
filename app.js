const Gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    
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
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i=0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = Gameboard.getField(i)
        }
    };

    const setResultMessage = (winner) => {
        if (winner === 'Draw') {
            setMessageElement("It's a draw!")
        }else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return {
        setResultMessage,
        setMessageElement,
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
    const playerX = Player('X');
    const playerO = Player('O');
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        Gameboard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            DisplayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }

        if (round === 9) {
            DisplayController.setResultMessage('Draw');
            isOver = true
            return;
        }

        round++;
        DisplayController.setMessageElement(`Player ${getCurrentPlayerSign()}'s turn`)
    };
    
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions
        .filter((combination) => combination.includes(fieldIndex))
        .some((possibleCombination) => 
        possibleCombination.every(
            (index) => Gameboard.getField(index) === getCurrentPlayerSign()
        ));
    };

    const getIsOver = () => {
        return isOver
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return {
        playRound,
        getIsOver,
        reset,
    }
})();
