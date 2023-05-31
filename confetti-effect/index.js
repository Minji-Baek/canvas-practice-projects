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


  function createConfetti({x, y, count, deg}){
    for(let i = 0; i < count ; i++){
      particles.push(new Particle(x, y, deg))
    }
  }

 function render(){
    let now, delta;
    let then = Date.now();
  

    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - then;
    
      if(delta < interval) return 
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      for(let i = particles.length - 1; i >= 0; i--){
        particles[i].update();
        particles[i].draw(ctx);
      }
     
      then = now - (delta % interval);

    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('click', () => {
    createConfetti({
      x: 0,
      y: canvasHeight / 2,
      count: 10,
      deg: -50
    });
  });

window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});