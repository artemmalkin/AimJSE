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

    draw() {
        const now = Date.now();
        if (now - this.lastUpdateTime > this.frameDuration) {
            this.currentFrame = this.isLoop ? (this.currentFrame + 1) % this.framesCount : this.currentFrame === this.framesCount - 1 ? this.currentFrame : this.currentFrame + 1;
            this.lastUpdateTime = now;

            /*if (this.propertyAnimation.x.length > 0) {
                this.sprite.x = this.propertyAnimation.x[this.currentFrame];
            }
            if (this.propertyAnimation.y.length > 0) {
                this.sprite.y = this.propertyAnimation.y[this.currentFrame];
            }
            if (this.propertyAnimation.scale.length > 0) {
                this.sprite._setScale(this.propertyAnimation.scale[this.currentFrame])
            }
            if (this.propertyAnimation.width.length > 0) {
                this.sprite._setWidth(this.propertyAnimation.width[this.currentFrame])
            }
            if (this.propertyAnimation.height.length > 0) {
                this.sprite._setHeight(this.propertyAnimation.height[this.currentFrame])
            }*/

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
}