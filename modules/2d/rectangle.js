class Rectangle {
    constructor(canvas, width, height, color, border, borderColor, x, y, opacity = 1) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.color = color;
        this.border = border;
        this.borderColor = borderColor;
        this.opacity = opacity;
    }

    draw() {
        this.canvas.ctx.fillStyle = this.color;
        this.canvas.ctx.strokeStyle = this.borderColor;
        this.canvas.ctx.lineWidth = this.border;
        this.canvas.ctx.globalAlpha = this.opacity;
        this.canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.border !== 0) {
            this.canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.canvas.ctx.globalAlpha = 1;
    }
}