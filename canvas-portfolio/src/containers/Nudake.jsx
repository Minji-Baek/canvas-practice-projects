import { useEffect, useRef } from 'react';
import '../style/containers/Nudake.css';

import image1 from '../assets/nudake-1.jpg';
import image2 from '../assets/nudake-2.jpg';
import image3 from '../assets/nudake-3.jpg';


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

    const onMouseDown = ()=> {
      console.log('onMouseDown')
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mousemove', onMouseMove);
    }
    const onMouseUp = ()=> {
      console.log('onMouseUp')
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
    }
    const onMouseMove = ()=> {
      console.log('onMouseMove')
    }
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