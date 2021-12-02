import Map from "./map.js";
import Weapon from "./weapons.js";
import Player from "./player.js";


export default class Game{
    //TODO : DEFENSE
    //TODO : Changer l'image weapons quand armes en mains


    // Game Parameter
    maxWeapons = 4;
    minWeapons = 1;
    maxWall = 6;
    minWall = 5;
    mapWidth = 10;
    mapHeight = 10;
    numberOfPlayer = 2;
    playerDefaultHealth = 100;
    playerDefaultFistDamage = 5;
    numberOfMovementAuthorized = 3;

    possibleWeapon = [
        ["Hache", 13],
        ["Pioche", 15],
        ["Sceau", 12],
        ["Bêche", 14],
        ["Epee", 16]
    ];

    /**
     * Initialisation de la partie
     */
    constructor(){
        this.map = new Map(this.mapHeight, this.mapWidth, this.maxWall, this.minWall, this);
        var weaponsPosition = this.map.addWeapons(this.maxWeapons, this.minWeapons);
        var playerPosition = this.map.addPlayers(this.numberOfPlayer);

        this.weapons = [];
        for (let i = 0; i<weaponsPosition.length; i++){
            let weaponsIndex =  Math.floor(Math.random() * this.possibleWeapon.length);
            let tempWeapon = this.possibleWeapon[weaponsIndex];
            _.pullAt(this.possibleWeapon, weaponsIndex);
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
                return true;
            }
        } 
        return false;
    }

    endTurn(){
        if (!this.isGameOver()){
            this.currentPlayer.movementAuthorized = this.numberOfMovementAuthorized;
            this.currentPlayer.setDidPlayerAttack(false);
            this.indexOfCurrentPlayer = (this.indexOfCurrentPlayer+1 >  this.players.length-1) ? 0 : this.indexOfCurrentPlayer+1;
            this.currentPlayer = this.players[this.indexOfCurrentPlayer];
            this.currentPlayer.setIsOnDefense(false);
            $("#info").text("Joueur " + this.currentPlayer.getName() + ", à toi de jouer !");
            let position = this.currentPlayer.getPosition();
            let playerAround = this.map.checkPlayersAround(position[1], position[0]);
            if (playerAround != false ){
                this.setTarget(playerAround);
                if (this.currentPlayer.getDidPlayerAttack()){
                    $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                }else{
                    $("#attack").removeAttr("disabled");
                }
            }else{
                    $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
            }
        }
        
        
    }

    checkMove(e){
        var position = this.currentPlayer.getPosition();
        var x = position[1];
        var y = position[0];
        if (this.isGameOver() == true){
            return false;
        }
        if (this.currentPlayer.movementAuthorized > 0){
            // UP
            if (e.which == 38 || e.which == 90){
                y = (y-1 < 0) ? this.map.map.length-1 : y-1;
                if (!this.map.cannotMove(x,y)){
                    this.map.map[position[0]][x] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x); 
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false ){
                        this.setTarget(playerAround);
                        if (this.currentPlayer.getDidPlayerAttack()){
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                        }else{
                            $("#attack").removeAttr("disabled");
                            $("#defense").removeAttr("disabled");
                        }
                    }else{
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                    }
                }
            }
            //Right
            if (e.which == 39 || e.which == 68){
                x = (x+1 >  this.map.map[y].length-1) ? 0 : x+1;
                if (!this.map.cannotMove(x,y)){
                    this.map.map[y][position[1]] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false ){
                        this.setTarget(playerAround);
                        if (this.currentPlayer.getDidPlayerAttack()){
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                        }else{
                            $("#attack").removeAttr("disabled");
                            $("#defense").removeAttr("disabled");
                        }
                    }else{
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                    }
                }
            }
            //Left
            if (e.which == 37 || e.which == 81){
                x = (x-1 < 0) ? this.map.map[y].length-1 : x-1;
                if (!this.map.cannotMove(x,y)){
                    this.map.map[y][position[1]] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false ){
                        this.setTarget(playerAround);
                        if (this.currentPlayer.getDidPlayerAttack()){
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                        }else{
                            $("#attack").removeAttr("disabled");
                            $("#defense").removeAttr("disabled");
                        }
                    }else{
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                    }
                }
            }
            //DOWN
            if (e.which == 40 || e.which == 83){
                y = (y+1 > this.map.map.length-1) ? 0 : y+1;
                if (!this.map.cannotMove(x,y)){
                    this.map.map[position[0]][x] = 0;
                    this.map.map[y][x] = 3;
                    this.currentPlayer.move(y,x);
                    let playerAround = this.map.checkPlayersAround(x, y);
                    if (playerAround != false ){
                        this.setTarget(playerAround);
                        if (this.currentPlayer.getDidPlayerAttack()){
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                        }else{
                            $("#attack").removeAttr("disabled");
                            $("#defense").removeAttr("disabled");
                        }
                    }else{
                            $("#attack").attr("disabled", true);
                            $("#defense").attr("disabled", true);
                    }
                }
            }
           
            this.map.renderMap();
        }
    }
    putPlayerInterface(){
        let game = this;
        this.players.forEach(function(currentValue, currentindex){
            let playerInterface = '<div class="card mb-3" style="max-width: 540px;" id="'+currentValue.getName()+'"><div class="row no-gutters"><div class="col-md-4"><img src="assets/img/players/'+currentValue.getName()+'.png" class="card-img" alt="..."></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">'+currentValue.getName()+'</h5><p class="card-text">Vie :</p><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div><p class="card-text">Équipement :</p><div style="display: flex; align-content:center"><img src="assets/img/icons/lefthand.png" class="handIcons" id="weaponImage" alt="image" ><p class="infosWeapons">Nom : <span id="weaponName">Main</span> <br/> Dégâts : <span id="weaponDamage">'+game.playerDefaultFistDamage+'</span></p></div></div></div></div></div>';
            let element = '';
            if ((currentindex % 2) == 0){
                element = $("#playerContainer1");
            } else {
                element = $("#playerContainer2");
            }
            element.html(element.html()+playerInterface);
        })

    }

    getWeaponByPosition(position){
        var weapon = this.weapons.filter(weapon => _.isEqual(position, weapon.getPosition()) == true);
        return weapon[0];
    }

    getPlayerByPosition(position){
        var player = this.players.filter(player => _.isEqual(position, player.getPosition()) == true);
        return player[0];
    }


    getCurrentPlayer(){
        return this.currentPlayer;
    }
    setTarget(position){
        var player = this.players.filter(player => _.isEqual(position, player.getPosition()) == true);
        this.target = player[0];    
    }

    getTarget(){
        return this.target
    }

    getMap(){
        return this.map;
    }

    attack(damage){
        console.log(this.target);
        if (this.target.getIsOnDefense() == true){
            console.log(Math.round(damage/2));
            this.target.setHealth(this.target.getHealth() - Math.round(damage/2));
        }else{
            this.target.setHealth(this.target.getHealth() - damage);
        }
        console.log(this.target.getHealth());
        return this.target.getHealth();

    }

    getMaxHealth(){
        return this.playerDefaultHealth;
    }


}
