document.addEventListener('DOMContentLoaded', function () {

    function main() {
        const board = get_board();
        const boardCnt = document.querySelector(".board_cnt");
        console.log(boardCnt);
        const Nairobi = new newPlayer("Nairobi", 1, 3);
        Nairobi.createPlayer(board);
        boardCnt.addEventListener('click', function () {
            Nairobi.movePlayer(board);
        });
    }

    main();

    function get_board() {
        const board = document.querySelectorAll(".board");
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

    function newPlayer(name, posX, posY) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.createPlayer = function (board) {
            board[this.posY][this.posX].appendChild(createPlayer());
        };
        this.movePlayer = function (board) {
            board[this.posY][this.posX].removeChild(board[this.posY][this.posX].firstChild);
        };
    }

    function createPlayer() {
        const player = document.createElement("div");
        player.classList.add("player");
        player.innerText = "P";
        return player;
    }

});
