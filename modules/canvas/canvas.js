const canvas = new Module('canvas');

canvas.htmlElement = document.getElementById(config.canvas.id);
canvas.ctx = canvas.htmlElement.getContext('2d');

canvas.timeScale = 1;

canvas.worldObjects = [];

canvas.onResize = () => {
    canvas.setSize(config.canvas.width(), config.canvas.height());
    grid.recalculatePositionRelativeCanvasForAllObjects();
};

onresize = canvas.onResize;

canvas.setSize = (width, height) => {
    canvas.htmlElement.width = width;
    canvas.htmlElement.height = height;
}

canvas.pause = () => {
    canvas.timeScale = 0;
}

canvas.pause = () => {
    canvas.timeScale = 1;
}

canvas.onResize();