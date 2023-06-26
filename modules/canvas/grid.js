const grid = new Module('Grid');

grid.scale = 1;
grid.position = {
    worldToCanvas: (x, y) => {
        return { x: (x * grid.scale + canvas.htmlElement.width / 2) - (camera.positionRelativeWorld.x * grid.scale), y: (y * grid.scale + canvas.htmlElement.height / 2) + (camera.positionRelativeWorld.y * grid.scale) };
    },
    canvasToWorld: (x, y) => {
        return { x: (x - canvas.htmlElement.width / 2) / grid.scale + camera.positionRelativeWorld.x, y: -(y - canvas.htmlElement.height / 2) / grid.scale + camera.positionRelativeWorld.y };
    }
}
grid.objects = [];
grid.draw = () => {
    grid.objects.forEach((object) => object.drawRelativeWorld())
}
grid.recalculatePositionRelativeCanvasForAllObjects = () => {
    grid.objects.forEach((object) => {
        object.positionRelativeCanvas = grid.position.worldToCanvas(object.positionRelativeWorld.x, object.positionRelativeWorld.y);
        object.recalculateScaledValues();
    });
};
