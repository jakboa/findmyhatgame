


import grassImage from './pictures/Grass.png';
import playerImage from './pictures/Player.png';
import pitImage from './pictures/Pit.png';
import roadImage from './pictures/Road.png';
import hatImage from './pictures/Hat.png';



const SYMBOLS = { HAT: hatImage, HOLE: pitImage, FIELD: grassImage, PATH: roadImage, PLAYER: playerImage };
const DIRECTIONS = { w: [-1, 0], a: [0, -1], s: [1, 0], d: [0, 1] };


class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    move(dir) {
        this.x += dir[1];
        this.y += dir[0]
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
};

class Field {
    constructor(arena) {
        this.arena = arena;
    }

    print() {
        this.arena.forEach(row => console.log(row.join('')));
    }

    static generateField(rows, cols) {
        const newField = Array.from({ length: rows }, () => 
        Array.from({ length:cols }, () => Math.random() < 0.75 ? SYMBOLS.FIELD : SYMBOLS.HOLE)
        );
        newField[0][0] = SYMBOLS.PATH;
        newField[rows -1][Math.floor(Math.random() * cols)] = SYMBOLS.HAT;
        return new Field(newField);
    }

    getSymbol(x, y) {
        return this.arena[y]?.[x];
    }

    setSymbol(x, y, symbol) {
        if (this.arena[y]) this.arena[y][x] = symbol;
    }
}



class GameEngine {
    constructor(field) {
        this.field = field;
        this.player = new Player();
        this.gameOver = false;
    }

    static isValidMove(x, y) {
        return this.field.getSymbol(x, y) !== undefined;
    }

    updateGameState() {
        const symbol = this.field.getSymbol(this.player.x, this.player.y);
        if (symbol === SYMBOLS.HOLE) {
            console.log('Oh no! You fell into a hole! Game over.')
            this.gameOver = true;
        } else if (symbol === SYMBOLS.HAT) {
            console.log('Congratulations! You found the hat!');
            this.gameOver = true;
        } else {
            this.field.setSymbol(this.player.x, this.player.y, SYMBOLS.PATH);
        }

    }

    play() {
        this.field.print();
        while (!this.gameOver) {
            const move = prompt('Move (w/a/s/d): ');
            const [dy, dx] = DIRECTIONS[move] || [];
            const [nextX, nextY] = [this.player.x + dx, this.player.y + dy];

            if (this.isValidMove(nextX, nextY)) {
                this.player.move([dy, dx]);
                this.updateGameState();
                this.field.print();
            } else {
                console.log('Invalid move! Out of bounds.');
            }
        }

    }
}


//const myField = Field.generateField(5, 20);
//const game = new GameEngine(myField);
//game.play();


export { GameEngine, Field, SYMBOLS} ;
