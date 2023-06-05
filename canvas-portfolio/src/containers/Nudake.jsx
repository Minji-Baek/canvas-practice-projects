import { useEffect, useRef } from 'react';
import '../style/containers/Nudake.css';

const Nudake = () => {
  const canvasRef = useRef(null); // return 되기 전에 document의 element를 가져올 수 없어 변수만 선언 후 null
  
  useEffect(() => {
    //return 후 실행
    const canvas = canvasRef.current;
    const cavasParnet = canvas.parentNode;
    const ctx = canvas.getContext('2d');

    let canvasWidth, canvasHeight;

    function resize(){
      canvasWidth = cavasParnet.clientWidth;
      canvasHeight = cavasParnet.clientHeight;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

    }

    let frameId

    function frame() {
      frameId = requestAnimationFrame(frame);
      console.count('frame');
      ctx.fillRect(100, 100, 100, 100);
    }

    window.addEventListener('resize', resize)
    resize();
    requestAnimationFrame(frame);

    return () => { //amount 될때 호출 animation 재귀호출 취소
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameId);
    }

  }, [])

  return (
    <div className='nudake'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Nudake;