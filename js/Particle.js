import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption{
  constructor(x,y, vx, vy, opacity, colorDeg){
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.colorDeg = colorDeg
    this.gravity = 0.12;
    this.friction = 0.95; //속도 조절, 점점 0에 수렴
  }
  update(){
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.008;
  }
  draw(){
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}