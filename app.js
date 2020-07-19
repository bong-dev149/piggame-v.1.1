var score, curScore, curPlayer, gameOver, finalScore, dicePoint, rule, sixes, temp=0,win;
score = [0,0];
rule = '1. You can roll the dice as much as you can until you hit a one\n2. If you hit a one you lost all your current score and it becomes the next player turn\n3. To avoid losing all the score you can store it by pressing hold\n4. If you hit three sixes in a row all your saved scores will be lost.\n5. Reach the final score to win'
function init() {
    score = [0,0];
    curPlayer = 0;
    curScore = 0;
    sixes = 0;
    document.querySelector('.dice').style.opacity = '0';
    document.querySelector('#cScore-1').textContent = '0';
    document.querySelector('#cScore-0').textContent = '0';
    document.querySelector('#sBox-1').textContent = '0';
    document.querySelector('#sBox-0').textContent = '0';
    document.querySelector('#sText-1').textContent = 'PLAYER 2';
    document.querySelector('#sText-0').textContent = 'PLAYER 1';
    win = false;
    
}
//Funtion for checking winner
function isWin() {
    // console.log('in isWin');
    if (score[curPlayer] >= finalScore ) {
       // console.log('in if');
        document.querySelector('#sText-' + curPlayer).textContent = 'WINNER!!';
        win = true;
    }
}

//Function for changing player 
function changePlayer() {
    curScore = 0;
    document.querySelector('#cScore-' + curPlayer).textContent = curScore;
    if (curPlayer===1) {
        curPlayer = 0;
    } else {
        curPlayer = 1;
    }
    document.querySelector('.pl1').classList.toggle('active');
    document.querySelector('.pl2').classList.toggle('active');
    document.querySelector('.dice').style.opacity = '0';
} 

//Function for rolling the dice
function diceRoll() {
    if (win) return;
    if (temp === 0) {
        alert('Please set the final score');
        return;
    }
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.opacity = '100';
    // console.log('inside fucntion');
    dicePoint = Math.floor(Math.random()*6) + 1;
     console.log(dicePoint);
    diceDOM.src = './image/dice-' + dicePoint + '.png';
    if ( dicePoint === 6 ) {
        sixes += 1;
    } else {
        sixes = 0;
    }
    if (sixes === 3) {
        score[curPlayer] = 0;
        document.querySelector('#sBox-'+curPlayer).textContent = score[curPlayer];
        alert('LOL you lost all your score!!!!');

    }
    if (dicePoint === 1) {
        changePlayer();
    } else {
        curScore += dicePoint;
        document.querySelector('#cScore-' + curPlayer).textContent = curScore;
    }
}

// Function for hold button
function holdBttn() {
    if (win) return;
    if ( curScore === 0 ) {
        alert('0 can not be stored');
        return;
    }
    // save the point
    score[curPlayer] += curScore;

    // display the point
    document.querySelector('#sBox-'+curPlayer).textContent = score[curPlayer];

    // check the winner
    isWin();

    // change the player
    changePlayer();
}

// Function for new GAME
function nGame() {
    init();
}

//Function for rules
function rules() {
    alert(rule);
}

// Function for Ok
function okBtn() {
    finalScore =  document.querySelector('#inScore').value;
    alert('Final score has been set to ' + finalScore);
    temp = 1;
}


document.querySelector('#roll').addEventListener('click',diceRoll);
document.querySelector('#hold').addEventListener('click',holdBttn);
document.querySelector('#nGame').addEventListener('click',nGame);
document.querySelector('#rules').addEventListener('click',rules);
document.querySelector('#ok').addEventListener('click',okBtn);



init();