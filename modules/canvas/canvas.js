class Canvas {
    constructor(canvas, camera = new Camera()) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.camera = camera;

        this.timeScale = 1;
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    pause() {
        this.timeScale = 0;
    }

    continue() {
        this.timeScale = 1;
    }
}