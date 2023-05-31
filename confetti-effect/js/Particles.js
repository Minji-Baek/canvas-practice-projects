import { hexToRgb, randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0, colors, shapes, spread = 30 ){
    this.angle = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread); // deg 중심 부채꼴 뿌리기 특정 각도 지정

    this.x = x * innerWidth;
    this.y = y * innerHeight;
    this.r = randomNumBetween(30, 100);

     
    this.vx = this.r * Math.cos(this.angle); // 가중치?이동값? 더하기
    this.vy = this.r * Math.sin(this.angle); // 가중치 더하기

    // this.friction = randomNumBetween(0.95, 0.97); //마찰력 곱
    this.friction =  0.89; //마찰력 곱

    this.gravity = 0.5; //중력 더하기
    
    this.width = 12;
    this.height = 12;

    this.widthDel = randomNumBetween(0, 360);
    this.heightDel =  randomNumBetween(0, 360);

    this.rotaion = randomNumBetween(0, 360); //로테이션 값
    this.rotationDel = randomNumBetween(-1, 1); //로테이션 값의 증가 값
    this.opacity = 1;

    this.colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0']; // 초기 color 배열값
    this.color = hexToRgb(
      this.colors[
        Math.floor(randomNumBetween(0, this.colors.length)) //colors 배열에서 랜덤
        ]
    );

    this.shapes = shapes || ['square', 'circle'];
    this.shape = this.shapes[
      Math.floor(randomNumBetween(0, this.shapes.length)) //shapes 배열에서 랜덤
      ]
  }
  update(){
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.005;

    this.widthDel += 2;
    this.heightDel += 2;
    this.rotaion += this.rotationDel; 
  }
  drawSquare(ctx){
    ctx.fillRect(
      this.x, 
      this.y, 
      this.width * Math.cos( Math.PI / 180 * this.widthDel), 
      this.height * Math.sin(Math.PI / 180 * this.heightDel)
    );
  }
  drawCircle(ctx){
    ctx.beginPath();
    ctx.ellipse(
      this.x, 
      this.y,  
      Math.abs(this.width * Math.cos( Math.PI / 180 * this.widthDel)) / 2, //양수를 위해 Math.abs
      Math.abs(this.height * Math.sin(Math.PI / 180 * this.heightDel)) / 2, //양수를 위해 Math.abs
      0, 
      0, 
      Math.PI * 2 
    )
    ctx.fill();
    ctx.closePath();
  }
  draw(ctx){
    ctx.translate(this.x + this.width * 1.2 , this.y + this.height* 1.2); //translate 중심을 x,y로, 넓이가 좀 넓어지면 item에 있는것 보다 자연스러워짐
    ctx.rotate(Math.PI / 180 * this.rotation);
    ctx.translate(-(this.x + this.width* 1.2), -(this.y + this.height* 1.2)); //translate 중심을 0,0로

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})` // color로 random하게 설정 가능
    
    switch (this.shape) {
      case 'square' : this.drawSquare(ctx); break;
      case 'circle' : this.drawCircle(ctx); break;

    }
    
    
    ctx.resetTransform();

  }
}