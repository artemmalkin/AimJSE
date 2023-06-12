class Sprite {
    constructor(image, frameWidth, frameHeight, x = 0, y = 0, canvas, scale = 1, frameCol = 0, frameRow = 0) {
        this.image = image;
        this.canvas = canvas;
        this.camera = canvas.camera;

        this.x = x;
        this.y = y;

        this.sx;
        this.sy;

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        this.setFrameCol = (frameCol) => {
            this.sx = frameCol * this.frameWidth;
        };
        this.setFrameRow = (frameRow) => {
            this.sy = frameRow * this.frameHeight;
        };

        this.scaledWidth;
        this.scaledHeight;
        this.setScale = (scale) => {
            this.scaledWidth = this.frameWidth * scale;
            this.scaledHeight = this.frameHeight * scale;
        };

        this.setFrameCol(frameCol);
        this.setFrameRow(frameRow);
        this.setScale(scale);
    }

    draw() {
        this.canvas.ctx.imageSmoothingEnabled = false;
        this.canvas.ctx.drawImage(this.image, this.sx, this.sy, this.frameWidth, this.frameHeight, this.x - this.camera.position.x, this.y - this.camera.position.y, this.scaledWidth * this.camera.zoom, this.scaledHeight * this.camera.zoom);
    }

    drawPattern(repeatCount = 0, repeatAxis = "x") {
        const x = this.x;
        const y = this.y;

        if (repeatAxis === "x") {
            for (let n = 0; n < repeatCount; n++) {
                this.x = n * x;
                this.draw();
            }
        } else {
            for (let n = 1; n < repeatCount; n++) {
                this.y = n * y;
                this.draw();
            }
        };

        this.x = x;
        this.y = y;
    }
}