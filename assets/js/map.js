
export default class Map {

    /**
     * 
     * @param {*} mapHeight 
     * @param {*} mapWidth 
     * @param {*} maxWall 
     * @param {*} minWall 
     */
    constructor(mapHeight, mapWidth, maxWall, minWall){

        this.map = [];
        for (let  h = 0; h < mapHeight; h++){
            this.map[h] = [];
            for (let w = 0; w < mapWidth; w++){
                this.map[h].push(0);
            }
        }
        var numberOfWall = Math.floor(Math.random() * ((maxWall-minWall))+ minWall);
        var x, y = 0;
        for (let i = 0; i < numberOfWall; i++){
            y = Math.floor(Math.random() * this.map.length);
            x = Math.floor(Math.random() * this.map[y].length);
            if (this.map[y][x] == 1){i--;}else{this.map[y][x] = 1;}
        }
    }

    /**
     * 
     * @param {int} maxWeapons 
     * @param {int} minWeapons 
     * @returns {array}  
     */
    addWeapons(maxWeapons, minWeapons){
        var numberOfWeapon = Math.floor(Math.random() * ((maxWeapons-minWeapons))+minWeapons);
        var x, y, i = 0;
        var weaponsPosition = [];
        while (numberOfWeapon != 0){
            y = Math.floor(Math.random() * this.map.length);
            x = Math.floor(Math.random() * this.map[y].length);
            if (this.map[y][x] != 1){
                this.map[y][x] = 2;
                weaponsPosition[i] = [y, x];
                i++;
                numberOfWeapon--;
            }
        }
        return weaponsPosition;
    }

    /**
     * 
     * @param {*} players 
     * @returns 
     */
    addPlayers(players){
        var x, y, i = 0;
        var playerPosition = [];
        while (i < players){
            y = Math.floor(Math.random() * this.map.length);
            x = Math.floor(Math.random() * this.map[y].length);
            if (this.map[y][x] != 1 && this.map[y][x] != 2){
                // The case is empty we can check if there is a player nearby
                var isPlayerAround = this.checkPlayersAround(x,y);
                if (isPlayerAround == false){
                    //no player around, continue
                    this.map[y][x] =3;
                    playerPosition[i] = [y, x];
                    i++;
                }
            }
        }
        return playerPosition
    }

    /**
     * 
     */
    renderMap(){
        //TODO : FIND A WAY TO SHOW WEAPONS WITH SPECIFIC IMAGE
        var renderMap = "";
        for (let i = 0; i < this.map.length; i++){
            renderMap += "<tr>";
            for (let j = 0; j < this.map[i].length; j++){
                if (this.map[i][j] == 1){
                    renderMap += "<td class='wall'></td>";
                }  else if (this.map[i][j] == 2){
                    renderMap += "<td class='weapon'></td>";
                }  else if (this.map[i][j] == 3){
                    renderMap += "<td class='player'></td>";
                }
                else {
                    renderMap += "<td></td>";
                }
            }
            renderMap += "</tr>";
        }
        $('#board').html(renderMap);
    }

    getMap(){
        return this.map;
    }

    setMap(map){
        this.map = map;
    }

    canMove(x, y){
        if (this.map[y][x] == 1 || this.map[y][x] == 3){
            return true;
        }else{
            return false;
        }

    }

    /**
     * 
     * @param {array} map 
     * @param {int} x 
     * @param {int} y 
     * @returns {bool}
     */
     checkPlayersAround(x, y){
        var isPlayerAround = false;
        var x1 = (x+1 > this.map[y].length-1) ? 0 : x+1;
        var x2 = (x-1 < 0) ? this.map[y].length-1 : x-1;
        var y1 = (y+1 > this.map.length-1) ? 0 : y+1;
        var y2 = (y-1 < 0) ? this.map.length-1 : y-1;
        if (this.map[y][x1] == 3 ){
            isPlayerAround = [y, x1];
        }else if(this.map[y][x2] == 3){
            isPlayerAround = [y, x2];
        }else if(this.map[y1][x] == 3){
            isPlayerAround = [y1, x];
        }else if(this.map[y2][x] == 3){
            isPlayerAround = [y2, x];
        }else if (this.map[y2][x2] == 3 ){
            isPlayerAround = [y2, x2];
        } else if (this.map[y2][x1] == 3){
            isPlayerAround = [y2, x1];
        } else if (this.map[y1][x2] == 3){
            isPlayerAround = [y1, x2]
        }
        if (this.map[y1][x1] == 3){
            isPlayerAround = [y1, x1];
        }
        return isPlayerAround;
    }

    
}

