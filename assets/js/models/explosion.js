class Explosion {
  constructor(ctx) {
    this.ctx = ctx;

    // guest starting point
    this.x = 0; 
    this.y = 0; 
  
    // size of the explosion
    this.width = 90;
    this.height = 90;

    this.img = new Image();
    this.img.isReady = false;
    this.img.src = 'assets/imgs/explosion.png';
    this.img.onload = () => this.img.isReady = true;


    // sprites sheet rows and columns
    this.horizontalFrames = 5;
    this.verticalFrames = 2;

    // counters to navigate in the image
    this.xFrame = 0;
    this.yFrame = 0;
    this.tick = 0;
      
    this.speed = -0.5;  
    this.isExploding = false;
  }

  // sintax: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  draw() {
      this.ctx.drawImage(
          this.img,                                                 
          (this.img.width * this.xFrame) / this.horizontalFrames,   
          (this.img.height * this.yFrame) / this.verticalFrames,    
          this.img.width / this.horizontalFrames,                   
          this.img.height / this.verticalFrames,                 
          this.x,                                                 
          this.y,                                                  
          this.width,                                        
          this.height                                         
      );
  
      this.tick++;
  }
  
  move() {
    this.animation();
    this.x += this.speed;
  }

  animation(){
    if (this.tick % 10 === 0) {
        this.xFrame++;
  
        if (this.xFrame >= this.horizontalFrames ) {
          this.xFrame = 0;
        }
    }
  }
}