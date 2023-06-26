const gui = new Module('GUI');

gui.elements = [];

gui.onMouseDown = () => { gui.handleMouseDown() };
gui.onMouseUp = () => { gui.handleMouseUp() };
gui.onMouseDrag = () => { gui.handleMouseDrag() };
gui.onMouseWheel = (wheelDelta) => { gui.handleMouseWheel(wheelDelta) };

gui.handleMouseDown = () => {
}
gui.handleMouseUp = () => {
    gui.elements.forEach((element) => {
        switch (element.constructor) {
            case Button:
                if (element.x < mouse.position.x && mouse.position.x < element.x + element.width &&
                    element.y < mouse.position.y && mouse.position.y < element.y + element.height) {
                    element.action?.();
                }
                break
            default:
                break
        }
    });
}
gui.handleMouseDrag = () => {
}
gui.handleMouseWheel = (wheelDelta) => {
}

gui.draw = () => {
    gui.elements.forEach((element) => element.drawRelativeCanvas());
}