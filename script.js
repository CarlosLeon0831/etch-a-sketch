const grid = document.getElementById("grid");

function makeRows(rows, cols) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid__item";
    cell.addEventListener('mouseover', changeColor);
    cell.addEventListener('mousedown', changeColor);
  }
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = 'grey';
}

makeRows(16, 16);

