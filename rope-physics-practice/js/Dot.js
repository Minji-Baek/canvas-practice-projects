import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);
    
    this.gravity = new Vector(0, 1);
    this.friction = 0.97 //마찰력;

    this.pinned = false;

    this.mass = 1;
  }
  update(){
    if(this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldPos);//속도 //이전, 현재 위치를 통해 구해진 값
    this.oldPos.setXY(this.pos.x, this.pos.y);
    
    vel.mult(this.friction); //마찰력
    vel.add(this.gravity); // 현재 중력 표현
    // vel.y += 0.1; 중력값 예전 표현

    console.log(vel);
    this.pos.add(vel);

  }
  draw(ctx){
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10,0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

  }
}