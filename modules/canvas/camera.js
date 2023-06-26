const camera = new Module('camera');

camera.offset = { x: 0, y: 0 };
camera.positionRelativeWorld = { x: 0, y: 0 };

/*camera.setWorldPosition = (x, y) => {
    camera.worldPosition.x = x;
    camera.worldPosition.y = y;
    camera.offset.x = camera.worldPosition.x - canvas.htmlElement.width / 2;
    camera.offset.y = -camera.worldPosition.y - canvas.htmlElement.height / 2;
};*/

camera.setOffset = (x, y) => {
    camera.offset.x = x - (canvas.htmlElement.width / 2) / camera.zoom;
    camera.offset.y = -y - (canvas.htmlElement.height / 2) / camera.zoom;
};


