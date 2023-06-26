class Button {
    constructor(x, y, width, height, sprite, text, action) {
        this.x = x;
        this.y = y;

        this.deltaPos = {
            sprite: { x: sprite.x - this.x, y: sprite.y - this.y },
            text: { x: text.x - this.x, y: text.y - this.y }
        }

        this.width = width;
        this.height = height;

        this.sprite = sprite;
        this.text = text;

        this.action = action;
    }

    transformPosition(x, y) {
        this.x += x;
        this.y += y;
        this.sprite.x = (this.x + this.deltaPos.sprite.x);
        this.sprite.y = (this.y + this.deltaPos.sprite.y);
        this.text.x = (this.x + this.deltaPos.text.x);
        this.text.y = (this.y + this.deltaPos.text.y);
    }

    drawRelativeCanvas() {
        this.sprite.drawRelativeCanvas();
        this.text.drawRelativeCanvas();
    }
}