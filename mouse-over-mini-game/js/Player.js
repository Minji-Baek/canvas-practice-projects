
import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
export default class Player {
  constructor(){
    this.img = document.querySelector('#blue-bird-img');
    // this.img = document.querySelector('#bird-img');

    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 130;
    this.height = this.width * (33 / 32);
    // this.height = this.width * (96/140);
    this.frameX = 0; // 몇번째 IMG
    this.counter = 0;

    this.vy = -10; //속도
    this.gravity = 0.2;
    App.canvas.addEventListener("click", ()=> {
      this.vy += -4;
    });

    this.boundingBox = new BoundingBox(this.x + 1, this.y + 20, this.width - 9, this.height - 26 ); // 해당 상수는 img siz가 딱 그림에 맞지 않기 때문에 bound 조절 

  }

  update(){
    // this.frameX += 1;
    // if(this.frameX === 15) this.frameX = 0;

    this.counter += 1
    if(this.counter % 2 === 0)
      this.frameX = ++this.frameX % 9;

    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 20;

  }
  draw(){
    App.ctx.drawImage(
      this.img,
      // this.img.width/15, 0, this.img.width / 15, this.img.height,
      this.img.width / 9 * this.frameX, 0, this.img.width / 9, this.img.height,
      this.x, this.y, this.width, this.height
    );
    this.boundingBox.draw();
  }
}