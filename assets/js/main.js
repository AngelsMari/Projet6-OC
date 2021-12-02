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
    let remainingHealth = 100;
    if (!game.getCurrentPlayer().getWeapons()){
        remainingHealth = game.attack(game.getCurrentPlayer().getFistDamage());
    }else{
        remainingHealth = game.attack(game.getCurrentPlayer().getWeapons().getDamage());
    }
    game.getCurrentPlayer().setDidPlayerAttack(true);
    $("#attack").attr("disabled", true);
    $("#defense").attr("disabled", true);


    $("#"+game.getTarget().getName() +" .progress-bar").attr("aria-valuenow", remainingHealth);
    let size = (remainingHealth * 100 ) / game.getMaxHealth();
    $("#"+game.getTarget().getName() +" .progress-bar").css("width", size+'%');

    console.log(game.isGameOver());

    if (game.isGameOver() == true){
        alert("La partie est terminé ! " + game.getCurrentPlayer().getName() + " a gagné !");
        $("#info").text("La partie est terminé !");
        $('#replay').toggle();
        $("#button").toggle();
    }
})

$("#defense").click(function(){
    game.getCurrentPlayer().setIsOnDefense(true);
    $("#defense").attr("disabled", true);
    $("#attack").attr("disabled", true);
})