export default class Player{

    weapon = null;

    constructor(name, position, health, fistDamage, movementAuthorized) {
        this.name = name;
        this.position = position;
        this.health = health;
        this.fistDamage = fistDamage;
        this.movementAuthorized = movementAuthorized;
        this.didPlayerAttack = false;
        this.isOnDefense = false;
    }

    getHealth(){
        return this.health;
    }

    setIsOnDefense(bool){
        this.isOnDefense = bool;
    }

    getIsOnDefense(){
        return this.isOnDefense;
    }

    setDidPlayerAttack(bool){
        this.didPlayerAttack = bool;
    }

    getDidPlayerAttack(){
        return this.didPlayerAttack;
    }

    setWeapon(weapon){
        this.weapon = weapon;
    }

    getWeapons(){
        return this.weapon;
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