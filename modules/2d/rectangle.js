class Rectangle {
    constructor(width, height, color, border, borderColor, x, y, opacity = 1) {
        this.width = width;
        this.height = height;

        this.x = x;
        this.y = y;

        this.color = color;
        this.border = border;
        this.borderColor = borderColor;
        this.opacity = opacity;
    }

    drawRelativeCanvas() {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.strokeStyle = this.borderColor;
        canvas.ctx.lineWidth = this.border;
        canvas.ctx.globalAlpha = this.opacity;
        canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.border !== 0) {
            canvas.ctx.strokeRect(x, y, this.width, this.height);
        }
        canvas.ctx.globalAlpha = 1;
    }

    drawRelativeWorld() {
        const x = this.x * canvas.camera.zoom - canvas.camera.position.x;
        const y = this.y * canvas.camera.zoom - canvas.camera.position.y;
        const width = this.width * canvas.camera.zoom;
        const height = this.height * canvas.camera.zoom;

        canvas.ctx.fillStyle = this.color;
        canvas.ctx.strokeStyle = this.borderColor;
        canvas.ctx.lineWidth = this.border;
        canvas.ctx.globalAlpha = this.opacity;
        canvas.ctx.fillRect(x, y, width, height);
        if (this.border !== 0) {
            canvas.ctx.strokeRect(x, y, width, height);
        }
        canvas.ctx.globalAlpha = 1;
    }
}