const DEFAULT_COLOR = "#636363";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
let size = DEFAULT_SIZE;

// Grid
const grid = document.getElementById("grid");
function makeRows(rows, cols) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid__item";
    cell.addEventListener("mouseover", changeColor);
    cell.addEventListener("mousedown", changeColor);
  }
}
makeRows(16, 16);

// Change options
function setColor(newColor) {
  color = newColor;
}
function setMode(newMode) {
  activateButton(newMode);
  mode = newMode;
}
function setSize(newSize) {
  size = newSize;
}

function changeSize(value) {
  setSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(size);
}

// Draw on mouse down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (mode === "color") {
    e.target.style.backgroundColor = colorSelection;
  } else if (mode === "eraser") {
    e.target.style.backgroundColor = "#e0e0e0";
  }
}

// Buttons
function activateButton(newMode) {
  if (mode === "color") {
    colorBtn.classList.remove("active");
  } else if (mode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (mode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  grid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
