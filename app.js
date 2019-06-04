/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, winningScore, activePrayer, gamePlaying;

init();

function nextPlayer(){
    document.getElementById('dice0').style.display = 'none';
    document.getElementById('dice1').style.display = 'none';
    roundScore = 0;
    previousDice = 0;
    currentDice = 0;
    document.getElementById('current-'+activePrayer).textContent=roundScore;
    document.querySelector('.player-'+activePrayer+'-panel').classList.toggle('active');
    activePrayer === 0 ? activePrayer=1 : activePrayer=0;
    document.querySelector('.player-'+activePrayer+'-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function(){

    function rollDices(){
        var dices = [0, 0]; 
        var diceDOM, imgName;
        for(var i=0; i<2; i++){
            dices[i] = Math.floor(Math.random() * 6) + 1; // create random number from 1 to 6
            imgName = 'dice-'+dices[i]+'.png'; 
            
            diceDOM = document.getElementById('dice'+i);
            diceDOM.src = imgName;  
            diceDOM.style.display = 'block'; //  2. display the result
        }
        
        return dices;
    };

    if(gamePlaying) {
       
       var currentDices = rollDices();
       console.log("Player "+activePrayer+" is currently playing");
       console.log('Current Dice Value: '+currentDices);
    //    console.log('Current Dice Value: '+currentDice);
       
        if(currentDices[0] !== 1 && currentDices[1] !== 1){
            roundScore +=currentDices[0] + currentDices[1]; //add score
            document.getElementById('current-'+activePrayer).textContent=roundScore;
            if(currentDices[0] === 6 && currentDices[1]===6){
                scores[activePrayer]=0;
                document.getElementById('score-'+activePrayer).textContent= scores[activePrayer];
                console.log('Player '+activePrayer+': You rolled two consequetive 6 in a row');
                nextPlayer();
            }
        }else{
            nextPlayer(); // dice === 1, so it is the next player turn.
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    // save currentPlayer points
    
    if(gamePlaying){
        scores[activePrayer] += roundScore; 
        document.getElementById('score-'+activePrayer).textContent= scores[activePrayer];
        
        winningScore = document.getElementById('winning-score').value;

        if(!winningScore || winningScore < 1 || winningScore >1000){
            winningScore = 100;
            document.getElementById('winning-score').value=winningScore;
    
            if(scores[activePrayer] >= winningScore){ // check if any player won the game
                document.querySelector('#name-'+activePrayer).textContent='Winner!!';
                document.getElementById('dice0').style.display = 'none';
                document.getElementById('dice1').style.display = 'none';
                document.querySelector('.player-'+activePrayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePrayer+'-panel').classList.remove('active');
                gamePlaying=false;
            }
        }else{
            nextPlayer();  // switch user turns. Update the UI
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){ //resetting all values of the game
    scores = [0,0];
    roundScore = 0;
    activePrayer = 0;
    gamePlaying = true;
    document.querySelector('#dice0').style.display= 'none'; 
    document.querySelector('#dice1').style.display= 'none'; 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent='PLAYER 1';
    document.getElementById('name-1').textContent='PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//-----------------------------------------------------------------------

    // activePrayer=1; // need to be toggle.
   
    // var currentScore = document.getElementById('current-'+activePrayer);
    // currentScore.textContent=roundScore;

    //  var diceDOM = document.querySelector('.dice');
    //  diceDOM.style.display = 'block';
    //  var imgName = 'dice-'+dice+'.png'; 
    //  diceDOM.src = imgName; // changing dice img src
     
    //  var animateCounter =0;
    //  var animate = setInterval(function(){ //animating dice
    //     // console.log(this.dice);
    //     animateCounter +=1;
    //     dice = Math.floor(Math.random() * 6) + 1; // 1. get a random number
    //     var imgName = 'dice-'+dice+'.png'; 
    //     diceDOM.src = imgName; // changing dice img src
    //     if(animateCounter===5){
    //         clearInterval(animate);
    //         console.log('inside animate'+dice)
    //     }
       
    // }, 75);
    