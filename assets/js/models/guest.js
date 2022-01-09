class Guest {
  constructor(ctx,x,y,w,h,img,yFrame,horizontalFrames,verticalFrames,name) {
    this.ctx = ctx;

    this.name = name;
    // guest starting point
    this.x = x; 
    this.y = y; 
  
    // size of the guest
    this.width = w;
    this.height = h;

    this.img = new Image();
    this.img.src = img;
    this.img.isReady = false;
    this.img.onload = () => {this.img.isReady = true;};

    
    // sprites sheet rows and columns
    this.horizontalFrames = horizontalFrames;
    this.verticalFrames = verticalFrames;


    // counters to navigate in the image
    this.xFrame = 0;
    this.yFrame = yFrame;
    this.tick = 0;
     
    this.speed = -1;

    this.collision = false;
    this.AmIGrabbed = false;
    this.amIreleased = false;
  }


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