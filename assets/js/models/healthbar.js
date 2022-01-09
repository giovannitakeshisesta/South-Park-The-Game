class HealthBar{
    constructor(x,y,w,h,maxHealth,color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.maxHealth = maxHealth;
        this.maxWidth = w;
        this.health = maxHealth;
    }

    draw(){
        this.ctx.save();
        this.ctx.lineWidth = 5;
        this.ctx.strokestyle = "#333";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.strokeRect(this.x, this.y, this.maxWidth, this.h);
        this.ctx.restore();
    }
}