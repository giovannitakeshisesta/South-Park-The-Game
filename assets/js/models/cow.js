class Cow {
  constructor(ctx,x,y,w,h,img,name,yFrame) {
    this.ctx = ctx;
    
    this.name = name;
    // Player starting point
    this.x = x;
    this.y = y;

    // size of the player
    this.width = w;
    this.height = h;

    this.img = new Image();
    this.img.src = img;
    this.img.isReady = false;

    this.img.onload = () => {
      this.img.isReady = true;
    };


    // sprites image definition 
    this.horizontalFrames = 2;
    this.verticalFrames = 5;

    // counters to navigate in the image
    this.xFrame = 0;
    this.yFrame = yFrame;
    this.tick = 0;
     
    // random start up or down
    this.vy = 1;

    this.ImGoing2Die = false; 
  }


  // sintax: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  draw() {
    this.ctx.drawImage(
      this.img,                                                 // the image 
      (this.img.width * this.xFrame) / this.horizontalFrames,   // the x of the frame in the image
      (this.img.height * this.yFrame) / this.verticalFrames,    // the y of the frame in the image
      this.img.width / this.horizontalFrames,                   // the width of each frame 
      this.img.height / this.verticalFrames,                    // the height of each frame 
      this.x,                                                   // the x-axis coordinate in the destination canvas 
      this.y,                                                   // the y-axis coordinate in the destination canvas 
      this.width,                                               // allows scaling of the drawn image
      this.height                                               // allows scaling of the drawn image
    );

    this.tick++;
  }
  

  // every 10 tiks, show the following frame, if is the last frame, start again.
  animation(){
    if (this.tick % 10 === 0) {
      this.xFrame++;

      if (this.xFrame >= this.horizontalFrames ) {
        this.xFrame = 0;
      }
    }
  }
  

  move() {
  this.animation();
    this.x += 1.5;
    this.y += this.vy;
    if (this.y === 330 || this.y === 350 ) {
      this.vy *= (Math.random() < 0.7 ? -1 : 1); // random direction
    }
    if (this.y > 450|| this.y  < 230) {  // bounce on top or bottom
      this.vy *= -1;
    }
  }
}