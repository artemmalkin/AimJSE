class Button {
    constructor(x, y, width, height, sprite, text, action) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sprite = sprite;
        this.text = text;

        this.action = action;
    }

    draw() {
        this.sprite.draw();
        this.text.draw();
    }
}