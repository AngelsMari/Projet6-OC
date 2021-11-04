import Map from "./map.js";
import Weapon from "./weapons.js";
import Player from "./player.js";


export default class Game{

    // Game Parameter
    maxWeapons = 4;
    minWeapons = 1;
    maxWall = 40;
    minWall = 5;
    mapWidth = 10;
    mapHeight = 10;
    numberOfPlayer = 6;
    playerDefaultHealth = 30;
    playerDefaultFistDamage = 1;
    numberOfMovementAuthorized = 3;

    possibleWeapon = [
        ["Pelle", 3, 6],
        ["Pioche", 5, 8],
        ["Sceau", 2, 15],
        ["Bêche", 4, 10],
        ["Epee", 6, 5]
    ];

    /**
     * Initialisation de la partie
     */
    constructor(){
        this.map = new Map(this.mapHeight, this.mapWidth, this.maxWall, this.minWall);
        var weaponsPosition = this.map.addWeapons(this.maxWeapons, this.minWeapons);
        var playerPosition = this.map.addPlayers(this.numberOfPlayer);

        this.weapons = [];
        for (let i = 0; i<weaponsPosition.length; i++){
            let weaponsIndex =  Math.floor(Math.random() * this.possibleWeapon.length);
            let tempWeapon = this.possibleWeapon[weaponsIndex];
            //TODO : SLICE POSSIBLE WEAPOND TO AVOID TWO SAME WEAPON
            this.weapons.push(new Weapon(tempWeapon[0], tempWeapon[1], weaponsPosition[i], tempWeapon[2]));
        }
        this.players = [];
        for (let i = 0; i<playerPosition.length; i++){
            this.players.push(new Player("player"+i,playerPosition[i], this.playerDefaultHealth, this.playerDefaultFistDamage, this.numberOfMovementAuthorized));
        }
        
        this.map.renderMap();

        this.indexOfCurrentPlayer = Math.floor(Math.random() * this.players.length);
        this.currentPlayer = this.players[this.indexOfCurrentPlayer];
        $("#info").text("Le joueur " + this.currentPlayer.getName() + " commence");
        $("#info").toggle();

        this.putPlayerInterface();

       
        
    
    }

    isGameOver(){
        for (let i in this.players){
            if (this.players[i].getHealth() <= 0){
                return this.players[i].getName;
            }
        } 
        return false;
    }

    endTurn(){
        if (!this.isGameOver()){
            this.currentPlayer.movementAuthorized = this.numberOfMovementAuthorized;
            this.indexOfCurrentPlayer = (this.indexOfCurrentPlayer+1 >  this.players.length-1) ? 0 : this.indexOfCurrentPlayer+1;
            this.currentPlayer = this.players[this.indexOfCurrentPlayer];
            $("#info").text("Joueur " + this.currentPlayer.getName() + ", à toi de jouer !");




        }
    }

    checkMove(e){
        var position = this.currentPlayer.getPosition();
        var x = position[1];
        var y = position[0];
        if (this.currentPlayer.movementAuthorized > 0){
            // UP
            if (e.which == 38 || e.which == 90){
                y = (y-1 < 0) ? this.map.map.length-1 : y-1;
                if (!this.map.canMove(x,y)){
                    this.map.map[position[0]][x] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false){
                        $("#attack").removeAttr("disabled");
                        this.getPlayerByPosition(playerAround);
                    }else{
                        $("#attack").attr("disabled", true);
                    }
                    this.map.renderMap();   
                }
            }
            //Right
            if (e.which == 39 || e.which == 68){
                x = (x+1 >  this.map.map[y].length-1) ? 0 : x+1;
                if (!this.map.canMove(x,y)){
                    this.map.map[y][position[1]] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false){
                        $("#attack").removeAttr("disabled");
                        this.getPlayerByPosition(playerAround);
                    }else{
                        $("#attack").attr("disabled", true);
                    }
                    this.map.renderMap();
                    
                }
            }
            //Left
            if (e.which == 37 || e.which == 81){
                x = (x-1 < 0) ? this.map.map[y].length-1 : x-1;
                if (!this.map.canMove(x,y)){
                    this.map.map[y][position[1]] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false){
                        $("#attack").removeAttr("disabled");
                        this.getPlayerByPosition(playerAround);
                    }else{
                        $("#attack").attr("disabled", true);
                    }
                    this.map.renderMap();
                }
            }
            //DOWN
            if (e.which == 40 || e.which == 83){
                y = (y+1 > this.map.map.length-1) ? 0 : y+1;
                if (!this.map.canMove(x,y)){
                    this.map.map[position[0]][x] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false){
                        $("#attack").removeAttr("disabled");
                        this.getPlayerByPosition(playerAround);
                    }else{
                        $("#attack").attr("disabled", true);
                    }
                    this.map.renderMap();
                }

            }
        }
    }

    putPlayerInterface(){
        this.players.forEach(function(currentValue, currentindex){
            let playerInterface = '<div class="card mb-3" style="max-width: 540px;" id="'+currentValue.getName()+'"><div class="row no-gutters"><div class="col-md-4"><img src="https://via.placeholder.com/180x250" class="card-img" alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+currentValue.getName()+'</h5><p class="card-text">Vie :</p><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div><p class="card-text">Équipement :</p><img src="assets/img/icons/lefthand.png" class="handIcons" alt="leftHand"><img src="assets/img/icons/righthand.png" class="handIcons" alt="leftHand"></div></div></div></div>';
            let element = '';
            if ((currentindex % 2) == 0){
                element = $("#playerContainer1");
            } else {
                element = $("#playerContainer2");
            }
            element.html(element.html()+playerInterface);
        })

    }

    getPlayerByPosition(position){
        var player = this.players.filter(player => arrayEquals(position, player.getPosition()) == true);
        this.target = player[0];
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    getMap(){
        return this.map;
    }

    attack(damage){
        console.log(this.target);
        this.target.setHealth(this.target.getHealth() - damage);
        console.log(this.target);

    }


}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }