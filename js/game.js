const cells = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start_btn")
const endBtn = document.getElementById("end_btn")
const player1 = sessionStorage.getItem("loggedUser1");
const player2 = sessionStorage.getItem("loggedUser2");
const kings = Array.from(document.querySelectorAll("#king_piece"))
const user1Minutes = document.getElementById('user_1_min');
const user2Minutes = document.getElementById('user_2_min');
const user1Seconds = document.getElementById('user_1_sec');
const user2Seconds = document.getElementById('user_2_sec');
var modes = Array.from(document.getElementsByClassName("mode_option"));
var modeOpt;
var pause = false;
var userTime;
var moves = 0;
var p2paused;
var p1resumed;

let user_details = JSON.parse(localStorage.getItem("user_details"))
console.log(user_details)

let player1Time;
let player2Time;

function timer(time_amount, player){
    let initialTime = new Date().getTime()
    let deadLine = initialTime + 60000*time_amount;
    let timeCounter1;
    let timeCounter2;

    if(player == 1){
        timeCounter1 = setInterval(function (){
            let nowTime = new Date().getTime();
            player1Time = deadLine - nowTime;
            let min = Math.floor((player1Time%(1000*60*60))/(1000*60));
            let sec = Math.floor((player1Time%(1000*60))/1000);
            user1Minutes.innerHTML = min;
            user1Seconds.innerHTML = sec;
        
            if (player1Time < 0) {
                clearInterval(timeCounter1);
            }

            if(pause == true && userTime == 1){
                clearInterval(timeCounter1);
            }
            else if(pause == true && userTime == "all"){
                console.log("hoho time paused for 1")
                clearInterval(timeCounter1);
            }

            checkWin()

        }, 1000)
    }

    if(player == 2){
        timeCounter2 = setInterval(function (){
            let nowTime = new Date().getTime();
            player2Time = deadLine - nowTime;
            let min = Math.floor((player2Time%(1000*60*60))/(1000*60));
            let sec = Math.floor((player2Time%(1000*60))/1000);
            user2Minutes.innerHTML = min;
            user2Seconds.innerHTML = sec;
        
            if (player2Time < 0) {
                clearInterval(timeCounter2);
                console.log(player2Time)
            }
    
            if(pause == true && userTime == 2){
                clearInterval(timeCounter2);
            }
            else if(pause == true && userTime == "all"){
                console.log("hoho time paused for 2")
                clearInterval(timeCounter2);
            }

        }, 1000)
    }

}

function pauseTime(forPlayer){
    pause = true
    userTime = forPlayer
}

function resumeTime(player){
    if(pause == true){
        pause = false
    }

    if(player == 1){
        deadLine = player1Time/60000
        timer(deadLine, 1)
    }

    if(player == 2){
        deadLine = player2Time/60000
        timer(deadLine, 2)
    }
}

function chh(){

    console.log("rrr")

    if(moves %2 == 0 && moves>0){
        pauseTime(1)
        setTimeout(()=>{
            resumeTime(2)
            console.log("yo")
        },2300)
    }

    if(moves %2 != 0){
        setTimeout(()=>{
            pauseTime(2)
            console.log("nio")
        }, 2300)
        resumeTime(1)
    }
}

setInterval(()=>{
    chh
}, 1000)

// console.log(user_details.find(obj => obj.username === player1).lastname)

let startPos;
let draggedPiece;
let playerTurn;

const INITIAL_PIECE_POSITION = [
    ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK,
    PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", "", 
    PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN,
    ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK
    
]

const columns = [
    "a", "b", "c", "d", "e", "f", "g", "h"
];

const rows = [
    8, 7, 6, 5, 4, 3, 2, 1
];

function setPieces() {
    INITIAL_PIECE_POSITION.forEach((el, i) => {
        cells[i].innerHTML = INITIAL_PIECE_POSITION[i];
        cells[i].firstChild?.setAttribute('draggable', true)

        if(i < 16){
            cells[i].firstChild.firstChild.classList.add('dark_piece')
        }

        if(i > 47){
            cells[i].firstChild.firstChild.classList.add('light_piece')
        }
    });
}

function setCellId(){
    var rowNum = 0

    cells.forEach((cell, i) => {

        if (i%8 == 0){
            rowNum++;
        }
        cell.setAttribute("cell-id", `${columns[i%8]}${rows[rowNum-1]}`);
    })
}

modes[0].addEventListener("click", ()=>{
    modeOpt = "blitz"
})
modes[1].addEventListener("click", ()=>{
    modeOpt = "rapid"
})
modes[2].addEventListener("click", ()=>{
    modeOpt = "bullet"
})

var gameStarted;

function startGame (){
    const kings = Array.from(document.querySelectorAll("#king_piece"))
    playerTurn = 'light_piece';
    if(startBtn.value=="Start"){
        setCellId();
        setPieces();
        gameStarted = true;
    }

    if(modeOpt == "blitz"){
        timer(10, 1);
        timer(10, 2)

        setCellId();
        setPieces();
        gameStarted = true;
    }
    else if(modeOpt == "rapid"){
        timer(5, 1);
        timer(5, 2);
        setCellId();
        setPieces();
        gameStarted = true;
    }
    else if(modeOpt == "bullet"){
        timer(0.1, 1);
        timer(0.1, 2);
        setCellId();
        setPieces();
        gameStarted = true;
    }
}

function endGame(){

    const kings = Array.from(document.querySelectorAll("#king_piece"))

    if(
        gameStarted==true && kings.some(king => king.firstChild.classList.contains("dark_piece"))
        && kings.some(king => king.firstChild.classList.contains("light_piece"))
        ){

            pauseTime("all");

            if(user_details.find(obj => obj.username === player1).draw == null)
            {
                user_details.find(obj => obj.username === player1).draw = 1
            }else{
                user_details.find(obj => obj.username === player1).draw += 1
            }

            if(user_details.find(obj => obj.username === player2).draw == null)
            {
                user_details.find(obj => obj.username === player2).draw = 1
            }else{
                user_details.find(obj => obj.username === player2).draw += 1
            }

            if(user_details.find(obj => obj.username === player1).matches == null){
                user_details.find(obj => obj.username === player1).matches = 1
            } else{
                user_details.find(obj => obj.username === player1).matches += 1
            }

            if(user_details.find(obj => obj.username === player2).matches == null){
                user_details.find(obj => obj.username === player2).matches = 1
            } else{
                user_details.find(obj => obj.username === player2).matches += 1
            }

            localStorage.setItem("user_details", JSON.stringify(user_details))

            setCellId();
            setPieces();
            console.log("draw")
    } else{
        pauseTime("all");
        cells.forEach(cell=> cell.innerHTML="")
        playerTurn = 'light_piece'
    }
}

console.log(playerTurn + "'s turn");

cells.forEach(cell => {
    cell.addEventListener('dragstart', dragPiece);
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('drop', dragDrop);
})

function dragPiece(el){
    draggedPiece = el.target
    startPos = draggedPiece.parentNode.getAttribute("cell-id");
}

function dragOver(el){
    el.preventDefault();
}

function dragDrop(el){
    el.stopPropagation()

    const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn);
    const oppTurn = playerTurn === "dark_piece" ? "light_piece" : "dark_piece"
    const occupied = el.target.classList.contains("chess_piece");
    const occupiedByOpponent = el.target.firstChild?.classList.contains(oppTurn);
    const validMove = checkValidMove(el.target);

    if(correctTurn){
        if(occupiedByOpponent && validMove){
            el.target.parentNode.append(draggedPiece);
            el.target.remove();
            
            checkWin();
            changePlayerTurn();
            // if(playerTurn == "light_piece"){
            //     pauseTime(2)
            //     resumeTime(1)
            // }
            // if(playerTurn == "dark_piece"){
            //     pauseTime(1)
            //     resumeTime(2)
            // }
            return;
        }

        if(occupied && !occupiedByOpponent){
            alert("wrong move");
            return
        }

        if(validMove){
            el.target.append(draggedPiece);
            checkWin();
            changePlayerTurn();
            // if(playerTurn == "light_piece"){
            //     pauseTime(2)
            //     resumeTime(1)
            // }
            // if(playerTurn == "dark_piece"){
            //     pauseTime(1)
            //     resumeTime(2)
            // }
            return
        }
    }
    
}

function checkValidMove(target){
    const targetId = target.getAttribute('cell-id') || target.parentNode.getAttribute('cell-id');
    const piece = draggedPiece.id
    console.log('target cell-id ', targetId);
    console.log('start cell-id ', startPos);
    console.log('piece ', piece);

    function checkForSpace(i, pieceType, direction="tr"||"br"||"bl"||"tl"||"up"||"down"||"right"||"left"){
        var piecesPresentBs = 0;
        var piecesPresentRk = 0;

        if(pieceType == "bs_pc")
            {if(direction=="tr"){
                if ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + i && Number(targetId[1]) == Number(startPos[1]) + i) ) {
                    console.log("goat");
                    for (let index = 1; index < Math.abs(i); index++) {
                        console.log(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-(index))}`+`${Number(targetId[1])-(index)}"]`)
                        if(
                            document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-(index))}`+`${Number(targetId[1])-(index)}"]`).firstChild
                        ){
                            piecesPresentBs++;
                        }
                    }
                    if(piecesPresentBs == 0){
                        return true
                    }else{
                        console.log(piecesPresentBs)
                    }
                }
            }

            if(direction=="br"){
                if ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + i && Number(targetId[1]) == Number(startPos[1]) - i) ) {
                    console.log("goat");
                    for (let index = 1; index < Math.abs(i); index++) {
                        console.log(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-(index))}`+`${Number(targetId[1])+(index)}"]`)
                        if(
                            document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-(index))}`+`${Number(targetId[1])+(index)}"]`).firstChild
                        ){
                            piecesPresentBs++;
                        }
                    }
                    if(piecesPresentBs == 0){
                        return true
                    }else{
                        console.log(piecesPresentBs)
                    }
                }
            }

            if(direction=="bl"){
                if ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - i && Number(targetId[1]) == Number(startPos[1]) - i) ) {
                    console.log("goat");
                    for (let index = 1; index < Math.abs(i); index++) {
                        console.log(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+(index))}`+`${Number(targetId[1])+(index)}"]`)
                        if(
                            document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+(index))}`+`${Number(targetId[1])+(index)}"]`).firstChild
                        ){
                            piecesPresentBs++;
                        }
                    }
                    if(piecesPresentBs == 0){
                        return true
                    }else{
                        console.log(piecesPresentBs)
                    }
                }
            }

            if(direction=="tl"){
                if ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - i && Number(targetId[1]) == Number(startPos[1]) + i) ) {
                    console.log("goat");
                    for (let index = 1; index < Math.abs(i); index++) {
                        console.log(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+(index))}`+`${Number(targetId[1])-(index)}"]`)
                        if(
                            document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+(index))}`+`${Number(targetId[1])-(index)}"]`).firstChild
                        ){
                            piecesPresentBs++;
                        }
                    }
                    if(piecesPresentBs == 0){
                        return true
                    }else{
                        console.log(piecesPresentBs)
                    }
                }
            }
        }

        if (pieceType == "rk_pc"){
            if(direction=="up"){
                if(targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)){
                    if(Number(targetId[1]) == Number(startPos[1]) +i){
                        for (let index = 1; index < Math.abs(i); index++){
                            if(
                                document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-index}"]`).firstChild
                            ){
                                piecesPresentRk++
                            }
                        }
                        if(piecesPresentRk==0){
                            return true
                        } else{
                            console.log(piecesPresentRk)
                        }
                    }
                }
            }

            if(direction=="down"){
                if(targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)){
                    if(Number(targetId[1]) == Number(startPos[1]) -i){
                        for (let index = 1; index < Math.abs(i); index++){
                            if(
                                document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+index}"]`).firstChild
                            ){
                                piecesPresentRk++
                            }
                        }
                        if(piecesPresentRk==0){
                            return true
                        } else{
                            console.log(piecesPresentRk)
                        }
                    }
                }
            }

            if(direction=="right"){
                if(Number(targetId[1]) == Number(startPos[1])){
                    if(targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + i){
                        for (let index = 1; index < Math.abs(i); index++){
                            if(
                                document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-index)}`+`${Number(targetId[1])}"]`).firstChild
                            ){
                                piecesPresentRk++
                            }
                        }
                        if(piecesPresentRk==0){
                            return true
                        } else{
                            console.log(piecesPresentRk)
                        }
                    }
                }
            }

            if(direction=="left"){
                if(Number(targetId[1]) == Number(startPos[1])){
                    if(targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - i){
                        for (let index = 1; index < Math.abs(i); index++){
                            if(
                                document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+index)}`+`${Number(targetId[1])}"]`).firstChild
                            ){
                                piecesPresentRk++
                            }
                        }
                        if(piecesPresentRk==0){
                            return true
                        } else{
                            console.log(piecesPresentRk)
                        }
                    }
                }
            }
        }
    }

    switch(piece){
        case 'pawn_piece' : 
            const initialRow = [
                'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
                'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'
            ]
            //movement of pawn at the beginning of game.
            if(
                (initialRow.includes(startPos) && startPos[0] == targetId[0] && ((playerTurn=="dark_piece" && Number(targetId[1]) >= 5)
                || (playerTurn=="light_piece" && Number(targetId[1]) <= 4)))
            ){
                return true
            }
            //check for regular pawn movement
            if(
                (!document.querySelector(`[cell-id="${targetId}"]`).firstChild && startPos[0]  == targetId[0] && ((playerTurn=="dark_piece" && Number(targetId[1]) == (Number(startPos[1])-1))
                || (playerTurn=="light_piece" && Number(targetId[1]) == (Number(startPos[1])+1))))
            )
            {
                return true
            }
            //check for pawn capture
            if(
                (document.querySelector(`[cell-id="${targetId}"]`).firstChild && (`${startPos[0]}`.charCodeAt(0)+1 ==`${targetId[0]}`.charCodeAt(0) || `${startPos[0]}`.charCodeAt(0)-1 == `${targetId[0]}`.charCodeAt(0)))
            ){
                return true
            }
            break;
        case 'knight_piece' :
            if(
                (Number(targetId[1]) == Number(startPos[1]) -2 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) -1)
                || (Number(targetId[1]) == Number(startPos[1]) -2 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) +1)
                || (Number(targetId[1]) == Number(startPos[1]) +2 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) -1)
                || (Number(targetId[1]) == Number(startPos[1]) +2 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) +1)
                || (Number(targetId[1]) == Number(startPos[1]) -1 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) -2)
                || (Number(targetId[1]) == Number(startPos[1]) -1 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) +2)
                || (Number(targetId[1]) == Number(startPos[1]) +1 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) -2)
                || (Number(targetId[1]) == Number(startPos[1]) +1 && targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) +2)
            ){
                return true;
            }
            break;
        case 'bishop_piece' :
            if(
                (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) +1)
                || checkForSpace(2, "bs_pc", "tr")
                || checkForSpace(3, "bs_pc", "tr")
                || checkForSpace(4, "bs_pc", "tr")
                || checkForSpace(5, "bs_pc", "tr")
                || checkForSpace(6, "bs_pc", "tr")
                || checkForSpace(7, "bs_pc", "tr")
                //-x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "bs_pc", "bl")
                || checkForSpace(3, "bs_pc", "bl")
                || checkForSpace(4, "bs_pc", "bl")
                || checkForSpace(5, "bs_pc", "bl")
                || checkForSpace(6, "bs_pc", "bl")
                || checkForSpace(7, "bs_pc", "bl")
                //+x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "bs_pc", "br")
                || checkForSpace(3, "bs_pc", "br")
                || checkForSpace(4, "bs_pc", "br")
                || checkForSpace(5, "bs_pc", "br")
                || checkForSpace(6, "bs_pc", "br")
                || checkForSpace(7, "bs_pc", "br")
                //-x +y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) +1)
                || checkForSpace(2, "bs_pc", "tl")
                || checkForSpace(3, "bs_pc", "tl")
                || checkForSpace(4, "bs_pc", "tl")
                || checkForSpace(5, "bs_pc", "tl")
                || checkForSpace(6, "bs_pc", "tl")
                || checkForSpace(7, "bs_pc", "tl")
            ){
                return true
            }
            break;
        case 'rook_piece' :
            if(
                //Movement along the y axis but x is constant
                //check for upward movement (+y)
                targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) && Number(targetId[1]) == Number(startPos[1]) +1
                || checkForSpace(2, "rk_pc", "up")
                || checkForSpace(3, "rk_pc", "up")
                || checkForSpace(4, "rk_pc", "up")
                || checkForSpace(5, "rk_pc", "up")
                || checkForSpace(6, "rk_pc", "up")
                || checkForSpace(7, "rk_pc", "up")
                //check for downward movement (-y)
                || targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) && (Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "rk_pc", "down")
                || checkForSpace(3, "rk_pc", "down")
                || checkForSpace(4, "rk_pc", "down")
                || checkForSpace(5, "rk_pc", "down")
                || checkForSpace(6, "rk_pc", "down")
                || checkForSpace(7, "rk_pc", "down")
                //Movement along the x axis but y is constant
                //check for right-ward movement
                || Number(targetId[1]) == Number(startPos[1]) && (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + 1)
                || checkForSpace(2, "rk_pc", "right")
                || checkForSpace(3, "rk_pc", "right")
                || checkForSpace(4, "rk_pc", "right")
                || checkForSpace(5, "rk_pc", "right")
                || checkForSpace(6, "rk_pc", "right")
                || checkForSpace(7, "rk_pc", "right")
                //check for left-ward movement (-x)
                || Number(targetId[1]) == Number(startPos[1]) && (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - 1)
                || checkForSpace(2, "rk_pc", "left")
                || checkForSpace(3, "rk_pc", "left")
                || checkForSpace(4, "rk_pc", "left")
                || checkForSpace(5, "rk_pc", "left")
                || checkForSpace(6, "rk_pc", "left")
                || checkForSpace(7, "rk_pc", "left")
            ){
                return true
            }
            break;
        case 'queen_piece' :
            if(
                //Diagonal movement
                (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) +1)
                || checkForSpace(2, "bs_pc", "tr")
                || checkForSpace(3, "bs_pc", "tr")
                || checkForSpace(4, "bs_pc", "tr")
                || checkForSpace(5, "bs_pc", "tr")
                || checkForSpace(6, "bs_pc", "tr")
                || checkForSpace(7, "bs_pc", "tr")
                //-x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "bs_pc", "bl")
                || checkForSpace(3, "bs_pc", "bl")
                || checkForSpace(4, "bs_pc", "bl")
                || checkForSpace(5, "bs_pc", "bl")
                || checkForSpace(6, "bs_pc", "bl")
                || checkForSpace(7, "bs_pc", "bl")
                //+x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "bs_pc", "br")
                || checkForSpace(3, "bs_pc", "br")
                || checkForSpace(4, "bs_pc", "br")
                || checkForSpace(5, "bs_pc", "br")
                || checkForSpace(6, "bs_pc", "br")
                || checkForSpace(7, "bs_pc", "br")
                //-x +y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) +1)
                || checkForSpace(2, "bs_pc", "tl")
                || checkForSpace(3, "bs_pc", "tl")
                || checkForSpace(4, "bs_pc", "tl")
                || checkForSpace(5, "bs_pc", "tl")
                || checkForSpace(6, "bs_pc", "tl")
                || checkForSpace(7, "bs_pc", "tl")
                //Movement along the y axis but x is constant
                //check for upward movement (+y)
                || targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) && Number(targetId[1]) == Number(startPos[1]) +1
                || checkForSpace(2, "rk_pc", "up")
                || checkForSpace(3, "rk_pc", "up")
                || checkForSpace(4, "rk_pc", "up")
                || checkForSpace(5, "rk_pc", "up")
                || checkForSpace(6, "rk_pc", "up")
                || checkForSpace(7, "rk_pc", "up")
                //check for downward movement (-y)
                || targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) && (Number(targetId[1]) == Number(startPos[1]) -1)
                || checkForSpace(2, "rk_pc", "down")
                || checkForSpace(3, "rk_pc", "down")
                || checkForSpace(4, "rk_pc", "down")
                || checkForSpace(5, "rk_pc", "down")
                || checkForSpace(6, "rk_pc", "down")
                || checkForSpace(7, "rk_pc", "down")
                //Movement along the x axis but y is constant
                //check for right-ward movement
                || Number(targetId[1]) == Number(startPos[1]) && (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + 1)
                || checkForSpace(2, "rk_pc", "right")
                || checkForSpace(3, "rk_pc", "right")
                || checkForSpace(4, "rk_pc", "right")
                || checkForSpace(5, "rk_pc", "right")
                || checkForSpace(6, "rk_pc", "right")
                || checkForSpace(7, "rk_pc", "right")
                //check for left-ward movement (-x)
                || Number(targetId[1]) == Number(startPos[1]) && (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - 1)
                || checkForSpace(2, "rk_pc", "left")
                || checkForSpace(3, "rk_pc", "left")
                || checkForSpace(4, "rk_pc", "left")
                || checkForSpace(5, "rk_pc", "left")
                || checkForSpace(6, "rk_pc", "left")
                || checkForSpace(7, "rk_pc", "left")
            ){
                return true
            }
            break;
        case 'king_piece' :
            if(
                //up-down movement
                (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) && (Number(targetId[1]) == Number(startPos[1]) +1)
                || (Number(targetId[1]) == Number(startPos[1]) -1))
                //left-right movement
                || (Number(targetId[1]) == Number(startPos[1]) && (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + 1)
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) - 1))
                //diagonal movement
                //+x+y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) +1)
                //-x-y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) -1)
                //+x-y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) -1)
                //-x+y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) +1)
            ){
                return true
            }
    }
}

function changePlayerTurn(){
    if (playerTurn == "light_piece"){
        moves++
        playerTurn = "dark_piece"
        console.log(playerTurn + "'s turn");
        console.log(moves);
    } else {
        moves++
        playerTurn = "light_piece";
        console.log(moves);
    }
}

function checkWin(){
    const kings = Array.from(document.querySelectorAll("#king_piece"))

    if(!kings.some(king => king.firstChild.classList.contains("light_piece")) || player1Time < 0){
        alert("black wins");

        if(user_details.find(obj => obj.username === player2).win == null)
        {
            user_details.find(obj => obj.username === player2).win = 1
        }else{
            user_details.find(obj => obj.username === player2).win += 1
        }

        if(user_details.find(obj => obj.username === player1).loss == null){
            user_details.find(obj => obj.username === player1).loss = 1
        }else{
            user_details.find(obj => obj.username === player1).loss +=1
        }

        if(user_details.find(obj => obj.username === player1).matches == null){
            user_details.find(obj => obj.username === player1).matches = 1
        }else{
            user_details.find(obj => obj.username === player1).matches += 1
        }

        if(user_details.find(obj => obj.username === player2).matches == null){
            user_details.find(obj => obj.username === player2).matches = 1
        }else{
            user_details.find(obj => obj.username === player2).matches += 1
        }

        cells.forEach(cell => cell.firstChild?.setAttribute("draggable", false));
        localStorage.setItem("user_details", JSON.stringify(user_details))
    }

    if(!kings.some(king => king.firstChild.classList.contains("dark_piece")) || player2Time < 0){
        alert("white wins");

        if(user_details.find(obj => obj.username === player1).win == null)
        {
            user_details.find(obj => obj.username === player1).win = 1
        }else{
            user_details.find(obj => obj.username === player1).win += 1
        }

        if(user_details.find(obj => obj.username === player2).loss == null){
            user_details.find(obj => obj.username === player2).loss = 1
        }else{
            user_details.find(obj => obj.username === player2).loss +=1
        }

        if(user_details.find(obj => obj.username === player1).matches == null){
            user_details.find(obj => obj.username === player1).matches = 1
        }else{
            user_details.find(obj => obj.username === player1).matches += 1
        }

        if(user_details.find(obj => obj.username === player2).matches == null){
            user_details.find(obj => obj.username === player2).matches = 1
        }else{
            user_details.find(obj => obj.username === player2).matches += 1
        }

        cells.forEach(cell => cell.firstChild?.setAttribute("draggable", false));
        localStorage.setItem("user_details", JSON.stringify(user_details))
    }

}