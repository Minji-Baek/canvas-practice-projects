import { useEffect, useRef } from 'react';
import '../style/containers/Confetti.css'
import { initCanvas, randomNumBetween, hexToRgb } from '../utils/utils';
const fps = 70;
const interval = 1000 / fps;


const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(()=>{
    const {canvas, ctx} = initCanvas(canvasRef.current);
    let canvasWidth = canvas.width;
    let canvasHeight =  canvas.height;
    let particles = [];
    // const friction =  0.89; //마찰력 곱
    const friction =  0.87; //마찰력 곱

    const gravity = 0.5; //중력 더하기
    let frameId;
    // const friction = randomNumBetween(0.95, 0.97); //마찰력 곱

    const createParticles = (x, y, deg, colors, shapes, spread) => {
      let _deg = deg || 0;
      let _spread = spread || 30

      const angle = Math.PI / 180 * randomNumBetween(_deg - _spread, _deg + _spread);

      let _r = randomNumBetween(30, 100);

    // friction = randomNumBetween(0.95, 0.97); //마찰력 곱

      let _colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0']; // 초기 color 배열값
      const color = hexToRgb(
        _colors[
        Math.floor(randomNumBetween(0, _colors.length)) //colors 배열에서 랜덤
        ]
      );

      let _shapes = shapes || ['square', 'circle'];
      const shape = _shapes[
        Math.floor(randomNumBetween(0, _shapes.length)) //shapes 배열에서 랜덤
      ];

      return {
        x: x * innerWidth,
        y: y * innerHeight,
        vx:  _r * Math.cos(angle),
        vy:  _r * Math.sin(angle),
        opacity: 1,
        shape: shape,
        color: color,
        width: 8,
        height: 8,
        widthDel: randomNumBetween(0, 360),
        heightDel: randomNumBetween(0, 360),
        rotaion: randomNumBetween(0, 360),
        rotationDel: randomNumBetween(-1, 1),
      }
    }

     const createConfetti =  ({x, y, count, deg, colors,shapes, spread}) =>{
      console.log("createConfetti");
      for(let i = 0; i < count ; i++){
        const particle =  createParticles(x, y, deg, colors, shapes, spread )
        particles.push(particle);
      }
    }

    const drawSquare = (particle)=> {
      ctx.fillRect(
        particle.x, 
        particle.y, 
        particle.width * Math.cos( Math.PI / 180 * particle.widthDel), 
        particle.height * Math.sin(Math.PI / 180 * particle.heightDel)
      );
    }
    const drawCircle = (particle)=>{
      ctx.beginPath();
      ctx.ellipse(
        particle.x, 
        particle.y,  
        Math.abs(particle.width * Math.cos( Math.PI / 180 * particle.widthDel)) / 2, //양수를 위해 Math.abs
        Math.abs(particle.height * Math.sin(Math.PI / 180 * particle.heightDel)) / 2, //양수를 위해 Math.abs
        0, 
        0, 
        Math.PI * 2 
      )
      ctx.fill();
      ctx.closePath();
    }

    const draw = (particle)=>{
      ctx.translate(particle.x + particle.width * 1.2 , particle.y + particle.height* 1.2); //translate 중심을 x,y로, 넓이가 좀 넓어지면 item에 있는것 보다 자연스러워짐
      ctx.rotate(Math.PI / 180 * particle.rotation);
      ctx.translate(-(particle.x + particle.width* 1.2), -(particle.y + particle.height* 1.2)); //translate 중심을 0,0로
  
      ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})` // color로 random하게 설정 가능
      switch (particle.shape) {
        case 'square' : drawSquare(particle); break;
        case 'circle' : drawCircle(particle); break;
      }
      ctx.resetTransform();
    }

    const render = ()=> {
      let now, delta;
      let then = Date.now();
      // let deg  = 0;
  
      const frame = ()=> {
        frameId = requestAnimationFrame(frame);
      
        now = Date.now();
        delta = now - then;
        // deg += 1;
        if(delta < interval) return 

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        createConfetti({
          x: 0,   // 0~1
          y: 0.5,   // 0~1
          count: 3,
          deg: -60,
        });

        createConfetti({
          x: 1,
          y: 0.5,
          count: 3,
          deg: -120,  
        });
        
        console.log(particles)
        for(let i = particles.length - 1; i >= 0; i--){
          particles[i].vy += gravity;

          particles[i].vx *= friction;
          particles[i].vy *= friction;
      
          particles[i].x += particles[i].vx;
          particles[i].y += particles[i].vy;
      
          particles[i].opacity -= 0.005;
      
          particles[i].widthDel += 2;
          particles[i].heightDel += 2;
          particles[i].rotaion += particles[i].rotationDel; 

          draw(particles[i])
          
          if(particles[i].opacity < 0) particles.splice(i,1);{
            if(particles[i].y > canvasHeight) particles.splice(i,1);
            // else if(particles[i].y < canvasHeight * 2 ) particles.splice(i,1);
          }
          
        }
       
        then = now - (delta % interval);

      }
      requestAnimationFrame(frame);
    }
    render();

    return () => {
      cancelAnimationFrame(frameId);
    }
  },[])

  return (
    <div className='confetti'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Confetti;