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
import { words } from 'lodash';

function App() { 
  const [endCount, setEndCount] = useState(true);


  const [canvas, setcanvas] = useState("photo");
  const [isPhoto, setIsPhoto] = useState(true);

  const [isDemo, setIsDemo] = useState(false);

  const [isConfetti, setIsConfetti] = useState(false);

  const changeCountDown = (data) =>{
    //app 을 disappear
    setEndCount(data)
  };
  const changeFooter = () =>{
    setIsConfetti(current => !current)
  };

  useEffect(() => {
    if(endCount) return;

    const port = document.querySelector(".app");
    gsap.fromTo(port,{opacity: 0}, {
      opacity: 1, 
      duration: 2,
      delay: 0.3
    })

    console.log("mouse click 떠야되는데")
    let mouseInEmail = false;
    const email =  document.querySelector(".email");
    const cursorText = document.querySelector('#cursor');

    email.addEventListener('mouseover', (e)=> {
      mouseInEmail = true;
      cursorText.removeAttribute("cursor");
      cursorText.setAttribute("id", "email-click-cursor");

    })
    const footer = document.querySelector("footer");

    footer.addEventListener('mousemove',(e) =>{
      if(!mouseInEmail) return;
      cursorText.style.top =  e.clientY + "px";
      cursorText.style.left =  e.clientX + "px";   

    })
   
  
    email.addEventListener("mouseout", (e) => {
      mouseInEmail = false;
      cursorText.setAttribute("id", "cursor");
      cursorText.removeAttribute("email-click-cursor");

    });
  
   
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

  useEffect(()=>{
    
   
  }, [ ]);

  const changeMain = (e) => {
     setcanvas(current => current = e.target.id)
  }

  return (
    // <React.Fragment> === <>
    <>
    {
      endCount 
      ?  
      <div className='count'>
        <CountDown changeDown={changeCountDown} />
      </div>
     :
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
        <section className="section-3">
          <aside>
            <div className="top">
              1914 translation by H. Rackham
            </div>
            <div className="bottom">
              <img src={ArrowImg} />
              <img src={ArrowImg} />
            </div>
          </aside>
          <article>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
          {isConfetti ? <Confetti /> : <FireWork />}
        <div id='cursor'>click me!</div>
       <div className='email' onClick={changeFooter} >emilyback@naver.com</div>
     </footer>
     </> : null
     }
   </>
    }
    
     
    </>
  )
}


export default App


