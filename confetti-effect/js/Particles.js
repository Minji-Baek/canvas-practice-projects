import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0){
    this.angle = Math.PI / 180 * randomNumBetween(deg - 30, deg + 30); // deg 중심 부채꼴 뿌리기 특정 각도 지정

    this.x = x;
    this.y = y;
    this.r = randomNumBetween(30, 100);

     
    this.vx = this.r * Math.cos(this.angle); // 가중치?이동값? 더하기
    this.vy = this.r * Math.sin(this.angle); // 가중치 더하기

    // this.friction = randomNumBetween(0.95, 0.97); //마찰력 곱
    this.friction =  0.9; //마찰력 곱

    this.gravity = 0.5; //중력 더하기
    
    this.width = 30;
    this.height = 30;
  }
  update(){
    this.vy += this.gravity;

    this.vy *= this.friction;
    this.xy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }
  draw(ctx){
    ctx.fillStyle = `red`
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}