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

        const nairobi = new Player(document.querySelector(".newGame > input").value, 1, 3);
        nairobi.createPlayer(get_board()[0]);
        document.querySelector('.playerName').innerHTML = nairobi.name;
        document.addEventListener('keyup', function (e) {
            if ((nairobi.posX === 0 && e.keyCode === 37) || (nairobi.posX === 19 && e.keyCode === 39) ||
                (nairobi.posY === 0 && e.keyCode === 38) || (nairobi.posY === 19 && e.keyCode === 40)) {
                alert('zaraz spadniesz!');
            } else {
                nairobi.movePlayer(get_board()[0], e);
                nairobi.killEnemy(get_board()[0]);
                nairobi.getLife(get_board()[0]);
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

    class Player {


        constructor(name, posX, posY) {
            this.name = name;
            this.posX = posX;
            this.posY = posY;
            this.life = 100;
        }


        createPlayer(board) {
            board[this.posY][this.posX].appendChild(create_player());
        };

        removePlayer(board) {
            board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
        };

        movePlayer(board, key) {
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

        killEnemy(board) {
            if (board[this.posY][this.posX].firstChild.innerHTML === "E") {
                board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
                this.life -= 20;
                New_enemy(get_board()[0]);
            }
        }

        getLife(board) {
            if (board[this.posY][this.posX].firstChild.innerHTML === "L") {
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
        } while (get_board()[0][enemy_X][enemy_Y].children.length !== 0);

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
        } while (get_board()[0][life_X][life_Y].children.length !== 0);

        board[life_X][life_Y].appendChild(create_life());
    }
});


const picture = document.querySelector('.cat');
const breed = document.querySelector('.breed');
const random_cat = document.querySelector('.button');
const ragdoll_cat = document.querySelector('.button2');
const url2 = 'https://api.thecatapi.com/v1/images/search?breed_ids=ragd';
const url3 = 'https://api.thecatapi.com/v1/breeds';
const url = "https://api.thecatapi.com/v1/images/search";
const tablica = [];

function cat() {
    fetch(url).then(response => response.json())
        .then(response => response[0].url)
        .then(response => {
            picture.src = response;
        });
}

cat();

function ragdoll() {
    fetch(url2).then(response => response.json())
        .then(response => response[0].url)
        .then(response => {
            picture.src = response;
        });
}


random_cat.addEventListener('click', function () {
    cat();
});
ragdoll_cat.addEventListener('click', function () {
    ragdoll();
});


function choose_breed(url3) {
    fetch(url3).then(response => response.json())
        .then(response => {
            tablica.push(...response);
            console.log(tablica[0]);
        });
}

choose_breed(url3);





