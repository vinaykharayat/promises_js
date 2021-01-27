const handleInput = () => {
    const input = window.prompt("Enter a number from 1-6");
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    let score;
    if (input == randomNumber) {
        score = 2
    } else if (Math.abs(input - randomNumber) == 1) {
        score = 1;
    } else {
        score = 0;
    }
    return new Promise((resolve, reject) => {
        if (isNaN(input)) {
            reject(new Error("Invalid number"))
        } else if (input > 6 || input < 1) {
            reject(new Error("Enter a valid number in range"));
        } else {
            resolve({
                points: score,
                input,
                randomNumber
            })
        }
    });
}

const continueGame = () => {
    return new Promise((resolve) => {
        const answer = window.confirm("You want to continue?");
        if (answer) {
            resolve(true);
        } else {
            resolve(false);
        }
    })
}

const handleGuess = async() => {
    try {
        let result = await handleInput();
        alert(`Dice: ${result.randomNumber} \nYou entered ${result.input} \nYour score is ${result.points}`);
        let isContinue = await continueGame();
        if (isContinue) {
            handleGuess();
        } else {
            alert("Game ended");
        }
    } catch (error) {
        alert(error);
    }

}

handleGuess();