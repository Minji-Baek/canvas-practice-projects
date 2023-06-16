import { useEffect, useRef, useState } from 'react';
import ArrowImg from './assets/arrow.svg';
import Nudake from './containers/Nudake';
import RotateCanvas from './containers/RotateCanvas';
import CountDown from './containers/CountDown';
import MiniGame from './containers/MiniGame';
import ParticleDemo from './containers/ParticleDemo';
import gsap from 'gsap';
import FireWork from './containers/FireWork';
import Confetti from './containers/Confetti';
import { keysIn } from 'lodash';

const career = [{ title: "CLES Re SI", 
date:[ "202202", "202208"], 
Languege: ["JavaScript"], UIFrameWork: ["Vue2.X", "ag-grid"],
detail: ["CLES 사이트 리뉴얼 개발 (에스원 사내 업무 사이트)", "서비스 중단된 tmax의 top라는 플랫폼으로 개발된 사이트를 vue로 리뉴얼 하는 프로젝트","기존 소스도 존재하지 않아서 개발자 모드를 사용해 소스 분석 해야 함, 임직원 외의 ID로는 접근 불가능한 기능과 사이트가 다분하였으나 주에 한번 회의 중 질문 가능하고 기능 파악 가능했음", 
          `=> 지속적인 컴플레인 후 팀원 당 한명씩 담당자 분배 후 실시간 응답 형식으로 변경`, `대용량 데이터 조회 페이지 다량 존재, 페이지 마다 다르게 동작하는 CRUD 버튼 요구`,
          `=> 대용량 데이터 표출 용이, 커스텀 용이한 ag-grid 사용`, `기존 페이지에 원래 존재하던 오류 개선 요청 및 대용량 데이터 조회 페이지 조회 속도 개선 요청`, 
          ` => vue를 사용하면서 대부분 개선되었지만 조금 더 빠른 렌더링을 위해 함수형 컴포넌트로 구성`, 
          "여러 페이지에 자주 사용되는 형식 파악 및 공통 component로 개발 후 팀원들도 사용할 수 있게 교육", 
          "클라이언트 요청 디자인 css 변경", "grid내에 클라이언트 요청에 맞는 중복 데이터 제거 옵션 등 커스텀 개발"]}
, { title: "스마트검색-SM&SI", date: ["202006","202202"], Languege: ["C++","Visual Basic" ], environment: ["VisualStudio"],
 detail: ["시스템 내 마스크 인증 사용 옵션 추가 개발, 다수의 사업장에 직접 배포 및 테스트", "사업장의 요청에 따라 마스크 인증의 옵션 확률을 다르게 처리"]}
, { title: "스마트검색-AdminSite 리뉴얼 SI", date: ["202006", "202202"], Languege: ["Vue2.x","TypeScript" ], environment: ["VSCode"],
 detail: ["curl 개발 소스 분석 및 기존 화면 분석", "리뉴얼 화면 기획 및 기획서 작성", "기능 개발, DB서버 연계 테스트 및 최종 배포 완료"]}
,{title: "TAD-AdminSite SI", date:[ "202006", "202009"], Languege: ["JavaScript"], UIFrameWork: ["Vue2.X", "vuetify"],
detail: ["TAD 관리자 사이트 개발(얼굴 인증 사진 관리용 사이트)"," 사이트 디자인, 기능 개발, DB서버 연계 테스트 및 최종 배포 완료"]}
, { title: "Active UI SI", date:[ "202009", "202011"], Languege: ["TypeScript"], UIFrameWork: ["Vue2.X", "devextreame"],
 detail: ["회사 고유 UI Framework 솔루션 개발","사용자들의 편리한 이용과 활용도를 위해 typescript로 개발", "Grid 에서 사용 가능한 button, TextBox, InputBox 등 컴포넌트들의 옵션과 이벤트 개발", "grid의 데이터를 to excel 혹은 from excel 기능을 기본 옵션으로 추가 개발. "]}
, { title: "모바일 보안 카메라 Admin Site SI", date:[ "202009", "202102"], Languege: ["TypeScript"], UIFrameWork: ["Vue2.X", "devextreame"],
detail: ["모바일 보안 카메라 관리자 사이트 개발","회사 내 자체 UI 솔루션 기반으로 개발", "개발 도중 요구된 한 페이지의 CRUD 기능이 devextreme과 달라서 추가로 개발해야 하는 상황이 발생", 
          "미리 컴포넌트에 옵션화 했기 때문에 원활한 대응이 가능했었음", "DB서버 연계 테스트 및 최종 배포 완료"]}
,{ title: "V3얼굴인증-SM&SI", date:[ "202108", "202112"], Languege: ["C++"], environment: ["VisualStudio"],
 detail: ["마스크 사용 인증 옵션과 온도 체크 옵션에 따른 출입 기계와의 상호 통신 부분 개발", "중국 및 여러 사업장에 배포 후 운영되고 있다.", ]}
]

function App() { 
  const [endCount, setEndCount] = useState(true);

  const [canvas, setcanvas] = useState("photo");
  const [isPhoto, setIsPhoto] = useState(true);

  const [isDemo, setIsDemo] = useState(false);

  const [isConfetti, setIsConfetti] = useState(false);

  const [selectArticle, setSelectArticle] = useState(career[0])


  let index = 0;
  const careerData = career;

  const changeCountDown = (data) =>{
    //app 을 disappear
    setEndCount(data)
  };
  const changeFooter = () =>{
    if(endCount){
    }
    else setIsConfetti(current => !current)
  };

  const setDate = (date) => {
    const startYYYY = date[0].slice(0,4);
    const startDD = date[0].slice(4,6);

    const EndYYYY = date[1].slice(0,4);
    const EndDD = date[1].slice(4,6);

    return `${startYYYY}.${startDD} ~ ${EndYYYY}.${EndDD}`;
  }

  useEffect(()=> {
    
   
   
  },[selectArticle])

  useEffect(() => {
    
    console.log("mouse click 떠야되는데", endCount)
    let mouseInEmail = false;
    const email =  document.querySelector(".email");
    const footer = document.querySelector("footer");
    const cursorText = document.querySelector('.cursor');
    let first = true;
    
    const cursorToMove = ()=>{
      mouseInEmail = true;

      cursorText.setAttribute("id", "email-click-cursor");
      console.log("cursorToMove")
      cursorText.removeAttribute("#cursor");
    }
    const cursorToStop = () =>{
      mouseInEmail = false;
      console.log("cursorToMove")
      cursorText.removeAttribute("#email-click-cursor");
      cursorText.setAttribute("id", "cursor");
    }

    const cursorMove = (mouseInEmail, e) =>{
      if(!mouseInEmail) return;
      cursorText.style.top =  e.clientY + "px";
      cursorText.style.left =  e.clientX + "px";
    }


    if(endCount){
      mouseInEmail = true;
      footer.addEventListener('mouseover',cursorToMove);
      footer.addEventListener("mouseout", cursorToStop);
      footer.addEventListener('mousemove',(e) =>  cursorMove(mouseInEmail, e));

    }else{
      if(first){
        footer.removeEventListener('mousemove',(e) =>  cursorMove(mouseInEmail, e))
        footer.removeEventListener('mouseover',cursorToMove);
        footer.removeEventListener("mouseout", cursorToStop);
        footer.style.cursor = "default"
        first = false;
      }

      cursorToStop();

      email.addEventListener('mouseover', cursorToMove);
      footer.addEventListener('mousemove',(e) =>  cursorMove(mouseInEmail, e))
      email.addEventListener("mouseout", cursorToStop);
      
    }


    return ()=> {
      if(endCount){
        footer.removeEventListener('mouseover',cursorToMove);
        footer.removeEventListener("mouseout", cursorToStop);
        footer.removeEventListener('mousemove',(e) =>  cursorMove(mouseInEmail, e));
  
      }else{
        footer.removeEventListener('mousemove',cursorToStop)
        email.removeEventListener('mouseover', cursorToMove)
        email.removeEventListener('mousemove', (e) =>  cursorMove(mouseInEmail, e));
        footer.removeEventListener('mousemove',(e) =>  cursorMove(mouseInEmail, e))
        email.removeEventListener("mouseout", cursorToStop);
      }}
  
  },[endCount]) //app disappear



  useEffect(()=>{
    console.log("canvas 값이 바뀌고 있어용")
    if(canvas === "photo"){
      setIsPhoto(current=> current = true);
      setIsDemo(current => current = false);
    }else if( canvas === "particle-demo"){
      setIsPhoto(current=> current = false);
      setIsDemo(current => current = true);
    }else{
      setIsPhoto(current=> current = false);
      setIsDemo(current => current = false);
      
    }
  }, [canvas]) //canvas값 바뀌는 곳
  
  useEffect(()=>{

   
  }, [isDemo, isPhoto ]);

  useEffect(()=> {
    const initData = () => {
      careerData.forEach((data, index) => data.index = index);
    };
    initData();
    
    const clickArrow = (step) => {
      index = index + step;

      if (index < 0) {
        index = career.length - 1
      } else if (index >= career.length) {
        index = 0
      }
      setSelectArticle(current =>  current = career[index] )
    }
    document.getElementById("arrow-left").addEventListener("click", () => {
      clickArrow(-1)
    })
    document.getElementById("arrow-right").addEventListener("click", () => {
      clickArrow(1)
    })
   
  },[])

  const changeMain = (e) => {
     setcanvas(current => current = e.target.id)
  }

  return (
    // <React.Fragment> === <>
    <>
     <div className="app" >
       <section className="section-1">
         <header>
           <h1>Canvas Portfolio</h1>
           <ul>
             <li id='photo' className='list-items' onClick={changeMain} >photo</li>
             <li id='particle-demo' className='list-items' onClick={changeMain} >particle-demo</li>
             {/* <li id='minigame' className='list-items' onClick={changeMain} >minigame</li> */}
           </ul>
         </header>
         <main>
           <div>
           { isPhoto ? <Nudake />  :  (  isDemo  ?   <ParticleDemo /> : <MiniGame/> ) }</div>
         </main>
       </section>
       
       <section className="section-2">
        { isPhoto ? <p>Did you click photo? </p> : <p>Have a fun!</p>}

       </section>
       { isPhoto || isDemo 
       ?  
       <>
        <section className="section-3" >
          <aside>
            <div className="top" >
              <div className='title'>[{selectArticle.title}]</div>
              <div className='date'>{setDate(selectArticle.date)}</div>
              <div className='lang'>{selectArticle.Languege}</div>
              { selectArticle.environment ? <div className='enviro'> {selectArticle.environment.join(', ') } </div>: <div className='enviro'> {selectArticle.UIFrameWork.join(', ')} </div> }
            </div>
            <div className="bottom">
              <img id='arrow-left' src={ArrowImg} />
              <img id='arrow-right' src={ArrowImg} />
            </div>
          </aside>
          <article>
          {selectArticle.detail.join(`. 
          `)}
          </article>
        </section>
        <section className='section-4'>
          <RotateCanvas />
        </section>
       </> : null
       }
     </div>
     { isPhoto || isDemo 
       ?  
       <>
       <footer>
          { endCount ? <CountDown changeDown={changeCountDown} />  :( isConfetti ? <Confetti /> : <FireWork />) }
        <div className='cursor' id='cursor'>click me!</div>
       <div className='email' onClick={changeFooter} >emilyback@naver.com</div>
     </footer>
     </> : null
     }
    </>
  )
}


export default App


