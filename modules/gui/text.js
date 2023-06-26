class _Text {
    constructor(x, y, text, fontFamily, fontSize, fontColor, borderColor, borderWidth) {
        this.x = x;
        this.y = y;

        this.text = text;

        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontColor = fontColor;

        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }

    drawRelativeCanvas() {
        canvas.ctx.strokeStyle = this.borderColor;
        canvas.ctx.lineWidth = this.borderWidth;
        canvas.ctx.fillStyle = this.fontColor;
        canvas.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        canvas.ctx.fillText(this.text, this.x, this.y);
        canvas.ctx.strokeText(this.text, this.x, this.y);
    }
}