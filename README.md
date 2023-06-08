# canvas-practice-projects
Canvas를 활용한 projects

## 5.  projects [Mini-Click-Game]

  - click 하여 케릭터를 날게 할수 있다. 코인을 먹으며 화면을 벗어나거나 장애물에 부딪히지 않게 멀리 가는 게임이다.
    
    게임 url:  https://minji-baek.github.io/canvas-practice-projects/
    
    //변경 예정
    
    <img src="./readMeIMG/miniGame_full.gif" width="100%" height="100%">

   <br>
   
  1. 랜덤으로 케릭터, 장애물, 코인 확률 생성 된다. 장애물 충돌, 화면 이탈시 게임 종료 되며 현재 play m와 코인 갯수가 표시 되며 replay 버튼 표출 된다.

  <img src="./readMeIMG/miniGame_set.gif" width="100%" height="100%">



## 이론

### Canvas 유의점

#### 1. Size 조절시
    - canvas style 조절만 하면 canvas의 기본 width, height = ( 300, 150 )  임으로 canvas style은 바뀌지만 내부 item의 비율이 이상해짐
    - style 보다 width,height이 작아져도 내부 item의 픽셀이 어그러짐
    => canvas.style.width,height 변경 시 canvas.width,height 도 같은 값으로 변경해야 함.
    - rotate 함수는 x,y가 왼측 상단이 0.0 중심으로 rotate된다.
  
#### 2. 선명도 높이는 법
    -- dpr 활용법
    const dpr = window.devicePixelRatio; 
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    // divice의 dpr 만큼 canvas를 늘려준다.

    ctx.scale(dpr,dpr);
    //style 도 늘려주니깐 보이는것 처음 설정한 것 과 같지만
    // pixel 수가 늘어났음으로 더 선명해지게 보인다.

#### 3. fps 주사율
    - 모니터 마다 주사율이 다름
      => fps 처리를 안하면 모니터 마다 내 애니메이션이 보여지는 프레임 속도가 다 다름
      => 요즘 모니터 60 ~ 240..? 이니깐 이 사이로 지정
      -- 공식= 
      전역
      let interval = 1000 / 60
      let now, delta
      let then = Date.now()

      aniamtion func 안에서
      now = Date.now() // aimation 해당 시간
      delta = now - then // 지금 시간 - 전 애니메이션 시간 
      if (delta < interval) return // 지정 interval 보다 작으면 animation 안할거임

      Math.cos()는 -1~1 사이의 값

#####  3-1  window.requestAnimationFrame() 

      메서드는 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트 바로 전에 브라우저가 애니메이션을 업데이트할 지정된 함수를 호출하도록 요청합니다. 이 메서드는 리페인트 이전에 호출할 인수로 콜백을 받습니다.

    
      
##### 3-2 Boilerplate Code?


      - canvas size setting, 선명도, fps, animation, requestAnimationFrame 하는 부분이 현재 project에서 Boilerplate Code 로서 setting 하는 부분이기도 함

      - 컴퓨터 프로그래밍에서 보일러플레이트 또는 보일러플레이트 코드라고 부르는 것은 최소한의 변경으로 여러곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드를 말한다.

      -- branch class-boilerplate 와 function-boilerplate로 관리할 예정이다.


#### 4. SVG img 활용
    /* filter: blur(50px) contrast(50); */
      => css로 물방울 effect 만들 수 있음
      but, 배경에 따라 이상한 느낌이 남 
    - stdDeviation(x,y or 둘다) => blur 값
    - mode="matrix" values=~ color 값 및 contrast 값 바꿀수 있음
    -- 어려우면 svg filters 사이트 가서 찾아보쟈. 감사합니다
    https://yoksel.github.io/svg-filters/#/

#### 5. test library

  -- <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js" integrity="sha512-WoO4Ih0CDOSLYafy22wZD/mcJ7k0ESLqtQsFa6zFKnEUrbtuGU+GkLtVhgt93xa2qewG5gKEC6CWlN8OaCTSVg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  mini 게임 중에
  gsap.to(this.playBtn, {
      scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5 })
   //gsap Ease option 중 하나, elastic.easeOut.config(값이 변화되는 크기, 바운스되는 정도) 

#### 6. 원 모양 방향
  - x, y 좌표는 가로 세로 직선 방향, random으로 item이 축을 따라 이동을 한다면 사각형 모양이 됨
  - 원 모양으로 item들을 움직여서 만들고 싶다면 방향을 원을 반지름으로 향해야 됨
    x = r * Math.cos(각도);
    y = r * Math.sin(각도);

  - cos, sin 안의 각도는 라디안값이 들어가야 된다.
     따라서 Math.PI / 180 * (각도deg) = 각도radian

#### 6. 원 모양 방향
  - x, y 좌표는 가로 세로 직선 방향, random으로 item이 축을 따라 이동을 한다면 사각형 모양이 됨
  - 원 모양으로 item들을 움직여서 만들고 싶다면 방향을 원을 반지름으로 향해야 됨
    x = r * Math.cos(각도);
    y = r * Math.sin(각도);


#### 7. hsla
    - 색을 각도로 표현 가능

#### 8. 마찰력, 가속도 표현   
      - 1 미만 : 어느정도 올라 가다가 천천히 이동을 멈춘다.(마찰력)
      - 1 이상 : 어느정도 올라 가다가 급격히 빠르게 올라가버린다.(가속도)

#### 9. CDN gsap
      - java script로 animation 넣을때 활용하기 좋음

#### 10. .bind(this)?
      - .bind this 하면 현재 부모인 class가 바인드 되어 변수나 함수를 이벤트로 this를 통해 쓸 수 있으므로 용이
      ex) window.addEventListener('resize', this.resise.bind(this))
      => .bind(this)하지 않으면 처음에 this.resise()안에 이벤트는 부모 class를 가르키다가 window로 바뀜
      
#### 11. splice vs shift 

      첫 번째 인자를 빼는 형식 이라면 splice보다 shift가 매우 빠르다. 익숙함에 속지말고 shift를 쓰도록 하자.
      출처 : https://velog.io/@dorito/JavaScript-Splice-vs-Shift-%EC%86%8D%EB%8F%84-%EC%B0%A8%EC%9D%B4-%EA%B6%81%EA%B8%88%ED%95%B4%EC%84%9C-%EA%B5%AC%EA%B8%80%EB%A7%81-z9aiz4b1
