var scores = [0,0], 
	roundScore = 0,
	activePlayer = 0,
	gameOver = false,
	diceDom  = document.querySelector(".dice"),
	rollDice = document.querySelector(".btn-roll"),
	onHold	 = document.querySelector(".btn-hold"),
	preDice;

init();


rollDice.addEventListener("click", function(){
	if(!gameOver){

	//creating a random number
	var dice1 = Math.floor(Math.random() * (6))+ 1; 
	var dice2 = Math.floor(Math.random() * (6))+ 1; 
	
	//generating images
	document.getElementById("dice-1").style.display = "block";
	document.getElementById("dice-2").style.display = "block";
	document.getElementById("dice-1").src = "dice-" + dice1 +".png";
	document.getElementById("dice-2").src = "dice-" + dice2 +".png";
	
	//round score assigned to 0 if dice is 1 and next player will continue
	if(dice === 6 && preDice === 6){
		scores[activePlayer] = 0;
		document.querySelector("#score-" +activePlayer).textContent = "0";
		nextPlayer();
	}else if(dice !== 1){
		roundScore += dice;
		document.querySelector("#current-" + activePlayer).textContent = roundScore;
	}else{
		//next player
		nextPlayer();
	}	
	preDice = dice;
 }
});

onHold.addEventListener("click", function(){
		if(!gameOver){
		//Add to the Global 
		scores[activePlayer] += roundScore; 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var max = document.querySelector(".setScore").value;

		if(max){
			var setScore = max; 
		}else{
			setScore = 30;
		}

		//check if user wins 
		if(scores[activePlayer] >= setScore){
			document.getElementById("dice-1").style.display = "none";
			document.getElementById("dice-2").style.display = "none";

			document.querySelector("#name-" + activePlayer).textContent = "Winner!";					
			document.querySelector(".player-"+ activePlayer +"-panel").classList.remove("active");
			document.querySelector(".player-"+ activePlayer +"-panel").classList.add("winner");
			gameOver = true;
			
		}else{
			//nextPlayer
			nextPlayer();
		}
	}
})

function nextPlayer(){
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.querySelector("#current-0").textContent = 0;
		document.querySelector("#current-1").textContent = 0;

		//activate UI changing
		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");

		diceDom.style.display ="none";
}

  
document.querySelector(".btn-new").addEventListener("click", init);

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;	

	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";

	document.querySelector("#current-0").textContent = "0";
	document.querySelector("#current-1").textContent = "0";
	document.querySelector("#score-0").textContent = "0";
	document.querySelector("#score-1").textContent = "0";
	document.querySelector("#name-0").textContent = "player 1";
	document.querySelector("#name-1").textContent = "player 2";
	document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
}

