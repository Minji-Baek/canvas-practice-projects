# canvas-practice-projects
Canvas를 활용한 projects



## 이론

### Canvas 유의점

#### 1. Size 조절시
    - canvas style 조절만 하면 canvas의 기본 width, height = ( 300, 150 )  임으로 canvas style은 바뀌지만 내부 item의 비율이 이상해짐
    - style 보다 width,height이 작아져도 내부 item의 픽셀이 어그러짐
    => canvas.style.width,height 변경 시 canvas.width,height 도 같은 값으로 변경해야 함.
  
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
