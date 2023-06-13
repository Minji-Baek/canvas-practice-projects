import { useEffect, useRef } from "react";
import { initCanvas, randomNumBetween, hypotenuse } from "../utils/utils";
import '../style/containers/FireWork.css'
const fps = 70;
const interval = 1000 / fps;

const FireWork = () => {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const {canvas, ctx} = initCanvas(canvasRef.current);
    let canvasWidth = canvas.width;
    
    let canvasHeight = canvas.height;

    let tails = [];
    let particles = [];
    let sparks = [];
    let frameId ,observer;

   

    const createTails = () =>{
      let tail = {
        x : randomNumBetween(canvasWidth * 0.2, canvasWidth * 0.8),
        y : canvasHeight,
        vy : canvasHeight * randomNumBetween(0.01, 0.015) * -1,
        colorDeg : randomNumBetween(0,  360),
        angle : randomNumBetween(0,2),
        friction : 0.985
      }
      tails.push(tail);
    }
  
    const createParticles = (x, y, _colorDeg) => {
      const PARTICLE_NUM  = 400;
      for(let i = 0; i < PARTICLE_NUM ; i ++){   
        let particle = {
          x : x,
          y : y,
          r : randomNumBetween( 2, 100 ) * hypotenuse(innerWidth, innerHeight) * 0.0001,
          angle : Math.PI /180 * randomNumBetween(0, 360),
          vx : 1,
          vy : 1,
          opacity : randomNumBetween(0.4 , 0.9 ),
          colorDeg : randomNumBetween(-20 , 20 ) + _colorDeg,
          gravity : 0.12,
          friction : 0.93
        }
        particle.vx = particle.r * Math.cos(particle.angle);
        particle.vy = particle.r * Math.sin(particle.angle);

        particles.push(particle);
      }
    }

    const drawTail = (tail) => {
      tail.vy *= tail.friction;
      tail.y += tail.vy;
      tail.angle += 1;
      tail.x += Math.cos(tail.angle) * tail.vy * 0.2;
      tail.opacity = -tail.vy * 0.1;
      // tail.pos set???
      ctx.fillStyle = `hsla(${tail.colorDeg}, 100%, 65%, ${tail.opacity})`
      ctx.beginPath();
      ctx.arc(tail.x, tail.y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    const drawSpartk = (spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.opacity -= 0.02; 

      ctx.fillStyle = `hsla(${spark.colorDeg}, 100% , 65% , ${spark.opacity})`
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

    }

    const drawParticle = (particle) => {
      particle.vy += particle.gravity;

      particle.vx *= particle.friction;
      particle.vy *= particle.friction;
  
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.opacity -= 0.01;

      ctx.fillStyle = `hsla(${particle.colorDeg}, 100%, 65%, ${particle.opacity})`
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    const render = () =>{
      let now, delta;
      let then = Date.now();
  
      const frame = ()=> {
        // console.log("render 중")
        frameId = requestAnimationFrame(frame);
      
        now = Date.now();
        delta = now - then;
      
        if(delta < interval) return 
        ctx.fillStyle = '#1B1B19' + '40' ;
        ctx.fillRect(0,0, canvasWidth, canvasHeight);
  
        ctx.fillStyle = `rgba(255, 255, 255, ${particles.length / 50000})`
        ctx.fillRect(0,0, canvasWidth, canvasHeight);
  
        if(Math.random() < 0.03) 
          createTails();
  
        tails.forEach((tail, index)=> {
          drawTail(tail);
          // tail.update()
  
          for(let i = 0; i < Math.round(-tail.vy * 0.5) ; i++){
            const spark = {
              x: tail.x,
              y:  tail.y,
              vx: randomNumBetween(-5,5) * 0.05,
              vy: randomNumBetween(-5,5) * 0.05,
              opacity: Math.min(-tail.vy, 0.5),
              colorDeg : tail.colorDeg
            }
            sparks.push(spark);
          }
  
          if(tail.vy > -0.7){
            tails.splice(index, 1);
            createParticles(tail.x, tail.y, tail.colorDeg);
          }
        })
  
        particles.forEach((particle, index) => {
          drawParticle(particle);
          // particle.update();
          // particle.draw();

          if(Math.random() < 0.1) {
            const spark = {
              x : particle.x, 
              y : particle.y, 
              vx: 0 ,
              vy: 0 , 
              opacity: 0.2, 
              colorDeg: 45
            }
            sparks.push(spark)
          }
  
          if(particle.opacity < 0 ){
            particles.splice(index, 1);
          }
        })
  
        sparks.forEach((spark, index)=>{
          drawSpartk(spark);
          // spark.update();
          // spark.draw();
  
          if(spark.opacity < 0 ) sparks.splice(index, 1)
        })
        
        
        then = now - (delta % interval);
      }
      requestAnimationFrame(frame);
    }

    const initIntersectionObserver = () =>{
      const options = {
        threshold: 0.1
      }
      observer = new IntersectionObserver(entries => {
        const canvasEntry = entries[0];
        if(canvasEntry.isIntersecting){
          render();
        } else{
          cancelAnimationFrame(frameId)
        }
      }, options)
      observer.observe(canvas);
    }
    initIntersectionObserver();
    render();
    
    return () => {
      console.log("fiirework unmount");
      observer.unobserve(canvas);
      cancelAnimationFrame(frameId)
    }

  },[])


  return (
    <div className='firework'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default FireWork;