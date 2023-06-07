import { useEffect, useRef } from 'react'
import '../style/containers/RotateCanvas.css'
import {Engine, Render, Runner, Mouse, MouseConstraint, Composite, Bodies} from 'matter-js'

const RotateCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    let engine, render, runner, mouse, mouseConstraint;
 
    const initScene = () =>{
      engine = Engine.create();
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {width: cw, height: ch, wireframes: false, background: '#1b1b19'}
      });
      runner = Runner.create();
      Render.run(render);
      Runner.run(runner, engine);
    }

    const initMouse = () => {
      mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine,{
        mouse: mouse
      });
      Composite.add(engine.world, mouseConstraint);

    }
    const addRect = (x, y, w, h, options = {}) =>{
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    }
    const initGround = () =>{ 
      // matter.js에서 원의 형태의 ground가 없음으로 다각형 ground를 만들어준다.
      // 다각형 지점에 rect를 만들어 버린다.
      const segments = 32;
      const deg = (Math.PI * 2) / segments;
      const width = 50;
      const radius = cw / 2 + width / 2;
      const height = radius * Math.tan(deg / 2) * 2 //삼각함수에 의거해 딱 맞는 높이 값

      for( let i = 0; i < segments; i++){
        const theta = deg * i;
        const x = radius * Math.cos(theta) + cw /2;
        const y = radius * Math.sin(theta) + cw /2;
        addRect(x, y, width, height, {isStatic: true, angle: theta})//, render:{lineWidth: 15}
      }
    }

    initScene();
    initMouse();
    initGround();

    canvas.addEventListener('mousewheel', ()=>{
      addRect(mouse.position.x, mouse.position.y, 50, 50);
    });

  },[])
  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>Javascript</h1>
        <h2>★★★★★</h2>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
      </aside>
    </div>
  )
}

export default RotateCanvas