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

