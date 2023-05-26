import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import { randomNumBetween, hypotenuse } from "./js/utils.js";

class Canvas extends CanvasOption{
  constructor(){
    super();// 부모 class 모든 요소 및 함수 사용

    this.particles = [];
  }

  init() {
    this.canvasHeight = innerHeight;
    this.canvasWidth = innerWidth;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px';

    this.createParticles();
  }

  createParticles() {
    const PARTICLE_NUM  = 400;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);
    for(let i = 0; i < PARTICLE_NUM ; i ++){
      //현재 x,y rand 값을 5~ -5로 했을때 퍼지는 모양이 사각형이였음
      // 원의 모양을 만들기 위해 x, y 사이 값을 원의 반지름 값으로 날아 갈 수 있도록 해야된다.
      const r = randomNumBetween( 2, 100 ) * hypotenuse(innerWidth, innerHeight) * 0.0001;
      const angle = Math.PI /180 * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.6 , 0.9 );
      this.particles.push(new Particle(x, y, vx, vy, opacity ));
    }
  }


  render(){
    let now, delta;
    let then = Date.now();

    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - delta;
    
      if(delta < this.interval) return 
        this.ctx.fillStyle = this.bgColor + '40' ;
        this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if(particle.opacity < 0 ){
          this.particles.slice(index, 1);
        }
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