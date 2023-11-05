
let columns = 26;
let rows = 100;

const headerContainer = document.querySelector(".header");
const slNoContainer = document.querySelector(".sl_no");
const mainContainer = document.querySelector(".main");


function createHeaderCells() {
    for (let i = 0; i <= columns; i++) {
        const headerCell = document.createElement("div");
        if(i !== 0){
            headerCell.className = ("header_cell");
            headerCell.innerText = String.fromCharCode(64+i);
        }else{
            headerCell.className = ("header_slcell");
        }
        headerContainer.appendChild(headerCell);
        
    }
}


function createSlNo(){
    for (let i = 1; i <= 100; i++) {
        const slNoCell = document.createElement("div");
        slNoCell.className = "slNo_cell";
        slNoCell.innerText = i;

        slNoContainer.appendChild(slNoCell);
        
    }
}

function createrow(){
    const row = document.createElement("div");
    for (let i = 1; i <= columns; i++) {
      const cell = document.createElement("div");
      cell.className = "main_cell";
      row.appendChild(cell);
      cell.contentEditable = true;
    }
    row.className = "row";
    mainContainer.appendChild(row);
}

function mainSection(){
    for (let i = 0; i < rows; i++) {
       createrow();
        
    }
}

createHeaderCells();
createSlNo();
mainSection();