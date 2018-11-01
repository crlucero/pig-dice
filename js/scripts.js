function Players (bluePlayer, redPlayer, bluePlayerName, redPlayerName) {
  this.bluePlayer = bluePlayer,
  this.redPlayer = redPlayer,
  this.bluePlayerName = bluePlayerName,
  this.redPlayerName = redPlayerName,
  this.currentPlayer = "blue"


  this.starter = function (){
    var random =Math.floor(Math.random()*2);
    if (random===1) {
      this.currentPlayer = "red";
    }
  }
  this.starter()
  this.autoNaming = function (){
    if (this.bluePlayer==="comEasy") {
      this.bluePlayerName +="(Computer-Easy)"
    } else if (this.bluePlayer==="comHard") {
      this.bluePlayerName +="(Computer-Hard)"
    }
    if (this.redPlayer==="comEasy") {
      this.redPlayerName +="(Computer-Easy)"
    } else if (this.redPlayer==="comHard") {
      this.redPlayerName +="(Computer-Hard)"
    }
  }
  this.autoNaming();
}
Players.prototype.changeCurrent = function (){
  if (this.currentPlayer === "blue"){
    this.currentPlayer = "red";
  } else {
    this.currentPlayer = "blue";
  }
  return this.currentPlayer;
}
function Turn () {
  this.point = 0,
  this.dice =0,
  this.changeTurn= false
}
Turn.prototype.rollDice = function () {
  this.dice= Math.floor(Math.random() * 6)+1;
  if (this.dice===1) {
    this.point = 0;
    this.changeTurn= true;
  } else {
    this.point += this.dice;
  }
}
function Game (){
  this.finished = false;
  this.bluePoint = 0,
  this.redPoint = 0
}
Game.prototype.ifSomeoneWin = function (){
  if (this.bluePoint>=20 || this.redPoint>=20) {
    this.finished = true;
    return true;
  } else {
    return false;
  }
}
Game.prototype.turnEnd = function (turn,players){
  if (players.currentPlayer==="red") {
    this.redPoint+=turn.point;
  } else {
    this.bluePoint+=turn.point;
  }
}

function turnUpdate (game,players,turn){
  $("span#turnPoint").text(turn.point).css('color',players.currentPlayer);
  $("span#redPlayerScore").text(game.redPoint);
  $("span#bluePlayerScore").text(game.bluePoint);
}
function diceUpdate (turn,players){
  var images=["./img/dice1.png","./img/dice2.png","./img/dice3.png","./img/dice4.png","./img/dice5.png","./img/dice6.png"];
  var dices = [1,2,3,4,5,6];
  dices.forEach(function(dice){
    if (dice===turn.dice) {
      $(".dice img").attr('src',images[dice-1]);
    }
  })
  $("span#turnPoint").text(turn.point).css('color',players.currentPlayer)
}


$(document).ready(function() {
  $("form#formOne").submit(function(event) {
   event.preventDefault();
  var bluePlayer = $("#bluePlayerType").val();
  var redPlayer = $("#redPlayerType").val();
  var bluePlayerName = $("input#bluePlayer").val();
  var redPlayerName = $("input#redPlayer").val();
    // console.log(bluePlayer);
  var players = new Players(bluePlayer, redPlayer, bluePlayerName, redPlayerName);
  // console.log(players);
  $("span#redPlayerName").text(players.redPlayerName);
  $("span#bluePlayerName").text(players.bluePlayerName);
  // do {
  var game = new Game();
  var turn = new Turn();
  console.log(turn);
  $("#rollDiceButton").click(function(){
    turn.rollDice();
    diceUpdate(turn,players);
    if (turn.changeTurn) {
      console.log("i am running")
      players.changeCurrent();
      turn.changeTurn = false;
      diceUpdate(turn,players)
    }
  })
  $("#holdButton").click(function(){
    game.turnEnd(turn,players);
    turnUpdate(game,players,turn);
    if (game.ifSomeoneWin()){
      alert (players.currentPlayer+" player won!");
    } else {
      players.changeCurrent();
      turn = new Turn();
    }
  })
  //   do {
  //     turn.rollDice();
  //     diceUpdate(turn);
  //     var choice = false;
  //     if (turn.dice != 1) {
  //       choice = confirm(players.currentPlayer+' You rolled a '+turn.dice+' Do you want to continue?');
  //     }
  //     if (!choice) {
  //         turn.changeTurn= true;
  //       }
  //     } while (!turn.changeTurn)
  //
  //   if (players.currentPlayer==="blue"){
  //     game.bluePoint+=turn.point;
  //   } else {
  //     game.redPoint+=turn.point;
  //   }
  //   players.changeCurrent();
  //
  // } while (players.redPoint<10 && players.bluePoint<10);

  // console.log(players);
  // console.log(turn);

})
})
