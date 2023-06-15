import { initCanvas, randomNumBetween } from '../utils/utils.js';
import '../style/containers/ParticleDemo.css'
import { useEffect, useRef, useState } from 'react';

const fps = 70;
const interval = 1000 / fps;


const ParticleDemo =()=>{
  const canvasRef = useRef(null);

  useEffect(()=>{
    const {canvas, ctx} = initCanvas(canvasRef.current);
   
    canvas.width *= 0.97;
    canvas.height *= 0.9;
    let canvasWidth = canvas.width
    let canvasHeight =  canvas.height;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    const total = canvasWidth / 20;

    let particles = [];
    let frameId;
    let gui;
   

    function resize(){
      initParticle();
      initGui();
    }

    const initParticle = () =>{
      for(let i = 0; i < total ; i++){
        const radius = randomNumBetween(30, 70)
        particles.push(
          {   
             x : randomNumBetween(0 , canvasWidth),
             y : randomNumBetween(0, canvasHeight),
             radius : radius,
             yVer : randomNumBetween(1, 5),
             acc : 1.03
          }
        )
      }

    } 
    const initGui = () => {
      const feGaussianBlur = document.querySelector('feGaussianBlur');
      const feColorMatrix = document.querySelector('feColorMatrix');

      const controls = new function () {
        this.blurValue = 40; //blur
        this.alphaChannel = 100; //constract 초기값
        this.alphaOffset = -23; //constract 초기값
        this.acc = 1.03;
      };

      gui = new dat.GUI();

      const f1 = gui.addFolder('Gooey Effect');
      f1.open();
      f1.add(controls, 'blurValue', 0, 100).onChange(v => {
        feGaussianBlur.setAttribute('stdDeviation', v);
      });
      f1.add(controls, 'alphaChannel', 1, 200).onChange(v => {
        feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${v} ${controls.alphaOffset}`);
      });
      f1.add(controls, 'alphaOffset', -40, 40).onChange(v => {
        feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${v}`);
      });

      const f2 = gui.addFolder('Particle Property');
      f2.close();
      f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(v => {
        particles.forEach(particle => particle.acc = v);
      });

     
    }


    const drawRain = (particle) => {
      particle.yVer *= particle.acc
      particle.y += particle.yVer 

      ctx.beginPath() //그리기 시작
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI / 180 * 360) 
      ctx.fillStyle = '#80bdcf'
      ctx.fill()
      ctx.closePath() 
    }

    function render(){

      let now, delta;
      let then = Date.now();
      
      
      const frame = ()=> {
        frameId = requestAnimationFrame(frame);

        now = Date.now()
        delta = now - then
        if (delta < interval) return
      
        ctx.clearRect(0, 0, canvasWidth, canvasHeight) // 동그라미 지우기
        
        particles.forEach(particle => {
          drawRain(particle);
      
          //맨 밑으로 공이 넘어가면
          if (particle.y - particle.radius > canvasHeight) {
            particle.y = -particle.radius;
            particle.x = randomNumBetween(0, canvasWidth);
            particle.radius = randomNumBetween(30, 70);
            particle.yVer = randomNumBetween(1, 5);
          }
        })  
      
        then = now - (delta % interval);
      
        //fps 주사율 방식
       
      }
      requestAnimationFrame(frame);
    }

    resize();
    render();

    return () => {
      console.log("ParticleDemo Unmounted")
      cancelAnimationFrame(frameId);
      gui.destroy();
    }

  },[]);

  return (
    <div className="particle-demo" >
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js" integrity="sha512-WoO4Ih0CDOSLYafy22wZD/mcJ7k0ESLqtQsFa6zFKnEUrbtuGU+GkLtVhgt93xa2qewG5gKEC6CWlN8OaCTSVg==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
     <canvas ref={canvasRef}></canvas>
      <svg>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur1" />
            <feColorMatrix in="blur1" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -23"/>
          </filter>
        </defs>
      </svg>
    </div>
  )
}
export default ParticleDemo;

