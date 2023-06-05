import { useEffect, useRef } from 'react';
import '../style/containers/Nudake.css';

const Nudake = () => {
  const canvasRef = useRef(null); // return 되기 전에 document의 element를 가져올 수 없어 변수만 선언 후 null
  
  useEffect(() => {
    //return 후 실행

    //canvas setting
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

    window.addEventListener('resize', resize)
    resize();

    return () => { //amount 될때 cleanUp 항목들
      window.removeEventListener('resize', resize)
    }

  }, [])

  return (
    <div className='nudake'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Nudake;