generateGrid(16);

function generateGrid(numRows) {
    // Create div to put pixels in
    grid = document.createElement('div');
    grid.id = 'grid';

    // Get css custom property for grid size and border width
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
}