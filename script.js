document.addEventListener('DOMContentLoaded', function () {

    const newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', function () {
        if (document.querySelector(".newGame > input").value === '') {
            alert('Every hero has a name')
        } else {
            main();
            new_game();
        }

    });

    function new_game() {
        const menu = document.querySelector('.newGame');
        menu.classList.add('hidden');
    }


    function main() {

        const Nairobi = new New_player(document.querySelector(".newGame > input").value, 1, 3);
        Nairobi.createPlayer(get_board()[0]);
        document.querySelector('.playerName').innerHTML = Nairobi.name;
        document.addEventListener('keyup', function (e) {
            if ((Nairobi.posX === 0 && e.keyCode === 37) || (Nairobi.posX === 19 && e.keyCode === 39) ||
                (Nairobi.posY === 0 && e.keyCode === 38) || (Nairobi.posY === 19 && e.keyCode === 40)) {
                alert('zaraz spadniesz!');
            } else {
                Nairobi.movePlayer(get_board()[0], e);
                Nairobi.killEnemy(get_board()[0]);
                Nairobi.getLife(get_board()[0]);
            }
        });
        New_enemy(get_board()[0]);
        New_life(get_board()[0]);
    }

    function get_board() {
        const boardCnt = document.querySelector('.board_cnt');
        const board = document.querySelectorAll('.board');
        let boardTable = new Array(20);
        for (let i = 0; i < boardTable.length; i++) {
            boardTable[i] = new Array(20);
        }
        let counter = 0;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                boardTable[i][j] = board[counter];
                counter++;
            }
        }
        return [boardTable, boardCnt];
    }

    function New_player(name, posX, posY) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.life = 100;
        this.createPlayer = function (board) {
            board[this.posY][this.posX].appendChild(create_player());
        };
        this.removePlayer = function (board) {
            board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
        };
        this.movePlayer = function (board, key) {
            if (key.keyCode === 37) {
                this.removePlayer(board);
                this.posX -= 1;
                this.createPlayer(board);
            }
            if (key.keyCode === 38) {
                this.removePlayer(board);
                this.posY -= 1;
                this.createPlayer(board);
            }
            if (key.keyCode === 39) {
                this.removePlayer(board);
                this.posX += 1;
                this.createPlayer(board);
            }
            if (key.keyCode === 40) {
                this.removePlayer(board);
                this.posY += 1;
                this.createPlayer(board);
            }
        };
        this.killEnemy = function (board) {
            if(board[this.posY][this.posX].firstChild.innerHTML === "E"){
                board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
                this.life -= 20;
                New_enemy(get_board()[0]);
            }
        }
        this.getLife = function (board) {
            if(board[this.posY][this.posX].firstChild.innerHTML === "L"){
                board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
                this.life += 20;
                New_life(get_board()[0]);
            }
        }
    }

    function create_player() {
        const player = document.createElement('div');
        player.classList.add('player');
        player.innerText = 'P';
        return player;
    }

    function New_enemy(board) {
        let enemy_X;
        let enemy_Y;
        const random = () => Math.floor(Math.random() * 19);

        do {
            enemy_X = random();
            enemy_Y = random();
        } while (get_board()[0][enemy_X][enemy_Y].children.length !== 0)

        board[enemy_X][enemy_Y].appendChild(create_enemy());
    }

    function create_enemy() {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.innerText = 'E';
        return enemy;
    }

    function create_life() {
        const life = document.createElement('div');
        life.classList.add('life');
        life.innerText = 'L';
        return life;
    }

    function New_life(board) {
        let life_X;
        let life_Y;
        const random = () => Math.floor(Math.random() * 19);
        do {
            life_X = random();
            life_Y = random();
        } while (get_board()[0][life_X][life_Y].children.length !== 0)

        board[life_X][life_Y].appendChild(create_life());
    }
});
