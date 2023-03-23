var currentPlayer = "X";
var player="X";
var gameOver = false;
var board = ["", "", "", "", "", "", "", "", ""];

var winningCombinations = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];

function handleGamerClick(id){
	player=(id.id=="X")?"X":"O";
	currentPlayer=player;
}

function handleBoxClick(cellId) {
	document.getElementById("group2").disabled = true;
	if (gameOver) {
		return;
	}
	var cell = document.getElementById(cellId);
	if (cell.innerHTML != "") {
		return;
	}

	cell.innerHTML = currentPlayer;
	board[cellId] = currentPlayer;

	for (var i = 0; i < winningCombinations.length; i++) {
		var combo = winningCombinations[i];
		if (board[combo[0]] != "" &&
			board[combo[0]] == board[combo[1]] &&
			board[combo[1]] == board[combo[2]]) {
			document.getElementById("message").innerHTML = currentPlayer + " wins!";
			gameOver = true;
			return;
		}
	}

	if (board.indexOf("") == -1) {
		document.getElementById("message").innerHTML = "Tie game!";
		gameOver = true;
		return;
	}

	currentPlayer = currentPlayer == "X" ? "O" : "X";
	if (currentPlayer!=player) handleBoxClick(assignRandom());
}
function reset(){
	for (var i = 0; i < board.length; i++) {
		board[i]="";
		document.getElementById(i).innerHTML="";
	}
	document.getElementById("message").innerHTML = "";
	gameOver = false;
	document.getElementById("group2").disabled = false;
	currentPlayer=player;
}

function assignRandom() { // min and max included 
	const min=0, max=8;
	var n=Math.floor(Math.random() * (max - min + 1) + min);
	while (board[n]!=""){
		n=Math.floor(Math.random() * (max - min + 1) + min);
	}
	return n;
}
