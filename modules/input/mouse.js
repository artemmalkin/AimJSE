class Mouse {
    constructor() {
        this.position = { x: 0, y: 0, timeStamp: 0};
        this.pastPosition = { x: 0, y: 0, timeStamp: 0};
        this.speed = { x: 0, y: 0 };
        this.onMouseWheel = (wheelDelta) => { console.log(wheelDelta) };
        this.onMouseDown = () => { console.log(this.position) };
        this.onMouseUp = () => { console.log(this.position) };
        this.onMouseDrag = () => { console.log(this.position) };
        this.isDown = false;

        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        canvas.canvas.addEventListener("pointerdown", this.mouseDown);

        canvas.canvas.addEventListener("pointermove", this.mouseMove);

        document.addEventListener("pointerup", this.mouseUp);

        document.addEventListener("wheel", this.mouseWheel);
    }

    mouseDown(event) {
        /*event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();*/
        mouse.position.x = Math.floor(event.offsetX / canvas.canvas.offsetWidth * canvas.canvas.width);
        mouse.position.y = Math.floor(event.offsetY / canvas.canvas.offsetHeight * canvas.canvas.height);
        mouse.isDown = true;

        mouse.onMouseDown();
        gui.handleMouseDown();
    }

    mouseMove(event) {
        mouse.position.x = Math.floor(event.offsetX / canvas.canvas.offsetWidth * canvas.canvas.width);
        mouse.position.y = Math.floor(event.offsetY / canvas.canvas.offsetHeight * canvas.canvas.height);
        mouse.position.timeStamp = event.timeStamp;

        if (mouse.isDown && (mouse.position.timeStamp - mouse.pastPosition.timeStamp) > 60) {
            const deltaTimeStamp = (mouse.position.timeStamp - mouse.pastPosition.timeStamp);

            mouse.speed.x = Math.floor((mouse.position.x - mouse.pastPosition.x) / deltaTimeStamp * 100);
            mouse.speed.y = Math.floor((mouse.position.y - mouse.pastPosition.y) / deltaTimeStamp * 100);

            mouse.pastPosition.x = mouse.position.x;
            mouse.pastPosition.y = mouse.position.y;
            mouse.pastPosition.timeStamp = mouse.position.timeStamp;

            mouse.onMouseDrag();
            gui.handleMouseDrag();
        }
    }

    mouseUp(event) {
        mouse.position.x = Math.floor(event.offsetX / canvas.canvas.offsetWidth * canvas.canvas.width);
        mouse.position.y = Math.floor(event.offsetY / canvas.canvas.offsetHeight * canvas.canvas.height);
        mouse.isDown = false;

        mouse.onMouseUp();
        gui.handleMouseUp();
    }

    mouseWheel(event) {
        mouse.onMouseWheel(event.wheelDelta)
        gui.handleMouseWheel(event.wheelDelta);
    }
}