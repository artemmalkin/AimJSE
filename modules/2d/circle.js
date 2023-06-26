class Circle {
    constructor(x, y, radius, fillColor, strokeColor, strokeWidth) {
        this.positionRelativeCanvas = { x: x, y: y };
        this.positionRelativeWorld = { x: x, y: y };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.scaledRadius = radius;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.scaledStrokeWidth = strokeWidth;

        this.recalculateScaledValues = () => {
            this.scaledRadius = this.radius * grid.scale;
            this.scaledStrokeWidth = this.strokeWidth * grid.scale;
        }
    }

    drawRelativeCanvas() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.positionRelativeCanvas.x, this.positionRelativeCanvas.y, this.radius, 0, 2 * Math.PI);
        canvas.ctx.fillStyle = this.fillColor;
        canvas.ctx.fill();
        canvas.ctx.strokeStyle = this.strokeColor;
        canvas.ctx.lineWidth = this.scaledStrokeWidth;
        canvas.ctx.stroke();
    }

    drawRelativeWorld() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.positionRelativeCanvas.x, this.positionRelativeCanvas.y, this.scaledRadius, 0, 2 * Math.PI);
        canvas.ctx.fillStyle = this.fillColor;
        canvas.ctx.fill();
        canvas.ctx.strokeStyle = this.strokeColor;
        canvas.ctx.lineWidth = this.scaledStrokeWidth;
        canvas.ctx.stroke();
    }
}
