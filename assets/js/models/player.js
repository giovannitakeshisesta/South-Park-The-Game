class Player {
  constructor(ctx) {
    this.ctx = ctx;
    
    // walkable area
    this.maxY = 450;
    this.minY = 220;

    // Player starting point
    this.x = 400;
    this.y = 370;

    //velocity steps
    this.vx = 0;
    this.vy = 0;
 
    this.speed = 3;

    // size of the sprite on the canvas
    this.width = 100;
    this.height = 100;

    // IMAGE AND FRAMES
    this.img = new Image();
    this.img.src = 'assets/imgs/CartKenny.png';
    this.img.isReady = false;

    this.img.onload = () => {this.img.isReady = true;};

    this.horizontalFrames = 8;
    this.verticalFrames = 16;

    this.xFrame = 0;
    this.yFrame = 0;

    this.tick = 0;

    this.falling = false;
    this.collisionGuest = false;

    // EVENT LISTENERS
    this.steady = false;
    this.runningRight = false;
    this.runningLeft = false;
    this.space = false;
    this.play = false;
    this.pause = false; ///check maybe is useless
  }


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

  
  animation(y,startX, endX){
    this.yFrame = y;  
    if (this.tick % 10 === 0) {
      this.xFrame += 1;
      if (this.xFrame >= endX || this.xFrame < startX) {
        this.xFrame = startX;
      }
    }
  }

  
  move() {
    this.x += this.vx;
    this.y += this.vy;

    // STAND STILL ANIMATION
    if (!this.runningRight && !this.runningLeft) {
      this.animation(0,0,4);
    } 
    
    // RUNNING ANIMATION
    if (this.runningRight) {
      this.animation(1,0,3);
    }
    if (this.runningLeft ) {
      this.animation(2,0,3);
    }

    //FALLING ANIMATION
    if (this.falling ) {
      this.animation(3,0,8);
    } 
  }

  onKeyDown(keyCode) {
    switch (keyCode){
      case LEFT_KEY :
        this.runningLeft = true;
        this.runningRight = false;
        this.vx = -this.speed;
        break;

      case RIGHT_KEY :
        this.runningRight = true;
        this.runningLeft = false;
        this.vx = this.speed;
        break;

      case TOP_KEY :
        this.vy = -this.speed  ;
        break;

      case DOWN_KEY :
        this.vy = this.speed;
        break;

      case SPACE :
        this.space = !this.space ;
        break;   

      case P_KEY :
        this.pause = !this.pause;
        break;     
    }
  }
  
  
  onKeyUp(keyCode) {
    if (keyCode === RIGHT_KEY || keyCode === LEFT_KEY) {
      this.vx = 0;
    }
    if (keyCode === TOP_KEY || keyCode === DOWN_KEY) {
      this.vy = 0;
    }
  }

}