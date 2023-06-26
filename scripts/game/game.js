let DebugText;

SceneFunc = () => {
    keyboard.bind.keyup["Escape"] = () => { DebugText.text = 'Escape key up' }
    keyboard.bind.keydown["Escape"] = () => { DebugText.text = 'Escape key down' }

    mouse.onMouseDrag = () => {
        camera.positionRelativeWorld.x += (mouse.pastPosition.x - mouse.position.x) / grid.scale;
        camera.positionRelativeWorld.y -= (mouse.pastPosition.y - mouse.position.y) / grid.scale;
        DebugText.text = langDict.pointerCount;
        grid.recalculatePositionRelativeCanvasForAllObjects();
    };
    mouse.onMouseWheel = (wheelDelta) => {
        DebugText.text = wheelDelta;
        const mousePositionRelativeWorldBeforeZoom = grid.position.canvasToWorld(mouse.position.x, mouse.position.y);

        grid.scale += wheelDelta / 100;
        grid.scale = Gmath.clamp(grid.scale, 0.5, 20);

        const mousePositionRelativeWorldAfterZoom = grid.position.canvasToWorld(mouse.position.x, mouse.position.y);

        if (grid.scale >= 0.5 && grid.scale <= 20) {
            camera.positionRelativeWorld.x -= mousePositionRelativeWorldAfterZoom.x - mousePositionRelativeWorldBeforeZoom.x;
            camera.positionRelativeWorld.y -= mousePositionRelativeWorldAfterZoom.y - mousePositionRelativeWorldBeforeZoom.y;
        }

        grid.recalculatePositionRelativeCanvasForAllObjects();
    };

    mouse.onMouseUp = () => {
        //console.log('Click at the world coordinate: ', grid.position.canvasToWorld(mouse.position.x, mouse.position.y))
    }

    let sprite = new Sprite(images['images.player'], 64, 64, 0, 0, 5, 0, 0)
    //let animationProp = new AnimationSpriteProperty(sprite, 9, 200)
    //animationProp.propertyAnimation.scale = [6, 7, 8, 9, 10, 9, 8, 7, 6]
    //animationProp.propertyAnimation.y = [0, -100, -200, -300,-400, -300, -200, -100, 0, ]
    let animation = new AnimationSpriteSheet(sprite, 3, 200)
    DebugText = new _Text(0, 60, "Hello World", "serif", 40, "red", "white", 2);
    let testButton = new Button(0, 60, 100, 100, new Sprite(images['images.player'], 64, 64, 32 * 5, 32 * 5, 5, 0, 0), DebugText, () => { console.log("button clicked!") })
    let circle = new Circle(0, 0, 50, "yellow", "white", 2);
    let circle2 = new Circle(100, 0, 20, "red", "white", 2);
    let aimCircle = new Circle(0, 0, 10, "white", "white", 2);

    gui.elements = [DebugText]
    grid.objects = [circle, circle2, aimCircle];

    updateFunc = () => {
    }
}