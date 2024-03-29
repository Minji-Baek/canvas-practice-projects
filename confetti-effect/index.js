import Particle from "./js/Particles.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = devicePixelRatio > 1 ? 2 : 1
const fps = 70;
const interval = 1000 / fps;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const particles = [];


function init() {
    canvasHeight = innerHeight;
    canvasWidth = innerWidth;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    
    createConfetti({
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      count: 10
    });
  }


  function createConfetti({x, y, count, deg, colors, shapes, spread}){
    for(let i = 0; i < count ; i++){
      particles.push(new Particle(x, y, deg, colors, shapes, spread ))
    }
  }

 function render(){
    let now, delta;
    let then = Date.now();
    let deg  = 0;

    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - then;
      deg += 1;
    
      if(delta < interval) return 
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
       createConfetti({
        x: 0.5,   // 0~1
        y: 0.5,   // 0~1
        count: 5,
        deg: 225 + deg,
        spread: 1
      });

      createConfetti({
        x: 0.5,
        y: 0.5,
        count: 5,
        deg: 90 + deg,
        spread: 1

      });

      createConfetti({
        x: 0.5,
        y: 0.5,
        count: 5,
        deg: 315 + deg,
        spread: 1

      });

      for(let i = particles.length - 1; i >= 0; i--){
        particles[i].update();
        particles[i].draw(ctx);
        if(particles[i].opacity < 0) particles.splice(i,1);
        if(particles[i].y > canvasHeight) particles.splice(i,1);

      }
     
      then = now - (delta % interval);

    }
    requestAnimationFrame(frame);
  }

  // window.addEventListener('click', () => {
  //   createConfetti({
  //     x: 0,
  //     y: 0.5,
  //     count: 10,
  //     deg: -50,
  //     // colors:['#ff0000']
  //   });
  // });

window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});