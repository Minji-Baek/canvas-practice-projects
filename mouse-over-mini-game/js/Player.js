
import App from "./App.js";
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
  }

  update(){
    // this.frameX += 1;
    // if(this.frameX === 15) this.frameX = 0;

    this.counter += 1
    if(this.counter % 2 === 0)
      this.frameX = ++this.frameX % 9;
  }
  draw(){
    App.ctx.drawImage(
      this.img,
      // this.img.width/15, 0, this.img.width / 15, this.img.height,
      this.img.width / 9 * this.frameX, 0, this.img.width / 9, this.img.height,
      this.x, this.y, this.width, this.height
    )
  }
}