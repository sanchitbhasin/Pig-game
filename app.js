/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, activePlayer, currentScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(!gamePlaying){
        return ;
    }
    var dice = Math.floor(Math.random()*6 + 1);
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if(dice > 1){
        currentScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = currentScore;
    } else {
        next();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(!gamePlaying){
        return ;
    }
    //current score to main score
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //check if won
    if(scores[activePlayer] >= 100){
        //won
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {  
        //change active player
        next();
    }
});

function next(){
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}