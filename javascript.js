let gridSize = 16;

generateGrid(gridSize);

function generateGrid(numRows) {
    // Create div to put pixels in
    grid = document.createElement('div');
    grid.id = 'grid';

    // Get css custom property for grid size
    let gridSize = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--grid-size').slice(0,-2));
    // Calculate and set pixel size based on grid size
    let pixelSize = gridSize / numRows;

    for(i = 0; i < numRows * numRows; i++) {
        // Create pixel
        pixel = document.createElement('div');
        pixel.className = 'pixel';

        pixel.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px;`);
        // Add pixel to grid
        grid.appendChild(pixel);
    }

    document.getElementById('grid-wrapper').appendChild(grid);
    setGridEventListener();
}

function drawColor(pixel) {
    if(pixel.buttons || pixel.type == 'click') {
        let color = document.getElementById('color-picker').value;
        pixel.target.style.backgroundColor = color;
    }
}

function changeColor(color) {
    // Get color from div and convert to hexcode
    let newColor = rgba2hex(getComputedStyle(color.target).backgroundColor);
    document.getElementById('color-picker').value = newColor;
}

function adjustGrid(size) {
    document.getElementById('grid').remove();
    generateGrid(size);
    setGridEventListener();
}

function setGridEventListener() {
    document.querySelectorAll('#grid > div').forEach(pixel => {
        pixel.addEventListener('mouseenter', drawColor);
        pixel.addEventListener('click', drawColor);
    });
}

function changeBorder(size) {
    document.documentElement.style.setProperty('--grid-border-width', `${size}px`);

    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.borderWidth = size + 'px';
    })
}

// Source https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", ""),
    ).join("")}`;

    document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', changeColor);
});

document.getElementById('grid-slider').addEventListener('change', (e) => adjustGrid(e.target.value));

// Update the size of the grid based on the slider value
document.getElementById('grid-slider').addEventListener('input', (e) => {
    gridSize = e.target.value;
    document.getElementById('current-size').textContent = gridSize + 'x' + gridSize;
});

document.getElementById('grid-border-width').addEventListener('change', e => changeBorder(e.target.value));

document.getElementById('clear-grid').addEventListener('click', () => adjustGrid(gridSize));