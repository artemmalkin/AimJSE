class AnimationSpriteSheet {
    constructor(spriteSheet, framesCount, frameDuration, isLoop = true) {
        this.spriteSheet = spriteSheet;

        this.frameDuration = frameDuration;
        this.framesCount = framesCount;
        this.isLoop = true;

        this.currentFrame = 0;
        this.lastUpdateTime = 0;
    }

    drawRelativeCanvas() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.frameDuration + config.canvas.fixedUpdateDuration) {
            this.currentFrame = this.isLoop ? (this.currentFrame + 1) % this.framesCount : this.currentFrame === this.framesCount - 1 ? this.currentFrame : this.currentFrame + 1;
            this.lastUpdateTime = now;
        }
        this.spriteSheet.setFrameCol(this.currentFrame);
        this.spriteSheet.draw();
    }

    drawRelativeWorld() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.frameDuration + config.canvas.fixedUpdateDuration) {
            this.currentFrame = this.isLoop ? (this.currentFrame + 1) % this.framesCount : this.currentFrame === this.framesCount - 1 ? this.currentFrame : this.currentFrame + 1;
            this.lastUpdateTime = now;
        }
        this.spriteSheet.setFrameCol(this.currentFrame);
        this.spriteSheet.drawRelativeCamera();
    }
}