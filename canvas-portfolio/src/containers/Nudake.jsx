import { useEffect, useRef } from 'react';
import '../style/containers/Nudake.css';
import throttle from 'lodash/throttle';
import image1 from '../assets/nudake-1.jpg';
import image2 from '../assets/nudake-2.jpg';
import image3 from '../assets/nudake-3.jpg';
import { getAngle, getDistance, getScrupedPercent } from '../utils/utils';


const Nudake = () => {
  const canvasRef = useRef(null); // return 되기 전에 document의 element를 가져올 수 없어 변수만 선언 후 null
  
  useEffect(() => {
    //return 후 실행

    //canvas setting
    const canvas = canvasRef.current;
    const cavasParnet = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    const imageSrcs = [image1, image2, image3];
    let currentIndex = 0;

    let prevPos = { x: 0, y: 0}

    let canvasWidth, canvasHeight;

    function resize(){
      canvasWidth = cavasParnet.clientWidth;
      canvasHeight = cavasParnet.clientHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      drawImage();
    }

    function drawImage() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const image = new Image();
      image.src = imageSrcs[currentIndex];
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight); 
      }
    }

    const onMouseDown = (e)=> {
      console.log('onMouseDown')
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);
      canvas.addEventListener('mousemove', onMouseMove);
      prevPos = {x: e.offsetX, y: e.offsetY};
      
    }
    const onMouseUp = ()=> {
      console.log('onMouseUp')
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    }
    const onMouseMove = (e)=> {
      console.log('onMouseMove')
      drawCircles(e);
      checkPercent();
    }
    const drawCircles = (e)=> {
      const nextPos = {x: e.offsetX, y: e.offsetY};
      const dist = getDistance(prevPos, nextPos);
      const angle = getAngle(prevPos, nextPos);

      for(let i = 0; i < dist; i++){
        const x = prevPos.x + Math.cos(angle) * i;
        const y = prevPos.y + Math.sin(angle) * i; 

        ctx.globalCompositeOperation = 'destination-out'; //기존과 new의 차집합을 나타나게 되는 option
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
      prevPos = nextPos;
    }
    const checkPercent = throttle(() => {
      const percent = getScrupedPercent(ctx, canvasWidth, canvasHeight);
      
    },500)

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('resize', resize)
    resize();

    return () => { //amount 될때 cleanUp 항목들
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