import { useEffect, useRef, useState } from 'react'
import '../style/containers/RotateCanvas.css'
import {Engine, Render, Runner, Mouse, MouseConstraint, Composite, Bodies, Events} from 'matter-js'
import IconVUE from '../assets/icon_VUE.png';
import IconHTML from '../assets/icon_HTML.png';
import IconCSS from '../assets/icon_CSS.png';
import IconJS from '../assets/icon_JS.png';
import IconREACT from '../assets/icon_REACT.png';
import IconTHREE from '../assets/icon_THREE.png';
import { entries } from 'lodash';

const data = {
  'JS': { title: 'Javascript', level: 4, desc: '3년간의 경험과 react 프로젝트를 통해 어떤 framework 보다 javascript 기본이 제일 중요한 것을 느꼈습니다.' },
  'REACT': { title: 'React.js', level: 2, desc: '현재 이 프로젝트는 canvas를 활용하여 react를 사용하여 만들었습니다. 다수의 toy 프로젝트 경험도 있습니다.' },
  'CSS': { title: 'CSS/SASS', level: 3, desc: 'css를 잘 활용하면 간단한 animation 등으로 랜더링 성능에 도움을 줄 수 있습니다.' },
  'VUE': { title: 'VUE.js', level: 5, desc: 'vue로 frontend를 시작하였고 많은 경험으로 능숙하게 사용할 수 있습니다.' },
  'THREE': { title: 'Three.js', level: 2, desc: '' },
  'HTML': { title: 'HTML', level: 4, desc: '잘 짜여진 html 구조는 컴포넌트화에 매우 중요한 역할을 합니다.' },
}

const RotateCanvas = () => {
  const [selected, setSelected] = useState(data['JS'])
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas = canvasRef.current;
    const cw = 1000;
    const ch = 1000;

    const gravityPower = 0.5;
    let gravityDeg = 0;

    let engine, render, runner, mouse, mouseConstraint, observer;
 
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
      // 하단은 canvas 안에서 wheel 하면 전체 페이지 스크롤이 안되는 것을 수정하기 위한 코드
      canvas.removeEventListener('mousewheel', mouse.mousewheel); 
      canvas.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    }
    const addRect = (x, y, w, h, options = {}) =>{
      const rect = Bodies.rectangle(x, y, w, h, options);
      Composite.add(engine.world, rect);
    }
    const initImageBoxes = () =>{
      const scale = 0.7;
      const t1 = { w: 250 * scale, h: 250 * scale }
      const t2 = { w: 403 * scale, h: 134 * scale }
      addRect(cw/2, ch/2, t1.w, t1.h,
        { label:'JS', chamfer: {radius: 20}, render: {sprite: {texture: IconJS, xScale: scale, yScale: scale}}});

      addRect(cw/2 - t1.w , ch/2, t1.w, t1.h, 
        { label:'HTML', chamfer: {radius: 20}, render: {sprite: {texture: IconHTML, xScale: scale, yScale: scale}}});

      addRect(cw/2 + t1.w, ch/2, t1.w, t1.h, 
        { label:'CSS', chamfer: {radius: 20}, render: {sprite: {texture: IconCSS, xScale: scale, yScale: scale}}});

      addRect(cw/2, ch/2 + t1.h, t1.w, t1.h, 
        { label:'REACT', chamfer: {radius: 75}, render: {sprite: {texture: IconREACT, xScale: scale, yScale: scale}}});

      addRect(cw/2 - t1.w, ch/2 + t1.h, t1.w, t1.h, 
        { label:'THREE', chamfer: {radius: 20}, render: {sprite: {texture: IconTHREE, xScale: scale, yScale: scale}}});

      addRect(cw/2, ch/2 - t2.h, t2.w, t2.h, 
        { label:'VUE', chamfer: {radius: 0}, render: {sprite: {texture: IconVUE, xScale: scale, yScale: scale}}});
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

    const initIntersectionObserver = () =>{
      const options = {
        threshold: 0.1
      }
      observer = new IntersectionObserver(entries => {
        const canvasEntry = entries[0];
        if(canvasEntry.isIntersecting){
          runner.enable = true;
          Render.run(render);
        } else{
          runner.enable = false;
          Render.stop(render);
        }
      }, options)
      observer.observe(canvas);
    }

    initScene();
    initMouse();
    initIntersectionObserver();

    initGround();
    initImageBoxes();

    Events.on(mouseConstraint, 'mousedown', ()=> {
      const newSelected = mouseConstraint.body && data[mouseConstraint.body.label]
      newSelected && setSelected(newSelected);
    })
    
    Events.on(runner, 'tick', ()=>{
      gravityDeg += 1;
      engine.world.gravity.x = gravityPower * Math.cos(Math.PI / 180 * gravityDeg);
      engine.world.gravity.y = gravityPower * Math.sin(Math.PI / 180 * gravityDeg);

    })

    return () =>{
      console.log("rotate unmount")

      observer.unobserve(canvas);
      Composite.clear(engine.world);
      Mouse.clearSourceEvents(mouse);
      Runner.stop(runner);
      Render.stop(render);
      Engine.clear(engine);
      //component amount 시 cleanUp
    }

  },[])
  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>{selected.title}</h1>
        <h2>{Array(5).fill(null).map((_, i) => (
          <span key={i} style={{ filter: `grayscale(${selected.level <= i ? 1 : 0})` }}>&#11088;</span>
        ))}</h2>
        <p>{selected.desc}</p>
      </aside>
    </div>
  )
}

export default RotateCanvas