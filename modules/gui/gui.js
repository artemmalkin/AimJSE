class GUI {
    constructor() {
        this.elements = [];

        this.onMouseDown = () => { handleMouseDown() };
        this.onMouseUp = () => { handleMouseUp() };
        this.onMouseDrag = () => { handleMouseDrag() };
        this.onMouseWheel = (wheelDelta) => { handleMouseWheel(wheelDelta) };
    }

    handleMouseDown() {

    }

    handleMouseUp() {
        this.elements.forEach((element) => {
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

    handleMouseDrag() {

    }

    handleMouseWheel(wheelDelta) {

    }

    draw() {
        this.elements.forEach((element) => element.draw());
    }
}