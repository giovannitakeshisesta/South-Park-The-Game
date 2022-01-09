class Poop {
  constructor(ctx,y) {
    this.ctx = ctx;
    
    this.x = 900;
    this.y = y;

    this.width = 40;
    this.height = 40;

    // IMAGE AND FRAMES
    this.img = new Image();
    this.img.src = 'assets/imgs/poop.png';
    this.img.isReady = false;
    this.img.onload = () => {this.img.isReady = true;};
  }

  draw() {
    this.ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
  }

  move() {
    this.x -= 2;
  }
}
