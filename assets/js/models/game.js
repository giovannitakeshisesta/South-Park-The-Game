class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.background = [ // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, speed);
                        this.backClass2 = new BackClass(ctx, 10, 180, 10, 10, 0, 310, 1000, 50, 0 ),
                        this.backClass6 = new BackClass(ctx, 10,10, 10, 10, 0, 0, 1000, 50, 0 ),
                        this.backClass5 = new BackClass(ctx, 0, 5, 520, 36, 0, 50, 1000, 110, -0.5 ),
                        this.backClass4 = new BackClass(ctx, 0, 41, 900, 36, 0, 134, 2000, 180, -1 ),
                        this.backClass3 = new BackClass(ctx, 0, 80, 900, 113, 0, 90, 2000, 240, -2.5 ),
                        this.backClass1 = new BackClass(ctx, 0, 193, 652.4, 140, 0, 355, 1000, 210, -3 )];
    
    this.player = new Player(ctx);
    
    this.cowArr = [
                        new Cow(ctx,10, 420, 200,100,'assets/imgs/allCowsps.png',"cow1",0),
                        new Cow(ctx,-100, 240, 200,100,'assets/imgs/allCowsps.png', "cow2",1),
                        new Cow(ctx,-600, 300, 200,100,'assets/imgs/allCowsps.png', "cow3",2)
    ];

    this.guests = [            //(ctx,x,y,w,h,img,yFrame,horizontalFrames,verticalFrames,name)               
                        new Guest(ctx,5400,220,130,130,'assets/imgs/tallchar.png',4,2,13.05,"mariachi4"),
                        new Guest(ctx,5300,220,130,130,'assets/imgs/tallchar.png',3,2,13.05,"mariachi3"),
                        new Guest(ctx,5200,220,130,130,'assets/imgs/tallchar.png',2,2,13.05,"mariachi2"),
                        new Guest(ctx,5100,220,130,130,'assets/imgs/tallchar.png',1,2,13.05,"mariachi1"),
                        new Guest(ctx,4600,220,90,90,'assets/imgs/smallchar.png',8,2,17,"timmy"),
                        new Guest(ctx,4200,250,130,130,'assets/imgs/tallchar.png',9,2,13.05,"towel"),
                        new Guest(ctx,4000,220,90,90,'assets/imgs/smallchar.png',11,2,17,"taco"),
                        new Guest(ctx,3800,220,90,90,'assets/imgs/smallchar.png',7,2,17,"Kyle5"),
                        new Guest(ctx,3600,220,130,130,'assets/imgs/tallchar.png',0,2,13.05,"busSign"),
                        new Guest(ctx,3450,220,90,90,'assets/imgs/smallchar.png',9,2,17,"Kyle5"),
                        new Guest(ctx,3300,220,90,90,'assets/imgs/smallchar.png',6,2,17,"jimmy"),
                        new Guest(ctx,3000,220,90,90,'assets/imgs/smallchar.png',5,2,17,"token"),
                        new Guest(ctx,2800,250,130,130,'assets/imgs/tallchar.png',6,2,13.05,"chef"),
                        new Guest(ctx,2500,220,90,90,'assets/imgs/smallchar.png',4,2,17,"butters"),                        
                        new Guest(ctx,2300,250,130,130,'assets/imgs/tallchar.png',5,2,13.05,"fireman"),
                        new Guest(ctx,2200,220,130,130,'assets/imgs/tallchar.png',11,2,13.05,"mother"), 
                        new Guest(ctx,1900,250,90,90,'assets/imgs/smallchar.png',3,2,17,",stan"),
                        new Guest(ctx,1700,220,90,90,'assets/imgs/smallchar.png',2,2,17,"Kyle"),
                        new Guest(ctx,1500,400,130,130,'assets/imgs/tallchar.png',8,2,13.05,"soldier2"),
                        new Guest(ctx,1300,210,130,130,'assets/imgs/tallchar.png',7,2,13.05,"soldier1"),
                        new Guest(ctx,1100,220,130,130,'assets/imgs/tallchar.png',12,2,13.05,"randy"),
                        new Guest(ctx,950,230,90,90,'assets/imgs/smallchar.png',12,1,17,"sign"),
                        new Guest(ctx,700,210,130,130,'assets/imgs/tallchar.png',10,2,13.05,"jesus"),
                        new Guest(ctx,500,240,90,90,'assets/imgs/smallchar.png',16,2,17.01,"cheer"),
                        new Guest(ctx,400,220,90,90,'assets/imgs/smallchar.png',15,2,17.02,"cheer"),
                        new Guest(ctx,300,230,90,90,'assets/imgs/smallchar.png',14,2,17.02,"cheer"),
                        new Guest(ctx,200,220,90,90,'assets/imgs/smallchar.png',13,2,17.02,"cheer"),
                        new Guest(ctx,400,1450,90,90,'assets/imgs/smallchar.png',10,2,17,"goat")];

    this.explosion = new Explosion(ctx);
    this.kennyArr = [];
    this.poopArr = [];
    
    this.intervalId = undefined;

    // counters
    this.counter = 0;
    this.explCounter = 0;
    this.timerCowDisappear = 0;
    this.counterFalling = 0;
    this.counterGenerateCow = 0;
    this.counterGenerateKenny = 0;
    this.counterGeneratePoop = 0;
    this.counterDead = 0;

    this.HP = 100;
    
    this.finish = new FinishLine(ctx);
    this.finishYards = 70;   // setting finish line
    this.afterFinish = false;

    // sounds
    this.theme = new Audio('assets/sounds/Theme.mp3');
    this.theme.volume = 0.7;
    this.moo = new Audio('assets/sounds/cowMoo.mp3');
    this.kenWohoho = new Audio('assets/sounds/KenWohoohoo.mp3');
    this.kenWohoho.volume = 0.5;
    this.kenHelp = new Audio("assets/sounds/KenHelp.mp3");
    this.cartMotherF = new Audio("assets/sounds/cartMotherF.mp3");
    this.oMgTheyKill = new Audio("assets/sounds/theyKilledKenny.mp3");
    this.cartWin = new Audio("assets/sounds/cartYeah.mp3");
    this.cartGetOut = new Audio("assets/sounds/cartGetOutOfHere.mp3");
    this.splat = new Audio("assets/sounds/splat.mp3");
    this.splat.volume = 0.5;

  }


  // --------------------------------------------     START     --------------------------------------------
  start() {
    if (!this.intervalId) {

      this.intervalId = setInterval(() => {
        
        if (this.player.pause){this.theme.pause()};

        if (!this.player.pause){
          this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          this.theme.play(); 
          
          // various functions
          this.stayInTheCanvas();
          this.generateKenny();
          this.generatePoop();
          this.generateCow();
          this.CollissionPlayerCow();
          this.CollissionPlayerGuest();
          this.CollissionPlayerKenny();
          this.CollissionKennyCow();
          this.CollissionPlayerPoop();
          this.throwGuest();
          this.releaseGuest();
          this.removeFromArrays();
        
          // move
          this.background.forEach(e => {e.move()});
          this.player.move();
          this.guests.forEach(e => e.move());
          this.cowArr.forEach(e => e.move())
          this.kennyArr.forEach(e => e.move());
          this.poopArr.forEach(e => e.move());


          // draw        
          this.background.forEach(e => {e.draw()});
          this.poopArr.forEach(e => e.draw());
          this.guests.forEach(e => e.draw());
          this.cowArr.forEach(e => e.draw());
          this.exp();
          this.kennyArr.forEach(e => e.draw());
          this.player.draw();

          if (this.counter/60 > this.finishYards - 4){this.finish.draw(); this.finish.move()}
          
          this.drawDistance();
          this.drawHP();
          this.counter++;
          this.finishGame();
          }       
      }, 1000 / 60);
    }
  }


  //  --------------------------------------------     KENNY     --------------------------------------------
  CollissionPlayerKenny() {
    this.kennyArr.forEach(e => {
      const condition = this.collides(this.player,e);   
      if (!e.AmIGrabbed && condition && this.player.space && !this.guests.some(e => e.AmIGrabbed)){
        
        e.AmIGrabbed = true;
      }
    
      if (e.AmIGrabbed && this.player.space) { 
        e.x = this.player.x -10;
        e.y = this.player.y -50;
      }

      if (e.AmIGrabbed && !this.player.space) { 
        e.AmIGrabbed = false;
      }
    });
  }  


  generateKenny(){
    this.counterGenerateKenny++;

    let minY = 230;
    let maxY = 450;
    let startY = Math.floor(Math.random() * (maxY - minY) + minY); 

    if (this.counterGenerateKenny > 600 && this.kennyArr.length === 0 && !this.afterFinish){
      this.kennyArr.push(new Kenny(ctx,startY));
      this.kenWohoho.play();
      this.counterGenerateKenny = 0;
    }
  }


    //  --------------------------------------------     POOP     --------------------------------------------
  generatePoop(){
    this.counterGeneratePoop++;

    let minY = 250;
    let maxY = 450;
    let startY = Math.floor(Math.random() * (maxY - minY) + minY); 

    if (this.counterGeneratePoop > 300 && !this.afterFinish){
      this.poopArr.push(new Poop(ctx,startY));
      this.counterGeneratePoop = 0;
    }
  }

  CollissionPlayerPoop() {
    this.poopArr.forEach(e => {
      const condition = this.collides(this.player,e);   
      if (condition && !this.afterFinish){
        this.splat.play();
        this.HP -= 0.1;
      }
    });
  }  
  

  //  --------------------------------------------     GUESTS     --------------------------------------------
  collides(element_1,element_2) {  // left right top bottom
    if (
      element_1.x < element_2.x  + element_2.width  &&    
      element_1.x + element_1.width > element_2.x   &&      
      element_1.y < element_2.y + element_2.height   &&   
      element_1.y + element_1.height > element_2.y ) 
      {
      return true;
      }
    return false;
  }


  // if the player IS NOT holding a guest,
  // if the player touch a guest,  if press Space, the player grab the guest ,guest.AmIGrabbed = true 
  CollissionPlayerGuest() {
    
    if (this.guests.filter(e => e.AmIGrabbed === true).length === 0){
      this.guests.forEach(guest => { 
        const condition = this.collides(this.player,guest);  
        if (condition && this.player.space && (this.kennyArr.length === 0 || this.kennyArr.some(e => !e.AmIGrabbed)) ) {  
          guest.AmIGrabbed = true;
        } 
      });
    }
    // if the player IS grabbing a guest, 
    // find the guest in the array, and while "space = true" , keep grabbing it
    if (this.guests.filter(e => e.AmIGrabbed === true).length === 1){
      this.guests.forEach(guest => { 
        if (guest.AmIGrabbed && this.player.space) { 
          guest.x = this.player.x -10;
          guest.y = this.player.y -50;
        }
      });
    }
  }  


  // if the player is grabbing a guest, it means that "space = true"
  // if "space" is pressed again, change to false
  // if there are cows in the canvas: the guest is thrown to the cow first element of the array
  // else , release the guest
  throwGuest(){
    this.guests.forEach(e => {
      if (e.AmIGrabbed && !this.player.space && !e.amIreleased){
        e.amIreleased = true;
      }
    } );
  }

  releaseGuest(){
    this.guests.forEach(e => {

      if (e.amIreleased){
        e.AmIGrabbed = false;
        let cowInCanvas = this.cowArr.filter(cow => (cow.x > -50 && cow.x < 850));

        if(cowInCanvas.length > 0){
          cowInCanvas[0].ImGoing2Die = true;
          if (cowInCanvas[0].x < e.x) e.x -= 10;
          if (cowInCanvas[0].x > e.x) e.x += 10;
          if (cowInCanvas[0].y  > e.y) e.y += 5;
          if (cowInCanvas[0].y  < e.y) e.y -= 5;

          // when the guest collides with the cow: remove the guest from the array, start the explosion.
          if (this.collides(cowInCanvas[0],e)){
            this.guests = this.guests.filter(e => !e.amIreleased);
            this.explosion.isExploding = true;
          }
        } 
        else {
          e.AmIGrabbed = false;
          e.amIreleased = false;
        }
      }
    });
  }


  exp(){
    if (this.explosion.isExploding){
      this.cowArr.forEach(e => {
        if (e.ImGoing2Die){
          this.moo.play();
          this.explosion.x = e.x + 70;
          this.explosion.y = e.y;
          this.explosion.draw();
          this.explosion.move();
          // how long the explosion last + remove the cow from the array
          this.explCounter++;
          if (this.explCounter > 60){
            this.explosion.isExploding = false;
            this.explCounter = 0;
            this.cowArr= this.cowArr.filter(e => !e.ImGoing2Die);
          }
        }
      });
    }
  }


  //  --------------------------------------------    COWS   --------------------------------------------
  generateCow(){
    this.counterGenerateCow++;

    let min = 230;
    let max = 450;
    let startY = Math.floor(Math.random() * (max - min) + min); 

    let cowNumber = Math.floor(Math.random() * 3);

    if (this.counterGenerateCow > 250){
      this.cowArr.push(new Cow(ctx,-200, startY, 200,100,'assets/imgs/allCowsps.png', "cow2",cowNumber));
      this.counterGenerateCow = 0;
    }
  }
  
  
  collidesWithCows(player,obstacle) {
    if (  // left - right - top - bottom of the player
      player.x < obstacle.x  + obstacle.width -20 &&    
      player.x + player.width > obstacle.x  &&      
      player.y < obstacle.y + obstacle.height -30 &&   
      player.y + player.height > obstacle.y   +50      
    ) {
      return true;
    }
    return false;
  }


  CollissionPlayerCow() {
    if(!this.player.falling){
      this.cowArr.forEach(e => {
        const condition = this.collidesWithCows(this.player,e);
        if (condition && !this.afterFinish) {
          this.HP -= 5;
          this.player.falling = true;
          this.cartGetOut.play();
        } 
      });
    }

    if(this.player.falling){
      this.player.x +=10;
      this.counterFalling++;

      if (this.counterFalling > 20){
        this.player.falling = false;
        this.counterFalling = 0;
      }
    }
    
  }

  CollissionKennyCow() {
    this.kennyArr.forEach(kenny => {
      if (kenny.x < 800 && !this.afterFinish){

        this.cowArr.forEach(e => {
          if (this.collidesWithCows(kenny,e)) {
            this.kenWohoho.pause();
            this.kenHelp.play();
            kenny.x += 100; 
            this.afterFinish = true;
            kenny.dead = true; 
          } 
        });
      }
    });
  }

  
  //  --------------------------------------------    END GAME   --------------------------------------------
  
  finishGame(){
    // if the player pass the finish line: congratulations message -> after few yards stop the game
    if (this.player.x > this.finish.x +100 ){
      this.congratulations();
      if (Math.round(this.counter/60) > this.finishYards+7){
        clearInterval(this.intervalId);
      }
    }  

    // if kenny dies or the HP=0 : wait a little -> stop the game -> game over message
    if ((this.afterFinish && this.player.x < this.finish.x ) || this.HP <= 0 ){
      
      this.counterDead++;
      if(this.counterDead > 30){
        this.oMgTheyKill.play();
      }
      if(this.counterDead > 190){
        this.kenWohoho.pause()
        this.theme.pause();
        
        clearInterval(this.intervalId);
        this.gameOver();
      }
    }

    // if HP = 0
    if (this.HP <= 0 ){
      
      this.counterDead++;
      if(this.counterDead > 0){
        this.theme.pause();
        
        clearInterval(this.intervalId);
        this.gameOver();
      }
    }
    
  }

  congratulations() {
    this.afterFinish = true;
    this.cartWin.play();

    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.fillText('Congratulations!', this.ctx.canvas.width / 2, 180);
    this.ctx.restore();

    // show the "try again btn"
    const event = new CustomEvent('reload');
    document.dispatchEvent(event);
  }
  
  
  gameOver() {
    this.cartMotherF.play();

    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.font = 'bold 32px sans-serif';
    this.ctx.fillText('Game Over!', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.restore();

    // show the "try again btn"
    const event = new CustomEvent('reload');
    document.dispatchEvent(event);
  }


  //  --------------------------------------------    TOP BAR   --------------------------------------------
  drawDistance() {
    let remaningYards = this.finishYards - Math.round(this.counter/60);
    if (remaningYards <= 0){remaningYards = 0};
    // image
    this.distanceImg = new Image();
    this.distanceImg.src = 'assets/imgs/distance.png';
    this.ctx.drawImage(this.distanceImg,30,10,100,45);

    this.ctx.save();
      // border rectangle
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = 'black';
      this.ctx.strokeRect(140,10,100,35);
      // inner rectangle
      this.ctx.fillStyle = '#a90707';
      this.ctx.fillRect(140,10,100,35);
      // text
      this.ctx.fillStyle = '#be9003';
      this.ctx.font = ' bold 24px Comic Sans MS';
      this.ctx.fillText(`${remaningYards}`, 150, 37);
      this.ctx.font = ' bold 20px Comic Sans MS';
      this.ctx.fillText(` Yds`, 190, 37);
    this.ctx.restore();
  }


  drawHP(){
    if (this.HP <= 0){this.HP = 0};
    let maxValue = 100;
    let maxWidth = 200;
    let value = (this.HP/maxValue) * maxWidth;

    this.ctx.save();
      if (this.HP > 60){ this.ctx.fillStyle = "green";}
      if (this.HP <= 60){ this.ctx.fillStyle = "yellow";}
      if (this.HP <= 40){this.ctx.fillStyle = "red";}
      this.ctx.fillRect(650, 8 , value ,35);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(650, 8 , maxWidth ,35);

      this.ctx.fillStyle = 'black';
      this.ctx.font = ' bold 24px sans-serif';
      this.ctx.fillText(`${Math.round(this.HP)}%`, 730, 35);
    this.ctx.restore(); 
  }
  

  stayInTheCanvas(){ // left right top bottom
    if (this.player.x <= 0 ) this.player.x = 0; 
    if (this.player.x + this.player.width >= this.ctx.canvas.width) this.player.x = this.ctx.canvas.width - this.player.width;
    if (this.player.y <= this.player.minY)  this.player.y = this.player.minY;
    if (this.player.y >= this.player.maxY)  this.player.y = this.player.maxY;
  }


  // remove the elements from the arrays when out of the canvas
  removeFromArrays(){
    this.guests = this.guests.filter(e => e.x > -60);
    this.kennyArr = this.kennyArr.filter(e => e.x > -60);
    this.poopArr = this.poopArr.filter(e => e.x > -60);
  }
  

  onKeyDown(keyCode) {
    this.player.onKeyDown(keyCode);
  }

  onKeyUp(keyCode) {
    this.player.onKeyUp(keyCode);
  }
}

