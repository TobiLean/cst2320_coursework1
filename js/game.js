const cells = document.querySelectorAll(".cell");
console.log(cells)

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

        cell.setAttribute("cellId", `${columns[i%8]}${rows[rowNum-1]}`);
    })
}

setCellId();
setPieces();

cells.forEach(cell => {
    cell.addEventListener('dragstart', dragPiece)
})

function dragPiece(event){
    console.log(event.target.parentNode);
}
