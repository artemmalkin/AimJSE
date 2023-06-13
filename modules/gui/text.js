class _Text {
    constructor(x, y, textString, fontFamily, fontSize, fontColor, borderColor, borderWidth) {
        this.x = x;
        this.y = y;

        this.textString = textString;

        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontColor = fontColor;

        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }

    draw() {
        canvas.ctx.strokeStyle = this.borderColor;
        canvas.ctx.lineWidth = this.borderWidth;
        canvas.ctx.fillStyle = this.fontColor;
        canvas.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        canvas.ctx.fillText(this.textString, this.x, this.y);
        canvas.ctx.strokeText(this.textString, this.x, this.y);
    }
}