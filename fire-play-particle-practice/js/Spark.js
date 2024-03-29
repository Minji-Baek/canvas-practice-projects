import CanvasOption from "./CanvasOption.js";

export default class Spark extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg){
    super();
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.vx = vx;
    this.opacity = opacity;
    this.colorDeg = colorDeg;
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.02; 
  }
  draw(){
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100% , 65% , ${this.opacity})`
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}