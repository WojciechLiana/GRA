document.addEventListener('DOMContentLoaded', function () {

    const newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', function () {
        if (document.querySelector(".player1_name").value === '' ||
            document.querySelector(".player2_name").value === '') {
            alert('Every hero has a name');
        } else {
            main();
            new_game();
            main_cat();
        }

    });

    function new_game() {
        const menu = document.querySelector('.newGame');
        menu.classList.add('hidden');
    }

    function reset_game(board){
        board.map((el)=>
            el.map((el2)=>{
                    if(el2.children.length !== 0) {
                        el2.removeChild(el2.firstChild);
                    }
                }
            ));
    }

    function main() {

        const Player1 = new Player(document.querySelector(".player1_name").value, 1, 1, 1);
        const Player2 = new Player(document.querySelector(".player2_name").value, 18, 18, 2);
        const Enemy1 = new Enemy();
        Enemy1.New_enemy(get_board());
        const time = setInterval(()=>Enemy1.move_enemy(get_board()), 1000);


        Player1.createPlayer(get_board(), Player1.posX, Player1.posY);
        Player2.createPlayer(get_board(), Player2.posX, Player2.posY);
        document.querySelector('.playerName1').innerHTML = Player1.name;
        document.querySelector('.playerName2').innerHTML = Player2.name;
        document.addEventListener('keydown', function (e) {
            if (!(Player1.posX === 0 && e.keyCode === 37) && !(Player1.posX === 19 && e.keyCode === 39) &&
                !(Player1.posY === 0 && e.keyCode === 38) && !(Player1.posY === 19 && e.keyCode === 40)) {
                if(Player1.movePlayer(get_board(), e) === 'killed'){
                    clearInterval(time);
                    Enemy1.New_enemy(get_board());
                    const time = setInterval(()=>Enemy1.move_enemy(get_board()), 1000);
                }
            }
        });
        document.addEventListener('keydown', function (e) {
            if (!(Player2.posX === 0 && e.keyCode === 65) && !(Player2.posX === 19 && e.keyCode === 68) &&
                !(Player2.posY === 0 && e.keyCode === 87) && !(Player2.posY === 19 && e.keyCode === 83)) {
                Player2.movePlayer2(get_board(), e);
            }
        });
        New_life(get_board());
    }

    function main_cat() {

        const picture = document.querySelector('.cat');
        const breed = document.querySelector('.breed');
        const random_cat = document.querySelector('.button');
        const next_cat = document.querySelector('.button2');

        choose_breed(return_URL(2), breed);
        random_cat.addEventListener('click', function () {
            cat(picture);
        });
        next_cat.addEventListener('click', function () {
            selected_cat(picture, breed.value);
        });
    }

    function get_board() {

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
        return boardTable;
    }

    class Player {


        constructor(name, posX, posY, number) {
            this.name = name;
            this.posX = posX;
            this.posY = posY;
            this.oldX = posX;
            this.oldY = posY;
            this.life = 300;
            this.number = number;
            this.exp = 0;
            this.level = 1;
            this.health = document.querySelector(`.health${this.number} div`);
            this.experience = document.querySelector(`.exp${this.number} div`);
        }

        create_player(number) {
            const player = document.createElement('div');
            player.classList.add('player' + number);
            player.innerText = 'P' +number;
            return player;
        }

        createPlayer(board, xxx, yyy) {
            board[yyy][xxx].appendChild(this.create_player(this.number));
        };

        removePlayer(board, xxx, yyy) {
            board[yyy][xxx].removeChild(board[yyy][xxx].firstChild);
        };

        movePlayer(board, key) {
            if (key.keyCode === 37) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldX = this.posX;
                this.oldY = this.posY;
                this.posX -= 1;
                return this.check_action(board);
            }
            if (key.keyCode === 38) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldY = this.posY;
                this.oldX = this.posX;
                this.posY -= 1;
                return this.check_action(board);
            }
            if (key.keyCode === 39) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldX = this.posX;
                this.oldY = this.posY;
                this.posX += 1;
                return this.check_action(board);
            }
            if (key.keyCode === 40) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldY = this.posY;
                this.oldX = this.posX;
                this.posY += 1;
                return this.check_action(board);
            }
        };

        movePlayer2(board, key) {
            if (key.keyCode === 65) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldX = this.posX;
                this.oldY = this.posY;
                this.posX -= 1;
                this.check_action(board);
            }
            if (key.keyCode === 87) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldY = this.posY;
                this.oldX = this.posX;
                this.posY -= 1;
                this.check_action(board);
            }
            if (key.keyCode === 68) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldX = this.posX;
                this.oldY = this.posY;
                this.posX += 1;
                this.check_action(board);
            }
            if (key.keyCode === 83) {
                this.removePlayer(board, this.posX, this.posY);
                this.oldY = this.posY;
                this.oldX = this.posX;
                this.posY += 1;
                this.check_action(board);
            }

        };

        check_action(board){
            if(board[this.posY][this.posX].children.length === 1){
                if (board[this.posY][this.posX].firstChild.innerHTML === "E"){
                    this.createPlayer(board, this.posX, this.posY);
                    this.killEnemy(board);
                    return 'killed';
                }
                else if(board[this.posY][this.posX].firstChild.innerHTML === "L"){
                    this.getLife(board);
                    this.createPlayer(board, this.posX, this.posY);
                }
                else if(board[this.posY][this.posX].firstChild.innerHTML.charAt(0) === "P"){
                    this.createPlayer(board, this.oldX, this.oldY);
                    this.posY=this.oldY;
                    this.posX=this.oldX;
                }
            }
            else{
                this.createPlayer(board, this.posX, this.posY);
            }
        }

        killEnemy(board) {
            board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
            this.life -= 100;
            this.exp += 60 / this.level;
            this.experience.style.width = `${this.exp}px`;
            this.health.style.width = `${this.life}px`;

            if (this.exp === 300) {
                this.levelUp();
            }
            if (this.life === 0 && this.exp !== 300) {
                alert(`Player${this.number} lost the game!`);
                const menu = document.querySelector('.newGame');
                menu.classList.remove('hidden');
                reset_game(get_board());
            }
        }

        levelUp() {
            this.level += 1;
            this.exp = 0;
            this.life = 300;
            document.querySelector(`#p${this.number}lvl`).innerText = `Lvl : ${this.level}`;
            this.health.style.width = `${this.life}px`;
            this.experience.style.width = "0";
        }

        getLife(board) {
            if (board[this.posY][this.posX].firstChild.innerHTML === "L") {
                board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
                if (this.life < 300) {
                    this.life += 50;
                }
                this.health.style.width = `${this.life}px`;
                New_life(get_board());
            }
        }
    }



    class Enemy {

        constructor(){
            this.posX = 0;
            this.posY = 0;
            this.oldX = 0;
            this.oldY = 0;
            this.t = 0;
        }


        New_enemy(board) {

            const random = () => Math.floor(Math.random() * 19);

            do {
                this.posX = random();
                this.posY = random();
            } while (get_board()[this.posY][this.posX].children.length !== 0);

            board[this.posY][this.posX].appendChild(this.create_enemy());
        }

        create_enemy() {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.innerText = 'E';
            return enemy;
        }

        avoid_others(board){

            if(board[this.posY][this.posX].children.length === 0){
                board[this.posY][this.posX].appendChild(this.create_enemy());
            }
            else{
                board[this.oldY][this.oldX].appendChild(this.create_enemy());
                this.posY=this.oldY;
                this.posX=this.oldX;
            }
        }

        move_enemy(board){

            document.querySelector('.enemy').parentElement.removeChild(document.querySelector('.enemy'));
            const direction = Math.ceil(Math.random()*4);

            this.oldY = this.posY;
            this.oldX = this.posX;
            if(direction === 1){
                this.posX -= 1;
                this.avoid_others(board);
            }
            if(direction === 2){
                this.posX += 1;
                this.avoid_others(board);
            }
            if(direction === 3){
                this.posY -= 1;
                this.avoid_others(board);
            }
            if(direction === 4){
                this.posY += 1;
                this.avoid_others(board);
            }
        }



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
        } while (get_board()[life_X][life_Y].children.length !== 0);

        board[life_X][life_Y].appendChild(create_life());
    }

    function return_URL(url_id) {
        const url = "https://api.thecatapi.com/v1/images/search";  // random cat
        const url2 = 'https://api.thecatapi.com/v1/images/search?breed_ids=';  // breed, 4letter code required
        const url3 = 'https://api.thecatapi.com/v1/breeds';  //breeds
        const array = [];
        array.push(url, url2, url3);
        return array[url_id];
    }

    function cat(picture) {
        fetch(return_URL(0)).then(response => response.json())
            .then(response => response[0].url)
            .then(response => {
                picture.src = response;
            });
    }

    function selected_cat(picture, id) {
        fetch(return_URL(1) + id).then(response => response.json())
            .then(response => response[0].url)
            .then(response => {
                picture.src = response;
            });
    }

    function choose_breed(url3, select) {
        const breeds_table = [];
        fetch(url3).then(response => response.json())
            .then(response => {
                breeds_table.push(...response);
                breeds_table.forEach(element => {
                    const breed = document.createElement('option');
                    breed.value = element.id;
                    breed.innerText = element.name;
                    select.appendChild(breed);
                })
            });
    }

});
