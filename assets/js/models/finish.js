
class FinishLine{ 
  constructor(ctx) {
    this.ctx = ctx;

    this.img = new Image()
    this.img.src = "assets/imgs/finishLin.png";
    this.img.isReady = false;

    this.img.onload = () => {
      this.img.isReady = true;
    };

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 110;
    this.sHeight = 200;

    this.x = 900;
    this.dy = 140;
    this.dWidth = 118*2;
    this.dHeight = 200*2;

    this.speed = -1;
  }

  draw() {
    if (this.img.isReady) {
      this.ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        this.sWidth,
        this.sHeight,

        this.x,
        this.dy,
        this.dWidth,
        this.dHeight
      );
    }
  }

  move() {
    this.x += this.speed;
  }
}


