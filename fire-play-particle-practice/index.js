import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import Spark from "./js/Spark.js";
import { randomNumBetween, hypotenuse } from "./js/utils.js";

class Canvas extends CanvasOption{
  constructor(){
    super();// 부모 class 모든 요소 및 함수 사용
    
    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  init() {
    this.canvasHeight = innerHeight;
    this.canvasWidth = innerWidth;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px';
  }

  createTails(){
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const colorDeg = randomNumBetween(0,  360);
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(x, y, colorDeg) {
    const PARTICLE_NUM  = 400;
    for(let i = 0; i < PARTICLE_NUM ; i ++){
      //현재 x,y rand 값을 5~ -5로 했을때 퍼지는 모양이 사각형이였음
      // 원의 모양을 만들기 위해 x, y 사이 값을 원의 반지름 값으로 날아 갈 수 있도록 해야된다.
      const r = randomNumBetween( 2, 100 ) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = Math.PI /180 * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.4 , 0.9 );
      const _colorDeg = randomNumBetween(-20 , 20 ) + colorDeg;
      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg ));
    }
  }


  render(){
    let now, delta;
    let then = Date.now();

    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - then;
    
      if(delta < this.interval) return 
      this.ctx.fillStyle = this.bgColor + '40' ;
      this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);

      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length / 50000})`
      this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);


      if(Math.random() < 0.03) 
        this.createTails();

      this.tails.forEach((tail, index)=> {
        tail.update();
        tail.draw();

        for(let i = 0; i < Math.round(-tail.vy * 0.5) ; i++){
          const vx = randomNumBetween(-5,5) * 0.05;
          const vy = randomNumBetween(-5,5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);
          this.sparks.push(new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg));
        }

        if(tail.vy > -0.7){
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      })

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if(Math.random() < 0.1) this.sparks.push(new Spark(particle.x, particle.y, 0 ,0 , 0.2, 45))

        if(particle.opacity < 0 ){
          this.particles.splice(index, 1);
        }
      })

      this.sparks.forEach((spark, index)=>{
        spark.update();
        spark.draw();

        if(spark.opacity < 0 ) this.sparks.splice(index, 1)
      })
      
      
      
      then = now - (delta % this.interval);
    }
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});