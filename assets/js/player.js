export default class Player{

    constructor(name, position, health, fistDamage, movementAuthorized) {
        this.name = name;
        this.position = position;
        this.health = health;
        this.fistDamage = fistDamage;
        this.movementAuthorized = movementAuthorized;
        this.didPlayerAttack = 0;
    }

    getHealth(){
        return this.health;
    }

    getFistDamage(){
        return this.fistDamage;
    }

    getName(){
        return this.name;
    }

    setHealth(health){
        this.health = health;
    }
    
    getPosition(){
        return this.position;
    }
    
    move(y, x){
        this.movementAuthorized--;
        this.position=[y, x];

        return this.movementAuthorized
    }

}