class Animation {
    constructor(image, framesCount, frameDuration) {
        this.sprite = sprite;

        this.frameDuration = frameDuration;
        this.framesCount = framesCount;

        this.currentFrame = 0;
        this.lastUpdateTime = 0;

        this.sx;
        this.sy;
    }

    draw() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.frameDuration) {
            this.currentFrame = this.isLoop ? (this.currentFrame + 1) % this.framesCount : this.currentFrame === this.framesCount - 1 ? this.currentFrame : this.currentFrame + 1;
            this.lastUpdateTime = now;
        }
        this.sprite.setFrameCol(this.currentFrame);
        this.sprite.draw();
    }
}