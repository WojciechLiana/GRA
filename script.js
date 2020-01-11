document.addEventListener('DOMContentLoaded', function () {

    function main() {

        const Nairobi = new New_player('Nairobi', 1, 3);
        Nairobi.createPlayer(get_board()[0]);
        document.addEventListener('keyup', function(e){
            Nairobi.movePlayer(get_board()[0], e);
        });


    }

    main();

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
        this.createPlayer = function (board) {
            board[this.posY][this.posX].appendChild(create_player());
        };
        this.removePlayer = function(board){
            board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
        }

        this.movePlayer = function (board, key) {
            if(key.keyCode === 37){
                this.removePlayer(board);
                this.posX -=1;
                this.createPlayer(board);
            }
            if(key.keyCode === 38){
                this.removePlayer(board);
                this.posY -=1;
                this.createPlayer(board);
            }
            if(key.keyCode === 39){
                this.removePlayer(board);
                this.posX +=1;
                this.createPlayer(board);
            }
            if(key.keyCode === 40){
                this.removePlayer(board);
                this.posY +=1;
                this.createPlayer(board);
            }
        };
    }

    function create_player() {
        const player = document.createElement('div');
        player.classList.add('player');
        player.innerText = 'P';
        return player;
    }

});
