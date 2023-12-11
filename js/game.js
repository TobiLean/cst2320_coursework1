const cell = document.getElementsByClassName("cell");

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

function setPieces() {
    INITIAL_PIECE_POSITION.forEach((el, i) => {
        cell[i].innerHTML = INITIAL_PIECE_POSITION[i];
        cell[i].firstChild?.setAttribute('draggable', true)

        if(i < 16){
            cell[i].firstChild.firstChild.classList.add('dark_piece')
        }

        if(i > 47){
            cell[i].firstChild.firstChild.classList.add('light_piece')
        }
    });
}

setPieces();