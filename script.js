const DEFAULT_COLOR = "#636363";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
const DEFAULT_THEME = "light";

let color = DEFAULT_COLOR;
let mode = DEFAULT_MODE;
let size = DEFAULT_SIZE;
let theme = DEFAULT_THEME;

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

function setTheme(newTheme) {
  changeTheme(newTheme);
  theme = newTheme;
}

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");
// const grid__item = document.getElementById("grid__item");
const body = document.getElementById("body");
const header = document.getElementById("header");
const footer = document.getElementById("footer");

colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode("color");
eraserBtn.onclick = () => setMode("eraser");
clearBtn.onclick = () => reloadGrid();
themeBtn.onclick = () => setTheme("dark");
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
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (c = 0; c < size * size; c++) {
    let cell = document.createElement("div");
    // cell.id = "grid__item";
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

function changeTheme(newTheme) {
  if (newTheme === "dark") {
    body.classList.toggle("dark-mode");
    grid.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");
    colorBtn.classList.toggle("dark-mode");
    eraserBtn.classList.toggle("dark-mode");
    clearBtn.classList.toggle("dark-mode");
    themeBtn.classList.toggle("dark-mode");
    colorPicker.classList.toggle("dark-mode");
    // grid__item.classList.toggle("dark-mode");
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
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  makeRows(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
  changeTheme(DEFAULT_THEME);
};
