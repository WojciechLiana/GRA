document.addEventListener('DOMContentLoaded', function () {

    function preparation(){
        const levelCnt = document.querySelector('.Level');
        chooseLevel(levelCnt);
    }
    preparation();

    function removeLevelClass(levels) {
        for (const ix in levels.children) {
            if (levels.children.hasOwnProperty(ix)) {
                if (levels.children[ix].hasAttribute('class')) {
                    levels.children[ix].classList.remove('selected_level');
                }
            }
        }
    }

    function chooseLevel(levels) {
        for (const ix in levels.children) {
            if (levels.children.hasOwnProperty(ix)) {
                levels.children[ix].addEventListener('click', () => {
                    removeLevelClass(levels);
                    levels.children[ix].classList.add('selected_level');
                });
            }
        }
    }

    const newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', function () {
        if (document.querySelector(".player1_name").value === '' ||
            document.querySelector(".player2_name").value === '') {
            alert('Every hero has a name');
        } else {
            resetMap(getBoard());
            main();
            hideMenu();
            resetStats();
            mainCat();
        }

    });

    function hideMenu() {
        const menu = document.querySelector('#menu');
        menu.classList.add('hidden');
    }

    function resetMap(board) {

        board.map((el) =>
            el.map((el2) => {
                    if (el2.children.length !== 0) {
                        el2.removeChild(el2.firstChild);
                    }
                }));
    }

    function resetStats(){
        document.querySelector('.health1 div').style.width = '300px';
        document.querySelector('.health2 div').style.width = '300px';
        document.querySelector('.exp1 div').style.width = '0px';
        document.querySelector('.exp2 div').style.width = '0px';
        document.querySelector('#p1lvl').innerText = 'Lvl: 1';
        document.querySelector('#p2lvl').innerText = 'Lvl: 1';
    }


    function main() {

        const player1 = new Player(document.querySelector(".player1_name").value, 1, 1, 1);
        const player2 = new Player(document.querySelector(".player2_name").value, 18, 18, 2);
        player1.createPlayer(getBoard(), player1.posX, player1.posY);
        player2.createPlayer(getBoard(), player2.posX, player2.posY);
        document.querySelector('.playerName1').innerHTML = player1.name;
        document.querySelector('.playerName2').innerHTML = player2.name;

        const levels = document.querySelector('.Level').children;
        const gameLevel = returnLevel(levels);

        function direction(e){
            if (!(player1.posX === 0 && e.keyCode === 37) && !(player1.posX === 19 && e.keyCode === 39) &&
            !(player1.posY === 0 && e.keyCode === 38) && !(player1.posY === 19 && e.keyCode === 40)) {
            player1.movePlayer(getBoard(), e);
            if(player1.life ===0 && player1.exp !== 300){
                document.removeEventListener('keyup', direction);
            }
        }
            if (!(player2.posX === 0 && e.keyCode === 65) && !(player2.posX === 19 && e.keyCode === 68) &&
                !(player2.posY === 0 && e.keyCode === 87) && !(player2.posY === 19 && e.keyCode === 83)) {
                player2.movePlayer2(getBoard(), e);
                if(player2.life ===0 && player2.exp !== 300){
                    document.removeEventListener('keyup', direction);
                }
            }
        }

        document.addEventListener('keyup', direction);

        const numberOfEnemies = numberOfEnemiesCheck(document.querySelector('.enemies_number').value);

        for(let i=1; i<=numberOfEnemies; i++){
            document.querySelector('.enemyCnt').appendChild(addDivsEnemyClick(i));
            enemyMoveInterval(i, gameLevel);
        }

        newLife(getBoard());
        newLife(getBoard());
    }

    function mainCat() {

        const picture = document.querySelector('.cat');
        const breed = document.querySelector('.breed');
        const randomCat = document.querySelector('.button');
        const nextCat = document.querySelector('.button2');

        chooseBreed(returnURL(2), breed);
        randomCat.addEventListener('click', function () {
            cat(picture);
        });
        nextCat.addEventListener('click', function () {
            selectedCat(picture, breed.value);
        });
    }

    function getBoard() {

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

    function returnLevel(levels){

        if(levels[0].classList.contains('selected_level')){
            return 10000;
        } else if(levels[1].classList.contains('selected_level')){
            return 1000;
        }else{
            return 100;
        }
    }

    function addDivsEnemyClick(number){
        const enemyDiv = document.createElement('div');
        enemyDiv.setAttribute('id', `${number}`);
        return enemyDiv;
    }

    function numberOfEnemiesCheck(number){
        if(number>40){
            return 40;
        }else{
            return number;
        }
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

        createMapPlayer(number) {
            const player = document.createElement('div');
            player.classList.add('player' + number);
            player.innerText = 'P' + number;
            return player;
        }

        updateStats(){
            this.health.style.width = `${this.life}px`;
            this.experience.style.width = `${this.exp}px`;
            document.querySelector(`#p${this.number}lvl`).innerText = `Lvl : ${this.level}`;
        }

        createPlayer(board, xxx, yyy) {
            board[yyy][xxx].appendChild(this.createMapPlayer(this.number));
        };

        removePlayer(board, xxx, yyy) {
            board[yyy][xxx].removeChild(board[yyy][xxx].firstChild);
        };

        movePlayer(board, key) {
            this.oldY = this.posY;
            this.oldX = this.posX;
            if (key.keyCode === 37) {
                this.removePlayer(board, this.posX, this.posY);
                this.posX -= 1;
                return this.checkAction(board);
            }
            if (key.keyCode === 38) {
                this.removePlayer(board, this.posX, this.posY);
                this.posY -= 1;
                return this.checkAction(board);
            }
            if (key.keyCode === 39) {
                this.removePlayer(board, this.posX, this.posY);
                this.posX += 1;
                return this.checkAction(board);
            }
            if (key.keyCode === 40) {
                this.removePlayer(board, this.posX, this.posY);
                this.posY += 1;
                return this.checkAction(board);
            }
        };

        movePlayer2(board, key) {
            this.oldY = this.posY;
            this.oldX = this.posX;
            if (key.keyCode === 65) {
                this.removePlayer(board, this.posX, this.posY);
                this.posX -= 1;
                this.checkAction(board);
            }
            if (key.keyCode === 87) {
                this.removePlayer(board, this.posX, this.posY);
                this.posY -= 1;
                this.checkAction(board);
            }
            if (key.keyCode === 68) {
                this.removePlayer(board, this.posX, this.posY);
                this.posX += 1;
                this.checkAction(board);
            }
            if (key.keyCode === 83) {
                this.removePlayer(board, this.posX, this.posY);
                this.posY += 1;
                this.checkAction(board);
            }

        };

        checkAction(board) {

            if (board[this.posY][this.posX].children.length === 1) {
                if (board[this.posY][this.posX].firstChild.innerHTML === 'E') {
                    this.createPlayer(board, this.posX, this.posY);
                    this.killEnemy(board);
                } else if (board[this.posY][this.posX].firstChild.innerHTML === 'L') {
                    this.getLife(board);
                    this.createPlayer(board, this.posX, this.posY);
                } else if (board[this.posY][this.posX].firstChild.innerHTML.charAt(0) === `P`) {
                    this.createPlayer(board, this.oldX, this.oldY);
                    this.posY = this.oldY;
                    this.posX = this.oldX;
                }
            } else {
                this.createPlayer(board, this.posX, this.posY);
            }
        }

        killEnemy() {

            this.life -= 60;
            this.exp += 60 / this.level;
            this.updateStats();
            if (this.exp === 300) {
                this.levelUp();
            }
            if (this.life === 0) {
                alert(`Player${this.number} lost the game!`);
                document.querySelector('#menu').classList.remove('hidden');
            }
            document.getElementById(`${document.querySelector(`.player${this.number}`).previousElementSibling.id.substr(5)}`).click();
        }

        levelUp() {
            this.level += 1;
            this.exp = 0;
            this.life = 300;
            this.updateStats();

        }

        getLife(board) {
            if (board[this.posY][this.posX].firstChild.innerHTML === 'L') {
                board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
                if (this.life < 300) {
                    this.life += 50;
                }
                this.updateStats();
                newLife(getBoard());
            }
        }
    }


    class Enemy {

        constructor(number) {
            this.posX = 0;
            this.posY = 0;
            this.oldX = 0;
            this.oldY = 0;
            this.number = number;
        }


        newEnemy(board) {

            const random = () => Math.floor(Math.random() * 19);

            do {
                this.posX = random();
                this.posY = random();
            } while (getBoard()[this.posY][this.posX].children.length !== 0);

            board[this.posY][this.posX].appendChild(this.createMapEnemy());
        }

        createMapEnemy() {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.innerText = 'E';
            enemy.setAttribute('id', `enemy${this.number}`);
            return enemy;
        }

        avoidOthers(board) {

            if (board[this.posY][this.posX].children.length === 0) {
                board[this.posY][this.posX].appendChild(this.createMapEnemy());
            } else {
                board[this.oldY][this.oldX].appendChild(this.createMapEnemy());
                this.posY = this.oldY;
                this.posX = this.oldX;
            }
        }

        avoidWalls(board) {
            if (this.posX >= 0 && this.posX < 20 && this.posY >= 0 && this.posY < 20) {
                this.avoidOthers(board);
            } else {
                board[this.oldY][this.oldX].appendChild(this.createMapEnemy());
                this.posX = this.oldX;
                this.posY = this.oldY;
            }
        }

        moveEnemy(board) {
            const direction = Math.ceil(Math.random() * 4);
            this.oldY = this.posY;
            this.oldX = this.posX;
            board[this.oldY][this.oldX].removeChild(board[this.oldY][this.oldX].firstChild);
            if (direction === 1) {
                this.posX -= 1;
                this.avoidWalls(board);
            }
            if (direction === 2) {
                this.posX += 1;
                this.avoidWalls(board);
            }
            if (direction === 3) {
                this.posY -= 1;
                this.avoidWalls(board);
            }
            if (direction === 4) {
                this.posY += 1;
                this.avoidWalls(board);
            }
        }
    }

    function enemyMoveInterval(number, level) {
        const enemy1 = new Enemy(number);
        enemy1.newEnemy(getBoard());
        const time = setInterval(() => enemy1.moveEnemy(getBoard()), level);
        function moveInterval() {

            clearInterval(time);
            document.getElementById(`${number}`).removeEventListener("click", moveInterval);
            getBoard()[enemy1.posY][enemy1.posX].removeChild(getBoard()[enemy1.posY][enemy1.posX].firstChild);
            if(document.querySelector('#menu').className === 'hidden') {
                return enemyMoveInterval(number, level);
            }
            else{
                const enemies = document.querySelector('.enemyCnt').children;
                clickEnemyButtons(enemies);
            }
        }
        document.getElementById(`${number}`).addEventListener("click", moveInterval);
    }

    function clickEnemyButtons(enemies){
        for(let enemy in enemies){
            if(enemies.hasOwnProperty(enemy)){
                enemies[enemy].click();
            }
        }
    }



    function createMapLife() {
        const life = document.createElement('div');
        life.classList.add('life');
        life.innerText = 'L';
        return life;
    }

    function newLife(board) {
        let life_X;
        let life_Y;
        const random = () => Math.floor(Math.random() * 19);
        do {
            life_X = random();
            life_Y = random();
        } while (getBoard()[life_X][life_Y].children.length !== 0);
        board[life_X][life_Y].appendChild(createMapLife());
    }

    function returnURL(url_id) {
        const url = "https://api.thecatapi.com/v1/images/search";  // random cat
        const url2 = 'https://api.thecatapi.com/v1/images/search?breed_ids=';  // breed, 4letter code required
        const url3 = 'https://api.thecatapi.com/v1/breeds';  //breeds
        const array = [url, url2, url3];
        return array[url_id];
    }

    function cat(picture) {
        fetch(returnURL(0)).then(response => response.json())
            .then(response => response[0].url)
            .then(response => {
                picture.src = response;
            });
    }

    function selectedCat(picture, id) {
        fetch(returnURL(1) + id).then(response => response.json())
            .then(response => response[0].url)
            .then(response => {
                picture.src = response;
            });
    }

    function chooseBreed(url3, select) {
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
