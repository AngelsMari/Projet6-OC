import Game from "./game.js";

var game;
$("#start").click(function(){
    game = new Game();
    $("#start").toggle();
    $("#button").toggle();
});

$(document).on("keyup", function(e){
    game.checkMove(e);
});

$("#endTurn").click(function(){
    game.endTurn();
})

$("#attack").click(function(){
    game.attack(game.getCurrentPlayer().getFistDamage());
})