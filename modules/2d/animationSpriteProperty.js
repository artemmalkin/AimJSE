class AnimationSpriteProperty {
    constructor(sprite, framesCount, frameDuration, isLoop = true) {
        this.sprite = sprite;

        this.propertyAnimation = {
            x: [],
            y: [],
            scale: [],
            width: [],
            height: [],
            rotation: [],
        };

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

            for (let key in this.propertyAnimation) {
                if (this.propertyAnimation[key].length > 0) {
                    switch (key) {
                        case 'x':
                            this.sprite.x = this.propertyAnimation[key][this.currentFrame];
                            break;
                        case 'y':
                            this.sprite.y = this.propertyAnimation[key][this.currentFrame];
                            break;
                        case 'scale':
                            this.sprite._setScale(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'width':
                            this.sprite._setWidth(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'height':
                            this.sprite._setHeight(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'rotation':
                            this.sprite.rotation = this.propertyAnimation[key][this.currentFrame];
                            break;
                    }
                }
            }

        }
        this.sprite.draw();
    }

    drawRelativeWorld() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.frameDuration + config.canvas.fixedUpdateDuration) {
            this.currentFrame = this.isLoop ? (this.currentFrame + 1) % this.framesCount : this.currentFrame === this.framesCount - 1 ? this.currentFrame : this.currentFrame + 1;
            this.lastUpdateTime = now;

            for (let key in this.propertyAnimation) {
                if (this.propertyAnimation[key].length > 0) {
                    switch (key) {
                        case 'x':
                            this.sprite.x = this.propertyAnimation[key][this.currentFrame];
                            break;
                        case 'y':
                            this.sprite.y = this.propertyAnimation[key][this.currentFrame];
                            break;
                        case 'scale':
                            this.sprite._setScale(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'width':
                            this.sprite._setWidth(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'height':
                            this.sprite._setHeight(this.propertyAnimation[key][this.currentFrame]);
                            break;
                        case 'rotation':
                            this.sprite.rotation = this.propertyAnimation[key][this.currentFrame];
                            break;
                    }
                }
            }

        }
        this.sprite.drawRelativeCamera();
    }
}