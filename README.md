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