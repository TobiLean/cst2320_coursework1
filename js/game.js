const cells = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start_end_btn")
const player1 = sessionStorage.getItem("loggedUser1");
const player2 = sessionStorage.getItem("loggedUser2");
const kings = Array.from(document.querySelectorAll("#king_piece"))
let user_details = JSON.parse(localStorage.getItem("user_details"))
console.log(user_details)

// console.log(user_details.find(obj => obj.username === player1).lastname)

let startPos;
let draggedPiece;
let playerTurn = 'light_piece'
console.log(playerTurn + "'s turn");

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

function startGame (){
    const kings = Array.from(document.querySelectorAll("#king_piece"))
    var gameStarted;
    if(startBtn.value=="Start"){
        setCellId();
        setPieces();
        gameStarted = true;
    }

    if(
        startBtn.value=="End" && kings.some(king => king.firstChild.classList.contains("dark_piece"))
        && kings.some(king => king.firstChild.classList.contains("light_piece"))
        ){
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
    }

    if(startBtn.value=="End"){
        cells.forEach(cell=> cell.innerHTML="")
        playerTurn = 'light_piece'
    }
}



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
        playerTurn = "dark_piece"
        console.log(playerTurn + "'s turn");
    } else {
        playerTurn = "light_piece";
        console.log(playerTurn + "'s turn");
    }
}

function checkWin(){
    const kings = Array.from(document.querySelectorAll("#king_piece"))

    if(!kings.some(king => king.firstChild.classList.contains("light_piece"))){
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

    if(!kings.some(king => king.firstChild.classList.contains("dark_piece"))){
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