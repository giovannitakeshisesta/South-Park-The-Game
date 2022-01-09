class Kenny {
  constructor(ctx,y) {
    this.ctx = ctx;
    
    // walkable area
    this.maxY = 450;
    this.minY = 220;

    // Kenny starting point
    this.x = 800;
    this.y = y;

    //velocity steps
    this.vx = 0;
    this.vy = (Math.random() < 0.5 ? -1 : 1);
 

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

    // EVENT LISTENERS
    this.steady = false;
    this.runningRight = false;
    this.runningLeft = false;
    this.falling = false;

    this.counter = 0;
    this.AmIGrabbed = false;
    this.dead = false;
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
    if (this.dead ) {   
      this.animation(10,0,2);  
      this.x -= 2;
    } else {
      // change  random direction when touching the center of the street
      if (this.y === 330 || this.y === 350 ) {
        this.vy *= (Math.random() < 0.5 ? -1 : 1);
      }
      // change direction when touching the borders
      if (this.y > 450 || this.y  < 230) {
        this.vy *= -1;
      }
      
      // walk up or down few steps then...
      if (!this.runningLeft) {
        this.counter++;
        this.animation(7,0,6);

        this.x += 0;
        this.y += this.vy; 
        
        if (this.counter > 20){
          this.runningLeft = true;
          this.counter = 0;
        }
      } 
      // move left few steps.
      if (this.runningLeft) {
        this.counter++;
        this.animation(8,0,6);

        this.x += -2;
        this.y += this.vy;

        if (this.counter > 100){
          this.runningLeft = false;
          this.counter = 0;
        }
      }
    }
    
    if (this.y < 200){
      this.x -= 4;
    } 
  }
}