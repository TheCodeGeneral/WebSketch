generateGrid(16);


function generateGrid(numRows) {
    // Create div to put pixels in
    grid = document.createElement('div');
    grid.id = 'grid';

    // Get css custom property for grid size
    let gridSize = parseInt(getComputedStyle(document.documentElement,null).getPropertyValue('--grid-size').slice(0,-2));

    for(i = 0; i < numRows * numRows; i++) {
        // Create pixel
        pixel = document.createElement('div');
        pixel.className = 'pixel';

        // Calculate and set pixel size based on grid size
        let pixelSize = gridSize / numRows;
        pixel.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px;`);
        // Add pixel to grid
        grid.appendChild(pixel);
    }

    document.getElementById('grid-wrapper').appendChild(grid);
    setGridEventListener();
}

function drawColor(pixel) {
    if(pixel.which) {
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
    });
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
