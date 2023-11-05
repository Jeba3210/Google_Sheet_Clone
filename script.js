let columns = 26;
let rows = 100;
const headerContainer = document.querySelector(".header");
const serialNumbersContainer = document.querySelector(".sno");
const mainContainer = document.querySelector(".main");


function createHeaderCells() {
    for (let i = 0; i <= columns; i++) {
        const headerCell = document.createElement("div");
        headerCell.className = "header-cell cell";
        if (i !== 0) {
            headerCell.innerText = String.fromCharCode(64 + i);
        }
        headerContainer.appendChild(headerCell)
    }
}

function createSerialNumberCells() {
    for (let i = 1; i <= rows; i++) {
        const snoCell = document.createElement("div");
        snoCell.innerText = i;
        snoCell.className = "sno-cell cell"
        serialNumbersContainer.appendChild(snoCell);
    }
}

function createRow(rowNumber) {
    const row = document.createElement("div");
    row.className = "row";
    for (let i = 1; i <= columns; i++) {
        const cell = document.createElement("div");
        cell.className = "main-cell cell";
        cell.contentEditable = true;
        row.appendChild(cell);

        cell.id = String.fromCharCode(64 + i) + rowNumber;

        cell.addEventListener("focus", onCellFocus);
        cell.addEventListener("input", onFormChange);
    }
    mainContainer.appendChild(row);
}

function buildMainSection() {
    for (let i = 1; i <= rows; i++) {
        createRow(i);
    }
}

createHeaderCells();
createSerialNumberCells();

buildMainSection();

const cellNamePlaceholder = document.querySelector("#active-cell");
const fontSizeInput = document.querySelector("#fontsize");
const fontFamilyInput = document.querySelector("#fontfamily");
const form = document.querySelector("#form")

let activeElement = null;

const state = {};

const defaultProperties = {
    fontFamily: 'sans',
    fontSize: 16,
    color: "#000000",
    textAlign: "left", // "left", "center", "right"
    backgroundColor: "#ffffff",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    value: ''
}

function onCellFocus(event) {
    const elementId = event.target.id;
    cellNamePlaceholder.innerText = elementId;
    activeElement = event.target;
    if (state[elementId]) {
        resetOptions(state[elementId]);
    }
    else {
        resetOptions(defaultProperties);
    }
}

function resetOptions(optionsState) {
   
    form.fontfamily.value = optionsState.fontFamily;
    form.fontsize.value = optionsState.fontSize;
    form.textalign.value = optionsState.textAlign; // "right" | "left" | "center"
    form.bold.checked = optionsState.isBold
    form.italic.checked = optionsState.isItalic;
    form.underlined.checked = optionsState.isUnderlined;
    form.textcolor.value = optionsState.color;
    form.bgcolor.value = optionsState.backgroundColor;
}

function onFormChange() {
    if (!activeElement) {
        alert("Please select a cell to make changes");
        form.reset();
        return;
    }


    let currentState = {
        textColor: form.textcolor.value,
        backgroundColor: form.bgcolor.value,
        fontSize: form.fontsize.value,
        fontFamily: form.fontfamily.value,
        isBold: form.bold.checked,
        isItalic: form.italic.checked,
        isUnderlined: form.underlined.checked,
        textAlign: form.textalign.value // "left" , "right" , "center"
    }
    applyStylesToCell(currentState);


    state[activeElement.id] = { ...currentState, value: activeElement.innerText };
}

function applyStylesToCell(styleObject) {
    activeElement.style.fontSize = `${styleObject.fontSize}px`;
    activeElement.style.fontFamily = styleObject.fontFamily;
    activeElement.style.color = styleObject.textColor;
    activeElement.style.backgroundColor = styleObject.backgroundColor;
    activeElement.style.textAlign = styleObject.textAlign;

    activeElement.style.fontWeight = styleObject.isBold ? "bold" : "normal";
    activeElement.style.fontStyle = styleObject.isItalic ? "italic" : "normal";
    activeElement.style.textDecoration = styleObject.isUnderlined ? "underline" : "none";
}

function exportData() {
    let fileData = JSON.stringify(state);
    let blob = new Blob([fileData], { type: "application/json" })
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "sheet.json";
    link.click();
}
