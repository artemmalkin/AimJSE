const mouse = new Module('Mouse');

mouse.pointers = [];

mouse.position = { x: 0, y: 0, timeStamp: 0 };
mouse.pastPosition = { x: 0, y: 0, timeStamp: 0 };

mouse.speed = { x: 0, y: 0 };

//mouse.pinchInitialDistance = 0;

mouse.isDown = false;

mouse.onMouseWheel = (wheelDelta) => { };
mouse.onMouseDown = () => { };
mouse.onMouseUp = () => { };
mouse.onMouseDrag = () => { };
//mouse.onPinch = () => { };

mouse.mouseDown = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    //event.stopPropagation();
    mouse.pointers.push(event);

/*    if (mouse.pointers.length === 2) {
        mouse.pinchInitialDistance = Gmath.distance(event.x, event.y, mouse.pointers[0].x, mouse.pointers[0].y);
        mouse.isPinchStart = true;
    }*/

    mouse.position.x = event.offsetX / canvas.htmlElement.offsetWidth * canvas.htmlElement.width;
    mouse.position.y = event.offsetY / canvas.htmlElement.offsetHeight * canvas.htmlElement.height;
    mouse.isDown = true;

    mouse.pastPosition.x = mouse.position.x;
    mouse.pastPosition.y = mouse.position.y;
    mouse.pastPosition.timeStamp = mouse.position.timeStamp;

    mouse.onMouseDown();
    gui.handleMouseDown();
}

mouse.mouseMove = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    mouse.pointers[mouse.pointers.findIndex((element) => element.pointerId === event.pointerId)] = event;

    mouse.position.x = event.offsetX / canvas.htmlElement.offsetWidth * canvas.htmlElement.width;
    mouse.position.y = event.offsetY / canvas.htmlElement.offsetHeight * canvas.htmlElement.height;
    mouse.position.timeStamp = event.timeStamp;

    if (mouse.isDown) {
        const deltaTimeStamp = (mouse.position.timeStamp - mouse.pastPosition.timeStamp);

        mouse.speed.x = Math.floor((mouse.position.x - mouse.pastPosition.x) / deltaTimeStamp * 100);
        mouse.speed.y = Math.floor((mouse.position.y - mouse.pastPosition.y) / deltaTimeStamp * 100);

        mouse.onMouseDrag();
        gui.handleMouseDrag();

        mouse.pastPosition.x = mouse.position.x;
        mouse.pastPosition.y = mouse.position.y;
        mouse.pastPosition.timeStamp = mouse.position.timeStamp;

        /* if (mouse.pointers.length === 2) {
            const pinchCurrentDistance = Gmath.distance(mouse.pointers[1].x, mouse.pointers[1].y, mouse.pointers[0].x, mouse.pointers[0].y);
            const distanceDelta = Math.floor(pinchCurrentDistance - mouse.pinchInitialDistance);

            mouse.onPinch(distanceDelta);

            DebugText.text = `pointers distance: ${pinchCurrentDistance}, distance delta: ${distanceDelta}`;

            mouse.pinchInitialDistance = pinchCurrentDistance;
        }*/
        }
}

mouse.mouseUp = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    mouse.pointers.splice(mouse.pointers.findIndex((element) => element.pointerId === event.pointerId), 1);

/*    if (mouse.pointers.length === 2) {
        mouse.pinchInitialDistance = Gmath.distance(mouse.pointers[1].x, mouse.pointers[1].y, mouse.pointers[0].x, mouse.pointers[0].y);
    }
    if (mouse.pointers.length === 1) {
        mouse.position.x = mouse.pointers[0].offsetX / canvas.htmlElement.offsetWidth * canvas.htmlElement.width;
        mouse.position.y = mouse.pointers[0].offsetY / canvas.htmlElement.offsetHeight * canvas.htmlElement.height;
    }*/
    mouse.position.x = event.offsetX / canvas.htmlElement.offsetWidth * canvas.htmlElement.width;
    mouse.position.y = event.offsetY / canvas.htmlElement.offsetHeight * canvas.htmlElement.height;
    mouse.isDown = false;

    mouse.onMouseUp();
    gui.handleMouseUp();
}

mouse.mouseWheel = (event) => {
    mouse.position.x = event.offsetX / canvas.htmlElement.offsetWidth * canvas.htmlElement.width;
    mouse.position.y = event.offsetY / canvas.htmlElement.offsetHeight * canvas.htmlElement.height;

    mouse.onMouseWheel(event.wheelDelta)
    gui.handleMouseWheel(event.wheelDelta);
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

document.addEventListener("pointerdown", mouse.mouseDown);

canvas.htmlElement.addEventListener("pointermove", mouse.mouseMove);

document.addEventListener("pointerup", mouse.mouseUp);

document.addEventListener("wheel", mouse.mouseWheel);