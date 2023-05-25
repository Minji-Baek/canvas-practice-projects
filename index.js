const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //2d 관련 작업 도구

//전체 사이즈 set
const canvasWidth = innerWidth; 
const canvasHeight = innerHeight;

//내 divice dpr
const dpr = window.devicePixelRatio; 

canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr,dpr);

//particle class, 구조체, update(), draw()
class Particle {
  constructor(x, y, radius, yVer) {
    this.x = x
    this.y = y
    this.radius = radius
    this.yVer = yVer
    this.acc = 1.03
  }
  update() {
    this.yVer *= this.acc
    this.y += this.yVer //각 y값 다르게 해줌
  }
  draw() {
    ctx.beginPath() //그리기 시작
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360) // 라디안...으로 쓰기 때문에 pi/180 = 1도...
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath() //그리기 끝
  }
}

//내 모니터는 60주사
let interval = 1000 / 60
let now, delta
let then = Date.now() 

const TOTAL = 20 // item 갯수
let particles = []; //배열

//랜덤 함수
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
} 

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth)
  const y = randomNumBetween(0, canvasHeight)
  const radius = randomNumBetween(50, 100)
  const yVer = randomNumBetween(1, 5)
  const particle = new Particle(x, y, radius, yVer)
  particles.push(particle)
}

//애니메이션 함수
function animate() {
  window.requestAnimationFrame(animate) //animation 무한 돌리기
  
  //fps 주사율 방식
  now = Date.now()
  delta = now - then
  if (delta < interval) return

  ctx.clearRect(0, 0, canvasWidth, canvasHeight) // 동그라미 지우기
 
  particles.forEach(particle => {
    particle.update();
    particle.draw();

    //맨 밑으로 공이 넘어가면
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.yVer = randomNumBetween(1, 5);
    }
  })

  then = now - (delta % interval);
}

animate();
