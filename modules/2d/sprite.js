class Sprite {
    constructor(image, frameWidth, frameHeight, x = 0, y = 0, scale = 1, frameCol = 0, frameRow = 0) {
        this.image = image;

        this.x = x;
        this.y = y;

        this.sx;
        this.sy;

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;

        this.centerWidth = frameWidth / 2;
        this.centerHeight = frameHeight / 2;

        this.setFrameCol = (frameCol) => {
            this.sx = frameCol * this.frameWidth;
        };
        this.setFrameRow = (frameRow) => {
            this.sy = frameRow * this.frameHeight;
        };

        this.scale = scale;
        this.scaledWidth;
        this.scaledHeight;
        this._setScale = (scale) => {
            this.scale = scale;
            this.scaledWidth = this.frameWidth * scale;
            this.scaledHeight = this.frameHeight * scale;
            this.centerWidth = this.scaledWidth / 2;
            this.centerHeight = this.scaledHeight / 2;
        };
        this._setWidth = (width) => {
            this.scaledWidth = width * this.scale;
        }
        this._setHeight = (height) => {
            this.scaledHeight = height * this.scale;
        }
        this.setFrameCol(frameCol);
        this.setFrameRow(frameRow);
        this._setScale(scale);
    }

    drawRelativeCanvas() {
        canvas.ctx.imageSmoothingEnabled = false;
        canvas.ctx.drawImage(this.image, this.sx, this.sy, this.frameWidth, this.frameHeight, (this.x - this.centerWidth), (this.y - this.centerHeight), this.scaledWidth, this.scaledHeight);
    }

    drawRelativeWorld() {
        canvas.ctx.imageSmoothingEnabled = false;
        canvas.ctx.drawImage(this.image, this.sx, this.sy, this.frameWidth, this.frameHeight, (this.x - this.centerWidth) * canvas.camera.zoom - canvas.camera.position.x, (this.y - this.centerHeight) * canvas.camera.zoom - canvas.camera.position.y, this.scaledWidth * canvas.camera.zoom, this.scaledHeight * canvas.camera.zoom);
    }

    drawPatternRelativeCanvas(repeatCount = 0, repeatAxis = "x") {
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

    drawPatternRelativeWorld(repeatCount = 0, repeatAxis = "x") {
        const x = this.x;
        const y = this.y;

        if (repeatAxis === "x") {
            for (let n = 0; n < repeatCount; n++) {
                this.x = n * x;
                this.drawRelativeCamera();
            }
        } else {
            for (let n = 1; n < repeatCount; n++) {
                this.y = n * y;
                this.drawRelativeCamera();
            }
        };

        this.x = x;
        this.y = y;
    }
}