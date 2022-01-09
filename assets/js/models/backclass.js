
class BackClass{ // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, speed);
  constructor(ctx,sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, speed) {
    this.ctx = ctx;

    this.img = new Image()
    this.img.src = "assets/imgs/mountainsPS.png";
    this.img.isReady = false;

    this.img.onload = () => {
      this.img.isReady = true;
    };

    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;

    this.dx = dx;
    this.dy = dy;
    this.dWidth = dWidth;
    this.dHeight = dHeight;

    this.speed = speed;
  }

  draw() {
    if (this.img.isReady) {
      this.ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        this.sWidth,
        this.sHeight,

        this.dx,
        this.dy,
        this.dWidth +20,
        this.dHeight
      );
      this.ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        this.sWidth,
        this.sHeight,

        this.dx + this.dWidth ,
        this.dy,
        this.dWidth + 20 ,
        this.dHeight
      );
    }
  }
  
  move() {
    this.dx += this.speed;
    if (this.dx + this.dWidth  <= 0) {
      this.dx = 0;
    }
  }
}

