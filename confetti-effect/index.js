const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = devicePixelRatio > 1 ? 2 : 1
const fps = 70;
const interval = 1000 / fps;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function init() {
    canvasHeight = innerHeight;
    canvasWidth = innerWidth;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
  }

 function render(){
    let now, delta;
    let then = Date.now();
    const x = innerWidth / 2;
    let y = innerHeight / 2;

    const width = 50;
    const height = 50;
    let deg = 0.1;


    let widthAlpah = 0; // 가중치

    const frame = ()=> {
      requestAnimationFrame(frame);
    
      now = Date.now();
      delta = now - then;
    
      if(delta < interval) return 
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      widthAlpah += 0.1;
      deg += 0.1;
      y += 1; // 밑으로 떨어짐 표현
      ctx.translate(x + width, y + height);
      ctx.rotate(deg); // 
      ctx.translate(-(x + width), -(y + height));
      // 3d 입체감을 줌

      ctx.fillStyle = 'red'
      ctx.fillRect(x, y, width * Math.cos(widthAlpah), height * Math.sin(widthAlpah)); // 좌우로 펄럭거림 표현

      ctx.resetTransform();
        
      then = now - (delta % interval);

    }
    requestAnimationFrame(frame);
  }



window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});