import { useEffect, useRef } from 'react';
import '../style/containers/Nudake.css';
import throttle from 'lodash/throttle';
import gsap from 'gsap';
import image1 from '../assets/nudake-1.jpg';
import image2 from '../assets/nudake-2.jpg';
import image3 from '../assets/nudake-3.jpg';
import { drawImageCenter, getAngle, getDistance, getScrupedPercent } from '../utils/utils';


const Nudake = () => {
  const canvasRef = useRef(null); // return 되기 전에 document의 element를 가져올 수 없어 변수만 선언 후 null
  
  useEffect(() => {
    //return 후 실행

    //canvas setting
    const canvas = canvasRef.current;
    console.log(canvas);
    const cavasParnet = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    const imageSrcs = [image1, image2, image3];

    const loadedImgs = [];

    let currentIndex = 0;

    let prevPos = { x: 0, y: 0}
    let isChanging = false; // 나타나는 animation 중에는 mouse event 불가
    let canvasWidth, canvasHeight;

    function resize(){
      canvasWidth = cavasParnet.clientWidth;
      canvasHeight = cavasParnet.clientHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      preloadImages().then(()=> drawImage());
    }

    const preloadImages = () =>{ // image load 한번만
      return new Promise((resolve, reject)=>{
        let loaded = 0;
        imageSrcs.forEach(src =>{
          const img = new Image();
          img.src = src;
          img.onload = ()=>{
            loaded += 1;
            loadedImgs.push(img);
            if(loaded === imageSrcs.length) return resolve();
          }
        })
      })
    }

    function drawImage() {
      isChanging = true
      const image = loadedImgs[currentIndex];
      const firstDrawing = ctx.globalCompositeOperation === 'source-over'
      gsap.to(canvas, {opacity: 0, duration: firstDrawing ? 0 : 1 , onComplete: () => { //image 나타날때 부드럽게 나타나는 effect
        canvas.style.opacity = 1;
        ctx.globalCompositeOperation = 'source-over';
        drawImageCenter(canvas, ctx, image);
  
        const nextImg = imageSrcs[(currentIndex + 1) % imageSrcs.length];
        cavasParnet.style.backgroundImage = `url(${nextImg})`;
        prevPos = null;
        isChanging = false;
      }})

     
    }

    const onMouseDown = (e)=> {
      console.log("mouseDouwn")
      if(isChanging) return
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);
      canvas.addEventListener('mousemove', onMouseMove);
      prevPos = {x: e.offsetX, y: e.offsetY};
      
    }

    const onMouseUp = ()=> {
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    }

    const onMouseMove = (e)=> {
      if(isChanging) return
      drawCircles(e);
      checkPercent();
    }

    const drawCircles = (e)=> {
      const nextPos = {x: e.offsetX, y: e.offsetY};
      if(!prevPos) prevPos = nextPos;
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for(let i = 0; i < dist; i++){
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i; 

        ctx.globalCompositeOperation = 'destination-out'; //기존과 new의 차집합을 나타나게 되는 option
        ctx.beginPath();
        ctx.arc(x, y, canvasWidth / 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
      prevPos = nextPos;
    }
    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);
      if(percent > 50){
        currentIndex = (currentIndex + 1) % imageSrcs.length;
        drawImage();
      }
    },500)

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('resize', resize)
    resize();

    return () => { //unmount 될때 cleanUp 항목들
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onMouseDown);
    }

  }, [])

  return (
    <div className='nudake'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Nudake;