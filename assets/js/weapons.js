export default class Weapon{


    constructor(name, damage, position, durability){
        this.name = name;
        this.damage = damage;
        this.position = position;
    }

    getPosition(){
        return this.position;
    }

    getDamage(){
        return this.damage;
    }

    getName(){
        return this.name;
    }


}