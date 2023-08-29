console.log('loaded');
generateGrid(16,16);
function generateGrid(numRows, numCols) {
    grid = document.createElement('div');
    grid.id = 'grid';
    for(i = 0; i < numRows; i++) {
        row = document.createElement('div');
            row.className = 'grid-row';
        for(j = 0; j < numCols; j++) {
            col = document.createElement('div');
            col.className = 'grid-column';
            row.appendChild(col);
        }
        grid.appendChild(row);
    }

    document.querySelector('body').appendChild(grid);
}