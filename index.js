const canvas = document.querySelector('canvas');


const ctx = canvas.getContext('2d'); //2d 관련 작업 도구
console.log()
const canvasWidth = 300;
const canvasHeight = 300;
const dpr = window.devicePixelRatio; 

canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr,dpr);
//

ctx.fillRect(10,10,50,50);

// 기본 canvas = (300,150)