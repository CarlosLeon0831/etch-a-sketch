const DEFAULT_COLOR = "#636363";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
let size = DEFAULT_SIZE;

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

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode("color");
eraserBtn.onclick = () => setMode("eraser");
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

// Draw on mouse down
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

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
  makeRows(size);
}

function clearGrid() {
  grid.innerHTML = "";
}

// Grid
function makeRows(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  for (c = 0; c < size * size; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid__item";
    cell.addEventListener("mouseover", changeColor);
    cell.addEventListener("mousedown", changeColor);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (mode === "color") {
    e.target.style.backgroundColor = color;
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
  makeRows(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
