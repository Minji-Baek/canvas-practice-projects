import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = devicePixelRatio > 1 ? 2 : 1
const fps = 70;
const interval = 1000 / fps;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let particles = [];

function init() {
    canvasHeight = innerHeight;
    canvasWidth = innerWidth;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  function createRing() {
    const PARTICLE_NUM = 800;
    for(let i = 0; i< PARTICLE_NUM ; i ++){
      particles.push(new Particle());
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


     for(let i = particles.length - 1; i >= 0; i-- ){
      particles[i].update();
      particles[i].draw(ctx);

      if(particles[i].opacity < 0) particles.splice(i, 1);
     }
      console.log("particles.length ===",particles.length);
      
      then = now - (delta % interval);

    }
    requestAnimationFrame(frame);
  }



window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});

window,addEventListener('click', () => {
  createRing();
});