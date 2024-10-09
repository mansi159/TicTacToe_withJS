console.log("Welcome to Tic Tac Toe")

let audioTurn = new Audio("turn.mp3")
let win = new Audio("win.mp3")
let lose = new Audio("lose.mp3")
let turn = "X";
let gameOver = false;

//function to change turn
const changeTurn = () => {
    return turn === "X"?"0": "X";
}

//function to check for win or tie
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let winDetected = false;

    if (!gameOver) {
        wins.forEach(e => {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
                showWinModal(boxtext[e[0]].innerText);
                winDetected = true;
            }
        })
    } 
    
    if (!winDetected && Array.from(boxtext).every(box => box.innerText !== "") && !gameOver) {
        showTieModal();
    }
}

//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!gameOver){
                document.getElementsByClassName("info")[0].innerText = "Turn - " + turn;
            }
        }
    })
})

const playAgainButton = document.getElementById('playAgainButton');
playAgainButton.addEventListener('click', () => {
    const boxtexts = document.querySelectorAll('.boxtext');
    boxtexts.forEach(boxtext => {
        boxtext.innerText = '';
    });

    turn = 'X';
    gameOver = false;

    const winModal = document.getElementById('winModal');
    winModal.style.display = 'none';

    document.querySelector('.info').innerText = 'Turn - X';
});

// Function to show the win modal
const showWinModal = (winner) => {
    const winModal = document.getElementById('winModal');
    const winnerText = document.getElementById('winnerText');
    winnerText.innerText = winner + ' wins!';
    winModal.style.display = 'flex'; // Change display property to 'flex' to center it
};

// Function to show the tie modal
const showTieModal = () => {
    const winModal = document.getElementById('winModal');
    const winnerText = document.getElementById('winnerText');
    winnerText.innerText = 'It\'s a Tie!';
    winModal.style.display = 'flex'; // Change display property to 'flex' to center it
};
