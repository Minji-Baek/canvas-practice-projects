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
  update(mouse){
    if(this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldPos);//속도 //이전, 현재 위치를 통해 구해진 값
    this.oldPos.setXY(this.pos.x, this.pos.y);
    
    vel.mult(this.friction); //마찰력
    vel.add(this.gravity); // 현재 중력 표현
    // vel.y += 0.1; 중력값 예전 표현


    //mouse 공 event
    // 힘(force)공식 원의 중심 = 1, 원의 밖 = 0 ::::: 1-(dist/radius)

    let { x: dx, y: dy} = Vector.sub(mouse.pos, this.pos);

    const dist = Math.sqrt(dx*dx + dy*dy); //거리

    // if(dist > mouse.radius) return ;

    const direction = new Vector(dx / dist, dy / dist); //방향Vector
    const force = Math.max((mouse.radius - dist) / mouse.radius, 0); //힘 //0보다 작으면 계속 0

    if(force > 0.8) this.pos.setXY(mouse.pos.x, mouse.pos.y)

    else {
      this.pos.add(vel); // stick 업데이트 하고 pos 옮겨졌을 수 있으니 

      this.pos.add(direction.mult(force).mult(5));}


  }
  draw(ctx){
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10,0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

  }
}