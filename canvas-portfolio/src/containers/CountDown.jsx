import '../style/containers/CountDown.css';
import circleImg from '../assets/circle4.png';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { initCanvas, randomNumBetween } from '../utils/utils';

const fps = 70;
const interval = 1000 / fps;
const CountDown = (props) => {
const canvasRef = useRef(null);

  useEffect(()=>{
    let canCount = true;
    const {canvas, ctx} = initCanvas(canvasRef.current);
    let canvasWidth = canvas.width
    let canvasHeight =  canvas.height;

    const imgScr = circleImg;
    const PARTICLE_NUM = 1000;
    let particles = [];
    let frameId;

    // function resize(){
    //   document.querySelector(".count-down").style = "display : flex";
    //   canCount = true;
    // }
    
    function render(){

      for(let i = 0; i < PARTICLE_NUM ; i++){
        particles.push(
          {   
            rFriction : randomNumBetween(0.95, 1.01), 
            rAlpha : randomNumBetween(0, 5),
            r : innerHeight / 4 ,
            aFriction : randomNumBetween(0.97, 0.99),
            angleAlpha : randomNumBetween(1, 2),
            angle : randomNumBetween(0, 360),
            opacity : randomNumBetween(0.2,1),
          }
        )
      }

      let now, delta;
      let then = Date.now();
      
      const frame = ()=> {
        frameId = requestAnimationFrame(frame);
        console.log("countDownRendering")
        if(particles.length == 0){
          props.changeDown(false);
          const count = document.querySelector(".count-down");
          gsap.fromTo(count,{opacity: 1}, {
            opacity: 0, 
            duration: 2,
            delay: 0.5
            // onComplete: () => props.changeDown(false)
          })
        }else{
          now = Date.now();
          delta = now - then;
        
          if(delta < interval) return 
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    
         for(let i = particles.length - 1; i >= 0; i-- ){
            drawCircles(particles[i]);
    
            if(particles[i].opacity < 0) {
              particles.splice(i, 1);
            }
         }
          
          then = now - (delta % interval);
        }
       
  
      }
     
      requestAnimationFrame(frame);
    }


    const drawCircles = (p)=> {
      p.rAlpha *= p.rFriction;
      p.r += p.rAlpha;

      p.angleAlpha *= p.aFriction;
      p.angle += p.angleAlpha;

      const x = canvasWidth / 2 +  p.r * Math.cos((Math.PI /180) * p.angle);
      const y = canvasHeight / 2 +  p.r * Math.sin((Math.PI /180) * p.angle);
      
      p.opacity -= 0.003;


      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    const mouseClick = () => {
      console.log("click counter")
      if(!canCount) return;
      canCount = false;
      const texts = document.querySelectorAll('span')
    
      const counDownOption = {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'Power4.easeOut'
      };
    
      gsap.fromTo(texts[0], {opacity: 0, scale: 5}, {
        ...counDownOption
      })
      gsap.fromTo(texts[1], {opacity: 0, scale: 5}, {
       ...counDownOption,
       delay: 1,
       onStart: () => texts[0].style.opacity = 0
      })
      gsap.fromTo(texts[2], {opacity: 0, scale: 5}, {
        ...counDownOption,
        delay: 2,
        onStart: () => texts[1].style.opacity = 0
      })
     
      const ringImg = document.querySelector('#ring');
      gsap.fromTo(ringImg, {opacity: 1, } ,{
        opacity: 0, 
        duration: 1, 
        delay: 3,
        onStart: ()=>{
          render();
          texts[2].style.opacity = 0
        }
      })
    }

    document.querySelector('#ring').src = imgScr; 
    window.addEventListener('click', mouseClick);

    // window.addEventListener('onload', resize);

    // resize();

    return () => {
      console.log("CountDown unmounted")
      window.removeEventListener('click', mouseClick);
      // document.querySelector(".count-down").style = "display: flex";
      // props.changeDown(true);
      cancelAnimationFrame(frameId);

    }

  },[])

  

  return (
    <div className="count-down">
      <img id="ring" />
      <canvas ref={canvasRef}></canvas>
      <div id="countdown">
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </div>
    </div>
  )
}


CountDown.propTypes = {
  changeDown: PropTypes.func,
  
};

export default CountDown;