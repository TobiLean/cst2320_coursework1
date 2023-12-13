const cells = document.querySelectorAll(".cell");
let startPos;
let draggedPiece;
let playerTurn = 'dark_piece'
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

setCellId();
setPieces();

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
    const oppTurn = playerTurn === "light_piece" ? "dark_piece" : "light_piece"
    const occupied = el.target.classList.contains("chess_piece");
    const occupiedByOpponent = el.target.firstChild?.classList.contains(oppTurn);
    const validMove = checkValidMove(el.target);

    if(correctTurn){
        if(occupiedByOpponent && validMove){
            el.target.parentNode.append(draggedPiece);
            el.target.remove();
            
            changePlayerTurn();
            return;
        }

        if(occupied && !occupiedByOpponent){
            alert("wrong move");
            return
        }

        if(validMove){
            el.target.append(draggedPiece);
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
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+2 && Number(targetId[1]) == Number(startPos[1]) +2)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-1)}`+`${Number(targetId[1])-1}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+3 && Number(targetId[1]) == Number(startPos[1]) +3)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-2)}`+`${Number(targetId[1])-2}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+4 && Number(targetId[1]) == Number(startPos[1]) +4)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-3)}`+`${Number(targetId[1])-3}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+5 && Number(targetId[1]) == Number(startPos[1]) +5)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-4)}`+`${Number(targetId[1])-4}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+6 && Number(targetId[1]) == Number(startPos[1]) +6)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-5)}`+`${Number(targetId[1])-5}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+7 && Number(targetId[1]) == Number(startPos[1]) +7)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-6)}`+`${Number(targetId[1])-6}"]`).firstChild)
                //-x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-2 && Number(targetId[1]) == Number(startPos[1]) -2)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+1)}`+`${Number(targetId[1])+1}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-3 && Number(targetId[1]) == Number(startPos[1]) -3)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+2)}`+`${Number(targetId[1])+2}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-4 && Number(targetId[1]) == Number(startPos[1]) -4)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+3)}`+`${Number(targetId[1])+3}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-5 && Number(targetId[1]) == Number(startPos[1]) -5)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+4)}`+`${Number(targetId[1])+4}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-6 && Number(targetId[1]) == Number(startPos[1]) -6)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+5)}`+`${Number(targetId[1])+5}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-7 && Number(targetId[1]) == Number(startPos[1]) -7)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+6)}`+`${Number(targetId[1])+6}"]`).firstChild)
                //+x -y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+1 && Number(targetId[1]) == Number(startPos[1]) -1)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+2 && Number(targetId[1]) == Number(startPos[1]) -2)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-1)}`+`${Number(targetId[1])+1}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+3 && Number(targetId[1]) == Number(startPos[1]) -3)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-2)}`+`${Number(targetId[1])+2}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+4 && Number(targetId[1]) == Number(startPos[1]) -4)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-3)}`+`${Number(targetId[1])+3}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+5 && Number(targetId[1]) == Number(startPos[1]) -5)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-4)}`+`${Number(targetId[1])+4}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+6 && Number(targetId[1]) == Number(startPos[1]) -6)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-5)}`+`${Number(targetId[1])+5}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)+7 && Number(targetId[1]) == Number(startPos[1]) -7)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)-6)}`+`${Number(targetId[1])+6}"]`).firstChild)
                //-x +y movement
                || (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-1 && Number(targetId[1]) == Number(startPos[1]) +1)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-2 && Number(targetId[1]) == Number(startPos[1]) +2)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+1)}`+`${Number(targetId[1])-1}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-3 && Number(targetId[1]) == Number(startPos[1]) +3)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+2)}`+`${Number(targetId[1])-2}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-4 && Number(targetId[1]) == Number(startPos[1]) +4)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+3)}`+`${Number(targetId[1])-3}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-5 && Number(targetId[1]) == Number(startPos[1]) +5)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+4)}`+`${Number(targetId[1])-4}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-6 && Number(targetId[1]) == Number(startPos[1]) +6)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+5)}`+`${Number(targetId[1])-5}"]`).firstChild)
                || ((targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)-7 && Number(targetId[1]) == Number(startPos[1]) +7)
                && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0)+6)}`+`${Number(targetId[1])-6}"]`).firstChild)
            ){
                return true
            }
            break;
        case 'rook_piece' :
            if(
                //Movement along the y axis but x is constant
                (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0)
                && (
                    (Number(targetId[1]) == Number(startPos[1]) +1)
                    ||(Number(targetId[1]) == Number(startPos[1]) +2
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-1}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) +3
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-2}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) +4
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-3}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) +5
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-4}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) +6
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-5}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) +7
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-6}"]`).firstChild
                    )//check for downward movement (-y)
                    || (Number(targetId[1]) == Number(startPos[1]) -1)
                    ||(Number(targetId[1]) == Number(startPos[1]) -2
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+1}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) -3
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+2}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) -4
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+3}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) -5
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+4}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) -6
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+5}"]`).firstChild
                    )
                    ||(Number(targetId[1]) == Number(startPos[1]) -7
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])+6}"]`).firstChild
                    )
                ))
                || //Movement along the x axis but y is constant
                Number(targetId[1]) == Number(startPos[1])
                && (
                    (targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) + 1)
                    ||targetId[0].charCodeAt(0) == startPos[0].charCodeAt(0) +2
                    && !document.querySelector(`[cell-id="${String.fromCharCode(targetId[0].charCodeAt(0))}`+`${Number(targetId[1])-1}"]`).firstChild
                )
            ){
                return true
            }
    }
}

function changePlayerTurn(){
    if (playerTurn == "dark_piece"){
        playerTurn = "light_piece"
        console.log(playerTurn + "'s turn");
    } else {
        playerTurn = "dark_piece";
        console.log(playerTurn + "'s turn");
    }
}
