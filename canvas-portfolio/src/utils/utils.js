export function getDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export function getAngle(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.atan2(dy, dx); //두 점 사이의 절대적인 각도
}

export function getScrupedPercent(ctx, width, height) {
  const pixels = ctx.getImageData(0, 0, width, height)
  const gap = 32 //값을 올려 performance detail 올릴 수 있음
  const total = pixels.data.length / gap
  let count = 0

  for (let i = 0; i < pixels.data.length - 3; i += gap) {
    if (pixels.data[i + 3] === 0) count++
  }

  return Math.round(count / total * 100)
}

export function drawImageCenter(canvas, ctx, image) {
  const cw = canvas.width
  const ch = canvas.height

  const iw = image.width
  const ih = image.height

  const ir = ih / iw
  const cr = ch / cw

  let sx, sy, sw, sh

  if (ir >= cr) {
    sw = iw
    sh = sw * (ch / cw)
  } else {
    sh = ih
    sw = sh * (cw / ch)
  }
  sx = iw / 2 - sw / 2
  sy = ih / 2 - sh / 2
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cw, ch)
}

export function initCanvas(canvasRef) {
  const canvas = canvasRef;
  const cavasParnet = canvas.parentNode;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let canvasWidth = cavasParnet.clientWidth;
  let canvasHeight = cavasParnet.clientHeight;
  canvas.style.width = canvasWidth + 'px';
  canvas.style.height = canvasHeight + 'px';

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  return {canvas, ctx};
}

export  const randomNumBetween = (min, max) => {
  return Math.random()*( max - min) + min ;
}

export const hypotenuse = (x,y)=> {
  return  Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}